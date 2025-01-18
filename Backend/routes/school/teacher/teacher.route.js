const express = require("express")
const { CreateTeacher, GetSingleTeacher, GetAllTeachers, UpdateTeacher, DeleteTeacher } = require("./teacher.controller")

const teacherRoutes = express.Router()

teacherRoutes.post("/create_teacher", CreateTeacher)
teacherRoutes.get("/sigle_teacher/:id", GetSingleTeacher)
teacherRoutes.get("/all_teachers", GetAllTeachers)
teacherRoutes.put("/update_teacher/:id", UpdateTeacher)
teacherRoutes.delete("/delete_teacher/:id", DeleteTeacher)

module.exports = teacherRoutes