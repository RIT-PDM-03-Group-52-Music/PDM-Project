/* @name get /charts/top-50 */
SELECT
    s.song_id,
    s.song_title,
    a.album_name,
    ar.artist_name,
    COUNT(*) as num_listens
FROM SONGS as s
INNER JOIN LISTENS as l ON s.song_id = l.song_id
INNER JOIN ALBUMITEMS as ai ON s.song_id = ai.song_id
INNER JOIN ALBUMS as a ON a.album_id = ai.album_id
INNER JOIN FEATURES as f ON f.song_id = s.song_id
INNER JOIN ARTISTS as ar on f.artist_id = ar.artist_id
WHERE ai.song_id = s.song_id
GROUP BY s.song_id, s.song_length, a.album_name, artist_name
ORDER BY num_listens DESC
LIMIT 50
