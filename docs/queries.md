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

CREATE TABLE SONGS(
    song_id INTEGER generated always as identity primary key,
    song_title varchar(254) not null,
    song_length int not null check ( song_length between 0 and 65535),
    released_at timestamp not null
)

## ALBUMS(album id, album name, released at)

CREATE TABLE SONGS(
    song_id INTEGER generated always as identity primary key,
    song_title varchar(254) not null,
    song_length int not null check ( song_length between 0 and 65535),
    released_at timestamp not null
)

## FOLLOWS(follower id , followee id )
CREATE TABLE FOLLOWS(
    follower_id integer not null,
    followee_id integer not null,
    check (follower_id != followee_id ),
    FOREIGN KEY (follower_id) REFERENCES users(user_id),
    FOREIGN KEY (followee_id) REFERENCES users(user_id),
    PRIMARY KEY (follower_id, followee_id)
)


## RATES(user id , song id , rating)

CREATE TABLE RATES(
    user_id integer not null,
    song_id integer not null,
    rating smallint not null,
    check ( rating between 1 and 5),
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    PRIMARY KEY (user_id, song_id)
)

## LISTENS(user id , song id , listened at)

CREATE TABLE LISTENS(
    user_id integer not null,
    song_id integer not null,
    listened_at timestamp not null,
    FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    PRIMARY KEY (user_id, song_id, listened_at)
)

## COLLECTIONITEMS(collection id , song id , added at)
CREATE TABLE COLLECTIONITEMS(
    collection_id integer not null,
    song_id integer not null,
    added_at timestamp not null,
    FOREIGN KEY (collection_id) REFERENCES collections(collection_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    PRIMARY KEY (collection_id, song_id)
)

## SONGCAT(song id , genre id )
CREATE TABLE SONGCAT(
    song_id integer not null,
    genre_id integer not null,
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id),
    PRIMARY KEY (song_id, genre_id)
)

## ALBUMCAT(album id , genre id )
CREATE TABLE ALBUMCAT(
    album_id integer not null,
    genre_id integer not null,
    FOREIGN KEY (album_id) REFERENCES albums(album_id),
    FOREIGN KEY (genre_id) REFERENCES genres(genre_id),
    PRIMARY KEY (album_id, genre_id)
)

## ALBUMITEMS(album id , song id , track num)
CREATE TABLE ALBUMITEMS(
    album_id integer not null,
    song_id integer not null,
    track_num integer not null,
    check (track_num > 0 ),
    FOREIGN KEY (album_id) REFERENCES albums(album_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    PRIMARY KEY (album_id, song_id),
    UNIQUE(album_id,track_num)
)

## MASTERS(album id , artist id )

CREATE TABLE MASTERS(
    album_id integer not null,
    artist_id integer not null,
    FOREIGN KEY (album_id) REFERENCES albums(album_id),
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    PRIMARY KEY (album_id, artist_id)
)

## FEATURES(artist id , song id )
CREATE TABLE FEATURES(
    artist_id integer not null,
    song_id integer not null,
    FOREIGN KEY (artist_id) REFERENCES artists(artist_id),
    FOREIGN KEY (song_id) REFERENCES songs(song_id),
    PRIMARY KEY (artist_id, song_id)
)