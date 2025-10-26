/** Types generated for queries found in "src/queries/collection.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type DateOrString = Date | string;

/** 'GetCollectionById' parameters type */
export interface IGetCollectionByIdParams {
  collection_id: number;
}

/** 'GetCollectionById' return type */
export interface IGetCollectionByIdResult {
  collection_id: number;
  collection_name: string;
  user_id: number;
}

/** 'GetCollectionById' query type */
export interface IGetCollectionByIdQuery {
  params: IGetCollectionByIdParams;
  result: IGetCollectionByIdResult;
}

const getCollectionByIdIR: any = {"usedParamSet":{"collection_id":true},"params":[{"name":"collection_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":48,"b":62}]}],"statement":"SELECT * FROM COLLECTIONS WHERE collection_id = :collection_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM COLLECTIONS WHERE collection_id = :collection_id!
 * ```
 */
export const getCollectionById = new PreparedQuery<IGetCollectionByIdParams,IGetCollectionByIdResult>(getCollectionByIdIR);


/** 'GetCollectionsByCollectionNameAsc' parameters type */
export interface IGetCollectionsByCollectionNameAscParams {
  page: number;
  page_size: number;
  user_id: number;
}

/** 'GetCollectionsByCollectionNameAsc' return type */
export interface IGetCollectionsByCollectionNameAscResult {
  collection_id: number;
  collection_name: string;
  user_id: number;
}

/** 'GetCollectionsByCollectionNameAsc' query type */
export interface IGetCollectionsByCollectionNameAscQuery {
  params: IGetCollectionsByCollectionNameAscParams;
  result: IGetCollectionsByCollectionNameAscResult;
}

const getCollectionsByCollectionNameAscIR: any = {"usedParamSet":{"user_id":true,"page_size":true,"page":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":43,"b":51}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":89,"b":99},{"a":130,"b":140}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":117,"b":122}]}],"statement":"SELECT * FROM COLLECTIONS WHERE (user_id = :user_id!) ORDER BY collection_name ASC LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM COLLECTIONS WHERE (user_id = :user_id!) ORDER BY collection_name ASC LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getCollectionsByCollectionNameAsc = new PreparedQuery<IGetCollectionsByCollectionNameAscParams,IGetCollectionsByCollectionNameAscResult>(getCollectionsByCollectionNameAscIR);


/** 'GetCollectionsByCollectionNameDesc' parameters type */
export interface IGetCollectionsByCollectionNameDescParams {
  page: number;
  page_size: number;
  user_id: number;
}

/** 'GetCollectionsByCollectionNameDesc' return type */
export interface IGetCollectionsByCollectionNameDescResult {
  collection_id: number;
  collection_name: string;
  user_id: number;
}

/** 'GetCollectionsByCollectionNameDesc' query type */
export interface IGetCollectionsByCollectionNameDescQuery {
  params: IGetCollectionsByCollectionNameDescParams;
  result: IGetCollectionsByCollectionNameDescResult;
}

const getCollectionsByCollectionNameDescIR: any = {"usedParamSet":{"user_id":true,"page_size":true,"page":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":43,"b":51}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":90,"b":100},{"a":131,"b":141}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":118,"b":123}]}],"statement":"SELECT * FROM COLLECTIONS WHERE (user_id = :user_id!) ORDER BY collection_name DESC LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM COLLECTIONS WHERE (user_id = :user_id!) ORDER BY collection_name DESC LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getCollectionsByCollectionNameDesc = new PreparedQuery<IGetCollectionsByCollectionNameDescParams,IGetCollectionsByCollectionNameDescResult>(getCollectionsByCollectionNameDescIR);


/** 'GetCollectionsBySongCountAsc' parameters type */
export interface IGetCollectionsBySongCountAscParams {
  page: number;
  page_size: number;
  user_id: number;
}

/** 'GetCollectionsBySongCountAsc' return type */
export interface IGetCollectionsBySongCountAscResult {
  collection_id: number;
  collection_name: string;
  song_count: string | null;
  user_id: number;
}

/** 'GetCollectionsBySongCountAsc' query type */
export interface IGetCollectionsBySongCountAscQuery {
  params: IGetCollectionsBySongCountAscParams;
  result: IGetCollectionsBySongCountAscResult;
}

const getCollectionsBySongCountAscIR: any = {"usedParamSet":{"user_id":true,"page_size":true,"page":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":206,"b":214}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":247,"b":257},{"a":288,"b":298}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":275,"b":280}]}],"statement":"SELECT C.collection_id, C.user_id, C.collection_name, (\n    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    \n) AS song_count FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY song_count ASC \nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT C.collection_id, C.user_id, C.collection_name, (
 *     SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
 * ) AS song_count FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY song_count ASC 
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getCollectionsBySongCountAsc = new PreparedQuery<IGetCollectionsBySongCountAscParams,IGetCollectionsBySongCountAscResult>(getCollectionsBySongCountAscIR);


/** 'GetCollectionsBySongCountDesc' parameters type */
export interface IGetCollectionsBySongCountDescParams {
  page: number;
  page_size: number;
  user_id: number;
}

/** 'GetCollectionsBySongCountDesc' return type */
export interface IGetCollectionsBySongCountDescResult {
  collection_id: number;
  collection_name: string;
  song_count: string | null;
  user_id: number;
}

/** 'GetCollectionsBySongCountDesc' query type */
export interface IGetCollectionsBySongCountDescQuery {
  params: IGetCollectionsBySongCountDescParams;
  result: IGetCollectionsBySongCountDescResult;
}

const getCollectionsBySongCountDescIR: any = {"usedParamSet":{"user_id":true,"page_size":true,"page":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":206,"b":214}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":247,"b":257},{"a":288,"b":298}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":275,"b":280}]}],"statement":"SELECT C.collection_id, C.user_id, C.collection_name, (\n    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    \n) AS song_count FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY song_count DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT C.collection_id, C.user_id, C.collection_name, (
 *     SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
 * ) AS song_count FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY song_count DESC
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getCollectionsBySongCountDesc = new PreparedQuery<IGetCollectionsBySongCountDescParams,IGetCollectionsBySongCountDescResult>(getCollectionsBySongCountDescIR);


/** 'GetCollectionsByTotalLengthAsc' parameters type */
export interface IGetCollectionsByTotalLengthAscParams {
  page: number;
  page_size: number;
  user_id: number;
}

/** 'GetCollectionsByTotalLengthAsc' return type */
export interface IGetCollectionsByTotalLengthAscResult {
  collection_id: number;
  collection_name: string;
  total_length: string | null;
  user_id: number;
}

/** 'GetCollectionsByTotalLengthAsc' query type */
export interface IGetCollectionsByTotalLengthAscQuery {
  params: IGetCollectionsByTotalLengthAscParams;
  result: IGetCollectionsByTotalLengthAscResult;
}

const getCollectionsByTotalLengthAscIR: any = {"usedParamSet":{"user_id":true,"page_size":true,"page":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":269,"b":277}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":311,"b":321},{"a":352,"b":362}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":339,"b":344}]}],"statement":"SELECT C.collection_id, C.user_id, C.collection_name, (\n    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S \n    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)\n) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY total_length ASC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT C.collection_id, C.user_id, C.collection_name, (
 *     SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
 *     ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
 * ) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY total_length ASC
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getCollectionsByTotalLengthAsc = new PreparedQuery<IGetCollectionsByTotalLengthAscParams,IGetCollectionsByTotalLengthAscResult>(getCollectionsByTotalLengthAscIR);


/** 'GetCollectionsByTotalLengthDesc' parameters type */
export interface IGetCollectionsByTotalLengthDescParams {
  page: number;
  page_size: number;
  user_id: number;
}

/** 'GetCollectionsByTotalLengthDesc' return type */
export interface IGetCollectionsByTotalLengthDescResult {
  collection_id: number;
  collection_name: string;
  total_length: string | null;
  user_id: number;
}

/** 'GetCollectionsByTotalLengthDesc' query type */
export interface IGetCollectionsByTotalLengthDescQuery {
  params: IGetCollectionsByTotalLengthDescParams;
  result: IGetCollectionsByTotalLengthDescResult;
}

const getCollectionsByTotalLengthDescIR: any = {"usedParamSet":{"user_id":true,"page_size":true,"page":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":269,"b":277}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":312,"b":322},{"a":353,"b":363}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":340,"b":345}]}],"statement":"SELECT C.collection_id, C.user_id, C.collection_name, (\n    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S \n    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)\n) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY total_length DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT C.collection_id, C.user_id, C.collection_name, (
 *     SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
 *     ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
 * ) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY total_length DESC
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getCollectionsByTotalLengthDesc = new PreparedQuery<IGetCollectionsByTotalLengthDescParams,IGetCollectionsByTotalLengthDescResult>(getCollectionsByTotalLengthDescIR);


/** 'InsertCollectionByCollectionName' parameters type */
export interface IInsertCollectionByCollectionNameParams {
  collection_name: string;
  user_id: number;
}

/** 'InsertCollectionByCollectionName' return type */
export interface IInsertCollectionByCollectionNameResult {
  collection_id: number;
  collection_name: string;
}

/** 'InsertCollectionByCollectionName' query type */
export interface IInsertCollectionByCollectionNameQuery {
  params: IInsertCollectionByCollectionNameParams;
  result: IInsertCollectionByCollectionNameResult;
}

const insertCollectionByCollectionNameIR: any = {"usedParamSet":{"user_id":true,"collection_name":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":59,"b":67}]},{"name":"collection_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":70,"b":86}]}],"statement":"INSERT INTO COLLECTIONS (user_id, collection_name) VALUES (:user_id!, :collection_name!)\nRETURNING collection_id, collection_name"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO COLLECTIONS (user_id, collection_name) VALUES (:user_id!, :collection_name!)
 * RETURNING collection_id, collection_name
 * ```
 */
export const insertCollectionByCollectionName = new PreparedQuery<IInsertCollectionByCollectionNameParams,IInsertCollectionByCollectionNameResult>(insertCollectionByCollectionNameIR);


/** 'UpdateCollectionByCollectionName' parameters type */
export interface IUpdateCollectionByCollectionNameParams {
  collection_id: number;
  collection_name: string;
  user_id: number;
}

/** 'UpdateCollectionByCollectionName' return type */
export interface IUpdateCollectionByCollectionNameResult {
  collection_id: number;
  collection_name: string;
}

/** 'UpdateCollectionByCollectionName' query type */
export interface IUpdateCollectionByCollectionNameQuery {
  params: IUpdateCollectionByCollectionNameParams;
  result: IUpdateCollectionByCollectionNameResult;
}

const updateCollectionByCollectionNameIR: any = {"usedParamSet":{"collection_name":true,"collection_id":true,"user_id":true},"params":[{"name":"collection_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":41,"b":57}]},{"name":"collection_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":81,"b":95}]},{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":111,"b":119}]}],"statement":"UPDATE COLLECTIONS SET collection_name = :collection_name! WHERE collection_id = :collection_id! AND user_id = :user_id!\nRETURNING collection_id, collection_name"};

/**
 * Query generated from SQL:
 * ```
 * UPDATE COLLECTIONS SET collection_name = :collection_name! WHERE collection_id = :collection_id! AND user_id = :user_id!
 * RETURNING collection_id, collection_name
 * ```
 */
export const updateCollectionByCollectionName = new PreparedQuery<IUpdateCollectionByCollectionNameParams,IUpdateCollectionByCollectionNameResult>(updateCollectionByCollectionNameIR);


/** 'InsertCollectionItemBySongId' parameters type */
export interface IInsertCollectionItemBySongIdParams {
  added_at: DateOrString;
  collection_id: number;
  song_id: number;
}

/** 'InsertCollectionItemBySongId' return type */
export interface IInsertCollectionItemBySongIdResult {
  added_at: Date;
  collection_id: number;
  song_id: number;
}

/** 'InsertCollectionItemBySongId' query type */
export interface IInsertCollectionItemBySongIdQuery {
  params: IInsertCollectionItemBySongIdParams;
  result: IInsertCollectionItemBySongIdResult;
}

const insertCollectionItemBySongIdIR: any = {"usedParamSet":{"collection_id":true,"song_id":true,"added_at":true},"params":[{"name":"collection_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":71,"b":85}]},{"name":"song_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":88,"b":96}]},{"name":"added_at","required":true,"transform":{"type":"scalar"},"locs":[{"a":99,"b":108}]}],"statement":"INSERT INTO COLLECTIONITEMS (collection_id, song_id, added_at) VALUES (:collection_id!, :song_id!, :added_at!)\nON CONFLICT (collection_id, song_id) DO NOTHING\nRETURNING collection_id, song_id, added_at"};

/**
 * Query generated from SQL:
 * ```
 * INSERT INTO COLLECTIONITEMS (collection_id, song_id, added_at) VALUES (:collection_id!, :song_id!, :added_at!)
 * ON CONFLICT (collection_id, song_id) DO NOTHING
 * RETURNING collection_id, song_id, added_at
 * ```
 */
export const insertCollectionItemBySongId = new PreparedQuery<IInsertCollectionItemBySongIdParams,IInsertCollectionItemBySongIdResult>(insertCollectionItemBySongIdIR);


/** 'GetCollectionItem' parameters type */
export interface IGetCollectionItemParams {
  collection_id: number;
  song_id: number;
  user_id: number;
}

/** 'GetCollectionItem' return type */
export interface IGetCollectionItemResult {
  added_at: Date;
  collection_id: number;
  song_id: number;
}

/** 'GetCollectionItem' query type */
export interface IGetCollectionItemQuery {
  params: IGetCollectionItemParams;
  result: IGetCollectionItemResult;
}

const getCollectionItemIR: any = {"usedParamSet":{"collection_id":true,"song_id":true,"user_id":true},"params":[{"name":"collection_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":133,"b":147}]},{"name":"song_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":166,"b":174}]},{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":192,"b":200}]}],"statement":"SELECT CI.* FROM COLLECTIONITEMS AS CI INNER JOIN COLLECTIONS AS C ON \n(C.collection_id = CI.collection_id) WHERE CI.collection_id = :collection_id! AND CI.song_id = :song_id! AND C.user_id = :user_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT CI.* FROM COLLECTIONITEMS AS CI INNER JOIN COLLECTIONS AS C ON 
 * (C.collection_id = CI.collection_id) WHERE CI.collection_id = :collection_id! AND CI.song_id = :song_id! AND C.user_id = :user_id!
 * ```
 */
export const getCollectionItem = new PreparedQuery<IGetCollectionItemParams,IGetCollectionItemResult>(getCollectionItemIR);


