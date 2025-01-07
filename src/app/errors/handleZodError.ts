import { ZodError, ZodIssue } from 'zod';

export const handleZodError = (err: ZodError) => {
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
