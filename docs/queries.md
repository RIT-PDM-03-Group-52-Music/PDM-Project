### Users 

create table users (
    user_id int generated always as identity primary key,
    username varchar(32) not null,
    password char(60) not null,
    email varchar(254) not null,
    first_name varchar(50) not null,
    last_name varchar(50) not null,
    created_at timestamp not null,
    last_seen timestamp not null,
    UNIQUE (username),
    UNIQUE (email)
)