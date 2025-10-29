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
  user_id: number;
}

/** 'DeleteFollowsByUserId' return type */
export type IDeleteFollowsByUserIdResult = void;

/** 'DeleteFollowsByUserId' query type */
export interface IDeleteFollowsByUserIdQuery {
  params: IDeleteFollowsByUserIdParams;
  result: IDeleteFollowsByUserIdResult;
}

const deleteFollowsByUserIdIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":49,"b":57},{"a":67,"b":74}]}],"statement":"DELETE FROM FOLLOWS \nWHERE FOLLOWS.follower_id = :user_id!\n    AND :user_id = FOLLOWS.followee_id"};

/**
 * Query generated from SQL:
 * ```
 * DELETE FROM FOLLOWS 
 * WHERE FOLLOWS.follower_id = :user_id!
 *     AND :user_id = FOLLOWS.followee_id
 * ``` //
 */
export const deleteFollowsByUserId = new PreparedQuery<IDeleteFollowsByUserIdParams,IDeleteFollowsByUserIdResult>(deleteFollowsByUserIdIR);


