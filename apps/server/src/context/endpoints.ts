type ParamType = "string" | "integer_str" | "integer" | "enum";

type ParamSpec = {
    t: ParamType;
    d?: string;
    enum?: readonly string[];
};

type Returns = ReadonlyArray<{ status: number; d?: string }>;
type Params = Readonly<Record<string, ParamSpec>>;

interface EndpointBase {
    path: string;
    desc: string;
    ret: Returns;
}

export interface GetEndpoint extends EndpointBase {
    method: "GET";
    pathParams?: Params;
    query?: Params;
}

export interface DeleteEndpoint extends EndpointBase {
    method: "DELETE";
    pathParams?: Params;
}

export interface PostEndpoint extends EndpointBase {
    method: "POST";
    pathParams?: Params;
    body?: Params;
}

export interface PutEndpoint extends EndpointBase {
    method: "PUT";
    pathParams?: Params;
    body?: Params;
}

export interface PatchEndpoint extends EndpointBase {
    method: "PATCH";
    pathParams?: Params;
    body?: Params;
}

export type Endpoint = GetEndpoint | DeleteEndpoint | PostEndpoint | PutEndpoint | PatchEndpoint;

// from https://docs.google.com/document/d/1jsTrIZ-MoACzFxbDXWfC0tnUqfmCO4HqVigiWX-U7Cs/edit?usp=sharing
export const ENDPOINTS: Endpoint[] = [
    {
        method: "GET",
        path: "/endpoints",
        desc: "Get a list of available endpoints",
        ret: [
            {
                status: 200,
                d: "endpoints[]",
            },
        ],
    },
    {
        method: "GET",
        path: "/collections/:collection_id",
        desc: "Get a specific collection by ID",
        pathParams: { collection_id: { t: "integer_str", d: "ID of the collection" } },
        ret: [
            {
                status: 200,
                d: "{ collection_id, collection_name, songs_count, total_minutes }",
            },
            { status: 404, d: "collection not found" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/collections",
        desc: "List user's collections with pagination and sorting",
        query: {
            page: { t: "integer", d: "default = 0" },
            page_size: { t: "integer", d: "default = 15" },
            sort: { t: "enum", enum: ["collection_name", "songs_count", "total_minutes"] },
            order: { t: "enum", enum: ["asc", "desc"] },
        },
        ret: [
            {
                status: 200,
                d: "{ collections[] { collection_id, collection_name, songs_count, total_minutes }, page, page_size }",
            },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "POST",
        path: "/collections",
        desc: "Create a new collection",
        body: {
            collection_name: { t: "string", d: "3 <= string <= 24" },
        },
        ret: [
            { status: 201, d: "{ collection_id, collection_name }" },
            { status: 409, d: "duplicate collection name" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "PATCH",
        path: "/collections/:collection_id",
        desc: "Update a collection's name",
        pathParams: {
            collection_id: { t: "integer_str", d: "ID of the collection to update" },
        },
        body: {
            collection_name: { t: "string", d: "3 <= string <= 24" },
        },
        ret: [
            { status: 200, d: "{ collection_id, collection_name }" },
            { status: 404, d: "collection not found or not owned" },
            { status: 409, d: "duplicate collection name" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "DELETE",
        path: "/collections/:collection_id",
        desc: "Delete a collection",
        pathParams: {
            collection_id: { t: "integer_str", d: "ID of the collection to delete" },
        },
        ret: [
            { status: 204, d: "collection deleted or not found" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/collections/:collection_id/items",
        desc: "Get songs in a collection with pagination and sorting",
        pathParams: {
            collection_id: { t: "integer_str", d: "ID of the collection" },
        },
        query: {
            page: { t: "integer", d: "default = 0" },
            page_size: { t: "integer", d: "default = 20" },
            sort: {
                t: "enum",
                enum: [
                    "added_at",
                    "song_title",
                    "artist_name",
                    "album_name",
                    "released_at",
                    "song_length",
                ],
            },
            order: { t: "enum", enum: ["asc", "desc"] },
        },
        ret: [
            {
                status: 200,
                d: "{ songs[] { song_id, song_title, song_length, released_at, artists[], genres[], added_at }, page, page_size }",
            },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "PUT",
        path: "/collections/:collection_id/items/:song_id",
        desc: "Add a song to a collection",
        pathParams: {
            collection_id: { t: "integer_str", d: "ID of the collection" },
            song_id: { t: "integer_str", d: "ID of the song to add" },
        },
        ret: [
            { status: 201, d: "{ collection_id, song_id, added_at } - song added" },
            {
                status: 200,
                d: "{ collection_id, song_id, added_at } - song already exists",
            },
            { status: 404, d: "collection not owned or song not found" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "DELETE",
        path: "/collections/:collection_id/items/:song_id",
        desc: "Remove a song from a collection",
        pathParams: {
            collection_id: { t: "integer_str", d: "ID of the collection" },
            song_id: { t: "integer_str", d: "ID of the song to remove" },
        },
        ret: [
            { status: 204, d: "song removed or not found" },
            { status: 403, d: "collection not found or not owned" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "PUT",
        path: "/collections/:collection_id/albums/:album_id",
        desc: "Add all songs from an album to a collection",
        pathParams: {
            collection_id: { t: "integer_str", d: "ID of the collection" },
            album_id: { t: "integer_str", d: "ID of the album" },
        },
        ret: [
            { status: 201, d: "{ collection_id, songs[] { song_id, added_at } }" },
            { status: 404, d: "album not found" },
            { status: 403, d: "collection not found or not owned" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "DELETE",
        path: "/collections/:collection_id/albums/:album_id",
        desc: "Remove all songs from an album from a collection",
        pathParams: {
            collection_id: { t: "integer_str", d: "ID of the collection" },
            album_id: { t: "integer_str", d: "ID of the album" },
        },
        ret: [
            { status: 204, d: "album songs removed or not found" },
            { status: 403, d: "collection not found or not owned" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/albums",
        desc: "Search for albums by album name",
        query: {
            album_name: { t: "string", d: "album name to search for" },
        },
        ret: [
            {
                status: 200,
                d: "albums[] { album_id, album_name }",
            },
            { status: 400, d: "invalid query parameters" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/songs",
        desc: "Search for songs by title, artist, album, or genre (at least one search term is required)",
        query: {
            song_title: { t: "string", d: "string <= 254 (optional)" },
            artist_name: { t: "string", d: "string <= 128 (optional)" },
            album_name: { t: "string", d: "string <= 128 (optional)" },
            genre_name: { t: "string", d: "string <= 128 (optional)" },
            page: { t: "integer", d: "default = 0" },
            page_size: { t: "integer", d: "default = 10" },
            sort: {
                t: "enum",
                enum: ["song_title", "artist_name", "genre_name", "released_at"],
            },
            order: { t: "enum", enum: ["asc", "desc"] },
        },
        ret: [
            {
                status: 200,
                d: "{ songs[] { song_id, song_title, artist, album, song_length, listen_count } }",
            },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/songs/:song_id",
        desc: "Get detailed information about a specific song",
        pathParams: {
            song_id: { t: "integer_str", d: "ID of the song" },
        },
        ret: [
            {
                status: 200,
                d: "{ song_id, song_title, song_length, released_at, artists[], albums[], genres[] }",
            },
            { status: 404, d: "song not found" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "POST",
        path: "/listens",
        desc: "Record that user listened to or plays a song",
        body: {
            song_id: { t: "integer_str", d: "ID of the song to record" },
        },
        ret: [
            { status: 201, d: "listens[] { user_id, song_id, listened_at }" },
            { status: 404, d: "song not found" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "POST",
        path: "/listens/collection/:collection_id",
        desc: "Record that user listened to or plays an entire collection",
        pathParams: {
            collection_id: { t: "integer_str", d: "ID of the collection to play" },
        },
        ret: [
            { status: 201, d: "listens[] { user_id, song_id, listened_at }" },
            { status: 404, d: "collection not found" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "PUT",
        path: "/ratings/:song_id",
        desc: "Rate a song (1-5 stars)",
        pathParams: {
            song_id: { t: "integer_str", d: "ID of the song to rate" },
        },
        body: {
            stars: { t: "integer_str", d: "1 <= integer <= 5" },
        },
        ret: [
            { status: 200, d: "{ user_id, song_id, stars }" },
            { status: 422, d: "validation error" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/users",
        desc: "Search for a user by exact email",
        query: {
            email: { t: "string", d: "full, exact email address to search for" },
        },
        ret: [
            { status: 200, d: "{ user_id, email, username }" },
            { status: 404, d: "user not found" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "POST",
        path: "/follows/:user_id",
        desc: "Follow a user",
        pathParams: {
            user_id: { t: "integer_str", d: "ID of the user to follow" },
        },
        ret: [
            { status: 201, d: "{ follower_id, followee_id }" },
            { status: 409, d: "already following this user" },
            { status: 404, d: "user not found" },
            { status: 400, d: "cannot follow yourself" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/follows",
        desc: "Get list of users you are following",
        ret: [
            { status: 200, d: "{ users[] { user_id, email, username } }" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "DELETE",
        path: "/follows/:user_id",
        desc: "Unfollow a user",
        pathParams: {
            user_id: { t: "integer_str", d: "ID of the user to unfollow" },
        },
        ret: [
            { status: 204, d: "unfollowed or already not following" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/profile/:user_id",
        desc: "Get public profile information for a user",
        pathParams: {
            user_id: { t: "integer_str", d: "ID of any user" },
        },
        ret: [
            {
                status: 200,
                d: "{ username, collections_count, followers_count, following_count, top_artists[]",
            },
            { status: 404, d: "user not found" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/charts/top-50",
        desc: "Get the top 50 most listened to songs across all users",
        ret: [
            {
                status: 200,
                d: "{ songs[] { song_id, song_title, artists[], album, listen_count } }",
            },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/charts/top-50-following",
        desc: "Get the top 50 most listened to songs among users you are following",
        ret: [
            {
                status: 200,
                d: "{ songs[] { song_id, song_title, artists[], album, listen_count } }",
            },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/charts/top-genres",
        desc: "Get the top genres listened to by the user",
        ret: [
            { status: 200, d: "{ genres[] }" },
            { status: 401, d: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/recommendations",
        desc: "Get song recommendations for the user based on their listening history",
        query: {
            page: { t: "integer", d: "default = 0" },
            page_size: { t: "integer", d: "default = 10" },
        },
        ret: [
            { status: 200, d: "{ songs[] { song_id, song_title, average_rating, genre_support } }" },
            { status: 400, d: "invalid query parameters" },
            { status: 401, d: "unauthorized" },
        ],
    },
];
