/* @name getFollowsByFollower */
SELECT * FROM FOLLOWS WHERE follower_id = :user_id!;