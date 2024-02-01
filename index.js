const { getAllEmployees, getAllRoles, getAllDepartments } = require("./db/index");
const inquirer = require("inquirer");

let init = async () => {
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
				await getAllEmployees();

				break;

			case "View All Roles":
				await getAllRoles();

				break;

			case "View All Departments":
				await getAllDepartments();

				break;

			default:
				init();
				break;
		}

	} catch (err) {
		console.error(err);
	}
};

init()