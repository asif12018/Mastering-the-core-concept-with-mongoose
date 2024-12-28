import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
// import { StudentRoutes } from './app/modules/student/student.route';
// import { UserRoutes } from './app/modules/user/user.route';
import { globalErrorHandler } from './app/middleware/globalErrorhandler';
import { notFound } from './app/middleware/notFoundRoute';
const app: Application = express();

app.use(express.json());
app.use(cors());

//application routes

app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  const a = 10;
  res.send(a);
});

//global error handling

app.use(globalErrorHandler);

//not found route
app.use(notFound);
export default app;
