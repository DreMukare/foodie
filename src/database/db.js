import Dexie from "dexie";

const db = new Dexie("foodieDB");
db.version(1).stores({
	admins: "++id, username",
	meals: "++id, name, created_at, updated_at",
	orders: "++id, created_at"
});

export default db;
