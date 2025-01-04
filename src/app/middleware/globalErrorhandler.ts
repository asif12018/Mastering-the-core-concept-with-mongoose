/* eslint-disable @typescript-eslint/no-unused-vars */
import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from 'express';
import { ZodError, ZodIssue } from 'zod';
import { TErrorSource } from '../interface/error';
import config from '../config';
export const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  //setting default values;
  let statusCode = err.statusCode ? err.statusCode : 500; // Use err.statusCode if provided
  let message = err.message || 'Something went wrong';
  let errorSource: TErrorSource = [
    {
      path: '',
      message: "Something went's wrong",
    },
  ];
  const handleZodError = (err: ZodError) => {
    const statusCode = 400;
    const errorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue.message,
      };
    });
    return {
      statusCode,
      message: 'Validation error',
      errorSource,
    };
  };
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSource = simplifiedError?.errorSource;
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorSource,
    stack: config.node_env === 'development' ? err.stack : '',
  });
};
