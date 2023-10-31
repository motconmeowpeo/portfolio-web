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

export interface IAuth extends IToken {
  user: IUser | null;
}

export interface IToken {
  accessToken: string | null;
}
