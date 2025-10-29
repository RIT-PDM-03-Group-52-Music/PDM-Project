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
  genre_name: string;
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

const getSongsBySongTitleIR: any = {"usedParamSet":{"song_title":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"song_title","required":true,"transform":{"type":"scalar"},"locs":[{"a":569,"b":580}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":617,"b":622},{"a":700,"b":705},{"a":785,"b":790},{"a":870,"b":875},{"a":957,"b":962},{"a":1042,"b":1047},{"a":1129,"b":1134},{"a":1212,"b":1217}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":643,"b":649},{"a":726,"b":732},{"a":812,"b":818},{"a":897,"b":903},{"a":984,"b":990},{"a":1069,"b":1075},{"a":1155,"b":1161},{"a":1238,"b":1244}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1288,"b":1298},{"a":1329,"b":1339}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1316,"b":1321}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (\n    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id\n) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE s.song_title ILIKE CONCAT('%', :song_title!::text, '%')\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (
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
  genre_name: string;
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

const getSongsByArtistNameIR: any = {"usedParamSet":{"artist_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"artist_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":570,"b":582}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":619,"b":624},{"a":702,"b":707},{"a":787,"b":792},{"a":872,"b":877},{"a":959,"b":964},{"a":1044,"b":1049},{"a":1131,"b":1136},{"a":1214,"b":1219}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":645,"b":651},{"a":728,"b":734},{"a":814,"b":820},{"a":899,"b":905},{"a":986,"b":992},{"a":1071,"b":1077},{"a":1157,"b":1163},{"a":1240,"b":1246}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1290,"b":1300},{"a":1331,"b":1341}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1318,"b":1323}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (\n    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id\n) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE a.artist_name ILIKE CONCAT('%', :artist_name!::text, '%')\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (
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
  genre_name: string;
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

const getSongsByAlbumNameIR: any = {"usedParamSet":{"album_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"album_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":570,"b":581}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":618,"b":623},{"a":701,"b":706},{"a":786,"b":791},{"a":871,"b":876},{"a":958,"b":963},{"a":1043,"b":1048},{"a":1130,"b":1135},{"a":1213,"b":1218}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":644,"b":650},{"a":727,"b":733},{"a":813,"b":819},{"a":898,"b":904},{"a":985,"b":991},{"a":1070,"b":1076},{"a":1156,"b":1162},{"a":1239,"b":1245}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1289,"b":1299},{"a":1330,"b":1340}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1317,"b":1322}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (\n    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id\n) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE al.album_name ILIKE CONCAT('%', :album_name!::text, '%')\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (
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
  genre_name: string;
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

const getSongsByGenreNameIR: any = {"usedParamSet":{"genre_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"genre_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":569,"b":580}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":617,"b":622},{"a":700,"b":705},{"a":785,"b":790},{"a":870,"b":875},{"a":957,"b":962},{"a":1042,"b":1047},{"a":1129,"b":1134},{"a":1212,"b":1217}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":643,"b":649},{"a":726,"b":732},{"a":812,"b":818},{"a":897,"b":903},{"a":984,"b":990},{"a":1069,"b":1075},{"a":1155,"b":1161},{"a":1238,"b":1244}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1288,"b":1298},{"a":1329,"b":1339}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1316,"b":1321}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (\n    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id\n) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE g.genre_name ILIKE CONCAT('%', :genre_name!::text, '%')\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (
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


/** 'GetSongsById' parameters type */
export interface IGetSongsByIdParams {
  song_id: number;
}

/** 'GetSongsById' return type */
export interface IGetSongsByIdResult {
  released_at: Date;
  song_id: number;
  song_length: number;
  song_title: string;
}

/** 'GetSongsById' query type */
export interface IGetSongsByIdQuery {
  params: IGetSongsByIdParams;
  result: IGetSongsByIdResult;
}

const getSongsByIdIR: any = {"usedParamSet":{"song_id":true},"params":[{"name":"song_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":41,"b":49}]}],"statement":"SELECT * FROM SONGS as S WHERE song_id = :song_id!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT * FROM SONGS as S WHERE song_id = :song_id!
 * ```
 */
export const getSongsById = new PreparedQuery<IGetSongsByIdParams,IGetSongsByIdResult>(getSongsByIdIR);


