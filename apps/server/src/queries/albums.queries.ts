/** Types generated for queries found in "src/queries/albums.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetAlbumsByAlbumName' parameters type */
export interface IGetAlbumsByAlbumNameParams {
  album_name: string;
}

/** 'GetAlbumsByAlbumName' return type */
export interface IGetAlbumsByAlbumNameResult {
  album_id: number;
  album_name: string;
  released_at: Date;
}

/** 'GetAlbumsByAlbumName' query type */
export interface IGetAlbumsByAlbumNameQuery {
  params: IGetAlbumsByAlbumNameParams;
  result: IGetAlbumsByAlbumNameResult;
}

const getAlbumsByAlbumNameIR: any = {"usedParamSet":{"album_name":true},"params":[{"name":"album_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":56,"b":67}]}],"statement":"SELECT * FROM albums\nWHERE album_name ILIKE CONCAT('%', :album_name!::text, '%')\nORDER BY album_name ASC\nLIMIT 10"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM albums
 * WHERE album_name ILIKE CONCAT('%', :album_name!::text, '%')
 * ORDER BY album_name ASC
 * LIMIT 10
 * ```
 */
export const getAlbumsByAlbumName = new PreparedQuery<IGetAlbumsByAlbumNameParams,IGetAlbumsByAlbumNameResult>(getAlbumsByAlbumNameIR);


