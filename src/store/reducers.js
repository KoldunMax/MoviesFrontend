import { combineReducers } from 'redux';
import moviesReducer from '../containers/Movies/logic/moviesReducers';
import { connectRouter } from 'connected-react-router'

export default (history) => combineReducers({
  router: connectRouter(history),
  movies: moviesReducer
})