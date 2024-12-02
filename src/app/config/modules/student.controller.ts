import { Request, Response } from 'express';
import { StudentServices } from './student.service';

//controller to create student in database
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;
    // will call service func to send this data
    const result = await StudentServices.createStudentIntoDB(studentData);
    // sent response

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log('err from student controller', err);
  }
};

//controller to get student from database

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Student data is provided',
      data: result,
    });
  } catch (err) {
    console.log('error from get student controller', err);
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.studentId;

    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'single student data is provided',
      data: result,
    });
  } catch (err) {
    console.log('error from get single student controller', err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
