import { IComment } from './comment.interface';

export interface IPost {
  id?: string;
  userId?: string;
  author?: string;
  content?: string;
  createdDate?: Date;
  likes?: string[];
  comments?: IComment[];
}
