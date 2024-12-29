import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';
const router = express.Router();

router.post(
  '/create-academic-faculty',
  validateRequest(
    academicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.createAcademicFaculty,
);

router.get('/', AcademicFacultyController.getAllAcademicFaculties);

router.get('/:id', AcademicFacultyController.getSingleAcademicFaculty);

router.patch(
  '/:id',
  validateRequest(
    academicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyController.updateAcademicFaculty,
);

export const academicFacultyRoutes = router;
