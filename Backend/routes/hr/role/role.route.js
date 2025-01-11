const express = require("express")
const { CreateRole } = require("./role.controller")

const roleRoutes = express.Router()


roleRoutes.post("/create_role", CreateRole)

module.exports = roleRoutes