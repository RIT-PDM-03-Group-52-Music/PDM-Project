/** Types generated for queries found in "src/queries/recommendations.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

export type numberArray = (number)[];

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


