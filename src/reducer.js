const reducer = (state, { type, payload }) => {
  const { stock, order } = state;
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
    default:
      return state;
  }
};

export default reducer;
