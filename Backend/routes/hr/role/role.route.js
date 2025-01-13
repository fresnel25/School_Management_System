const express = require("express")
const { CreateRole, GetSingleRole, GetAllRoles, DeleteRole } = require("./role.controller")

const roleRoutes = express.Router()


roleRoutes.post("/create_role", CreateRole)
roleRoutes.get("/single_role/:id", GetSingleRole)
roleRoutes.get("/all_roles", GetAllRoles)
roleRoutes.delete("/delete_role/:id", DeleteRole)

module.exports = roleRoutes