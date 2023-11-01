import { IUser } from './user.model';

export interface IPost {
  id: string;
  _id: string;
  title: string;
  description: string;
  images?: string[];
  createAt: string;
  createBy: IUser;
}

export interface IPostCommand {
  title: string;
  description: string;
  images: string[];
  createBy: string;
}
