/** Types generated for queries found in "src/queries/collection.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

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


/** 'GetCollections' parameters type */
export interface IGetCollectionsParams {
  sort: string;
}

/** 'GetCollections' return type */
export interface IGetCollectionsResult {
  collection_id: number;
  collection_name: string;
  user_id: number;
}

/** 'GetCollections' query type */
export interface IGetCollectionsQuery {
  params: IGetCollectionsParams;
  result: IGetCollectionsResult;
}

const getCollectionsIR: any = {"usedParamSet":{"sort":true},"params":[{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":35,"b":40}]}],"statement":"SELECT * FROM COLLECTIONS ORDER BY :sort!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM COLLECTIONS ORDER BY :sort!
 * ```
 */
export const getCollections = new PreparedQuery<IGetCollectionsParams,IGetCollectionsResult>(getCollectionsIR);


