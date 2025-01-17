const prisma = require("../../../DB/db.config");

const bcrypt = require("bcrypt");
const saltround = 10;

const RegisterUser = async (req, res) => {
  try {
    const requiredField = ["matricule", "name", "surname", "email", "password"];
    for (const field of requiredField) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    // check if user already exist
    const checkUserExist = await prisma.user.findFirst({
      where: {
        OR: [{ email: req.body.email }, { matricule: req.body.matricule }]
      }
    });
    if (checkUserExist) {
      return res.status(409).json({ message: "this user already exist" });
    }

    // hash password and create user function
    const passwordHash = await bcrypt.hash(req.body.password, saltround);
    const createUser = await prisma.user.create({
      data: {
        matricule: req.body.matricule,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: passwordHash,
        roleId: req.body.roleId
      }
    });

    // return user without password
    const { password, ...userWithoutPassword } = createUser;
    return res.status(201).json({
      message: "user created successfully",
      data: userWithoutPassword
    });
  } catch (error) {
    console.error("Error in RegisterUser:", error.message, error.stack);
    return res.status(500).json({ error: error.message });
  }
};

const GetSingleUser = async (req, res) => {
  try {
    const singleUser = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        role: true
      }
    });
    if (singleUser) {
      const { password, ...userWithoutPassword } = singleUser;
      return res
        .status(200)
        .json({ message: "user found", data: userWithoutPassword });
    } else {
      return res.status(404).json({
        message: "this user not found"
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const GetAllUsers = async (req, res) => {
  try {
    const allUsers = await prisma.user.findMany({
      include: {
        role: true
      }
    });
    if (!allUsers) {
      return res.status(404).json({ message: "no users found" });
    } else {
      // Supprimer le mot de passe pour chaque utilisateur
      const usersWithoutPasswords = allUsers.map(
        ({ password, ...userWithoutPassword }) => userWithoutPassword
      );
      return res
        .status(200)
        .json({ message: "All user found", data: usersWithoutPasswords });
    }
  } catch (error) {}
};

const DeleteUser = async (req, res) => {
  try {
    // check if user exist in data base
    const userById = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });

    if (!userById) {
      return res.status(404).json({
        message: "this user you want to delete not found"
      });
    } else {
      await prisma.user.delete({
        where: {
          id: Number(req.params.id)
        }
      });
      return res.status(200).json({ message: "user deleted successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const UpdateUser = async (req, res) => {
  try {
    // check if user exist in data base
    const userById = await prisma.user.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    if (!userById) {
      return res
        .status(404)
        .json({ message: "this user you want to update not found" });
    }

    // check if user already exist
    const userByEmailOrMatricule = await prisma.user.findFirst({
      where: {
        OR: [{ email: req.body.email }, { matricule: req.body.matricule }]
      }
    });
    if (userByEmailOrMatricule) {
      return res.status(409).json({ message: "this user already exist" });
    }

    // hash password and create user function
    const passwordHash = await bcrypt.hash(req.body.password, saltround);

    // update user
    const updateUser = await prisma.user.update({
      where: {
        id: Number(req.params.id)
      },
      data: {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: passwordHash,
        roleId: req.body.roleId
      }
    });

    // return user without password
    const { password, ...userUpdateWithoutPassword } = updateUser;
    return res.status(201).json({
      message: "this user has been updated successfully",
      data: userUpdateWithoutPassword
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  RegisterUser,
  GetSingleUser,
  GetAllUsers,
  DeleteUser,
  UpdateUser
};
