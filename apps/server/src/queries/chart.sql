/* @name getChartsByTop50 */
SELECT
    s.song_id,
    s.song_title,
    a.album_name,
    ar.artist_name,
    COUNT(*) as num_listens
FROM songs as s
INNER JOIN listens as l ON s.song_id = l.song_id
INNER JOIN albumitems as ai ON s.song_id = ai.song_id
INNER JOIN albums as a ON a.album_id = ai.album_id
INNER JOIN features as f ON f.song_id = s.song_id
INNER JOIN artists as ar on f.artist_id = ar.artist_id
GROUP BY s.song_id, a.album_name, artist_name
ORDER BY num_listens DESC
LIMIT 50;
