/* @name getChartsByTop50 */
SELECT
    s.song_id,
    STRING_AGG(DISTINCT a.album_name, ', ') AS album_names,
    STRING_AGG(DISTINCT ar.artist_name, ', ') AS artist_names,
    t.num_listens
FROM (
    SELECT
        s.song_id,
        COUNT(*) as num_listens
    FROM SONGS as s
    INNER JOIN LISTENS as l ON s.song_id = l.song_id
    GROUP BY s.song_id
    ORDER BY num_listens DESC
    LIMIT 50
) t
INNER JOIN SONGS as s ON s.song_id = t.song_id
INNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id
INNER JOIN ALBUMS as a ON a.album_id = ai.album_id
INNER JOIN FEATURES as f ON f.song_id = s.song_id
INNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id
GROUP BY s.song_id, s.song_title, t.num_listens
ORDER BY t.num_listens DESC;

/* @name getRecommendations */
SELECT *,
       COALESCE((SELECT SUM(genre_count)
                 FROM (SELECT sc2.genre_id, COUNT(*) AS genre_count
                       FROM songs AS s2
                                INNER JOIN collections AS c ON (c.user_id = :user_id!)
                                INNER JOIN collectionitems AS ci
                                           ON (s2.song_id = ci.song_id)
                                               AND (c.collection_id = ci.collection_id)
                                INNER JOIN songcat AS sc2 ON (sc2.song_id = s2.song_id)
                       WHERE sc2.genre_id = ANY (t.genre_list)
                       GROUP BY sc2.genre_id) sub), 0) AS genre_support
FROM (SELECT s.song_id,
             s.song_title,
             ARRAY_AGG(sc.genre_id) AS genre_list,
             AVG(r.rating)          AS ave_rating
      FROM follows AS f
               INNER JOIN rates AS r ON (r.user_id = f.followee_id)
               INNER JOIN songs AS s ON (s.song_id = r.song_id)
               INNER JOIN songcat AS sc ON (s.song_id = sc.song_id)
          AND s.song_id NOT IN (SELECT DISTINCT l.song_id
                                FROM listens AS l
                                WHERE :user_id! = l.user_id)
      WHERE f.follower_id = :user_id!
      GROUP BY s.song_id, s.song_title) AS t
ORDER BY ave_rating DESC, genre_support DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;