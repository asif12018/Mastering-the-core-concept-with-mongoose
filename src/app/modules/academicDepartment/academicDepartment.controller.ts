import catchAsync from '../../utils/catchAsync';
import { academicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.createAcademicDepartmentIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentService.getAllAcademicDepartmentsFromDB();
  res.status(200).json({
    success: true,
    message: 'All Academic Departments fetched successfully',
    data: result,
  });
});

const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await academicDepartmentService.getSingleAcademicDepartmentFromDB(
      req.params.id,
    );
  res.status(200).json({
    success: true,
    message: 'Academic Department fetched successfully',
    data: result,
  });
});

const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.updateAcademicDepartmentIntoDB(
    req.params.id,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic Department updated successfully',
    data: result,
  });
});

export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
