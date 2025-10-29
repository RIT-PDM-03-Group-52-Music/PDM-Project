/* @name getAlbumsByAlbumName */
SELECT * FROM albums
WHERE album_name ILIKE CONCAT('%', :album_name!::text, '%')
ORDER BY album_name ASC
LIMIT 10;