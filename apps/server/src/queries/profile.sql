/* @name getUsernamebyUserID */
SELECT username FROM USERS WHERE user_id = :user_id!;

/* @name getCollectionsCountbyUserID */
SELECT COUNT(c.user_id) AS collections_count FROM COLLECTIONS as c WHERE c.user_id = :user_id!;

/* @name getFollowersCountbyUserID */
SELECT COUNT(f.followee_id) AS followers_count FROM FOLLOWS as f WHERE f.follower_id = :user_id!;

/* @name getFollowingCountbyUserID */
SELECT COUNT(f.follower_id) as following_count FROM FOLLOWS as f WHERE f.followee_id = :user_id!;

/* @name getArtistsbyTop10 */
SELECT a.artist_id, a.artist_name, COUNT(*) as listen_count
FROM listens AS l
INNER JOIN features AS f ON f.song_id = l.song_id
INNER JOIN artists AS a ON a.artist_id = f.artist_id
WHERE l.user_id = :user_id!
GROUP BY (a.artist_id, a.artist_name)
ORDER BY listen_count DESC
LIMIT 10;