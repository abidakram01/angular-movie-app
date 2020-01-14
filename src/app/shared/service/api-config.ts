export const API_LIST = {
    MOVIES : {
        GET_ALL_MOVIES: "discover/movie",
        GET_TOP_RATED_MOVIES: "movie/top_rated",
        GET_UPCOMING_INDIA_MOVIES: "movie/upcoming",
        GET_UPCOMING_MOVIES: "movie/upcoming",
        GET_NOW_PLAYING_MOVIES: "movie/now_playing",
        GET_SINGLE_MOVIES_DETAILS: "movie",
        GET_RECOMMENDATIONS_MOVIES: "movie",
    },

    TV:{
        GET_ALL_TV_SHOWS: "discover/tv",
        GET_SINGLE_TV_DETAILS: "tv",
        GET_POPULAR_TV_SHOWS: "tv/popular",
        GET_TOP_RATED_TV_SHOWS: "tv/top_rated",
        CURRENTLY_AIRING_TV_SHOWS: "tv/on_the_air",
        TV_SHOWS_AIRING_TODAY: "tv/airing_today",
        GET_RECOMMENDATIONS_TV: "tv",
    },

    GENRE:{
        GET_GENRE: "genre/movie/list",
        GET_GENRE_LIST: "genre",
        GET_PERSON_CAST: "movie",
        GET_GENRE_TV: "genre/tv/list",
        GET_ALL_TV_SHOWS: "discover/tv"
    },

    VIDEOS:{
        GET_MOVIES_TRAILER: "movie",
        GET_TV_TRAILER: "tv"
    },
    
    IMAGES:{
        GET_ALL_MOVIES_BACKDROPS_IMAGE: "movie",
        GET_ALL_TV_BACKDROPS_IMAGE: "tv",
    },

    PERSON:{
        GET_PERSON_DETAILS: "person",
        GET_PERSON_MOVIES: "person"
    }
};