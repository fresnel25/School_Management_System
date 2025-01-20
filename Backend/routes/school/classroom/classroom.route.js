const express = require("express")
const { CreateClassroom, GetAllClassroom, GetSingleClassroom, UpdateClassroom, DeleteClassroom } = require("./classroom.controller")

const classroomRoutes = express.Router()

classroomRoutes.post("/create_classroom", CreateClassroom);
classroomRoutes.get("/all_classroom", GetAllClassroom);
classroomRoutes.get("/single_classroom/:id", GetSingleClassroom);
classroomRoutes.put("/update_classroom/:id", UpdateClassroom);
classroomRoutes.delete("delete_classroom/:id", DeleteClassroom);


module.exports = classroomRoutes