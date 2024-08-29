const path = require('path');
const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(path.resolve(__dirname, '../../database.sqlite3'), (err) => {
	if (err) {
		console.error('Database startup failure: ', err.message);
		process.exit(1);
	}
	console.log('Database initialized successfully.');
});

module.exports = {
	db,
};
