const prisma = require("../../../DB/db.config");

const CreateRole = async (req, res) => {
  try {
    // verifier si le role existe deja
    const findRole = await prisma.role.findUnique({
      where: { name: req.body.name }
    });
    if (findRole) {
      return res.status(409).json({ message: "Role already exist" });
    }

    // création de rôle
    const CreatedRole = await prisma.role.create({
      data: {
        name: req.body.name,
        description: req.body.description
      }
    });

    return res
      .status(201)
      .json({ message: "Role created successfully", data: CreatedRole });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetSingleRole = async (req, res) => {
  try {
    //
    const CheckRoleExist = await prisma.role.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!CheckRoleExist) {
      return res.status(404).json({ message: "this role not exist found" });
    } else {
      return res
        .status(200)
        .json({ message: "role found", data: CheckRoleExist });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const GetAllRoles = async (req, res) => {
  try {
    const AllRoles = await prisma.role.findMany({
      orderBy: {
        id: "asc"
      }
    });
    return res.status(200).json({ message: "All roles found", data: AllRoles });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

const DeleteRole = async (req, res) => {
  try {
    // check if role exist
    const checkRoleExist = await prisma.role.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!checkRoleExist) {
      return res
        .status(404)
        .json({ message: "this role you want to delete not exist found" });
    }
    // delete role
    else {
      await prisma.role.delete({
        where: { id: Number(req.params.id) }
      });
      return res.status(200).json({ message: "role deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateRole,
  GetSingleRole,
  GetAllRoles,
  DeleteRole
};
