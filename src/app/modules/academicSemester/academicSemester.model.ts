import { model, Schema } from 'mongoose';
import { TAcademicSemester } from './academicSemester.interface';
import {
  AcademicSemesterCodeEnum,
  AcademicSemesterNameEnum,
  MonthEnum,
} from './academicSemester.constant';

const academicSemesterSechema = new Schema<TAcademicSemester>(
  {
    name: { type: String, enum: AcademicSemesterNameEnum, required: true },
    year: { type: String, required: true },
    code: { type: String, enum: AcademicSemesterCodeEnum, required: true },
    startMonth: { type: String, enum: MonthEnum, required: true },
    endMonth: { type: String, enum: MonthEnum, required: true },
  },
  {
    timestamps: true,
  },
);

academicSemesterSechema.pre<TAcademicSemester>('save', async function (next) {
  const isSemesterExists = await AcademicSemester.findOne({
    name: this.name,
    year: this.year,
  });
  if (isSemesterExists) {
    throw new Error('semester already exist');
  }
  next();
});

export const AcademicSemester = model<TAcademicSemester>(
  'AcademicSemester',
  academicSemesterSechema,
);
