const db = require("./connections");
const express = require('express');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.query("SELECT * FROM employee", function (err, results) {
	console.table(results);
});


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
  });
  