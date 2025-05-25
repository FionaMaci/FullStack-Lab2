import { employeeModel } from "../db.js"


async function insertNewEmployees(newEmployee){
	const employee = new employeeModel(newEmployee)
	const res = await employee.save()
		.catch(err => {throw new Error("Employee Id not unique")} )
	return res
}


export {insertNewEmployees}
