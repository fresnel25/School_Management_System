const express = require("express")

const { RegisterUser } = require("./user.controller")

const userRoutes = express.Router()

userRoutes.post("/create_user", RegisterUser)

module.exports = userRoutes