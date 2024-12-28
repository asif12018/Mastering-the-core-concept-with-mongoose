import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';
import { ObjectId } from 'mongodb';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  //semester name --> semester code
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Semester name and code mismatch');
  }
  // Logic to create academic semester into DB
  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await AcademicSemester.findOne({ _id: new ObjectId(id) });
  return result;
};

const updateAcademicSemesterFromDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('invalid semester code or name');
  }
  const result = await AcademicSemester.findOneAndUpdate(
    { _id: new ObjectId(id) },
    payload,
    { new: true },
  );
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterFromDB,
};
