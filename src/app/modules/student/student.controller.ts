import { StudentServices } from './student.service';
import catchAsync from '../../utils/catchAsync';

//controller to get student from database

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getAllStudents = catchAsync(async (req, res, next) => {
  const result = await StudentServices.getAllStudentsFromDB();

  res.status(200).json({
    success: true,
    message: 'Student data is provided',
    data: result,
  });
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getSingleStudent = catchAsync(async (req, res, next) => {
  const studentId = req.params.studentId;

  const result = await StudentServices.getSingleStudentFromDB(studentId);

  res.status(200).json({
    success: true,
    message: 'single student data is provided',
    data: result,
  });
});

const updateStudent = catchAsync(async (req, res) => {
  const { studentId } = req.params;
  // console.log(req.body);
  const { student } = req.body;
  const result = await StudentServices.updateStudentIntoDB(studentId, student);
  // console.log(req.body);
  res.status(200).json({
    success: true,
    message: 'student update successfully',
    data: result,
  });
});

const deleteStudent = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req, res, next) => {
    const studentId = req.params.studentId;
    const result = await StudentServices.deleteStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'student deleted successfully',
      data: result,
    });
  },
);

export const StudentControllers = {
  // createStudent,
  getAllStudents,
  getSingleStudent,
  deleteStudent,
  updateStudent,
};
