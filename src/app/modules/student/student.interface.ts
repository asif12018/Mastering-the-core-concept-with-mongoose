import { Model, Types } from 'mongoose';

export type TGuardian = {
  fatherName: string;
  fatherOccupation: string;
  fatherContactNo: string;
  motherName: string;
  motherOccupation: string;
  motherContactNo: string;
};

export type TuserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type TLocalGuardian = {
  name: string;
  occupation: string;
  contactNo: string;
  address: string;
};

export type Blood = 'A+' | 'A-' | 'B+' | 'B-' | 'O+' | 'O-' | 'AB+' | 'AB-';

export type TStudent = {
  id: string;
  user: Types.ObjectId;
  password: string;
  name: TuserName;
  gender: 'male' | 'female' | 'other';
  email: string;
  dateOfBirth: Date;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: Blood;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  // isActive: 'active' | 'blocked';
  admissionSemester: Types.ObjectId;
  isDeleted: boolean;
  admissionDepartment: Types.ObjectId;
};

//for creating static

export interface StudentModel extends Model<TStudent> {
  isUserExists(id: string): Promise<TStudent | null>;
}

// interface to check is a specific user is available or not

// export type StudentMethod = {
//   isUserExists(id: string): Promise<TStudent | null>;
// };

// custom method to check the specific user

// export type StudentModel = Model<
//   TStudent,
//   Record<string, never>,
//   StudentMethod
// >;
