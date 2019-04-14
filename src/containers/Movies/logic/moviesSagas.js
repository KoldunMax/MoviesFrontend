import { takeLatest, all, call, put } from 'redux-saga/effects';
import * as actionTypes from './moviesActionTypes';
import { movieAPI } from '../../../api';


function* fetchAllMovies() {
    try {
        const movies = yield call(movieAPI.fetchAllMovies);
        yield put({
            type: actionTypes.FETCH_ALL_MOVIES_SUCCESS,
            payload: {
                all: movies.data,
                byId: {}
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