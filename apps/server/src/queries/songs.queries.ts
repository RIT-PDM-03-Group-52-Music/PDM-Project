/** Types generated for queries found in "src/queries/songs.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetSongsBySongTitle' parameters type */
export interface IGetSongsBySongTitleParams {
  order: string;
  page: number;
  page_size: number;
  song_title: string;
  sort: string;
}

/** 'GetSongsBySongTitle' return type */
export interface IGetSongsBySongTitleResult {
  album_name: string;
  artist_name: string;
  listen_count: string | null;
  released_at: Date;
  song_id: number;
  song_length: number;
  song_title: string;
}

/** 'GetSongsBySongTitle' query type */
export interface IGetSongsBySongTitleQuery {
  params: IGetSongsBySongTitleParams;
  result: IGetSongsBySongTitleResult;
}

const getSongsBySongTitleIR: any = {"usedParamSet":{"song_title":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"song_title","required":true,"transform":{"type":"scalar"},"locs":[{"a":555,"b":566}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":603,"b":608},{"a":686,"b":691},{"a":771,"b":776},{"a":856,"b":861},{"a":943,"b":948},{"a":1028,"b":1033},{"a":1115,"b":1120},{"a":1198,"b":1203}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":629,"b":635},{"a":712,"b":718},{"a":798,"b":804},{"a":883,"b":889},{"a":970,"b":976},{"a":1055,"b":1061},{"a":1141,"b":1147},{"a":1224,"b":1230}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1274,"b":1284},{"a":1315,"b":1325}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1302,"b":1307}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, (\n    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id\n) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE s.song_title ILIKE CONCAT('%', :song_title!::text, '%')\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, (
 *     SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id
 * ) as listen_count FROM songs AS s
 * INNER JOIN features as f ON s.song_id = f.song_id
 * INNER JOIN artists as a ON f.artist_id = a.artist_id
 * INNER JOIN albumitems as ai ON s.song_id = ai.song_id
 * INNER JOIN albums as al ON ai.album_id = al.album_id
 * INNER JOIN songcat as sc ON s.song_id = sc.song_id
 * INNER JOIN genres as g ON sc.genre_id = g.genre_id
 * WHERE s.song_title ILIKE CONCAT('%', :song_title!::text, '%')
 * ORDER BY
 *     CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,
 *     CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,
 *     CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,
 *     CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,
 *     CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,
 *     CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,
 *     CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,
 *     CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getSongsBySongTitle = new PreparedQuery<IGetSongsBySongTitleParams,IGetSongsBySongTitleResult>(getSongsBySongTitleIR);


/** 'GetSongsByArtistName' parameters type */
export interface IGetSongsByArtistNameParams {
  artist_name: string;
  order: string;
  page: number;
  page_size: number;
  sort: string;
}

/** 'GetSongsByArtistName' return type */
export interface IGetSongsByArtistNameResult {
  album_name: string;
  artist_name: string;
  listen_count: string | null;
  released_at: Date;
  song_id: number;
  song_length: number;
  song_title: string;
}

/** 'GetSongsByArtistName' query type */
export interface IGetSongsByArtistNameQuery {
  params: IGetSongsByArtistNameParams;
  result: IGetSongsByArtistNameResult;
}

const getSongsByArtistNameIR: any = {"usedParamSet":{"artist_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"artist_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":556,"b":568}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":605,"b":610},{"a":688,"b":693},{"a":773,"b":778},{"a":858,"b":863},{"a":945,"b":950},{"a":1030,"b":1035},{"a":1117,"b":1122},{"a":1200,"b":1205}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":631,"b":637},{"a":714,"b":720},{"a":800,"b":806},{"a":885,"b":891},{"a":972,"b":978},{"a":1057,"b":1063},{"a":1143,"b":1149},{"a":1226,"b":1232}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1276,"b":1286},{"a":1317,"b":1327}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1304,"b":1309}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, (\n    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id\n) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE a.artist_name ILIKE CONCAT('%', :artist_name!::text, '%')\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, (
 *     SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id
 * ) as listen_count FROM songs AS s
 * INNER JOIN features as f ON s.song_id = f.song_id
 * INNER JOIN artists as a ON f.artist_id = a.artist_id
 * INNER JOIN albumitems as ai ON s.song_id = ai.song_id
 * INNER JOIN albums as al ON ai.album_id = al.album_id
 * INNER JOIN songcat as sc ON s.song_id = sc.song_id
 * INNER JOIN genres as g ON sc.genre_id = g.genre_id
 * WHERE a.artist_name ILIKE CONCAT('%', :artist_name!::text, '%')
 * ORDER BY
 *     CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,
 *     CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,
 *     CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,
 *     CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,
 *     CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,
 *     CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,
 *     CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,
 *     CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getSongsByArtistName = new PreparedQuery<IGetSongsByArtistNameParams,IGetSongsByArtistNameResult>(getSongsByArtistNameIR);


/** 'GetSongsByAlbumName' parameters type */
export interface IGetSongsByAlbumNameParams {
  album_name: string;
  order: string;
  page: number;
  page_size: number;
  sort: string;
}

/** 'GetSongsByAlbumName' return type */
export interface IGetSongsByAlbumNameResult {
  album_name: string;
  artist_name: string;
  listen_count: string | null;
  released_at: Date;
  song_id: number;
  song_length: number;
  song_title: string;
}

/** 'GetSongsByAlbumName' query type */
export interface IGetSongsByAlbumNameQuery {
  params: IGetSongsByAlbumNameParams;
  result: IGetSongsByAlbumNameResult;
}

const getSongsByAlbumNameIR: any = {"usedParamSet":{"album_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"album_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":556,"b":567}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":604,"b":609},{"a":687,"b":692},{"a":772,"b":777},{"a":857,"b":862},{"a":944,"b":949},{"a":1029,"b":1034},{"a":1116,"b":1121},{"a":1199,"b":1204}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":630,"b":636},{"a":713,"b":719},{"a":799,"b":805},{"a":884,"b":890},{"a":971,"b":977},{"a":1056,"b":1062},{"a":1142,"b":1148},{"a":1225,"b":1231}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1275,"b":1285},{"a":1316,"b":1326}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1303,"b":1308}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, (\n    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id\n) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE al.album_name ILIKE CONCAT('%', :album_name!::text, '%')\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, (
 *     SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id
 * ) as listen_count FROM songs AS s
 * INNER JOIN features as f ON s.song_id = f.song_id
 * INNER JOIN artists as a ON f.artist_id = a.artist_id
 * INNER JOIN albumitems as ai ON s.song_id = ai.song_id
 * INNER JOIN albums as al ON ai.album_id = al.album_id
 * INNER JOIN songcat as sc ON s.song_id = sc.song_id
 * INNER JOIN genres as g ON sc.genre_id = g.genre_id
 * WHERE al.album_name ILIKE CONCAT('%', :album_name!::text, '%')
 * ORDER BY
 *     CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,
 *     CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,
 *     CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,
 *     CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,
 *     CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,
 *     CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,
 *     CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,
 *     CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getSongsByAlbumName = new PreparedQuery<IGetSongsByAlbumNameParams,IGetSongsByAlbumNameResult>(getSongsByAlbumNameIR);


/** 'GetSongsByGenreName' parameters type */
export interface IGetSongsByGenreNameParams {
  genre_name: string;
  order: string;
  page: number;
  page_size: number;
  sort: string;
}

/** 'GetSongsByGenreName' return type */
export interface IGetSongsByGenreNameResult {
  album_name: string;
  artist_name: string;
  listen_count: string | null;
  released_at: Date;
  song_id: number;
  song_length: number;
  song_title: string;
}

/** 'GetSongsByGenreName' query type */
export interface IGetSongsByGenreNameQuery {
  params: IGetSongsByGenreNameParams;
  result: IGetSongsByGenreNameResult;
}

const getSongsByGenreNameIR: any = {"usedParamSet":{"genre_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"genre_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":555,"b":566}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":603,"b":608},{"a":686,"b":691},{"a":771,"b":776},{"a":856,"b":861},{"a":943,"b":948},{"a":1028,"b":1033},{"a":1115,"b":1120},{"a":1198,"b":1203}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":629,"b":635},{"a":712,"b":718},{"a":798,"b":804},{"a":883,"b":889},{"a":970,"b":976},{"a":1055,"b":1061},{"a":1141,"b":1147},{"a":1224,"b":1230}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1274,"b":1284},{"a":1315,"b":1325}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1302,"b":1307}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, (\n    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id\n) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE g.genre_name ILIKE CONCAT('%', :genre_name!::text, '%')\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, (
 *     SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id
 * ) as listen_count FROM songs AS s
 * INNER JOIN features as f ON s.song_id = f.song_id
 * INNER JOIN artists as a ON f.artist_id = a.artist_id
 * INNER JOIN albumitems as ai ON s.song_id = ai.song_id
 * INNER JOIN albums as al ON ai.album_id = al.album_id
 * INNER JOIN songcat as sc ON s.song_id = sc.song_id
 * INNER JOIN genres as g ON sc.genre_id = g.genre_id
 * WHERE g.genre_name ILIKE CONCAT('%', :genre_name!::text, '%')
 * ORDER BY
 *     CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,
 *     CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,
 *     CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,
 *     CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,
 *     CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,
 *     CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,
 *     CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,
 *     CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getSongsByGenreName = new PreparedQuery<IGetSongsByGenreNameParams,IGetSongsByGenreNameResult>(getSongsByGenreNameIR);


