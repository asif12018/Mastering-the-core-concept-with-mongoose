import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../errors/AppError';
// import { TStudent } from './student.interface';
import { User } from './../user/user.model';

// const createStudentIntoDB = async (studentData: TStudent) => {
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('User already exist!');
//   }
//   const result = await Student.create(studentData);

//   // if (await result.isUserExists(studentData.id)) {
//   //   throw new Error('User already exist!');
//   // }
//   // built in static method

//   // const student = new StudentModel(studentData);
//   // const result = await student.save();
//   //build in instance method
//   return result;
// };

const getAllStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id })
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

//delete student from data base

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    //first transaction
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(400, 'failed to delete student');
    }
    //second transaction
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(400, 'filed to delete user');
    }
    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    await session.endSession();
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
