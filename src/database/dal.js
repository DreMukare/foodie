import db from "./db";

const date = key => ({ [key]: Date.now() });

const fetchAll = tableName => db.table(tableName).toArray();

const insertOne = (tableName, data) =>
	db.table(tableName).add({ ...data, ...date("created_at") });

const upsert = (tableName, data, key) => {
	const table = db.table(tableName);
	if (Boolean(key)) {
		return table
			.where(key)
			.equals(data[key])
			.toArray()
			.then(result => {
				if (result.length > 0) {
					return table.update(result[0].id, { ...data, ...date("updated_at") });
				}
			});
	}
	return table.put({ ...data, ...date("created_at") });
};

const find = (tableName, query) =>
	db
		.table(tableName)
		.where(query.key)
		.equals(query.value)
		.toArray();

const findOne = (tableName, key) => db.table(tableName).get(key);

const updateOne = (tableName, query) =>
	db
		.table(tableName)
		.update(query.key, { ...query.value, ...date("updated_at") });

const findOneAndUpdate = (tableName, query) => {
	return findOne(tableName, query.key).then(entry => {
		if (Boolean(entry)) {
			if (typeof query.value === "function") {
				return updateOne(tableName, query.value(entry));
			}
			return updateOne(tableName, query.value);
		}
	});
};

export default {
	fetchAll,
	find,
	findOne,
	findOneAndUpdate,
	insertOne,
	updateOne,
	upsert
};
