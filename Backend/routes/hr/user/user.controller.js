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
    const CheckUserExist = await prisma.user.findUnique({
      where: {
        email: req.body.email,
        matricule: req.body.matricule
      }
    });
    if (CheckUserExist) {
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

    const { password, ...userWithoutPassword } = createUser;
    return res
      .status(201)
      .json({
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
    const SingleUser = await prisma.user.findUnique({
      where: { id: Number(req.params.id) }
    });
    if (!SingleUser) {
      return res.status(400).json({
        message: "this user does not exist"
      });
    } else {
      const { password, ...userWithoutPassword } = SingleUser;
      return res
        .status(200)
        .json({ message: "user found", data: userWithoutPassword });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  RegisterUser,
  GetSingleUser
};
