/* @name getCollectionById */
SELECT * FROM COLLECTIONS WHERE collection_id = :collection_id!;

/* @name getCollections */
SELECT * FROM COLLECTIONS ORDER BY :sort!;