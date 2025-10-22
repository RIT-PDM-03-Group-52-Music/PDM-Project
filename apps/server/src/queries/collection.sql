/* @name getCollectionById */
SELECT * FROM COLLECTIONS WHERE collection_id = :collection_id!;

/* @name getCollectionsByCollectionNameAsc */
SELECT * FROM COLLECTIONS WHERE (user_id = :user_id!) ORDER BY collection_name ASC LIMIT :page_size! OFFSET (:page! - 1) * :page_size!;

/* @name getCollectionsByCollectionNameDesc */
SELECT * FROM COLLECTIONS WHERE (user_id = :user_id!) ORDER BY collection_name DESC LIMIT :page_size! OFFSET (:page! - 1) * :page_size!;

/* @name getCollectionsBySongCountAsc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
) AS song_count FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY song_count ASC 
LIMIT :page_size! OFFSET (:page! - 1) * :page_size!;

/* @name getCollectionsBySongCountDesc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT COUNT(*) FROM COLLECTIONITEMS AS CI WHERE (CI.collection_id = C.collection_id)    
) AS song_count FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY song_count DESC
LIMIT :page_size! OFFSET (:page! - 1) * :page_size!;

/* @name getCollectionsByTotalLengthAsc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY total_length ASC
LIMIT :page_size! OFFSET (:page! - 1) * :page_size!;

/* @name getCollectionsByTotalLengthDesc */
SELECT C.collection_id, C.user_id, C.collection_name, (
    SELECT SUM(S.song_length) FROM COLLECTIONITEMS AS CI INNER JOIN SONGS AS S 
    ON (S.song_id = CI.song_id) WHERE (CI.collection_id = C.collection_id)
) AS total_length FROM COLLECTIONS AS C WHERE C.user_id = :user_id! ORDER BY total_length DESC
LIMIT :page_size! OFFSET (:page! - 1) * :page_size!;

/* @name insertCollectionByCollectionName */
INSERT INTO COLLECTIONS (user_id, collection_name) VALUES (:user_id!, :collection_name!)
RETURNING collection_id, collection_name;