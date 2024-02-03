const { getAllEmployees, getAllRoles, getAllDepartments, addDepartment, addRole, addEmployee, updateEmployee } = require("./db/index");
const inquirer = require("inquirer");

const init = async () => {
	try {
		const response = await inquirer.prompt([
			{
				type: `list`,
				message: `What would you like to do?`,
				choices: [`View All Employees`, `View All Roles`, `View All Departments`, `Add A Department`, `Add A Role`, `Add An Employee`, `Update An Employee Role`],
				name: `qOne`,
			},
		]);

		switch (response.qOne) {
			case "View All Employees":
				const viewEmployees = await getAllEmployees();
				console.table(viewEmployees);
				init();
				break;

			case "View All Roles":
				const viewRoles = await getAllRoles();
				console.table(viewRoles);
				init();
				break;

			case "View All Departments":
				const viewDepartments = await getAllDepartments();
				console.table(viewDepartments);
				init();
				break;

			case "Add A Department":
				await department();
				init();
				break;

			case "Add A Role":
				await role();
				init();
				break;

			case "Add An Employee":
				await employee();
				init();
				break;

			case "Update An Employee Role":
				await updateEmployeeRole();
				init();
				break;

			default:
				break;
		}
	} catch (err) {
		console.error(err);
	}
};

const department = async () => {
	try {
		const response = await inquirer.prompt([
			{
				type: `input`,
				message: `What is the name of the department?`,
				name: `dName`,
			},
		]);

		await addDepartment(response.dName);
		console.log(response.dName + " department has been added");
	} catch (err) {
		console.error(err);
	}
};

const role = async () => {
	try {
		const departments = await getAllDepartments();

		const deptNames = departments.map((dept) => ({
			name: dept.name,
			value: dept.id,
		}));
		const response = await inquirer.prompt([
			{
				type: "input",
				message: "What is the name of the role?",
				name: "roleName",
			},
			{
				type: "number",
				message: "What is the salary of the role?",
				name: "salary",
			},

			{
				type: "list",
				message: "Which a department does the role belong to:",
				name: "deptId",
				choices: deptNames,
			},
		]);
		console.log(response);
		await addRole(response);
		console.log(response.roleName + " is added to the database");
	} catch (err) {
		console.error(err);
	}
};

const employee = async () => {
	try {
		const roles = await getAllRoles();
		const employees = await getAllEmployees();

		const roleNames = roles.map((r) => ({
			name: r.title,
			value: r.id,
		}));

		const employeeNames = employees.map((e) => ({
			name: `${e.first_name} ${e.last_name}`,
			value: e.id,
		}));
		employeeNames.unshift({ name: "None", value: null });

		const response = await inquirer.prompt([
			{
				type: "input",
				message: "What is the employee's first name?",
				name: "firstName",
			},
			{
				type: "input",
				message: "What is the employee's last name?",
				name: "lastName",
			},
			{
				type: "list",
				message: "What is the employee's role?",
				name: "roleId",
				choices: roleNames,
			},
			{
				type: "list",
				message: "Who is the employee's manager?",
				name: "managerId",
				choices: employeeNames,
			},
		]);
		console.log(response);
		await addEmployee(response);
	} catch (err) {
		console.error(err);
	}
};

const updateEmployeeRole = async () => {
	try {
		const roles = await getAllRoles();
		const employees = await getAllEmployees();

		const roleNames = roles.map((r) => ({
			name: r.title,
			value: r.id,
		}));

		const employeeNames = employees.map((e) => ({
			name: `${e.first_name} ${e.last_name}`,
			value: e.id,
		}));

		const response = await inquirer.prompt([
			{
				type: "list",
				message: "Which employee's role do you want to update?",
				choices: employeeNames,
				name: "employeeId",
			},
			{
				type: "list",
				message: "Which role do you want to assign the selected employee?",
				choices: roleNames,
				name: "roleId",
			},
		]);
		await updateEmployee(response);
	} catch (err) {
		console.error(err);
	}
};
init();
