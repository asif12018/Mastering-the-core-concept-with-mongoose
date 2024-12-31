import mongoose from 'mongoose';
import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import { AppError } from '../../errors/AppError';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TStudent> & { role?: string } = {};
  //if password is not given, se default password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = 'student';
  //find academic semester info
  const admissionSemesterInfo = await AcademicSemester.findById({
    _id: new Object(studentData.admissionSemester),
  });
  //auto  generated id
  if (!admissionSemesterInfo) {
    throw new Error('Admission semester info not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemesterInfo);
    //transaction -- 1
    //create a user
    const newUser = await User.create([userData], { session });
    //create a student
    if (!newUser.length) {
      throw new AppError(400, 'failed to create user');
    }
    //set id , _id as user
    studentData.id = newUser[0].id; //embedding id
    studentData.user = newUser[0]._id; // reference id
    //create a student (transaction - 2)
    const newStudent = await Student.create([studentData], { session });
    if (!newStudent.length) {
      throw new AppError(400, 'failed to create Student');
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(400, 'failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};
