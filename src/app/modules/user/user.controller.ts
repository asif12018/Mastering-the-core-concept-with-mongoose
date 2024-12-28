import { UserServices } from './user.service';
import catchAsync from '../../utils/catchAsync';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createStudent = catchAsync(async (req, res, next) => {
  const { password, student: studentData } = req.body;
  const result = await UserServices.createStudentIntoDB(password, studentData);
  res.status(200).json({
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
};
