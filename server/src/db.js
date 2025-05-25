import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
console.log("✅ MONGO_URI from env:", process.env.MONGO_URI);

// get connection string from .env
const uri = process.env.MONGO_URI

// creat connection to db
mongoose.connect(uri)

// define employee structure
const employeeSchema = new mongoose.Schema({
	employee_id: {type: Number, unique: true},
	full_name: String,
	email: String,
	hashed_pwd: String
})

const employeeModel = mongoose.model("Employee", employeeSchema)

// define project structure
const projectSchema = new mongoose.Schema({
	project_code: {type: String, unique: true},
	project_name: String,
	project_discription: String
})

const projectModel = mongoose.model("Project", projectSchema)

// define assignment structure
const assignmentsSchema = new mongoose.Schema({
	employee_id: { type: mongoose.Types.ObjectId, ref:"Employee" },
	project_code: { type: mongoose.Types.ObjectId, ref:"Project" },
	start_date: Date,
}, {		// define how document is changed to JSON
		toJSON: {
			virtuals: true, // include vertuels
			versionKey: false, // exclude version key
			// defines transformation for JSON
			// removes all un needed fileds
			transform(doc, ret){
				delete ret._id;
				delete ret.employee_id;
				delete ret.project_code;
				return ret;
	}
	}}
)

// Creat vertual fileds
assignmentsSchema.virtual("Employee_name").get(function(){
	return this.employee_id.full_name
})

assignmentsSchema.virtual("Project_name").get(function(){
	return this.project_code.project_name
})

assignmentsSchema.virtual("Employee_ID").get(function(){
	return this.employee_id.employee_id
})

const assignmentModel = mongoose.model("Assignment", assignmentsSchema)

export { employeeModel, projectModel, assignmentModel }
