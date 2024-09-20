import {Model} from 'mongoose';

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

export interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

export type UserModel = Model<UserFields, {}, UserMethods>

export interface PostFields {
  user: string;
  title: string;
  datetime: string;
  description: string | null;
  image: string | null;
}


export interface CommentFields {
  user: string;
  post: string;
  content: string;
  createdAt: Date;
}