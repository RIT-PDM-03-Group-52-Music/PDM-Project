/** Types generated for queries found in "src/queries/follows.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetFollowsByFollower' parameters type */
export interface IGetFollowsByFollowerParams {
  user_id: number;
}

/** 'GetFollowsByFollower' return type */
export interface IGetFollowsByFollowerResult {
  email: string;
  followee_id: number;
  username: string;
}

/** 'GetFollowsByFollower' query type */
export interface IGetFollowsByFollowerQuery {
  params: IGetFollowsByFollowerParams;
  result: IGetFollowsByFollowerResult;
}

const getFollowsByFollowerIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":133,"b":141}]}],"statement":"SELECT f.followee_id, u.email, u.username FROM FOLLOWS as f\nINNER JOIN USERS AS u ON u.user_id = f.followee_id\nWHERE f.follower_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT f.followee_id, u.email, u.username FROM FOLLOWS as f
 * INNER JOIN USERS AS u ON u.user_id = f.followee_id
 * WHERE f.follower_id = :user_id!
 * ```
 */
export const getFollowsByFollower = new PreparedQuery<IGetFollowsByFollowerParams,IGetFollowsByFollowerResult>(getFollowsByFollowerIR);


/** 'DeleteFollowsByUserId' parameters type */
export interface IDeleteFollowsByUserIdParams {
  followee_id: number;
  user_id: number;
}

/** 'DeleteFollowsByUserId' return type */
export interface IDeleteFollowsByUserIdResult {
  followee_id: number;
  follower_id: number;
}

/** 'DeleteFollowsByUserId' query type */
export interface IDeleteFollowsByUserIdQuery {
  params: IDeleteFollowsByUserIdParams;
  result: IDeleteFollowsByUserIdResult;
}

const deleteFollowsByUserIdIR: any = {"usedParamSet":{"user_id":true,"followee_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":49,"b":57}]},{"name":"followee_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":89,"b":101}]}],"statement":"DELETE FROM FOLLOWS \nWHERE FOLLOWS.follower_id = :user_id!\n    AND FOLLOWS.followee_id = :followee_id!\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM FOLLOWS 
 * WHERE FOLLOWS.follower_id = :user_id!
 *     AND FOLLOWS.followee_id = :followee_id!
 * RETURNING *
 * ```
 */
export const deleteFollowsByUserId = new PreparedQuery<IDeleteFollowsByUserIdParams,IDeleteFollowsByUserIdResult>(deleteFollowsByUserIdIR);


/** 'PostFollowsByUserId' parameters type */
export interface IPostFollowsByUserIdParams {
  followee_id: number;
  follower_id: number;
}

/** 'PostFollowsByUserId' return type */
export interface IPostFollowsByUserIdResult {
  followee_id: number;
  follower_id: number;
}

/** 'PostFollowsByUserId' query type */
export interface IPostFollowsByUserIdQuery {
  params: IPostFollowsByUserIdParams;
  result: IPostFollowsByUserIdResult;
}

const postFollowsByUserIdIR: any = {"usedParamSet":{"followee_id":true,"follower_id":true},"params":[{"name":"followee_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":53,"b":65}]},{"name":"follower_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":68,"b":80}]}],"statement":"INSERT INTO FOLLOWS(followee_id, follower_id) VALUES(:followee_id!, :follower_id!)\nRETURNING *"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO FOLLOWS(followee_id, follower_id) VALUES(:followee_id!, :follower_id!)
 * RETURNING *
 * ```
 */
export const postFollowsByUserId = new PreparedQuery<IPostFollowsByUserIdParams,IPostFollowsByUserIdResult>(postFollowsByUserIdIR);


