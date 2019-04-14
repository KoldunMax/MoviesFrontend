import { takeLatest, all, call, put } from 'redux-saga/effects';
import * as actionTypes from './moviesActionTypes';
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

export default function* moviessSaga() {
  yield all([
      takeLatest(actionTypes.FETCH_ALL_MOVIES, fetchAllMovies),
  ])
}