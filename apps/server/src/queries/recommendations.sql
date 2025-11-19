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