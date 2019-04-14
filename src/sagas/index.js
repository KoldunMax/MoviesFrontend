import {all, fork} from 'redux-saga/effects';
import moviesSaga from '../containers/Movies/logic/moviesSagas';

export default function* rootSaga() {
    yield all([
        fork(moviesSaga)
    ])
}