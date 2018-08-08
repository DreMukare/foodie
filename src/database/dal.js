import db from "./db";
import { normalize } from "../utils";

const fetchAll = tableName => db.table(tableName).toArray();

const insertOne = (tableName, data) => db.table(tableName).add(data);

const findOne = (tableName, query) =>
  db
    .table(tableName)
    .where(query.key)
    .equals(query.value)
    .toArray();

const updateOne = (tableName, query) =>
  db.table(tableName).update(query.key, query.value);

const fetchMealsThunk = dispatch => {
  dispatch({ type: "FETCH_MEALS_REQUEST" });
  fetchAll("meals")
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
  insertOne("orders", order)
    .then(savedOrderId => {
      dispatch({ type: "SAVE_ORDER" });
      return savedOrderId;
    })
    .then(savedOrderId => {
      if (Boolean(savedOrderId)) {
        Object.values(order).forEach(meal => {
          findOne("meals", { key: "name", value: `${meal.name}` }).then(
            mealData => {
              return updateOne("meals", {
                key: `${mealData.id}`,
                value: {
                  ...mealData,
                  quantity: mealData.quantity - meal.quantity,
                  id: undefined
                }
              });
            }
          );
        });
      }
    })
    .then(res => console.log(res));
};

export default {
  fetchAll,
  findOne,
  fetchMealsThunk,
  insertOne,
  saveOrderThunk,
  updateOne
};
