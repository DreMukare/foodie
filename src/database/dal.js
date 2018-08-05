import db from "./db";
import { normalize } from "../utils";

const fetchAll = tableName => db.table(tableName).toArray();

const findOne = (tableName, query) =>
  db
    .table(tableName)
    .where(query.key)
    .equals(query.value)
    .toArray();

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

export default {
  fetchAll,
  findOne,
  fetchMealsThunk
};
