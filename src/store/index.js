import {createStore, applyMiddleware} from 'redux';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'connected-react-router';
import {composeWithDevTools} from 'redux-devtools-extension';
import createRootReducer from './reducers'
import history from './history';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default () => {
    const middleware =[
        sagaMiddleware,
        routerMiddleware(history)
    ];

    const store = createStore(
        createRootReducer(history),
        composeWithDevTools(
            applyMiddleware(...middleware)
        )
    );


    sagaMiddleware.run(rootSaga);
    return store;
}