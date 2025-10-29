/* @name getCollectionById */
SELECT * FROM COLLECTIONS WHERE collection_id = :collection_id! AND user_id = :user_id!;

/* @name getCollectionsByCollectionNameAsc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
) AS song_count, (
    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
) AS total_length FROM COLLECTIONS AS C WHERE (user_id = :user_id!)
ORDER BY C.collection_name ASC LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getCollectionsByCollectionNameDesc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
) AS song_count, (
    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
) AS total_length FROM COLLECTIONS AS C WHERE (user_id = :user_id!)
ORDER BY C.collection_name DESC LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getCollectionsBySongCountAsc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
) AS song_count, (
    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY song_count ASC 
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getCollectionsBySongCountDesc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
) AS song_count, (
    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY song_count DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getCollectionsByTotalLengthAsc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
) AS song_count, (
    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY total_length ASC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getCollectionsByTotalLengthDesc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
) AS song_count, (
    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY total_length DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name insertCollectionByCollectionName */
INSERT INTO COLLECTIONS (user_id, collection_name) VALUES (:user_id!, :collection_name!)
ON CONFLICT (user_id, collection_name) DO NOTHING
RETURNING collection_id, collection_name;

/* @name updateCollectionName */
UPDATE COLLECTIONS SET collection_name = :collection_name! WHERE collection_id = :collection_id! AND user_id = :user_id!
RETURNING collection_id, collection_name;

/* @name insertCollectionItemBySongID */
INSERT INTO COLLECTIONITEMS (collection_id, song_id, added_at) VALUES (:collection_id!, :song_id!, :added_at!)
ON CONFLICT (collection_id, song_id) DO NOTHING
RETURNING collection_id, song_id, added_at;

/* @name getCollectionItem */
SELECT CI.* FROM COLLECTIONITEMS AS CI INNER JOIN COLLECTIONS AS C ON 
(C.collection_id = CI.collection_id) WHERE CI.collection_id = :collection_id! AND CI.song_id = :song_id! AND C.user_id = :user_id!;

/* @name deleteCollectionItem */
DELETE FROM COLLECTIONITEMS AS CI
WHERE CI.collection_id = :collection_id! AND CI.song_id = :song_id! AND EXISTS 
(SELECT 1 FROM COLLECTIONS AS C WHERE C.collection_id = CI.collection_id AND C.user_id = :user_id!)
RETURNING CI.collection_id, CI.song_id;

/* @name deleteCollectionById */
DELETE FROM COLLECTIONS WHERE collection_id = :collection_id! AND user_id = :user_id!
RETURNING collection_id, collection_name;

/* @name getCollectionItemsBySongNameASC */
SELECT S.* from COLLECTIONITEMS as CI
INNER JOIN COLLECTIONS as C ON (C.collection_id = CI.collection_id) 
INNER JOIN SONGS AS S ON (CI.song_id = S.song_id)
WHERE c.user_id = :user_id! AND ci.collection_id = :collection_id!
ORDER BY S.song_title ASC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getCollectionItemsBySongNameDESC */
SELECT S.* from COLLECTIONITEMS as CI
INNER JOIN COLLECTIONS as C ON (C.collection_id = CI.collection_id)
INNER JOIN SONGS AS S ON (CI.song_id = S.song_id)
WHERE c.user_id = :user_id! AND ci.collection_id = :collection_id!
ORDER BY S.song_title DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getCollectionItemsByAddedAtASC */
SELECT S.* from COLLECTIONITEMS as CI
INNER JOIN COLLECTIONS as C ON (C.collection_id = CI.collection_id)
INNER JOIN SONGS AS S ON (CI.song_id = S.song_id)
WHERE c.user_id = :user_id! AND ci.collection_id = :collection_id!
ORDER BY ci.added_at ASC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name getCollectionItemsByAddedAtDESC */
SELECT S.* from COLLECTIONITEMS as CI
INNER JOIN COLLECTIONS as C ON (C.collection_id = CI.collection_id)
INNER JOIN SONGS AS S ON (CI.song_id = S.song_id)
WHERE c.user_id = :user_id! AND ci.collection_id = :collection_id!
ORDER BY ci.added_at DESC
LIMIT :page_size! OFFSET GREATEST(:page!, 0) * :page_size!;

/* @name addCollectionItemsByAlbumId */
INSERT INTO collectionitems(collection_id, song_id, added_at)
SELECT :collection_id!, ai.song_id, :added_at!
FROM albums AS a
INNER JOIN albumitems AS ai ON ai.album_id = a.album_id
WHERE a.album_id = :album_id!
ON CONFLICT DO NOTHING
RETURNING song_id, added_at;

/* @name removeCollectionItemsByAlbumId */
DELETE FROM collectionitems
WHERE collection_id = :collection_id! AND
      song_id IN (
          SELECT ai.song_id FROM albums AS a
                   INNER JOIN albumitems ai ON a.album_id = ai.album_id
                   WHERE a.album_id = :album_id!
          )
RETURNING song_id;