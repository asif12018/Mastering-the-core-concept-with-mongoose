export type TUser = {
  id: string;
  password: string;
  needsPasswordChange: boolean;
  role: 'admin' | 'student' | 'faculty';
  status: 'blocked' | 'in-progress';
  isDeleted: boolean;
};

// export type NewUser = {
//   password?: string;
//   role: string;
//   id: string;
// };
