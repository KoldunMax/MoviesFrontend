import * as actionTypes from './moviesActionTypes';

export const fetchAllMovies = () => ({
    type: actionTypes.FETCH_ALL_MOVIES
});

export const addMovie = movie => ({
    type: actionTypes.ADD_MOVIE,
    payload: movie
});

export const setFilters = (title, star) => ({
    type: actionTypes.SET_FILTER_PROPERTY,
    payload: {
        title,
        star
    }
})

export const setSorting = (sort) => ({
    type: actionTypes.SET_SORTING,
    payload: {
        sort
    }
})

export const deleteMovie = id => ({
    type: actionTypes.DELETE_MOVIE,
    payload: {
        id
    }
});

export const sendFile = file => ({
    type: actionTypes.SEND_FILE,
    payload: {
        file
    }
});