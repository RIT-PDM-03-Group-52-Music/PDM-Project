/** Types generated for queries found in "src/queries/profile.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetUsernamebyUserId' parameters type */
export interface IGetUsernamebyUserIdParams {
  user_id: number;
}

/** 'GetUsernamebyUserId' return type */
export interface IGetUsernamebyUserIdResult {
  username: string;
}

/** 'GetUsernamebyUserId' query type */
export interface IGetUsernamebyUserIdQuery {
  params: IGetUsernamebyUserIdParams;
  result: IGetUsernamebyUserIdResult;
}

const getUsernamebyUserIdIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":43,"b":51}]}],"statement":"SELECT username FROM USERS WHERE user_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT username FROM USERS WHERE user_id = :user_id!
 * ```
 */
export const getUsernamebyUserId = new PreparedQuery<IGetUsernamebyUserIdParams,IGetUsernamebyUserIdResult>(getUsernamebyUserIdIR);


/** 'GetCollectionsCountbyUserId' parameters type */
export interface IGetCollectionsCountbyUserIdParams {
  user_id: number;
}

/** 'GetCollectionsCountbyUserId' return type */
export interface IGetCollectionsCountbyUserIdResult {
  collections_count: string | null;
}

/** 'GetCollectionsCountbyUserId' query type */
export interface IGetCollectionsCountbyUserIdQuery {
  params: IGetCollectionsCountbyUserIdParams;
  result: IGetCollectionsCountbyUserIdResult;
}

const getCollectionsCountbyUserIdIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":85,"b":93}]}],"statement":"SELECT COUNT(c.user_id) AS collections_count FROM COLLECTIONS as c WHERE c.user_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(c.user_id) AS collections_count FROM COLLECTIONS as c WHERE c.user_id = :user_id!
 * ```
 */
export const getCollectionsCountbyUserId = new PreparedQuery<IGetCollectionsCountbyUserIdParams,IGetCollectionsCountbyUserIdResult>(getCollectionsCountbyUserIdIR);


/** 'GetFollowersCountbyUserId' parameters type */
export interface IGetFollowersCountbyUserIdParams {
  user_id: number;
}

/** 'GetFollowersCountbyUserId' return type */
export interface IGetFollowersCountbyUserIdResult {
  followers_count: string | null;
}

/** 'GetFollowersCountbyUserId' query type */
export interface IGetFollowersCountbyUserIdQuery {
  params: IGetFollowersCountbyUserIdParams;
  result: IGetFollowersCountbyUserIdResult;
}

const getFollowersCountbyUserIdIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":87,"b":95}]}],"statement":"SELECT COUNT(f.followee_id) AS followers_count FROM FOLLOWS as f WHERE f.follower_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(f.followee_id) AS followers_count FROM FOLLOWS as f WHERE f.follower_id = :user_id!
 * ```
 */
export const getFollowersCountbyUserId = new PreparedQuery<IGetFollowersCountbyUserIdParams,IGetFollowersCountbyUserIdResult>(getFollowersCountbyUserIdIR);


/** 'GetFollowingCountbyUserId' parameters type */
export interface IGetFollowingCountbyUserIdParams {
  user_id: number;
}

/** 'GetFollowingCountbyUserId' return type */
export interface IGetFollowingCountbyUserIdResult {
  following_count: string | null;
}

/** 'GetFollowingCountbyUserId' query type */
export interface IGetFollowingCountbyUserIdQuery {
  params: IGetFollowingCountbyUserIdParams;
  result: IGetFollowingCountbyUserIdResult;
}

const getFollowingCountbyUserIdIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":87,"b":95}]}],"statement":"SELECT COUNT(f.follower_id) as following_count FROM FOLLOWS as f WHERE f.followee_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT COUNT(f.follower_id) as following_count FROM FOLLOWS as f WHERE f.followee_id = :user_id!
 * ```
 */
export const getFollowingCountbyUserId = new PreparedQuery<IGetFollowingCountbyUserIdParams,IGetFollowingCountbyUserIdResult>(getFollowingCountbyUserIdIR);


/** 'GetArtistsbyTop10' parameters type */
export interface IGetArtistsbyTop10Params {
  user_id: number;
}

/** 'GetArtistsbyTop10' return type */
export interface IGetArtistsbyTop10Result {
  artist_id: number;
  artist_name: string;
  listen_count: string | null;
}

/** 'GetArtistsbyTop10' query type */
export interface IGetArtistsbyTop10Query {
  params: IGetArtistsbyTop10Params;
  result: IGetArtistsbyTop10Result;
}

const getArtistsbyTop10IR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":199,"b":207}]}],"statement":"SELECT a.artist_id, a.artist_name, COUNT(*) as listen_count\nFROM listens AS l\nINNER JOIN features AS f ON f.song_id = l.song_id\nINNER JOIN artists AS a ON a.artist_id = f.artist_id\nWHERE l.user_id = :user_id!\nGROUP BY (a.artist_id, a.artist_name)\nORDER BY listen_count DESC\nLIMIT 10"};

/**
 * Query generated from SQL:
 * ```
 * SELECT a.artist_id, a.artist_name, COUNT(*) as listen_count
 * FROM listens AS l
 * INNER JOIN features AS f ON f.song_id = l.song_id
 * INNER JOIN artists AS a ON a.artist_id = f.artist_id
 * WHERE l.user_id = :user_id!
 * GROUP BY (a.artist_id, a.artist_name)
 * ORDER BY listen_count DESC
 * LIMIT 10
 * ```
 */
export const getArtistsbyTop10 = new PreparedQuery<IGetArtistsbyTop10Params,IGetArtistsbyTop10Result>(getArtistsbyTop10IR);


