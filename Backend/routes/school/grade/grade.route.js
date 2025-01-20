const express = require("express");
const { CreateGrade, GetAllGrade, GetSingleGrade } = require("./grade.controller");
const gradeRoutes = express.Router();

gradeRoutes.post("/create_grade", CreateGrade)
gradeRoutes.get("/all_grades", GetAllGrade)
gradeRoutes.get("/single_grade/:id", GetSingleGrade)

module.exports = gradeRoutes;