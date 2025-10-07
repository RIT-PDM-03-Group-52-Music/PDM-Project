/** Types generated for queries found in "src/queries/user.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'RegisterUser' parameters type */
export interface IRegisterUserParams {
  email: string;
  first_name: string;
  last_name: string;
  now: DateOrString;
  password: string;
  username: string;
}

/** 'RegisterUser' return type */
export interface IRegisterUserResult {
  created_at: Date;
  email: string;
  first_name: string;
  last_name: string;
  last_seen: Date;
  user_id: number;
  username: string;
}

/** 'RegisterUser' query type */
export interface IRegisterUserQuery {
  params: IRegisterUserParams;
  result: IRegisterUserResult;
}

const registerUserIR: any = {"usedParamSet":{"username":true,"password":true,"email":true,"first_name":true,"last_name":true,"now":true},"params":[{"name":"username","required":true,"transform":{"type":"scalar"},"locs":[{"a":100,"b":109}]},{"name":"password","required":true,"transform":{"type":"scalar"},"locs":[{"a":112,"b":121}]},{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":124,"b":130}]},{"name":"first_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":133,"b":144}]},{"name":"last_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":147,"b":157}]},{"name":"now","required":true,"transform":{"type":"scalar"},"locs":[{"a":160,"b":164},{"a":167,"b":171}]}],"statement":"INSERT INTO USERS (username, password, email, first_name, last_name, created_at, last_seen)\nVALUES (:username!, :password!, :email!, :first_name!, :last_name!, :now!, :now!)\nON CONFLICT DO NOTHING\nRETURNING username, user_id, email, first_name, last_name, created_at, last_seen"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO USERS (username, password, email, first_name, last_name, created_at, last_seen)
 * VALUES (:username!, :password!, :email!, :first_name!, :last_name!, :now!, :now!)
 * ON CONFLICT DO NOTHING
 * RETURNING username, user_id, email, first_name, last_name, created_at, last_seen
 * ```
 */
export const registerUser = new PreparedQuery<IRegisterUserParams,IRegisterUserResult>(registerUserIR);


/** 'GetUserById' parameters type */
export interface IGetUserByIdParams {
  user_id: number;
}

/** 'GetUserById' return type */
export interface IGetUserByIdResult {
  created_at: Date;
  email: string;
  first_name: string;
  last_name: string;
  last_seen: Date;
  password: string;
  user_id: number;
  username: string;
}

/** 'GetUserById' query type */
export interface IGetUserByIdQuery {
  params: IGetUserByIdParams;
  result: IGetUserByIdResult;
}

const getUserByIdIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":36,"b":44}]}],"statement":"SELECT * FROM USERS WHERE user_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM USERS WHERE user_id = :user_id!
 * ```
 */
export const getUserById = new PreparedQuery<IGetUserByIdParams,IGetUserByIdResult>(getUserByIdIR);


/** 'GetUserByUsername' parameters type */
export interface IGetUserByUsernameParams {
  username: string;
}

/** 'GetUserByUsername' return type */
export interface IGetUserByUsernameResult {
  created_at: Date;
  email: string;
  first_name: string;
  last_name: string;
  last_seen: Date;
  password: string;
  user_id: number;
  username: string;
}

/** 'GetUserByUsername' query type */
export interface IGetUserByUsernameQuery {
  params: IGetUserByUsernameParams;
  result: IGetUserByUsernameResult;
}

const getUserByUsernameIR: any = {"usedParamSet":{"username":true},"params":[{"name":"username","required":true,"transform":{"type":"scalar"},"locs":[{"a":37,"b":46}]}],"statement":"SELECT * FROM USERS WHERE username = :username!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM USERS WHERE username = :username!
 * ```
 */
export const getUserByUsername = new PreparedQuery<IGetUserByUsernameParams,IGetUserByUsernameResult>(getUserByUsernameIR);


/** 'GetUserByEmail' parameters type */
export interface IGetUserByEmailParams {
  email: string;
}

/** 'GetUserByEmail' return type */
export interface IGetUserByEmailResult {
  created_at: Date;
  email: string;
  first_name: string;
  last_name: string;
  last_seen: Date;
  password: string;
  user_id: number;
  username: string;
}

/** 'GetUserByEmail' query type */
export interface IGetUserByEmailQuery {
  params: IGetUserByEmailParams;
  result: IGetUserByEmailResult;
}

const getUserByEmailIR: any = {"usedParamSet":{"email":true},"params":[{"name":"email","required":true,"transform":{"type":"scalar"},"locs":[{"a":34,"b":40}]}],"statement":"SELECT * FROM USERS WHERE email = :email!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM USERS WHERE email = :email!
 * ```
 */
export const getUserByEmail = new PreparedQuery<IGetUserByEmailParams,IGetUserByEmailResult>(getUserByEmailIR);


/** 'LoginUser' parameters type */
export interface ILoginUserParams {
  now: DateOrString;
  user_id: number;
}

/** 'LoginUser' return type */
export type ILoginUserResult = void;

/** 'LoginUser' query type */
export interface ILoginUserQuery {
  params: ILoginUserParams;
  result: ILoginUserResult;
}

const loginUserIR: any = {"usedParamSet":{"now":true,"user_id":true},"params":[{"name":"now","required":true,"transform":{"type":"scalar"},"locs":[{"a":29,"b":33}]},{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":51,"b":59}]}],"statement":"UPDATE USERS SET last_seen = :now! WHERE user_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE USERS SET last_seen = :now! WHERE user_id = :user_id!
 * ```
 */
export const loginUser = new PreparedQuery<ILoginUserParams,ILoginUserResult>(loginUserIR);


