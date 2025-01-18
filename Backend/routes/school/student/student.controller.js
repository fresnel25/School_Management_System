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
    } else {
      // create student
      const createStudent = await prisma.student.create({
        data: {
          matricule: req.body["matricule"],
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
    }
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
    const allStudents = await prisma.student.findMany({});
    if (allStudents) {
      return res
        .status(200)
        .json({ message: " all students found", data: allStudents });
    } else {
      return res.status(404).json({ message: "no user found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const UpdateStudent = async (req, res) => {
  try {
    const idStudent = Number(req.params.id);
    // check student By id
    const studentById = await prisma.student.findUnique({
      where: {
        id: idStudent
      }
    });
    // check if student alredy exist
    const studentByMatriculeAndEmail = await prisma.student.findFirst({
      where: {
        OR: [
          {
            email: req.body.email,
            matricule: req.body.matricule
          }
        ]
      }
    });
    if (studentByMatriculeAndEmail) {
      return res.status(409).json({ message: "this student already exist" });
    }

    // update student
    if (studentById && !studentByMatriculeAndEmail) {
      const updateStudent = await prisma.student.update({
        where: {
          id: idStudent
        },
        data: {
          matricule: req.body.matricule,
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          phone: req.body.phone,
          address: req.body.address,
          surname: req.body.surname
        }
      });
      return res.status(201).json({
        message: "this student has been updated successfully ",
        data: updateStudent
      });
    } else {
      return res.status(404).json({ message: "this student does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const DeleteStudent = async (req, res) => {
  try {
    const idStudent = Number(req.params.id);
    // check student By id
    const studentById = await prisma.student.findUnique({
      where: {
        id: idStudent
      }
    });
    if (studentById) {
      await prisma.student.delete({
        where: {
          id: studentById
        }
      });
      return res
        .status(200)
        .json({ message: "this student has been deleted successfully" });
    } else {
      return res.status(404).json({ message: "this student does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateStudent,
  GetSingleStudent,
  GetAllStudent,
  UpdateStudent,
  DeleteStudent
};
