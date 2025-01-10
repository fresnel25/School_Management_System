const prisma = require("../../../DB/db.config");

const bcrypt = require("bcrypt");
const saltround = 10;

const RegisterUser = async (req, res) => {
  try {
    if (!req.body.password || !req.body.email || !req.body.name) {
      return res.status(400).json({ error: "Missing required fields" });
    }

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
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error in RegisterUser:", error.message, error.stack);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  RegisterUser
};
