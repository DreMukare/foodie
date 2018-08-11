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
	dispatch({ type: "FETCH_DATA_REQUEST" });
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
				return Object.values(order).map(meal => {
					return dal.findOneAndUpdate("meals", {
						key: meal.id,
						value: entry => {
							delete entry.id;
							return {
								key: meal.id,
								value: { ...entry, quantity: entry.quantity - meal.quantity }
							};
						}
					});
				});
			}
		})
		.then(updateStatuses => Promise.all(updateStatuses))
		.then(statuses =>
			Array.prototype.reduce.call(
				statuses,
				(allStatuses, currentStatus) => allStatuses && currentStatus,
				true
			)
		);
};

const restockThunk = (dispatch, mealData) => {
	const formatted = {
		...mealData,
		quantity: parseInt(mealData.quantity, 10) || -1,
		price: parseInt(mealData.price, 10) || -1,
		type: Boolean(mealData.type) ? mealData.type.split(",") : -1
	};
	for (const key in formatted) {
		if (formatted[key] < 0) {
			delete formatted[key];
		}
	}
	return dal.upsert("meals", formatted, "name").then(result => {
		if (Boolean(result)) {
			return fetchMealsThunk(dispatch);
		}
	});
};

const totalSalesThunk = dispatch => {
	dispatch({ type: "FETCH_DATA_REQUEST" });
	return dal.fetchAll("orders").then(array => {
		const sales = array
			.reduce((all, order) => {
				return all.concat(
					order.meals.map(({ name, price }) => ({
						name,
						total: price
					}))
				);
			}, [])
			.reduce((a, c) => {
				if (Object.prototype.hasOwnProperty.call(a, c.name)) {
					a[c.name] = { name: c.name, total: a[c.name].total + c.total };
					return a;
				}
				a[c.name] = {
					name: c.name,
					total: c.total
				};
				return a;
			}, {});
		dispatch({ type: "FETCH_SALES_FULFILLED", payload: { data: sales } });
	});
};

export {
	fetchMealsThunk,
	loginThunk,
	saveOrderThunk,
	restockThunk,
	totalSalesThunk
};
