import { takeLatest, all, call, put, take } from 'redux-saga/effects';
import * as actionTypes from './moviesActionTypes';
import { push } from 'connected-react-router';
import { movieAPI } from '../../../api';
import { normalize } from 'normalizr';
import { arrayOfMovies } from './moviesScheme';


function* fetchAllMovies() {
    try {
        const movies = yield call(movieAPI.fetchAllMovies);
        const normalizeData = normalize(movies.data, arrayOfMovies);
        yield put({
            type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
            payload: {
                all: normalizeData.result,
                byId: normalizeData.entities.byId || {}
            }
        });
    } catch (error) {
        yield put({
            type: actionTypes.FETCH_ALL_MOVIES_FAILED
        });
    }
}

function* addMovie(action) {
    try {
        const movieResponse = yield call(movieAPI.addMovie, action.payload);


        yield put({
            type: actionTypes.ADD_MOVIE_SUCCESS,
            payload: {
                ...movieResponse.data
            }
        });

        yield put(push(`/movies`));
    } catch (error) {
        yield put({
            type: actionTypes.ADD_MOVIE_FAILED
        });

    }
}

function* deleteMovie(action) {
    try {
        yield call(movieAPI.deleteMovie, action.payload.id);
        yield put({
            type: actionTypes.DELETE_MOVIE_SUCCESS,
            payload: { id: action.payload.id }
        });
    } catch (error) {
        yield put({
            type: actionTypes.DELETE_MOVIE_FAILED
        });

    }
}

function* sendingFile(action) {
    try {
        const movieResponse = yield call(movieAPI.sendFile, action.payload.file);
        const normalizeData = normalize(movieResponse.data, arrayOfMovies);
        yield put({
            type: actionTypes.ADD_MOVIES_FROM_FILE_SUCCESS,
            payload: {
                all: normalizeData.result,
                byId: normalizeData.entities.byId || {}
            }
        });
    } catch (error) {
        yield put({
            type: actionTypes.ADD_MOVIE_FAILED
        });

    }
}

export default function* moviesSaga() {
    yield all([
        takeLatest(actionTypes.FETCH_ALL_MOVIES, fetchAllMovies),
        takeLatest(actionTypes.ADD_MOVIE, addMovie),
        takeLatest(actionTypes.DELETE_MOVIE, deleteMovie),
        takeLatest(actionTypes.SEND_FILE, sendingFile)
    ])
}