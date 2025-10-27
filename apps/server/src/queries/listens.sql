/* @name createListen */
INSERT INTO LISTENS (song_id, listened_at, user_id) VALUES (:song_id!, :listened_at!, :user_id!)
RETURNING song_id, listened_at, user_id;
