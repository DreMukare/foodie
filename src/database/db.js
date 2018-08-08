import Dexie from "dexie";

const db = new Dexie("foodieDB");
db.version(1).stores({
  admins: "++id, username",
  meals: "++id, name",
  orders: "++id"
});

export default db;
