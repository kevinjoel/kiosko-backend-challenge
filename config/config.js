module.exports = {
	development: {
		dialect: 'sqlite',
		storage: process.env.DATABASE_URL || './database.sqlite3',
	},
	production: {
		dialect: 'sqlite',
		storage: process.env.DATABASE_URL || './database.sqlite3',
	},
};
