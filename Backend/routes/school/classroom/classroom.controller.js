const prisma = require("../../../DB/db.config");

const CreateClassroom = async (req, res) => {
  try {
    // check if classroom already exists
    const classroomByName = await prisma.classroom.findUnique({
      where: {
        name: req.body.name
      }
    });
    if (classroomByName) {
      return res.status(409).json({ message: "this classroom already exists" });
    }

    // create new classroom
    const createclassroom = await prisma.classroom.create({
      data: {
        name: req.body.name,
        capacity: req.body.capacity,
        supervisorId: req.body.supervisorId,
        gradeId: req.body.gradeId
      }
    });
    return res.status(201).json({
      message: "classroom created successfully",
      data: { createclassroom }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetSingleClassroom = async (req, res) => {
  try {
    // get classroom by id
    const classroomId = Number(req.params.id);

    // check if classroom exists
    const classroomById = await prisma.classroom.findUnique({
      where: {
        id: classroomId
      },
      include: {
        supervisor: true,
        grade: true
      }
    });
    if (classroomById) {
      return res
        .status(200)
        .json({ message: "your classroom", data: { classroomById } });
    } else {
      return res.status(404).json({ message: "this classroom does not exist" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const GetAllClassroom = async (req, res) => {
  try {
    // get all classrooms
    const classroomAll = await prisma.classroom.findMany({
      include: {
        supervisor: true,
        grade: true
      }
    });
    return res
      .status(200)
      .json({ message: "all classrooms", data: { classroomAll } });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const UpdateClassroom = async (req, res) => {
  try {
    // get classroom by id and check if exist
    const classroomId = Number(req.params.id);
    const classroomById = await prisma.classroom.findUnique({
      where: {
        id: classroomId
      }
    });
    if (classroomById) {
      const classroomByName = await prisma.classroom.findUnique({
        where: { name: req.body.name }
      });
      if (classroomByName) {
        return res
          .status(409)
          .json({ message: "this classroom already exist" });
      } else {
        // update classroom
        const classroomUpdate = await prisma.classroom.update({
          where: {
            id: classroomId
          },
          data: {
            name: req.body.name,
            capacity: req.body.capacity,
            supervisorId: req.body.supervisorId,
            gradeId: req.body.gradeId
          }
        });
        return res
          .status(201)
          .json({ message: "classroom updated", data: { classroomUpdate } });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const DeleteClassroom = async (req, res) => {
  try {
    // get classroom by id and check if exist
    const classroomId = Number(req.params.id);
    const classroomById = await prisma.classroom.findUnique({
      where: { id: classroomId }
    });
    if(classroomById) {
        await prisma.classroom.delete({
            where: {
                id: classroomId
            }
        });
        return res.status(200).json({message: "classroom deleted successfully"});
    }
    else {
        return res.status(404).json({message: "this classroom does not exist"});
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  CreateClassroom,
  GetAllClassroom,
  GetSingleClassroom,
  UpdateClassroom, 
  DeleteClassroom,
};
