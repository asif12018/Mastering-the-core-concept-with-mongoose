import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchemaZod from './student.zodValidation';

// import studentValidationSchema from './student.validation';

//controller to create student in database
const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    //data validation using joi
    // const { error, value } = studentValidationSchema.validate(studentData);
    // console.log('this is value', value);
    // if (error) {
    //   res.status(500).json({
    //     success: 'false',
    //     message: 'something went wrong',
    //     error: error,
    //   });
    // }
    // will call service func to send this data

    //data validation using zod
    const zodParsedData = studentValidationSchemaZod.parse(studentData);
    const result = await StudentServices.createStudentIntoDB(zodParsedData);
    // sent response

    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong in create student controller',
      error: err,
    });
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
    res.status(500).json({
      success: false,
      message: 'something went wrong from get all student controller',
      error: err,
    });
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
    res.status(500).json({
      success: true,
      message: 'Something went wrong in get single student controller',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
