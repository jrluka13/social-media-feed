export interface IUser {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  phone?: number;

  friends?: IUser[];
}
