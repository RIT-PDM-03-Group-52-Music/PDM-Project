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

### Collections

CREATE TABLE collections (
    collection_id integer generated always as identity primary key,
    user_id int not null,
    collection_name varchar(24) not null,
    unique ( user_id, collection_name ),
    foreign key (user_id) references users(user_id) ON DELETE CASCADE ON UPDATE CASCADE
)