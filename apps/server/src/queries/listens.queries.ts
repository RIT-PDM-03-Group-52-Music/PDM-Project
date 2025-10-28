/** Types generated for queries found in "src/queries/listens.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'CreateListen' parameters type */
export interface ICreateListenParams {
  listened_at: DateOrString;
  song_id: number;
  user_id: number;
}

/** 'CreateListen' return type */
export interface ICreateListenResult {
  listened_at: Date;
  song_id: number;
  user_id: number;
}

/** 'CreateListen' query type */
export interface ICreateListenQuery {
  params: ICreateListenParams;
  result: ICreateListenResult;
}

const createListenIR: any = {"usedParamSet":{"song_id":true,"listened_at":true,"user_id":true},"params":[{"name":"song_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":60,"b":68}]},{"name":"listened_at","required":true,"transform":{"type":"scalar"},"locs":[{"a":71,"b":83}]},{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":86,"b":94}]}],"statement":"INSERT INTO LISTENS (song_id, listened_at, user_id) VALUES (:song_id!, :listened_at!, :user_id!)\nRETURNING song_id, listened_at, user_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO LISTENS (song_id, listened_at, user_id) VALUES (:song_id!, :listened_at!, :user_id!)
 * RETURNING song_id, listened_at, user_id
 * ```
 */
export const createListen = new PreparedQuery<ICreateListenParams,ICreateListenResult>(createListenIR);


