import mongoose, { Schema, model, models, Document } from 'mongoose';
import { IUser } from '@/types';

export interface IUserDocument extends IUser, Document {
  _id: any;
}

const UserSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['creator', 'customer'], default: 'customer' },
  stripeAccountId: { type: String },
  storeName: { type: String },
}, { timestamps: true });

const User = models.User || model<IUserDocument>('User', UserSchema);
export default User;