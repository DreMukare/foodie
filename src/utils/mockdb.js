import data from "./data";

class MockDB {
	constructor() {
		this.tableName = null;
		this.data = data;
	}
	table(tableName) {
		this.tableName = tableName;
		return this;
	}
	select(id) {
		const table = this.tableName;
		if (!id) {
			return Promise.resolve(this.data[table]);
		}
		const filtered = this.data[table].filter(entry => entry.id === id);
		if (filtered.length > 0) {
			return Promise.resolve(filtered[0]);
		}
	}
	insert(object) {
		const table = this.tableName;
		this.data[table].push(object);
		return this;
	}
}

export default MockDB;
