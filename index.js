const {getEmployee} = require("./db/index");
const inquirer = require("inquirer");

// let int = async () => {
// 	try {
// 		const response = await inquirer.prompt ([
// 			{
// 				type: `list`,
// 				message: `What would you like to do?`,
// 				choices: [`View All Employees`, `View All Roles`,`View All Departments`, `Add A Department`, `Add A Role`, `Add An Employee`, `Update An Employee Role`],

// 			}
// 		])
		
// 	}
// 	catch (err) {
// 		console.error(err)
// 	}
// }




getEmployee();