import mongoose from 'mongoose';
import { Student } from './student.model';
import { AppError } from '../../errors/AppError';
// import { TStudent } from './student.interface';
import { User } from './../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/Querbuilder';
import { studentSearchableFeilds } from './student.constant';

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

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // const queryObj = { ...query }; //copy
  // {email: {$regex: query.searchTerm, $options: i}}
  // {presentAddress: {$regex: query.searchTerm, $options: i}}

  // let searchTerm = '';
  // if (query?.searchTerm) {
  // searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or: studentSearchableFeilds.map((field) => ({
  //     [field]: { $regex: searchTerm, $options: 'i' },
  //   })),
  // });
  //filtering
  // const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  // excludeFields.forEach((el) => delete queryObj[el]);
  // // console.log('base query', query, queryObj);
  // const filterQuery = searchQuery
  //   .find(queryObj)
  // .populate('admissionSemester')
  // .populate({
  //   path: 'admissionDepartment',
  //   populate: {
  //     path: 'academicFaculty',
  //   },
  // });
  // let sort = 'createdAt';
  // if (query?.sort) {
  //   sort = query?.sort as string;
  // }
  // //1 sorting the data
  // const sortQuery = filterQuery.sort(sort);
  // let page = 1;
  // let limit = 1;
  // let skip = 0;
  // if (query?.limit) {
  //   limit = Number(query?.limit) as number;
  // }
  // if (query?.page) {
  //   page = Number(query?.page);
  //   skip = (page - 1) * limit;
  // }
  // skiping the data
  // const paginateQuery = sortQuery.skip(skip);
  // const limitQuery = paginateQuery.limit(limit);
  // field limiting
  // let fields = '-__v';
  // if (query.fields) {
  //   fields = (query.fields as string).split(',').join(' ');
  // }
  // // console.log('this is feilds', fields);
  // const fieldQuery = await limitQuery.select(fields);
  // return fieldQuery;
  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('admissionSemester')
      .populate({
        path: 'admissionDepartment',
        populate: {
          path: 'academicFaculty',
        },
      }),
    query,
  )
    .search(studentSearchableFeilds)
    .filter()
    .sort()
    .paginate()
    .fields();
  const result = await studentQuery.modelQuery.exec();
  // console.log(result);
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'admissionDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};

//update student from db

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

//delete student from data base

const deleteStudentFromDB = async (id: string) => {
  const isStudentExist = await Student.findOne({ id });
  if (!isStudentExist) {
    throw new AppError(404, 'student not exist or invalid id');
  }
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
    throw new AppError(400, 'failed to delete user');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
