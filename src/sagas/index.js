import {all, fork} from 'redux-saga/effects';
import moviesSaga from '../containers';

export default function* rootSaga() {
    yield all([
        fork(moviesSaga)
    ])
}