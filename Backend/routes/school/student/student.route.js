const express = require("express")
const { CreateStudent, GetAllStudent, GetSingleStudent, UpdateStudent, DeleteStudent } = require("./student.controller")

const studentRoutes = express.Router()

studentRoutes.post("/create_student", CreateStudent)
studentRoutes.get("/single_student/:id", GetSingleStudent)
studentRoutes.get("/all_students/", GetAllStudent)
studentRoutes.put("/update_student/:id", UpdateStudent)
studentRoutes.delete("/delete_student/:id", DeleteStudent)

module.exports = studentRoutes