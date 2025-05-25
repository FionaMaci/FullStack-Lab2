import express from "express"
import { getAssignments, newEmployee, newProject, newAssignment } from "./controler.js"

const router = express.Router()

router.post("/api/employee", newEmployee)

router.post("/api/project", newProject)

router.post("/api/project_assignments", newAssignment)

router.get("/api/project_assignments", getAssignments)

export {router}
