import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name cannot exceed 20 characters')
    .min(1, 'First name is required')
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, 'Last name is required').trim(),
});

const guardianValidationSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

const localGuardianValidationSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

const createStudentValidationSchemaZod = z.object({
  body: z.object({
    password: z.string().min(1, 'Password is required'),
    student: z.object({
      name: userNameValidationSchema,
      gender: z.enum(['male', 'female', 'other'], {
        errorMap: () => ({
          message: "Gender must be one of 'male', 'female', or 'other'",
        }),
      }),
      dateOfBirth: z
        .string()
        .transform((date) => new Date(date)) // Convert string to Date object
        .refine((date) => !isNaN(date.getTime()), { message: 'Invalid date' }),
      email: z
        .string()
        .email('Invalid email format')
        .min(1, 'Email is required'),
      contactNo: z.string().min(1, 'Contact number is required'),
      emergencyContactNo: z
        .string()
        .min(1, 'Emergency contact number is required'),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string().min(1, 'Present address is required'),
      permanentAddress: z.string().min(1, 'Permanent address is required'),
      guardian: guardianValidationSchema,
      localGuardian: localGuardianValidationSchema,
      profileImg: z.string().optional(),
      admissionSemester: z.string(),
      admissionDepartment: z.string(),
    }),
  }),
});

export const studentValidationSchemasZod = {
  createStudentValidationSchemaZod,
};
