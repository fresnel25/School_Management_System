const prisma = require("../../../DB/db.config");

const CreateTeacher = async (req, res) => {
  try {
    //   required field
    const requireField = [
      "matricule",
      "name",
      "surname",
      "email",
      "phone",
      "address",
      "sex"
    ];
    for (const field of requireField) {
      if (!req.body[field]) {
        res.status(400).json({ message: `${field} is required` });
      }
    }

    // check if matricule and email already exist
    const checkMatriculeAndEmail = await prisma.teacher.findUnique({
      where: {
        matricule: req.body.matricule,
        email: req.body.email
      }
    });
    if (!checkMatriculeAndEmail) {
      const createTeacher = await prisma.teacher.create({
        data: {
          matricule: req.body["matricule"],
          name: req.body["name"],
          surname: req.body["surname"],
          email: req.body["email"],
          phone: req.body["phone"],
          address: req.body["address"],
          surname: req.body["surname"],
          sex: req.body["sex"]
        }
      });
      res
        .status(201)
        .json({ message: "Teacher created successfully", data: createTeacher });
    } else {
      return res
        .status(409)
        .json({ message: "this matricule and email already exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetSingleTeacher = async (req, res) => {
  try {
    const teacherId = Number(req.params.id);
    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
      include: {
        subjects: true,
        classrooms: true,
        lessons: true
      }
    });
    if (teacher) {
      return res
        .status(200)
        .json({ message: "the teacher found", data: teacher });
    } else {
      return res.status(404).json({ message: "this teacher not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetAllTeachers = async (req, res) => {
  try {
    const teachers = await prisma.teacher.findMany({
      include: {
        subjects: true,
        classrooms: true,
        lessons: true
      }
    });
    if (teachers) {
      return res
        .status(200)
        .json({ message: "teachers found", data: teachers });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const UpdateTeacher = async (req, res) => {
  try {
    const teacherId = Number(req.params.id);
    const teacherById = await prisma.teacher.findUnique({
      where: {
        id: teacherId
      }
    });

    if (teacherById) {
      //   required field
      const requireField = [
        "matricule",
        "name",
        "surname",
        "email",
        "phone",
        "address",
        "sex"
      ];
      for (const field of requireField) {
        if (!req.body[field]) {
          res.status(400).json({ message: `${field} is required` });
        }
      }
      // check if matricule and email already exist
      const checkMatriculeAndEmail = await prisma.teacher.findUnique({
        where: {
          matricule: req.body.matricule,
          email: req.body.email
        }
      });
      if (!checkMatriculeAndEmail) {
        const updateTeacher = await prisma.teacher.update({
          data: {
            matricule: req.body["matricule"],
            name: req.body["name"],
            surname: req.body["surname"],
            email: req.body["email"],
            phone: req.body["phone"],
            address: req.body["address"],
            surname: req.body["surname"],
            sex: req.body["sex"]
          }
        });
        res.status(201).json({
          message: "Teacher update successfully",
          data: updateTeacher
        });
      } else {
        return res
          .status(409)
          .json({ message: "this matricule and email already exist" });
      }
    } else {
      return res
        .status(404)
        .json({ message: `this teacher ${teacherId} not found` });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const DeleteTeacher = async (req, res) => {
  try {
    const teacherId = Number(req.params.id);
    const teacherById = await prisma.teacher.findUnique({
      where: {
        id: teacherId
      }
    });
    if (teacherById) {
      await prisma.teacher.delete({
        where: {
          id: teacherById
        }
      });
      return res
        .status(200)
        .json({ message: "this teacher delete successfully" });
    } else {
      return res.status(404).json({ message: "this teacher not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateTeacher,
  GetSingleTeacher,
  GetAllTeachers,
  UpdateTeacher,
  DeleteTeacher
};
