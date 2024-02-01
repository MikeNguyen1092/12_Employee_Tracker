const db = require("./db/connections");
const express = require('express');

// const PORT = process.env.PORT || 3001;
// const app = express();

// // Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

db.query("SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON role.department_id = department.id;", function (err, results) {
    if (err) {
        console.error(err);
        return;
    }

    console.table(results);
});


// app.listen(PORT, () => {
// 	console.log(`Server running on port ${PORT}`);
//   });