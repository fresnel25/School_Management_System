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

module.exports = {
  CreateRole
};
