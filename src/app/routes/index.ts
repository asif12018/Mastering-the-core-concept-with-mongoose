import express from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { StudentRoutes } from '../modules/student/student.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
const router = express.Router();

const moduleRoute = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
  {
    path: '/academic-semester',
    route: AcademicSemesterRoutes,
  },
];

moduleRoute.forEach((route) => router.use(route.path, route.route));

// router.use('/users', UserRoutes);
// router.use('/students', StudentRoutes);
export default router;
