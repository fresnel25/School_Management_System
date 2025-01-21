const express = require("express");
const { CreateGrade, GetAllGrade, GetSingleGrade, UpdateGrade, DeleteGrade } = require("./grade.controller");
const gradeRoutes = express.Router();

gradeRoutes.post("/create_grade", CreateGrade)
gradeRoutes.get("/all_grades", GetAllGrade)
gradeRoutes.get("/single_grade/:id", GetSingleGrade)
gradeRoutes.put("/update_grade/:id", UpdateGrade)
gradeRoutes.delete("/delete_grade/:id", DeleteGrade)

module.exports = gradeRoutes;