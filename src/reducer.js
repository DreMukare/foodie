const reducer = (state, { type, payload = {} }) => {
	const { stock, order, sales } = state;
	const { id } = payload;
	const stockData = stock[id];
	const orderData = order[id] || { ...stockData, quantity: 0 };

	switch (type) {
		case "INCREASE_STOCK":
			return {
				...state,
				stock: {
					...stock,
					[id]: { ...stockData, quantity: stockData.quantity + 1 }
				}
			};
		case "DECREASE_STOCK":
			return {
				...state,
				stock: {
					...stock,
					[id]: {
						...stockData,
						quantity: stockData.quantity > 0 ? stockData.quantity - 1 : 0
					}
				}
			};
		case "ADD_ORDER":
			return {
				...reducer(state, { type: "DECREASE_STOCK", payload }),
				order: {
					...order,
					[id]: {
						...orderData,
						quantity: orderData.quantity + 1,
						get price() {
							return this.quantity * stockData.price;
						}
					}
				}
			};
		case "REMOVE_ORDER":
			const validOrder = id in order && orderData.quantity !== 1;
			if (!validOrder) {
				const mutableState = { ...state };
				delete mutableState.order[id];
				return reducer(mutableState, { type: "INCREASE_STOCK", payload });
			}
			return {
				...reducer(state, { type: "INCREASE_STOCK", payload }),
				order: {
					...order,
					[id]: {
						...orderData,
						quantity: orderData.quantity - 1,
						get price() {
							return this.quantity * stockData.price;
						}
					}
				}
			};
		case "FETCH_DATA_REQUEST":
			return { ...state, async: { ...state.async, fetching: true } };
		case "FETCH_MEALS_FULFILLED":
			return {
				...state,
				async: { ...state.async, fetching: false, success: true },
				stock: { ...stock, ...payload.data }
			};
		case "FETCH_DATA_REJECTED":
			return {
				...state,
				async: { ...state.async, fetching: false, error: payload.error }
			};
		case "FETCH_SALES_FULFILLED":
			return {
				...state,
				async: { ...state.async, fetching: false, success: true },
				sales: { ...sales, ...payload.data }
			};
		case "SET_ADMIN":
			return {
				...state,
				isAdmin: true
			};
		case "LOG_OUT":
			return {
				...state,
				isAdmin: undefined
			};
		case "SAVE_ORDER":
			return {
				...state,
				order: {}
			};
		default:
			return state;
	}
};

export default reducer;
