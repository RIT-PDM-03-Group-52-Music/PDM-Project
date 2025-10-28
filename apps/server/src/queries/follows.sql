/* @name getFollowsByFollower */
SELECT f.followee_id, u.email, u.username FROM FOLLOWS as f
INNER JOIN USERS AS u ON u.user_id = f.followee_id
WHERE f.follower_id = :user_id!;