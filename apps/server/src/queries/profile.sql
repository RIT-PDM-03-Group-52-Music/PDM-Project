/* @name getProfilebyUserID */
SELECT
    u.username,
    c.collections_count,
    f.followers_count,
    f.following_count,
    a.artists
    (
    SELECT COUNT(*) as collections_count
    FROM collections AS c
    WHERE c.user_id = :user_id!:;
    ),(
        SELECT COUNT(*) FROM
    )