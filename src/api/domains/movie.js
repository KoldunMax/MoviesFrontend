import api from '../adapter';

export default {
    fetchAllMovies: () => {
        return api.makeRequest(`/api/movies`, api.requestType.GET);
    }
};