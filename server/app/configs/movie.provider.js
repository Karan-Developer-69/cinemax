const axios = require('axios');
const API_KEY = process.env.API_KEY || "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NTlmOTBhNzg3MTJlZGY1ZGExODZlMWIxM2Q4MzEyYiIsIm5iZiI6MTc2NDE0NjA0OS40MDIsInN1YiI6IjY5MjZiYjgxOTk1YjQyMzgxOTMwY2MxMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3Bc5f-NBwmQ__u6YUXpHuhz4K9CNkpQ4xdMNLXUH2Js";
const BASE_URL = process.env.BASE_URL || "https://api.themoviedb.org";

const getMovies = async () => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/discover/movie',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
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

const getTvShows = async () => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/discover/tv',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
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

const getTrendingMovies = async () => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/trending/movie/day',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
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
        }
    };
    const res = await axios.request(options);
    return res.data;
}


const getTrendingTvShows = async () => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/trending/tv/day',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
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

const getPopularMovies = async () => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/movie/popular',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
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

const getTopRatedMovies = async () => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/movie/top_rated',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
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

const getPopularTvShows = async () => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/tv/popular',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
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

const getTopRatedTvShows = async () => {
    const options = {
        method: 'GET',
        url: BASE_URL + '/3/tv/top_rated',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer ' + API_KEY
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
const getSearchedMovie = async (query) => {
    const res = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
            headers: {
                Authorization: 'Bearer ' + API_KEY
            },
            params: {
                api_key: API_KEY,
                query,
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

const getSearchedTvShow = async (query) => {
    const res = await axios.get(
        "https://api.themoviedb.org/3/search/tv",
        {
            headers: {
                Authorization: 'Bearer ' + API_KEY
            },
            params: {
                api_key: API_KEY,
                query,
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
    getMovieTrailer
};