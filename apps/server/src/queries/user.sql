/* @name registerUser */
INSERT INTO USERS (username, password, email, first_name, last_name, created_at, last_seen)
VALUES (:username!, :password!, :email!, :first_name!, :last_name!, :now!, :now!)
ON CONFLICT DO NOTHING
RETURNING username, user_id, email, first_name, last_name, created_at, last_seen;

/* @name getUserById */
SELECT * FROM USERS WHERE user_id = :user_id!;

/* @name getUserByUsername */
SELECT * FROM USERS WHERE username = :username!;

/* @name getUserByEmail */
SELECT * FROM USERS WHERE email = :email!;

/* @name loginUser */
UPDATE USERS SET last_seen = :now! WHERE user_id = :user_id!;