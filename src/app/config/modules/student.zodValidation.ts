import { z } from 'zod';

const userNameSchema = z.object({
  firstName: z
    .string()
    .max(20, 'First Name cannot exceed 20 characters')
    .min(1, 'First name is required')
    .trim(),
  middleName: z.string().trim().optional(),
  lastName: z.string().min(1, 'Last name is required').trim(),
});

const guardianSchema = z.object({
  fatherName: z.string().min(1, "Father's name is required"),
  fatherOccupation: z.string().min(1, "Father's occupation is required"),
  fatherContactNo: z.string().min(1, "Father's contact number is required"),
  motherName: z.string().min(1, "Mother's name is required"),
  motherOccupation: z.string().min(1, "Mother's occupation is required"),
  motherContactNo: z.string().min(1, "Mother's contact number is required"),
});

const localGuardianSchema = z.object({
  name: z.string().min(1, "Local guardian's name is required"),
  occupation: z.string().min(1, "Local guardian's occupation is required"),
  contactNo: z.string().min(1, "Local guardian's contact number is required"),
  address: z.string().min(1, "Local guardian's address is required"),
});

const studentValidationSchemaZod = z.object({
  id: z.string().min(1, 'ID is required'),
  password: z.string().min(1, 'Password is required'),
  name: userNameSchema,
  gender: z.enum(['male', 'female', 'other'], {
    errorMap: () => ({
      message: "Gender must be one of 'male', 'female', or 'other'",
    }),
  }),
  dateOfBirth: z.string().min(1, 'Date of Birth is required'),
  email: z.string().email('Invalid email format').min(1, 'Email is required'),
  contactNo: z.string().min(1, 'Contact number is required'),
  emergencyContactNo: z.string().min(1, 'Emergency contact number is required'),
  bloodGroup: z
    .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
    .optional(),
  presentAddress: z.string().min(1, 'Present address is required'),
  permanentAddress: z.string().min(1, 'Permanent address is required'),
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'blocked']).optional().default('active'),
  isDeleted: z.boolean(),
});

export default studentValidationSchemaZod;
