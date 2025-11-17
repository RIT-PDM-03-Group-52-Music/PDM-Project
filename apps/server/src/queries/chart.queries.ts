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


