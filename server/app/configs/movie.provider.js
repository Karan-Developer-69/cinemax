const axios = require('axios');
const API_KEY = process.env.TMDB_API_KEY || "";
const BASE_URL = process.env.TMDB_BASE_URL || process.env.BASE_URL || "https://api.themoviedb.org";

const getMovies = async (page = 1) => {
    const options = {
        method: 'GET',
        url: `${BASE_URL}/3/discover/movie?page=${page}`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            page: page
        }
    };

    const res = await axios.request(options)

    return res.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average.toFixed(1),
        year: movie.release_date ? movie.release_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    }));

}

const getTvShows = async (page = 1) => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/discover/tv',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            page: page
        }
    };

    const res = await axios.request(options)
    return res.data.results.map(show => ({
        id: show.id,
        title: show.name,
        rating: show.vote_average.toFixed(1),
        year: show.first_air_date ? show.first_air_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${show.poster_path}`
    }));
}

const getTrendingMovies = async (page = 1) => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/trending/movie/day',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            page: page
        }
    };

    const res = await axios.request(options)
    return res.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average.toFixed(1),
        year: movie.release_date ? movie.release_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    }));
}

const getMovieDetails = async (id) => {
    const options = {
        method: 'GET',
        url: BASE_URL + `/3/movie/${id}`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            append_to_response: 'external_ids,videos,watch/providers,credits,similar'
        }
    };
    const res = await axios.request(options);
    return res.data;
}

const getMovieTrailer = async (id) => {
    const options = {
        method: 'GET',
        url: BASE_URL + `/3/movie/${id}/videos`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        }
    };
    const res = await axios.request(options);
    return res.data.results[0].key;
}

const getTvShowDetails = async (id) => {
    const options = {
        method: 'GET',
        url: BASE_URL + `/3/tv/${id}`,
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            append_to_response: 'external_ids,videos,watch/providers,credits,similar'
        }
    };
    const res = await axios.request(options);
    return res.data;
}


const getTrendingTvShows = async (page = 1) => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/trending/tv/day',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            page: page
        }
    };

    const res = await axios.request(options)
    return res.data.results.map(show => ({
        id: show.id,
        title: show.name,
        rating: show.vote_average.toFixed(1),
        year: show.first_air_date ? show.first_air_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${show.poster_path}`
    }));
}

const getPopularMovies = async (page = 1) => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/movie/popular',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            page: page
        }
    };

    const res = await axios.request(options)
    return res.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average.toFixed(1),
        year: movie.release_date ? movie.release_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    }));
}

const getTopRatedMovies = async (page = 1) => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/movie/top_rated',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            page: page
        }
    };

    const res = await axios.request(options)
    return res.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average.toFixed(1),
        year: movie.release_date ? movie.release_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    }));
}

const getPopularTvShows = async (page = 1) => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/tv/popular',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            page: page
        }
    };

    const res = await axios.request(options)
    return res.data.results.map(show => ({
        id: show.id,
        title: show.name,
        rating: show.vote_average.toFixed(1),
        year: show.first_air_date ? show.first_air_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${show.poster_path}`
    }));
}

const getTopRatedTvShows = async (page = 1) => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/tv/top_rated',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
        },
        params: {
            page: page
        }
    };

    const res = await axios.request(options)
    return res.data.results.map(show => ({
        id: show.id,
        title: show.name,
        rating: show.vote_average.toFixed(1),
        year: show.first_air_date ? show.first_air_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${show.poster_path}`
    }));
}
const getSearchedMovie = async (query, page = 1) => {
    const res = await axios.get(
        `${BASE_URL}/3/search/movie`,
        {
            headers: {
                Authorization: 'Bearer ' + API_KEY
            },
            params: {
                query,
                page
            }
        }
    );
    return res.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average.toFixed(1),
        year: movie.release_date ? movie.release_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    }));
}

const getSearchedTvShow = async (query, page = 1) => {
    const res = await axios.get(
        `${BASE_URL}/3/search/tv`,
        {
            headers: {
                Authorization: 'Bearer ' + API_KEY
            },
            params: {
                query,
                page
            }
        }
    );
    return res.data.results.map(show => ({
        id: show.id,
        title: show.name,
        rating: show.vote_average.toFixed(1),
        year: show.first_air_date ? show.first_air_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${show.poster_path}`
    }));
}

const getMovieCast = async (id) => {
    const res = await axios.get(`${BASE_URL}/3/movie/${id}/credits`, {
        headers: { Authorization: 'Bearer ' + API_KEY }
    });
    return res.data.cast;
}

const getTvShowCast = async (id) => {
    const res = await axios.get(`${BASE_URL}/3/tv/${id}/credits`, {
        headers: { Authorization: 'Bearer ' + API_KEY }
    });
    return res.data.cast;
}

const getPersonDetails = async (id) => {
    const res = await axios.get(`${BASE_URL}/3/person/${id}`, {
        headers: { Authorization: 'Bearer ' + API_KEY }
    });
    return res.data;
}

const getSimilarMovies = async (id) => {
    const res = await axios.get(`${BASE_URL}/3/movie/${id}/similar`, {
        headers: { Authorization: 'Bearer ' + API_KEY }
    });
    return res.data.results.map(movie => ({
        id: movie.id,
        title: movie.title,
        rating: movie.vote_average.toFixed(1),
        year: movie.release_date ? movie.release_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
        type: 'movie'
    }));
}

const getSimilarTvShows = async (id) => {
    const res = await axios.get(`${BASE_URL}/3/tv/${id}/similar`, {
        headers: { Authorization: 'Bearer ' + API_KEY }
    });
    return res.data.results.map(show => ({
        id: show.id,
        title: show.name,
        rating: show.vote_average.toFixed(1),
        year: show.first_air_date ? show.first_air_date.split('-')[0] : null,
        imageSrc: `https://image.tmdb.org/t/p/w200${show.poster_path}`,
        type: 'tv'
    }));
}

const getMovieProviders = async (id) => {
    const res = await axios.get(`${BASE_URL}/3/movie/${id}/watch/providers`, {
        headers: { Authorization: 'Bearer ' + API_KEY }
    });
    return res.data.results;
}

const getTvShowProviders = async (id) => {
    const res = await axios.get(`${BASE_URL}/3/tv/${id}/watch/providers`, {
        headers: { Authorization: 'Bearer ' + API_KEY }
    });
    return res.data.results;
}

module.exports = {
    getMovies,
    getTvShows,
    getTrendingMovies,
    getTrendingTvShows,
    getPopularMovies,
    getTopRatedMovies,
    getPopularTvShows,
    getTopRatedTvShows,
    getSearchedMovie,
    getSearchedTvShow,
    getMovieDetails,
    getTvShowDetails,
    getMovieTrailer,
    getMovieCast,
    getTvShowCast,
    getPersonDetails,
    getSimilarMovies,
    getSimilarTvShows,
    getMovieProviders,
    getTvShowProviders
};