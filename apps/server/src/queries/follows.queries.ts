/** Types generated for queries found in "src/queries/follows.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetFollowsByFollower' parameters type */
export interface IGetFollowsByFollowerParams {
  user_id: number;
}

/** 'GetFollowsByFollower' return type */
export interface IGetFollowsByFollowerResult {
  followee_id: number;
  follower_id: number;
}

/** 'GetFollowsByFollower' query type */
export interface IGetFollowsByFollowerQuery {
  params: IGetFollowsByFollowerParams;
  result: IGetFollowsByFollowerResult;
}

const getFollowsByFollowerIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":42,"b":50}]}],"statement":"SELECT * FROM FOLLOWS WHERE follower_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM FOLLOWS WHERE follower_id = :user_id!
 * ```
 */
export const getFollowsByFollower = new PreparedQuery<IGetFollowsByFollowerParams,IGetFollowsByFollowerResult>(getFollowsByFollowerIR);


