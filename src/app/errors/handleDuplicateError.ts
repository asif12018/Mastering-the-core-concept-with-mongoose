import { TErrorSource, TGenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleDuplicateError = (err: any): TGenericErrorResponse => {
  const match = err.message.match(/{ name: "(.*?)" }/);
  const extracted_msg = match && match[1];
  const errorSource: TErrorSource = [
    {
      path: '',
      message: `${extracted_msg} is already exist`,
    },
  ];
  const statusCode = 400;
  return {
    statusCode,
    message: 'Duplicated data',
    errorSource,
  };
};
