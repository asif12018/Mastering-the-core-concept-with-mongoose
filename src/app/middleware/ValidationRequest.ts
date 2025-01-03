import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { AnyZodObject } from 'zod';

export const academicSemesterValidateRequest = (schema: AnyZodObject) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    await schema.parseAsync({
      body: req.body,
    });
    next();
  });
};
