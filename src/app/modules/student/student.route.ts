import express from 'express';
import { StudentControllers } from './student.controller';
import { validateRequest } from '../../middleware/validateRequest';
import { studentValidationSchemasZod } from './student.zodValidation';

const router = express.Router();

// will call controller function
// router.post('/create-student', StudentControllers.createStudent);

router.get('/', StudentControllers.getAllStudents);
router.get('/:studentId', StudentControllers.getSingleStudent);
router.patch(
  '/:studentId',
  validateRequest(studentValidationSchemasZod.updateStudentValidationSchemaZod),
  StudentControllers.updateStudent,
);
router.delete('/:studentId', StudentControllers.deleteStudent);

export const StudentRoutes = router;
