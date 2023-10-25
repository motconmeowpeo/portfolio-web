export interface IUser {
  id: string;
  username: string;
  email: string;
  active: boolean;
}

export interface ILogin {
  email: string;
  password: string;
}
