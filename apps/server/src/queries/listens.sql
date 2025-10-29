/* @name createListen */
INSERT INTO LISTENS (song_id, listened_at, user_id) VALUES (:song_id!, :listened_at!, :user_id!)
RETURNING song_id, listened_at, user_id;

/* @name listenByCollectionId */
INSERT INTO LISTENS (song_id, listened_at, user_id) 
    SELECT ci.song_id, :listened_at!, :user_id! 
    FROM collectionitems AS ci
    INNER JOIN collections as c
    ON ci.collection_id = c.collection_id
    WHERE c.collection_id = :collection_id!
    AND c.user_id = :user_id!
RETURNING song_id, listened_at, user_id;