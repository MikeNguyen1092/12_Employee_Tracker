const { getAllEmployees, getAllRoles, getAllDepartments, addDepartment, addRole } = require("./db/index");
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
				break;

			case "Update An Employee Role":
				await updateEmployee();
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

		const roles = [];
		for (const key in departments){
			roles.push(departments[key].name);
		}
		

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
				name: "department",
				choices: [...roles],
			},
		]);
		const departmentId = departments.find((dept) => dept.name === response.department);
			await addRole(response, departmentId.id)

	} catch (err) {
		console.error(err);
	}
};

init();
