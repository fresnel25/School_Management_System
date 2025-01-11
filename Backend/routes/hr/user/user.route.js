const express = require("express")

const { RegisterUser, GetSingleUser } = require("./user.controller")

const userRoutes = express.Router()

userRoutes.post("/create_user", RegisterUser)
userRoutes.get("/single_user/:id", GetSingleUser)

module.exports = userRoutes