/* @name getSongsBySongTitle */
SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (
    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id
) as listen_count FROM songs AS s
INNER JOIN features as f ON s.song_id = f.song_id
INNER JOIN artists as a ON f.artist_id = a.artist_id
INNER JOIN albumitems as ai ON s.song_id = ai.song_id
INNER JOIN albums as al ON ai.album_id = al.album_id
INNER JOIN songcat as sc ON s.song_id = sc.song_id
INNER JOIN genres as g ON sc.genre_id = g.genre_id
WHERE s.song_title ILIKE CONCAT('%', :song_title!::text, '%')
ORDER BY
    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,
    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,
    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,
    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,
    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,
    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,
    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,
    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getSongsByArtistName */
SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (
    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id
) as listen_count FROM songs AS s
INNER JOIN features as f ON s.song_id = f.song_id
INNER JOIN artists as a ON f.artist_id = a.artist_id
INNER JOIN albumitems as ai ON s.song_id = ai.song_id
INNER JOIN albums as al ON ai.album_id = al.album_id
INNER JOIN songcat as sc ON s.song_id = sc.song_id
INNER JOIN genres as g ON sc.genre_id = g.genre_id
WHERE a.artist_name ILIKE CONCAT('%', :artist_name!::text, '%')
ORDER BY
    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,
    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,
    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,
    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,
    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,
    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,
    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,
    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getSongsByAlbumName */
SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (
    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id
) as listen_count FROM songs AS s
INNER JOIN features as f ON s.song_id = f.song_id
INNER JOIN artists as a ON f.artist_id = a.artist_id
INNER JOIN albumitems as ai ON s.song_id = ai.song_id
INNER JOIN albums as al ON ai.album_id = al.album_id
INNER JOIN songcat as sc ON s.song_id = sc.song_id
INNER JOIN genres as g ON sc.genre_id = g.genre_id
WHERE al.album_name ILIKE CONCAT('%', :album_name!::text, '%')
ORDER BY
    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,
    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,
    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,
    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,
    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,
    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,
    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,
    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getSongsByGenreName */
SELECT s.song_id, s.song_title, s.released_at, s.song_length, a.artist_name, al.album_name, g.genre_name, (
    SELECT COUNT(l.listened_at) FROM listens AS l WHERE l.song_id = s.song_id
) as listen_count FROM songs AS s
INNER JOIN features as f ON s.song_id = f.song_id
INNER JOIN artists as a ON f.artist_id = a.artist_id
INNER JOIN albumitems as ai ON s.song_id = ai.song_id
INNER JOIN albums as al ON ai.album_id = al.album_id
INNER JOIN songcat as sc ON s.song_id = sc.song_id
INNER JOIN genres as g ON sc.genre_id = g.genre_id
WHERE g.genre_name ILIKE CONCAT('%', :genre_name!::text, '%')
ORDER BY
    CASE WHEN :sort! = 'song_title' AND :order! = 'asc' THEN s.song_title END ASC,
    CASE WHEN :sort! = 'song_title' AND :order! = 'desc' THEN s.song_title END DESC,
    CASE WHEN :sort! = 'released_at' AND :order! = 'asc' THEN s.released_at END ASC,
    CASE WHEN :sort! = 'released_at' AND :order! = 'desc' THEN s.released_at END DESC,
    CASE WHEN :sort! = 'artist_name' AND :order! = 'asc' THEN a.artist_name END ASC,
    CASE WHEN :sort! = 'artist_name' AND :order! = 'desc' THEN a.artist_name END DESC,
    CASE WHEN :sort! = 'genre_name' AND :order! = 'asc' THEN g.genre_name END ASC,
    CASE WHEN :sort! = 'genre_name' AND :order! = 'desc' THEN g.genre_name END DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;
