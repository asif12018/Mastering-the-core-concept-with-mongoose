import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({
      createdAt: -1,
    })
    .lean();
  // console.log(await lastStudent);
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  //first time 0000
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(4, '0');
  console.log(currentId);
  // console.log(currentId);
  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  // console.log(incrementId);
  incrementId = `${payload.year}${payload.code}${incrementId}`;
  // console.log(incrementId);
  return incrementId;
};
