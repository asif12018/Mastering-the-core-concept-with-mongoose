import { Schema, model } from 'mongoose';
import validator from 'validator';
import bcypt from 'bcrypt';

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentModel,
  TuserName,
} from './student/student.interface';
import config from '../../config';

const userNameSchema = new Schema<TuserName>({
  firstName: {
    type: String,
    required: [true, 'first name is required'],
    trim: true,
    maxlength: [20, 'first Name can not be more than 20 characters'],
    // validate: {
    //   validator: function (value: string) {
    //     const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
    //     return firstNameStr === value;
    //   },
    //   message: '{VALUE} is not capitalized format',
    // },
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'last name is required'],
    trim: true,
    // validate: {
    //   validator: (value: string) => validator.isAlpha(value),
    //   message: '{VALUE} is not valid',
    // },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: { type: String, required: true },
  fatherOccupation: { type: String, required: true },
  fatherContactNo: { type: String, required: true },
  motherName: { type: String, required: true },
  motherOccupation: { type: String, required: true },
  motherContactNo: { type: String, required: true },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNo: { type: String, required: true },
  address: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: { type: String, required: true, unique: true },
  password: String,
  name: {
    type: userNameSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        "The gender you input {VALUE} is not supported. The field can only be one of the following: 'male', 'female', or 'other'",
    },
    required: true,
  },
  dateOfBirth: { type: String, required: true },
  email: {
    type: String,
    required: true,
    validate: (value: string) => validator.isEmail(value),
    message: '{VALUE} is not a valid  email type',
  },
  contactNo: { type: String, required: true },
  emergencyContactNo: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: {
    type: guardianSchema,
    required: [true, 'guardian name is required'],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [true, 'local guardian name is required'],
  },
  profileImg: String,
  isActive: {
    type: String,
    enum: ['active', 'blocked'],
    default: 'active',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

// Query Middleware

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

// pre save middleware or pre save hook : will work on create() save() and password salting.

studentSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware or pre save hook

studentSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook: we saved our data');
  doc.password = '';
  next();
});

//creating a custom static method

studentSchema.statics.isUserExists = async function (id: string) {
  const existing = await Student.findOne({ id: id });
  return existing;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id: id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
