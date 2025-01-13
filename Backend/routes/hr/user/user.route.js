const express = require("express")

const { RegisterUser, GetSingleUser, GetAllUsers, DeleteUser } = require("./user.controller")

const userRoutes = express.Router()

userRoutes.post("/create_user", RegisterUser)
userRoutes.get("/single_user/:id", GetSingleUser)
userRoutes.get("/all_users/", GetAllUsers)
userRoutes.delete("/delete_user/:id", DeleteUser)

module.exports = userRoutes