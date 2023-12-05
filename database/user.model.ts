import { Schema, models, model, Document, Types } from 'mongoose'

export interface IUser extends Document {
  _id: Types.ObjectId;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  bio?: string;
  picture: string;
  location?: string;
  portfolioWebsite?: string;
  reputation?: number;
  saved: Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  _id: {
    type: Schema.Types.ObjectId,
  },
  clerkId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: false,
  },
  bio: {
    type: String,
    required: false,
  },
  picture: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: false,
  },
  portfolioWebsite: {
    type: String,
    required: false,
  },
  reputation: {
    type: Number,
    default: 0
  },
  saved: [{
    type: Schema.Types.ObjectId,
    ref: 'Questions',
  }],
  joinedAt: {
    type: Date,
    required: true,
    default: Date.now,
  }
});

const User = models.User<IUser> || model<IUser>('User', UserSchema)

export default User
