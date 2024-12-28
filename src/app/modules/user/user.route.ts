import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidationSchemasZod } from '../student/student.zodValidation';
import { validateRequest } from '../../middleware/validateRequest';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(studentValidationSchemasZod.createStudentValidationSchemaZod),
  UserControllers.createStudent,
);

export const UserRoutes = router;
