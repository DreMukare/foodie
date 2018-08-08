import { dal } from "./database";
import { normalize } from "./utils";

const fetchMealsThunk = dispatch => {
	dispatch({ type: "FETCH_MEALS_REQUEST" });
	dal
		.fetchAll("meals")
		.then(data => {
			const normalizedData = normalize(data);
			dispatch({
				type: "FETCH_MEALS_FULFILLED",
				payload: { data: normalizedData }
			});
		})
		.catch(error =>
			dispatch({ type: "FETCH_MEALS_REJECTED", payload: { error } })
		);
};

const saveOrderThunk = (dispatch, order) => {
	dal
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
			}
		});
};

export { fetchMealsThunk, saveOrderThunk };
