import catchAsync from '../../utils/catchAsync';
import { AcademicSemesterServices } from './academicSemester.service';

const createAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic semester created successfully',
    data: result,
  });
});

const getAllAcademicSemester = catchAsync(async (req, res) => {
  const result = await AcademicSemesterServices.getAllAcademicSemesterFromDB();
  res.status(200).json({
    success: true,
    message: 'All academic semester fetched successfully',
    data: result,
  });
});

const getSingleAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result =
    await AcademicSemesterServices.getSingleAcademicSemesterFromDB(id);
  res.status(200).json({
    success: true,
    message: 'Academic semester fetched successfully',
    data: result,
  });
});

const updateAcademicSemester = catchAsync(async (req, res) => {
  const id = req.params.id;
  const result = await AcademicSemesterServices.updateAcademicSemesterFromDB(
    id,
    req.body,
  );
  res.status(200).json({
    success: true,
    message: 'Academic semester updated successfully',
    data: result,
  });
});

export const AcademicSemesterController = {
  createAcademicSemester,
  getAllAcademicSemester,
  getSingleAcademicSemester,
  updateAcademicSemester,
};
