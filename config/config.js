const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

module.exports = {
	development: {
		dialect: 'sqlite',
		storage: process.env.DATABASE_URL || './database.sqlite3',
	},
	test: {
		dialect: 'sqlite',
		storage: './database.test.sqlite3',
	},
	production: {
		dialect: 'sqlite',
		storage: process.env.DATABASE_URL || './database.sqlite3',
	},
};
