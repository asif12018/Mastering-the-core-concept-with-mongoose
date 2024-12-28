import { Student } from './student.model';
// import { TStudent } from './student.interface';

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
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id: id });
  return result;
};

//delete student from data base

const deleteStudentFromDB = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
