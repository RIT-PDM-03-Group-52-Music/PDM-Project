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

## ARTISTS(artist id, artist name)
CREATE TABLE artists (
    artist_id integer generated always as identity primary key,
    artist_name varchar(128) not null
)

## GENRES(genre id, genre name)
CREATE TABLE GENRES(
    genre_id integer generated always as identity primary key,
    genre_name varchar(24) not null UNIQUE
)
## SONGS(song id, song title, song length, released at)
## ALBUMS(album id, album name, released at)
## FOLLOWS(follower id , followee id )
## RATES(user id , song id , rating)
## LISTENS(user id , song id , listened at)
## COLLECTIONITEMS(collection id , song id , added at)
## SONGCAT(song id , genre id )
## ALBUMCAT(album id , genre id )
## ALBUMITEMS(album id , song id , track num)
## MASTERS(album id , artist id )
## FEATURES(artist id , song id )
