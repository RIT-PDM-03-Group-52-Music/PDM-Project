/** Types generated for queries found in "src/queries/chart.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** 'GetChartsByTop50' parameters type */
export type IGetChartsByTop50Params = void;

/** 'GetChartsByTop50' return type */
export interface IGetChartsByTop50Result {
  album_name: string;
  artist_name: string;
  num_listens: string | null;
  song_id: number;
  song_title: string;
}

/** 'GetChartsByTop50' query type */
export interface IGetChartsByTop50Query {
  params: IGetChartsByTop50Params;
  result: IGetChartsByTop50Result;
}

const getChartsByTop50IR: any = {"usedParamSet":{},"params":[],"statement":"SELECT\n    s.song_id,\n    s.song_title,\n    a.album_name,\n    ar.artist_name,\n    COUNT(*) as num_listens\nFROM SONGS as s\nINNER JOIN LISTENS as l ON s.song_id = l.song_id\nINNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id\nINNER JOIN ALBUMS as a ON a.album_id = ai.album_id\nINNER JOIN FEATURES as f ON f.song_id = s.song_id\nINNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id\nWHERE ai.song_id = s.song_id\nGROUP BY s.song_id, s.song_length, a.album_name, artist_name\nORDER BY num_listens DESC\nLIMIT 50"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     s.song_id,
 *     s.song_title,
 *     a.album_name,
 *     ar.artist_name,
 *     COUNT(*) as num_listens
 * FROM SONGS as s
 * INNER JOIN LISTENS as l ON s.song_id = l.song_id
 * INNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id
 * INNER JOIN ALBUMS as a ON a.album_id = ai.album_id
 * INNER JOIN FEATURES as f ON f.song_id = s.song_id
 * INNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id
 * WHERE ai.song_id = s.song_id
 * GROUP BY s.song_id, s.song_length, a.album_name, artist_name
 * ORDER BY num_listens DESC
 * LIMIT 50
 * ```
 */
export const getChartsByTop50 = new PreparedQuery<IGetChartsByTop50Params,IGetChartsByTop50Result>(getChartsByTop50IR);


