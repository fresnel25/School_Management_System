const prisma = require("../../../DB/db.config");

const CreateGrade = async (req, res) => {
  try {
    // check if grade already exists
    const gradeByLevel = await prisma.grade.findUnique({
      where: { level: req.body.level }
    });
    if (gradeByLevel) {
      return res.status(409).json({ message: "this grade already exists" });
    } else {
      const createGrade = await prisma.grade.create({
        data: {
          level: req.body.level
        }
      });
      return res
        .status(201)
        .json({ message: "grade created successfully", data: createGrade });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetSingleGrade = async (req, res) => {
  try {
    // check if grade exists
    const gradeId = Number(req.params.id);
    const grade = await prisma.grade.findUnique({
      where: { id: gradeId },
      include: {
        students: true,
        classrooms: true
      }
    });
    if (grade) {
      return res
        .status(200)
        .json({ message: "this grade exists", data: grade });
    } else {
      return res.status(404).json({ message: "this grade does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetAllGrade = async (req, res) => {
  try {
    const allGrades = await prisma.grade.findMany({
      include: {
        students: true,
        classrooms: true
      }
    });
    return res.status(200).json({ message: "all grades", data: allGrades });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
    CreateGrade,
    GetSingleGrade,
    GetAllGrade
}