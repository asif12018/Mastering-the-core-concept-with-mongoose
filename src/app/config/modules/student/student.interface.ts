import { Model } from 'mongoose';

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
  password: string;
  name: TuserName;
  gender: 'male' | 'female' | 'other';
  email: string;
  dateOfBirth: string;
  contactNo: string;
  emergencyContactNo: string;
  bloodGroup?: Blood;
  presentAddress: string;
  permanentAddress: string;
  guardian: TGuardian;
  localGuardian: TLocalGuardian;
  profileImg?: string;
  isActive: 'active' | 'blocked';
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
