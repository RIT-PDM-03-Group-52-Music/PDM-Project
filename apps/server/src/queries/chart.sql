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
SELECT *
FROM SONGS;

