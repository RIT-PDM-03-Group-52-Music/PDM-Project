/** Types generated for queries found in "src/queries/recommendations.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type numberArray = (number)[];

/** 'GetChartsByTop50' parameters type */
export type IGetChartsByTop50Params = void;

/** 'GetChartsByTop50' return type */
export interface IGetChartsByTop50Result {
  album_names: string | null;
  artist_names: string | null;
  num_listens: string | null;
  song_id: number;
}

/** 'GetChartsByTop50' query type */
export interface IGetChartsByTop50Query {
  params: IGetChartsByTop50Params;
  result: IGetChartsByTop50Result;
}

const getChartsByTop50IR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    s.song_id,\n    STRING_AGG(DISTINCT a.album_name, ', ') AS album_names,\n    STRING_AGG(DISTINCT ar.artist_name, ', ') AS artist_names,\n    t.num_listens\nFROM (\n    SELECT\n        s.song_id,\n        COUNT(*) as num_listens\n    FROM SONGS as s\n    INNER JOIN LISTENS as l ON s.song_id = l.song_id\n    GROUP BY s.song_id\n    ORDER BY num_listens DESC\n    LIMIT 50\n) t\nINNER JOIN SONGS as s ON s.song_id = t.song_id\nINNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id\nINNER JOIN ALBUMS as a ON a.album_id = ai.album_id\nINNER JOIN FEATURES as f ON f.song_id = s.song_id\nINNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id\nGROUP BY s.song_id, s.song_title, t.num_listens\nORDER BY t.num_listens DESC"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     s.song_id,
 *     STRING_AGG(DISTINCT a.album_name, ', ') AS album_names,
 *     STRING_AGG(DISTINCT ar.artist_name, ', ') AS artist_names,
 *     t.num_listens
 * FROM (
 *     SELECT
 *         s.song_id,
 *         COUNT(*) as num_listens
 *     FROM SONGS as s
 *     INNER JOIN LISTENS as l ON s.song_id = l.song_id
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


/** 'GetRecommendations' parameters type */
export interface IGetRecommendationsParams {
  page: number;
  page_size: number;
  user_id: number;
}

/** 'GetRecommendations' return type */
export interface IGetRecommendationsResult {
  ave_rating: string | null;
  genre_list: numberArray | null;
  genre_support: string | null;
  song_id: number;
  song_title: string;
}

/** 'GetRecommendations' query type */
export interface IGetRecommendationsQuery {
  params: IGetRecommendationsParams;
  result: IGetRecommendationsResult;
}

const getRecommendationsIR: any = {"usedParamSet":{"user_id":true,"page_size":true,"page":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":235,"b":243},{"a":1216,"b":1224},{"a":1267,"b":1275}]},{"name":"page_size","required":true,"transform":{"type":"scalar"},"locs":[{"a":1373,"b":1383},{"a":1414,"b":1424}]},{"name":"page","required":true,"transform":{"type":"scalar"},"locs":[{"a":1401,"b":1406}]}],"statement":"SELECT *,\n       COALESCE((SELECT SUM(genre_count)\n                 FROM (SELECT sc2.genre_id, COUNT(*) AS genre_count\n                       FROM songs AS s2\n                                INNER JOIN collections AS c ON (c.user_id = :user_id!)\n                                INNER JOIN collectionitems AS ci\n                                           ON (s2.song_id = ci.song_id)\n                                               AND (c.collection_id = ci.collection_id)\n                                INNER JOIN songcat AS sc2 ON (sc2.song_id = s2.song_id)\n                       WHERE sc2.genre_id = ANY (t.genre_list)\n                       GROUP BY sc2.genre_id) sub), 0) AS genre_support\nFROM (SELECT s.song_id,\n             s.song_title,\n             ARRAY_AGG(sc.genre_id) AS genre_list,\n             AVG(r.rating)          AS ave_rating\n      FROM follows AS f\n               INNER JOIN rates AS r ON (r.user_id = f.followee_id)\n               INNER JOIN songs AS s ON (s.song_id = r.song_id)\n               INNER JOIN songcat AS sc ON (s.song_id = sc.song_id)\n          AND s.song_id NOT IN (SELECT DISTINCT l.song_id\n                                FROM listens AS l\n                                WHERE :user_id! = l.user_id)\n      WHERE f.follower_id = :user_id!\n      GROUP BY s.song_id, s.song_title) AS t\nORDER BY ave_rating DESC, genre_support DESC\nLIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!"};

/**
 * Query generated from SQL:
 * ```
 * SELECT *,
 *        COALESCE((SELECT SUM(genre_count)
 *                  FROM (SELECT sc2.genre_id, COUNT(*) AS genre_count
 *                        FROM songs AS s2
 *                                 INNER JOIN collections AS c ON (c.user_id = :user_id!)
 *                                 INNER JOIN collectionitems AS ci
 *                                            ON (s2.song_id = ci.song_id)
 *                                                AND (c.collection_id = ci.collection_id)
 *                                 INNER JOIN songcat AS sc2 ON (sc2.song_id = s2.song_id)
 *                        WHERE sc2.genre_id = ANY (t.genre_list)
 *                        GROUP BY sc2.genre_id) sub), 0) AS genre_support
 * FROM (SELECT s.song_id,
 *              s.song_title,
 *              ARRAY_AGG(sc.genre_id) AS genre_list,
 *              AVG(r.rating)          AS ave_rating
 *       FROM follows AS f
 *                INNER JOIN rates AS r ON (r.user_id = f.followee_id)
 *                INNER JOIN songs AS s ON (s.song_id = r.song_id)
 *                INNER JOIN songcat AS sc ON (s.song_id = sc.song_id)
 *           AND s.song_id NOT IN (SELECT DISTINCT l.song_id
 *                                 FROM listens AS l
 *                                 WHERE :user_id! = l.user_id)
 *       WHERE f.follower_id = :user_id!
 *       GROUP BY s.song_id, s.song_title) AS t
 * ORDER BY ave_rating DESC, genre_support DESC
 * LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!
 * ```
 */
export const getRecommendations = new PreparedQuery<IGetRecommendationsParams,IGetRecommendationsResult>(getRecommendationsIR);


