import { IUser } from './user.model';

export interface IPost {
  id: string;
  _id: string;
  title: string;
  description: string;
  images?: string[];
  createAt: string;
  createBy: IUser;
  isActive: boolean;
}

export interface ICreatePostCommand {
  title: string;
  description: string;
  images: string[];
  createBy: string;
}

export interface IUpdatePostCommand {
  id: string;
  title: string;
  description: string;
  images: string[];
}
