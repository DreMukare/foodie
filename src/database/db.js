import Dexie from "dexie";

const db = new Dexie("foodieDB");
db.version(1).stores({ meals: "++id, name" });

export default db;
