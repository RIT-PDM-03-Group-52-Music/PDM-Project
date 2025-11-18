/* @name getProfileByUserID */
SELECT
    -- u.username,
    (
    SELECT COUNT(*)
    FROM collections AS c
    WHERE c.user_id = :user_id!) AS collections_count,
    COUNT(f.follower_id) AS followers_count,
    COUNT(f.followee_id) AS following_count
FROM FOLLOWS AS f
INNER JOIN USERS AS u ON :user_id! = f.follower_id
INNER JOIN USERS AS u ON :user_id! = f.followee_id;