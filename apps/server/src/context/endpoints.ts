export interface Endpoint {
    method: string;
    path: string;
    description: string;
    body?: Record<string, string>;
    query?: Record<string, string>;
    pathParams?: Record<string, string>;
    returns: Array<{ status: number; description: string }>;
}

export const ENDPOINTS: Endpoint[] = [
    {
        method: "GET",
        path: "/collections/{collection_id}",
        description: "Get a specific collection by ID",
        pathParams: {
            collection_id: "ID of the collection",
        },
        returns: [
            {
                status: 200,
                description: "{ collection_id, collection_name, songs_count, total_minutes }",
            },
            { status: 404, description: "collection not found" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/collections",
        description: "List user's collections with pagination and sorting",
        query: {
            page: "default = 0",
            page_size: "default = 15",
            sort: "by collection_name, songs_count, total_minutes",
            order: "ASC or DESC",
        },
        returns: [
            {
                status: 200,
                description:
                    "{ collections[] { collection_id, collection_name, songs_count, total_minutes }, page, page_size, total }",
            },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "POST",
        path: "/collections",
        description: "Create a new collection",
        body: {
            collection_name: "3 <= string <= 24",
        },
        returns: [
            { status: 201, description: "{ collection_id, collection_name }" },
            { status: 409, description: "duplicate collection name" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "PATCH",
        path: "/collections/{collection_id}",
        description: "Update a collection's name",
        pathParams: {
            collection_id: "ID of the collection to update",
        },
        body: {
            collection_name: "3 <= string <= 24",
        },
        returns: [
            { status: 200, description: "{ collection_id, collection_name }" },
            { status: 404, description: "collection not found or not owned" },
            { status: 409, description: "duplicate collection name" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "DELETE",
        path: "/collections/{collection_id}",
        description: "Delete a collection",
        pathParams: {
            collection_id: "ID of the collection to delete",
        },
        returns: [
            { status: 204, description: "collection deleted or not found" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/collections/{collection_id}/items",
        description: "Get songs in a collection with pagination and sorting",
        pathParams: {
            collection_id: "ID of the collection",
        },
        query: {
            page: "default = 0",
            page_size: "default = 15",
            sort: "by added_at, song_title, artist_name, album_name, released_at, song_length",
            order: "ASC or DESC",
        },
        returns: [
            {
                status: 200,
                description:
                    "{ songs[] { song_id, song_title, song_length, released_at, artists[], genres[], added_at }, page, page_size, total }",
            },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "PUT",
        path: "/collections/{collection_id}/items/{song_id}",
        description: "Add a song to a collection",
        pathParams: {
            collection_id: "ID of the collection",
            song_id: "ID of the song to add",
        },
        returns: [
            { status: 201, description: "{ collection_id, song_id, added_at } - song added" },
            {
                status: 200,
                description: "{ collection_id, song_id, added_at } - song already exists",
            },
            { status: 404, description: "collection not owned or song not found" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "DELETE",
        path: "/collections/{collection_id}/items/{song_id}",
        description: "Remove a song from a collection",
        pathParams: {
            collection_id: "ID of the collection",
            song_id: "ID of the song to remove",
        },
        returns: [
            { status: 204, description: "song removed or not found" },
            { status: 403, description: "collection not found or not owned" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "PUT",
        path: "/collections/{collection_id}/albums/{album_id}",
        description: "Add all songs from an album to a collection",
        pathParams: {
            collection_id: "ID of the collection",
            album_id: "ID of the album",
        },
        returns: [
            { status: 201, description: "{ collection_id, songs[] { song_id, added_at } }" },
            { status: 404, description: "album not found" },
            { status: 403, description: "collection not found or not owned" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "DELETE",
        path: "/collections/{collection_id}/albums/{album_id}",
        description: "Remove all songs from an album from a collection",
        pathParams: {
            collection_id: "ID of the collection",
            album_id: "ID of the album",
        },
        returns: [
            { status: 204, description: "album songs removed or not found" },
            { status: 403, description: "collection not found or not owned" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/songs",
        description: "Search for songs by title, artist, album, or genre",
        query: {
            song_title: "string <= 254 (optional)",
            artist_name: "string <= 128 (optional)",
            album_name: "string <= 128 (optional)",
            genre_name: "string <= 128 (optional)",
            page: "default = 0",
            page_size: "default = 50",
            sort: "by song_title, artist_name, genre_name, released_at",
            order: "ASC or DESC",
        },
        returns: [
            {
                status: 200,
                description:
                    "{ songs[] { song_id, song_title, artist, album, song_length, listen_count } }",
            },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/songs/{song_id}",
        description: "Get detailed information about a specific song",
        pathParams: {
            song_id: "ID of the song",
        },
        returns: [
            {
                status: 200,
                description:
                    "{ song_id, song_title, song_length, released_at, artists[], albums[], genres[] }",
            },
            { status: 404, description: "song not found" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "POST",
        path: "/listens",
        description: "Record that user listened to a song",
        body: {
            song_id: "ID of the song (required)",
        },
        returns: [
            { status: 201, description: "{ user_id, song_id, listened_at }" },
            { status: 404, description: "song not found" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "PUT",
        path: "/ratings/{song_id}",
        description: "Rate a song (1-5 stars)",
        pathParams: {
            song_id: "ID of the song to rate",
        },
        body: {
            stars: "1 <= int <= 5",
        },
        returns: [
            { status: 200, description: "{ user_id, song_id, stars }" },
            { status: 422, description: "validation error" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/users",
        description: "Search for a user by exact email",
        query: {
            email: "exact email address",
        },
        returns: [
            { status: 200, description: "{ user_id, email, username }" },
            { status: 404, description: "user not found" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "POST",
        path: "/follows/{user_id}",
        description: "Follow a user",
        pathParams: {
            user_id: "ID of the user to follow",
        },
        returns: [
            { status: 201, description: "{ follower_id, followee_id }" },
            { status: 409, description: "already following this user" },
            { status: 404, description: "user not found" },
            { status: 400, description: "cannot follow yourself" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "GET",
        path: "/follows",
        description: "Get list of users you are following",
        returns: [
            { status: 200, description: "{ users[] { user_id, email, username } }" },
            { status: 401, description: "unauthorized" },
        ],
    },
    {
        method: "DELETE",
        path: "/follows/{user_id}",
        description: "Unfollow a user",
        pathParams: {
            user_id: "ID of the user to unfollow",
        },
        returns: [
            { status: 204, description: "unfollowed or already not following" },
            { status: 401, description: "unauthorized" },
        ],
    },
];
