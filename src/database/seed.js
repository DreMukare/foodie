import db from "./db";
import data from "./data";

db.table("meals").bulkAdd(data.meals);
