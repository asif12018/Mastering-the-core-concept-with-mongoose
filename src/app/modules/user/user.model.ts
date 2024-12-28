import { model, Schema } from 'mongoose';
import { TUser } from './user.interface';
import config from '../../config';
import bcrypt from 'bcrypt';
const userSchema = new Schema<TUser>(
  {
    id: { type: String, require: true },
    password: { type: String, require: true },
    needsPasswordChange: { type: Boolean, default: true },
    role: { type: String, enum: ['admin', 'student', 'faculty'] },
    status: {
      type: String,
      enum: ['blocked', 'in-progress'],
      default: 'in-progress',
    },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true },
);

// pre save middleware or pre save hook : will work on create() save() and password salting.

userSchema.pre('save', async function (next) {
  // console.log(this, 'pre hook: we will save the data');
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  // hashing password and save into DB
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// post save middleware or pre save hook

userSchema.post('save', function (doc, next) {
  // console.log(this, 'post hook: we saved our data');
  doc.password = '';
  next();
});

export const User = model<TUser>('User', userSchema);
