import config from '../../config';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { User } from './user.model';
import { generateStudentId } from './user.utils';

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
  userData.id = await generateStudentId(admissionSemesterInfo);
  //create a user
  const newUser = await User.create(userData);
  //create a student
  if (Object.keys(newUser).length) {
    //set id , _id as user
    studentData.id = newUser.id; //embedding id
    studentData.user = newUser._id; // reference id
    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
