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

const getSongsBySongTitleIR: any = {"usedParamSet":{"song_title":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"song_title","required":true,"transform":{"type":"scalar"},"locs":[{"a":543,"b":554}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":698,"b":703},{"a":781,"b":786},{"a":866,"b":871},{"a":951,"b":956},{"a":1038,"b":1043},{"a":1123,"b":1128},{"a":1210,"b":1215},{"a":1293,"b":1298}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":724,"b":730},{"a":807,"b":813},{"a":893,"b":899},{"a":978,"b":984},{"a":1065,"b":1071},{"a":1150,"b":1156},{"a":1236,"b":1242},{"a":1319,"b":1325}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1369,"b":1379},{"a":1410,"b":1420}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1397,"b":1402}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, COUNT(l.listened_at) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN listens as l ON l.song_id = s.song_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE s.song_title ILIKE CONCAT('%', :song_title!::text, '%')\nGROUP BY s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, COUNT(l.listened_at) as listen_count FROM songs AS s
 * INNER JOIN features as f ON s.song_id = f.song_id
 * INNER JOIN artists as a ON f.artist_id = a.artist_id
 * INNER JOIN albumitems as ai ON s.song_id = ai.song_id
 * INNER JOIN albums as al ON ai.album_id = al.album_id
 * INNER JOIN listens as l ON l.song_id = s.song_id
 * INNER JOIN songcat as sc ON s.song_id = sc.song_id
 * INNER JOIN genres as g ON sc.genre_id = g.genre_id
 * WHERE s.song_title ILIKE CONCAT('%', :song_title!::text, '%')
 * GROUP BY s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name
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

const getSongsByArtistNameIR: any = {"usedParamSet":{"artist_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"artist_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":544,"b":556}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":700,"b":705},{"a":783,"b":788},{"a":868,"b":873},{"a":953,"b":958},{"a":1040,"b":1045},{"a":1125,"b":1130},{"a":1212,"b":1217},{"a":1295,"b":1300}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":726,"b":732},{"a":809,"b":815},{"a":895,"b":901},{"a":980,"b":986},{"a":1067,"b":1073},{"a":1152,"b":1158},{"a":1238,"b":1244},{"a":1321,"b":1327}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1371,"b":1381},{"a":1412,"b":1422}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1399,"b":1404}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, COUNT(l.listened_at) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN listens as l ON l.song_id = s.song_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE a.artist_name ILIKE CONCAT('%', :artist_name!::text, '%')\nGROUP BY s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, COUNT(l.listened_at) as listen_count FROM songs AS s
 * INNER JOIN features as f ON s.song_id = f.song_id
 * INNER JOIN artists as a ON f.artist_id = a.artist_id
 * INNER JOIN albumitems as ai ON s.song_id = ai.song_id
 * INNER JOIN albums as al ON ai.album_id = al.album_id
 * INNER JOIN listens as l ON l.song_id = s.song_id
 * INNER JOIN songcat as sc ON s.song_id = sc.song_id
 * INNER JOIN genres as g ON sc.genre_id = g.genre_id
 * WHERE a.artist_name ILIKE CONCAT('%', :artist_name!::text, '%')
 * GROUP BY s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name
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

const getSongsByAlbumNameIR: any = {"usedParamSet":{"album_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"album_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":544,"b":555}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":699,"b":704},{"a":782,"b":787},{"a":867,"b":872},{"a":952,"b":957},{"a":1039,"b":1044},{"a":1124,"b":1129},{"a":1211,"b":1216},{"a":1294,"b":1299}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":725,"b":731},{"a":808,"b":814},{"a":894,"b":900},{"a":979,"b":985},{"a":1066,"b":1072},{"a":1151,"b":1157},{"a":1237,"b":1243},{"a":1320,"b":1326}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1370,"b":1380},{"a":1411,"b":1421}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1398,"b":1403}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, COUNT(l.listened_at) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN listens as l ON l.song_id = s.song_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE al.album_name ILIKE CONCAT('%', :album_name!::text, '%')\nGROUP BY s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, COUNT(l.listened_at) as listen_count FROM songs AS s
 * INNER JOIN features as f ON s.song_id = f.song_id
 * INNER JOIN artists as a ON f.artist_id = a.artist_id
 * INNER JOIN albumitems as ai ON s.song_id = ai.song_id
 * INNER JOIN albums as al ON ai.album_id = al.album_id
 * INNER JOIN listens as l ON l.song_id = s.song_id
 * INNER JOIN songcat as sc ON s.song_id = sc.song_id
 * INNER JOIN genres as g ON sc.genre_id = g.genre_id
 * WHERE al.album_name ILIKE CONCAT('%', :album_name!::text, '%')
 * GROUP BY s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name
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

const getSongsByGenreNameIR: any = {"usedParamSet":{"genre_name":true,"sort":true,"order":true,"page_size":true,"page":true},"params":[{"name":"genre_name","required":true,"transform":{"type":"scalar"},"locs":[{"a":543,"b":554}]},{"name":"sort","required":true,"transform":{"type":"scalar"},"locs":[{"a":698,"b":703},{"a":781,"b":786},{"a":866,"b":871},{"a":951,"b":956},{"a":1038,"b":1043},{"a":1123,"b":1128},{"a":1210,"b":1215},{"a":1293,"b":1298}]},{"name":"order","required":true,"transform":{"type":"scalar"},"locs":[{"a":724,"b":730},{"a":807,"b":813},{"a":893,"b":899},{"a":978,"b":984},{"a":1065,"b":1071},{"a":1150,"b":1156},{"a":1236,"b":1242},{"a":1319,"b":1325}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1369,"b":1379},{"a":1410,"b":1420}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1397,"b":1402}]}],"statement":"SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, COUNT(l.listened_at) as listen_count FROM songs AS s\nINNER JOIN features as f ON s.song_id = f.song_id\nINNER JOIN artists as a ON f.artist_id = a.artist_id\nINNER JOIN albumitems as ai ON s.song_id = ai.song_id\nINNER JOIN albums as al ON ai.album_id = al.album_id\nINNER JOIN listens as l ON l.song_id = s.song_id\nINNER JOIN songcat as sc ON s.song_id = sc.song_id\nINNER JOIN genres as g ON sc.genre_id = g.genre_id\nWHERE g.genre_name ILIKE CONCAT('%', :genre_name!::text, '%')\nGROUP BY s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name\nORDER BY\n    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,\n    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,\n    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,\n    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,\n    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, COUNT(l.listened_at) as listen_count FROM songs AS s
 * INNER JOIN features as f ON s.song_id = f.song_id
 * INNER JOIN artists as a ON f.artist_id = a.artist_id
 * INNER JOIN albumitems as ai ON s.song_id = ai.song_id
 * INNER JOIN albums as al ON ai.album_id = al.album_id
 * INNER JOIN listens as l ON l.song_id = s.song_id
 * INNER JOIN songcat as sc ON s.song_id = sc.song_id
 * INNER JOIN genres as g ON sc.genre_id = g.genre_id
 * WHERE g.genre_name ILIKE CONCAT('%', :genre_name!::text, '%')
 * GROUP BY s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name
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


