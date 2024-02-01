const db = require("./connections");

const getAllEmployees = () => {
db.query("SELECT e.first_name, e.last_name, r.title, r.salary, d.name department_name, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;", function (err, results) {
    if (err) {
        console.error(err);
        return;
    }

    console.table(results);
});
}

const getAllRoles = () => {
	db.query ("SELECT r.id, r.title, d.name AS department, r.salary from role r INNER JOIN department d ON r.department_id = d.id;", (err,results) => {
		if (err) {
			console.error(err);
			return;
		}

		console.table(results)
	})
}

const getAllDepartments = () => {
	db.query ("SELECT * FROM department;", (err,results) => {
		if (err) {
			console.error(err);
			return;
		}

		console.table(results)
	})
}

module.exports = {getAllEmployees, getAllRoles, getAllDepartments};