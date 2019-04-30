import api from '../adapter';

export default {
    fetchAllMovies: () => {
        return api.makeRequest(`/api/movies`, api.requestType.GET);
    },
    addMovie: movie => {
        return api.makeRequest(`/api/movies`, api.requestType.POST, movie);
    },
    sendFile: file => {
        return api.makeRequest(`/api/movies/file`, api.requestType.POST, file);
    },
    deleteMovie: id => {
        return api.makeRequest(`/api/movies/${id}`, api.requestType.DELETE);
    }
};