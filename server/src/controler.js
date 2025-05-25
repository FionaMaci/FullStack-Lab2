import { insertNewEmployees } from "./model/employess_model.js"
import { insertNewProject } from "./model/project_model.js"
import { insertNewAssignment, getAllAssignments } from "./model/assignment_model.js"
import bcrypt from "bcrypt"

async function getAssignments(req, res, next){
	await getAllAssignments()
		.then(data => res.json(data))
		.catch(err =>{ next(Error("db error"))})
}

async function newEmployee(req, res, next){
	const employee = req.body
	const pwd = employee.hashed_pwd
	employee.hashed_pwd = await bcrypt.hash(pwd, 5)

	console.log(employee)
	insertNewEmployees(employee)
		.then(data => res.status(201).json(data))
		.catch(err => {err.status = 409; next(err)})
}

function newProject(req, res, next){
	const project = req.body
	insertNewProject(project)
		.then(data => res.status(201).json(data))
		.catch(err => {err.status = 409; next(err)})
}

function newAssignment(req, res, next){
	const assignment = req.body
	insertNewAssignment(assignment)
		.then(data => res.status(201).json(data))
		.catch(err => {err.status = 409; next(err)})
}


export { newEmployee, newProject, newAssignment, getAssignments }
