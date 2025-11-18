/** Types generated for queries found in "src/queries/profile.sql" */
import { PreparedQuery } from '@pgtyped/runtime';

/** Query 'GetProfileByUserId' is invalid, so its result is assigned type 'never'.
 *  */
export type IGetProfileByUserIdResult = never;

/** Query 'GetProfileByUserId' is invalid, so its parameters are assigned type 'never'.
 *  */
export type IGetProfileByUserIdParams = never;

const getProfileByUserIdIR: any = {"usedParamSet":{"user_id":true},"params":[{"name":"user_id","required":true,"transform":{"type":"scalar"},"locs":[{"a":100,"b":108},{"a":265,"b":273},{"a":316,"b":324}]}],"statement":"SELECT\n    -- u.username,\n    (\n    SELECT COUNT(*)\n    FROM collections AS c\n    WHERE c.user_id = :user_id!) AS collections_count,\n    COUNT(f.follower_id) AS followers_count,\n    COUNT(f.followee_id) AS following_count\nFROM FOLLOWS AS f\nINNER JOIN USERS AS u ON :user_id! = f.follower_id\nINNER JOIN USERS AS u ON :user_id! = f.followee_id"};

/**
 * Query generated from SQL:
 * ```
 * SELECT
 *     -- u.username,
 *     (
 *     SELECT COUNT(*)
 *     FROM collections AS c
 *     WHERE c.user_id = :user_id!) AS collections_count,
 *     COUNT(f.follower_id) AS followers_count,
 *     COUNT(f.followee_id) AS following_count
 * FROM FOLLOWS AS f
 * INNER JOIN USERS AS u ON :user_id! = f.follower_id
 * INNER JOIN USERS AS u ON :user_id! = f.followee_id
 * ```
 */
export const getProfileByUserId = new PreparedQuery<IGetProfileByUserIdParams,IGetProfileByUserIdResult>(getProfileByUserIdIR);


