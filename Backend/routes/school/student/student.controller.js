const prisma = require("../../../DB/db.config");

const CreateStudent = async (req, res) => {
  try {
    //   required field
    const requireField = [
      "matricule",
      "name",
      "surname",
      "email",
      "phone",
      "address",
      "img",
      "sex"
    ];
    for (const field of requireField) {
      if (!req.body[field]) {
        res.status(400).json({ message: `${field} is required` });
      }
    }

    // check if student already exist
    const studentByEmailAndMatricule = await prisma.student.findFirst({
      where: {
        OR: [{ email: req.body["email"] }, { matricule: req.body["matricule"] }]
      }
    });
    if (studentByEmailAndMatricule) {
      return res.status(409).json({ message: "this user exist" });
    }

    // create student
    const createStudent = await prisma.student.create({
      data: {
        name: req.body["name"],
        surname: req.body["surname"],
        email: req.body["email"],
        phone: req.body["phone"],
        address: req.body["address"],
        surname: req.body["surname"]
      }
    });
    return res
      .status(201)
      .json({ message: "student created successfully", data: createStudent });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetSingleStudent = async (req, res) => {
  try {
    // find student by id
    const singleStudent = await prisma.student.findUnique({
      where: {
        id: Number(req.params.id)
      }
    });
    if (singleStudent) {
      return res
        .status(200)
        .json({ message: "this student found", data: singleStudent });
    } else {
      // return this response if student id not found
      return res.status(404).json({ message: "this student not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetAllStudent = async (req, res) => {
    try {
        const allStudents = await prisma.student.findMany({
        });
        if (allStudents) {
            return res.status(200).json({ message: " all students found", data: allStudents})
        }
        else {
            return res.status(404).json({message: "no user found"});
        }
        
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
  CreateStudent,
  GetSingleStudent,
  GetAllStudent
};
