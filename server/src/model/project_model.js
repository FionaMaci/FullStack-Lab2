import { projectModel } from "../db.js"


async function insertNewProject(newProject){
 	const project = new projectModel(newProject)
	const res = await project.save()
		.catch(err => {throw new Error("Project code not unique")} )
	return res
}


export { insertNewProject }
