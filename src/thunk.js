import { compare } from "bcryptjs";
import { dal } from "./database";
import { normalize } from "./utils";

const loginThunk = (dispatch, loginData) => {
	return dal
		.find("admins", { key: "username", value: loginData.username || "" })
		.then(data => {
			if (data.length > 0) {
				return compare(loginData.password, data[0].password).then(success => {
					if (success) {
						dispatch({ type: "SET_ADMIN" });
					}
					return success;
				});
			}
		});
};

const fetchMealsThunk = dispatch => {
	dispatch({ type: "FETCH_MEALS_REQUEST" });
	return dal
		.fetchAll("meals")
		.then(data => {
			const normalizedData = normalize(data);
			dispatch({
				type: "FETCH_MEALS_FULFILLED",
				payload: { data: normalizedData }
			});
			return true;
		})
		.catch(error => {
			dispatch({ type: "FETCH_MEALS_REJECTED", payload: { error } });
			return false;
		});
};

const saveOrderThunk = (dispatch, order) => {
	return dal
		.insertOne("orders", { meals: order })
		.then(orderId => {
			if (Boolean(orderId)) {
				dispatch({ type: "SAVE_ORDER" });
				return true;
			}
		})
		.then(saved => {
			if (saved) {
				for (const meal of Object.values(order)) {
					dal.findOneAndUpdate("meals", {
						key: meal.id,
						value: entry => {
							delete entry.id;
							return {
								key: meal.id,
								value: { ...entry, quantity: entry.quantity - meal.quantity }
							};
						}
					});
				}
				return true;
			}
		});
};

const restockThunk = (dispatch, mealData) => {
	const formatted = {
		...mealData,
		quantity: parseInt(mealData.quantity, 10),
		price: parseInt(mealData.price, 10)
	};
	return dal.upsert("meals", formatted, "name").then(result => {
		if (Boolean(result)) {
			return fetchMealsThunk(dispatch);
		}
	});
};

export { fetchMealsThunk, loginThunk, saveOrderThunk, restockThunk };
