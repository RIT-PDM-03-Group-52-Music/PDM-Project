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


/** 'ListenByCollectionId' parameters type */
export interface IListenByCollectionIdParams {
  collection_id: number;
  listened_at: DateOrString;
  user_id: number;
}

/** 'ListenByCollectionId' return type */
export interface IListenByCollectionIdResult {
  listened_at: Date;
  song_id: number;
  user_id: number;
}

/** 'ListenByCollectionId' query type */
export interface IListenByCollectionIdQuery {
  params: IListenByCollectionIdParams;
  result: IListenByCollectionIdResult;
}

const listenByCollectionIdIR: any = {"usedParamSet":{"listened_at":true,"user_id":true,"collection_id":true},"params":[{"name":"listened_at","required":true,"transform":{"type":"scalar"},"locs":[{"a":76,"b":88}]},{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":91,"b":99},{"a":271,"b":279}]},{"name":"collection_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":235,"b":249}]}],"statement":"INSERT INTO LISTENS (song_id, listened_at, user_id) \n    SELECT ci.song_id, :listened_at!, :user_id! \n    FROM collectionitems AS ci\n    INNER JOIN collections as c\n    ON ci.collection_id = c.collection_id\n    WHERE c.collection_id = :collection_id!\n    AND c.user_id = :user_id!\nRETURNING song_id, listened_at, user_id"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO LISTENS (song_id, listened_at, user_id) 
 *     SELECT ci.song_id, :listened_at!, :user_id! 
 *     FROM collectionitems AS ci
 *     INNER JOIN collections as c
 *     ON ci.collection_id = c.collection_id
 *     WHERE c.collection_id = :collection_id!
 *     AND c.user_id = :user_id!
 * RETURNING song_id, listened_at, user_id
 * ```
 */
export const listenByCollectionId = new PreparedQuery<IListenByCollectionIdParams,IListenByCollectionIdResult>(listenByCollectionIdIR);


