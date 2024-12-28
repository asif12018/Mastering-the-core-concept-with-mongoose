import { z } from 'zod';
import {
  AcademicSemesterCodeEnum,
  AcademicSemesterNameEnum,
} from './academicSemester.constant';

const Months = z.enum([
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]);

const SemesterNameEnum = z.enum(['Autumn', 'Summar', 'Fall']);

const SemesterCodeEnum = z.enum(['01', '02', '03']);

const createAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: SemesterNameEnum,
    year: z.string(),
    code: SemesterCodeEnum,
    startMonth: Months,
    endMonth: Months,
  }),
});

const updateAcademicSemesterValidationSchema = z.object({
  body: z.object({
    name: z
      .enum([...AcademicSemesterNameEnum] as [string, ...string[]])
      .optional(),
    year: z.string().optional(),
    code: z
      .enum([...AcademicSemesterCodeEnum] as [string, ...string[]])
      .optional(),
    startMonth: z.enum(Months.options).optional(),
    endMonth: z.enum(Months.options).optional(),
  }),
});

export const AcademicSemesterValidations = {
  createAcademicSemesterValidationSchema,
  updateAcademicSemesterValidationSchema,
};
