/** Types generated for queries found in "src/queries/chart.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetChartsByTop50' parameters type */
export type IGetChartsByTop50Params = void;

/** 'GetChartsByTop50' return type */
export interface IGetChartsByTop50Result {
  album_names: string | null;
  artist_names: string | null;
  num_listens: string | null;
  song_id: number;
  song_title: string;
}

/** 'GetChartsByTop50' query type */
export interface IGetChartsByTop50Query {
  params: IGetChartsByTop50Params;
  result: IGetChartsByTop50Result;
}

const getChartsByTop50IR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    s.song_id,\n    s.song_title,\n    STRING_AGG(DISTINCT a.album_name, ', ') AS album_names,\n    STRING_AGG(DISTINCT ar.artist_name, ', ') AS artist_names,\n    t.num_listens\nFROM (\n    SELECT\n        s.song_id,\n        COUNT(*) as num_listens\n    FROM SONGS as s\n    INNER JOIN LISTENS as l ON s.song_id = l.song_id AND l.listened_at >= (NOW() - INTERVAL '30 days')\n    GROUP BY s.song_id\n    ORDER BY num_listens DESC\n    LIMIT 50\n) t\nINNER JOIN SONGS as s ON s.song_id = t.song_id\nINNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id\nINNER JOIN ALBUMS as a ON a.album_id = ai.album_id\nINNER JOIN FEATURES as f ON f.song_id = s.song_id\nINNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id\nGROUP BY s.song_id, s.song_title, t.num_listens\nORDER BY t.num_listens DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     s.song_id,
 *     s.song_title,
 *     STRING_AGG(DISTINCT a.album_name, ', ') AS album_names,
 *     STRING_AGG(DISTINCT ar.artist_name, ', ') AS artist_names,
 *     t.num_listens
 * FROM (
 *     SELECT
 *         s.song_id,
 *         COUNT(*) as num_listens
 *     FROM SONGS as s
 *     INNER JOIN LISTENS as l ON s.song_id = l.song_id AND l.listened_at >= (NOW() - INTERVAL '30 days')
 *     GROUP BY s.song_id
 *     ORDER BY num_listens DESC
 *     LIMIT 50
 * ) t
 * INNER JOIN SONGS as s ON s.song_id = t.song_id
 * INNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id
 * INNER JOIN ALBUMS as a ON a.album_id = ai.album_id
 * INNER JOIN FEATURES as f ON f.song_id = s.song_id
 * INNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id
 * GROUP BY s.song_id, s.song_title, t.num_listens
 * ORDER BY t.num_listens DESC
 * ```
 */
export const getChartsByTop50 = new PreparedQuery<IGetChartsByTop50Params,IGetChartsByTop50Result>(getChartsByTop50IR);


/** 'GetTopFiveGenresForMonth' parameters type */
export type IGetTopFiveGenresForMonthParams = void;

/** 'GetTopFiveGenresForMonth' return type */
export interface IGetTopFiveGenresForMonthResult {
  genre_count: string | null;
  genre_name: string;
}

/** 'GetTopFiveGenresForMonth' query type */
export interface IGetTopFiveGenresForMonthQuery {
  params: IGetTopFiveGenresForMonthParams;
  result: IGetTopFiveGenresForMonthResult;
}

const getTopFiveGenresForMonthIR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    g.genre_name,\n    COUNT(*) as genre_count\nFROM GENRES as g\nINNER JOIN SONGCAT as sg ON g.genre_id = sg.genre_id\nINNER JOIN LISTENS as l ON sg.song_id = l.song_id\nWHERE EXTRACT(MONTH FROM l.listened_at) = EXTRACT(MONTH FROM NOW())\n  AND EXTRACT(YEAR FROM l.listened_at) = EXTRACT(YEAR FROM NOW())\nGROUP BY g.genre_name\nORDER BY genre_count DESC\nLIMIT 5"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     g.genre_name,
 *     COUNT(*) as genre_count
 * FROM GENRES as g
 * INNER JOIN SONGCAT as sg ON g.genre_id = sg.genre_id
 * INNER JOIN LISTENS as l ON sg.song_id = l.song_id
 * WHERE EXTRACT(MONTH FROM l.listened_at) = EXTRACT(MONTH FROM NOW())
 *   AND EXTRACT(YEAR FROM l.listened_at) = EXTRACT(YEAR FROM NOW())
 * GROUP BY g.genre_name
 * ORDER BY genre_count DESC
 * LIMIT 5
 * ```
 */
export const getTopFiveGenresForMonth = new PreparedQuery<IGetTopFiveGenresForMonthParams,IGetTopFiveGenresForMonthResult>(getTopFiveGenresForMonthIR);


/** 'GetTopFiftyFollowing' parameters type */
export interface IGetTopFiftyFollowingParams {
  user_id: number;
}

/** 'GetTopFiftyFollowing' return type */
export interface IGetTopFiftyFollowingResult {
  album_names: string | null;
  artist_names: string | null;
  num_listens: string | null;
  song_id: number;
  song_title: string;
}

/** 'GetTopFiftyFollowing' query type */
export interface IGetTopFiftyFollowingQuery {
  params: IGetTopFiftyFollowingParams;
  result: IGetTopFiftyFollowingResult;
}

const getTopFiftyFollowingIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":457,"b":465}]}],"statement":"SELECT\n    s.song_id,\n    s.song_title,\n    STRING_AGG(DISTINCT a.album_name, ', ') AS album_names,\n    STRING_AGG(DISTINCT ar.artist_name, ', ') AS artist_names,\n    t.num_listens\nFROM (\n    SELECT\n        s.song_id,\n        COUNT(*) as num_listens\n    FROM SONGS as s\n    INNER JOIN LISTENS as l ON s.song_id = l.song_id\n    INNER JOIN USERS as u ON l.user_id = u.user_id\n    INNER JOIN FOLLOWS as f ON u.user_id = f.followee_id\n    WHERE f.follower_id = :user_id!\n    GROUP BY s.song_id\n    ORDER BY num_listens DESC\n    LIMIT 50\n) t\nINNER JOIN SONGS as s ON s.song_id = t.song_id\nINNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id\nINNER JOIN ALBUMS as a ON a.album_id = ai.album_id\nINNER JOIN FEATURES as f ON f.song_id = s.song_id\nINNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id\nGROUP BY s.song_id, s.song_title, t.num_listens\nORDER BY t.num_listens DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     s.song_id,
 *     s.song_title,
 *     STRING_AGG(DISTINCT a.album_name, ', ') AS album_names,
 *     STRING_AGG(DISTINCT ar.artist_name, ', ') AS artist_names,
 *     t.num_listens
 * FROM (
 *     SELECT
 *         s.song_id,
 *         COUNT(*) as num_listens
 *     FROM SONGS as s
 *     INNER JOIN LISTENS as l ON s.song_id = l.song_id
 *     INNER JOIN USERS as u ON l.user_id = u.user_id
 *     INNER JOIN FOLLOWS as f ON u.user_id = f.followee_id
 *     WHERE f.follower_id = :user_id!
 *     GROUP BY s.song_id
 *     ORDER BY num_listens DESC
 *     LIMIT 50
 * ) t
 * INNER JOIN SONGS as s ON s.song_id = t.song_id
 * INNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id
 * INNER JOIN ALBUMS as a ON a.album_id = ai.album_id
 * INNER JOIN FEATURES as f ON f.song_id = s.song_id
 * INNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id
 * GROUP BY s.song_id, s.song_title, t.num_listens
 * ORDER BY t.num_listens DESC
 * ```
 */
export const getTopFiftyFollowing = new PreparedQuery<IGetTopFiftyFollowingParams,IGetTopFiftyFollowingResult>(getTopFiftyFollowingIR);


