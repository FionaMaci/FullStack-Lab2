import { assignmentModel, projectModel, employeeModel } from "../db.js"

async function insertNewAssignment(newAssignment){

	
	const employee_id = newAssignment.employee_id
	const employee = await employeeModel.findOne({employee_id: employee_id}).exec()
	if (!employee) throw new Error("invalid employee_id")

	const project_code = newAssignment.project_code
	const project = await projectModel.findOne({project_code: project_code}).exec()
	if (!project) throw new Error("invalid project_code")

	const assignment = new assignmentModel(
		{
			employee_id: employee._id,
			project_code: project._id,
			start_date: newAssignment.start_date
		})

	const res = await assignment.save()
		.catch(err => {throw new Error("Failed to creat Assignment")})
	return res
}

async function getAllAssignments(){
	const assignments = await assignmentModel.find()
		// populate refs
		.populate("project_code")
		.populate("employee_id")
		.exec()
	return assignments
}

export { insertNewAssignment, getAllAssignments }
