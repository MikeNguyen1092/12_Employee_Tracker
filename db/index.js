const db = require("./connections");
const util = require("util");
const dataBase = util.promisify(db.query).bind(db);

const getAllEmployees = async () => {
	try {
		const results = await dataBase(
			"SELECT e.id, e.first_name, e.last_name, r.title, r.salary, d.name AS department, CONCAT(m.first_name, ' ', m.last_name) AS manager FROM employee e INNER JOIN role r ON e.role_id = r.id INNER JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id;"
		);
		return results;
	} catch (err) {
		throw err;
	}
};

const getAllRoles = async () => {
	try {
		const results = await dataBase("SELECT r.id, r.title, d.name AS department, r.salary from role r INNER JOIN department d ON r.department_id = d.id;");
		return results;
	} catch (err) {
		throw err;
	}
};

const getAllDepartments = async () => {
	try {
		const results = await dataBase("SELECT * FROM department;");
		return results;
	} catch (err) {
		throw err;
	}
};

const addDepartment = async (department) => {
	try {
		const results = await dataBase(`INSERT INTO department (name) VALUES ("${department}");`);
		return results;
	} catch (err) {
		throw err;
	}
};

const addRole = async (role) => {
	try {
		await dataBase(`INSERT INTO role (title, salary, department_id) VALUES ("${role.roleName}", ${role.salary}, ${role.deptId})`);
	} catch (err) {
		throw err
	}
}
const addEmployee = async (e) => {
	try {
		await dataBase(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${e.firstName}", "${e.lastName}", ${e.roleId}, ${e.managerId})`);
	} catch (err) {
		throw err
	}
}

const updateEmployee = async (e) => {
	try {
		await dataBase(`UPDATE employee SET role_id = ${e.roleId} WHERE id = ${e.employeeId};`);
	} catch (err) {
		throw err
	}
}

;

module.exports = { getAllEmployees, getAllRoles, getAllDepartments, addDepartment, addRole, addEmployee, updateEmployee };
