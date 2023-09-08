import { MongoDocument } from "./mongoDocument.type";

export interface User extends MongoDocument {
  username?: string;
  email?: string;
  firstName: string;
  lastName: string;
  gender?: string;
  image?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IAccessData {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user?: User
}

export interface IUserToken {
	email: string;
	name: string;
	exp?: number;
}