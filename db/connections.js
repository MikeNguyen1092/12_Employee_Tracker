const mysql = require('mysql2')

const db = mysql.createConnection(
	{
		host: "localhost",
		// MySQL Username
		user: "root",
		// MySQL Password
		password: "rootroot",
		database: "business_db",
	},
	console.log(`Connected to the books_db database.`)
);

module.exports = db;