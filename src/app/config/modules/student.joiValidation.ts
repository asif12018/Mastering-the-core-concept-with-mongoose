import Joi from 'joi';

const userNameSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .max(20)
    .required()
    .pattern(/^[A-Z][a-z]*$/)
    .messages({
      'string.empty': 'first name is required',
      'string.max': 'first name cannot be more than 20 characters',
      'string.pattern.base': '{#value} is not capitalized format',
    }),
  middleName: Joi.string().trim().optional(),
  lastName: Joi.string()
    .trim()
    .required()
    .pattern(/^[a-zA-Z]+$/)
    .messages({
      'string.empty': 'last name is required',
      'string.pattern.base': '{#value} is not valid',
    }),
});

// Guardian Schema
const guardianSchema = Joi.object({
  fatherName: Joi.string().trim().required(),
  fatherOccupation: Joi.string().trim().required(),
  fatherContactNo: Joi.string().trim().required(),
  motherName: Joi.string().trim().required(),
  motherOccupation: Joi.string().trim().required(),
  motherContactNo: Joi.string().trim().required(),
});

// Local Guardian Schema
const localGuardianSchema = Joi.object({
  name: Joi.string().trim().required(),
  occupation: Joi.string().trim().required(),
  contactNo: Joi.string().trim().required(),
  address: Joi.string().trim().required(),
});

// Student Schema
const studentValidationSchema = Joi.object({
  id: Joi.string().trim().required(),
  name: userNameSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'The gender you input {#value} is not supported.',
  }),
  dateOfBirth: Joi.string().trim().required(),
  email: Joi.string().trim().email().required().messages({
    'string.email': '{#value} is not a valid email',
  }),
  contactNo: Joi.string().trim().required(),
  emergencyContactNo: Joi.string().trim().required(),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-')
    .optional(),
  presentAddress: Joi.string().trim().required(),
  permanentAddress: Joi.string().trim().required(),
  guardian: guardianSchema.required().messages({
    'any.required': 'guardian name is required',
  }),
  localGuardian: localGuardianSchema.required().messages({
    'any.required': 'local guardian name is required',
  }),
  profileImg: Joi.string().trim().uri().optional(),
  isActive: Joi.string().valid('active', 'blocked').default('active'),
});

export default studentValidationSchema;
