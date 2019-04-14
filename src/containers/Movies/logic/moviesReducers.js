import * as actionTypes from './moviesActionTypes';
import { combineReducers } from 'redux';

const initialState = {
  all: [],
  byId: {}
};

const all = (state = initialState.all, action) => {
  switch (action.type) {
      case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
          {
              return action.payload.all;
          }
      case actionTypes.DELETE_MOVIE_SUCCESS:
          return state.filter(id => id !== action.payload.id);
      default:
          return state;
  }
};

const byId = (state = initialState.byId, action) => {
  console.log('byid');
  switch (action.type) {
      case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
          return action.payload.byId;
      case actionTypes.FETCH_MOVIE_SUCCESS:
          return { ...state, 
                   [action.payload._id]: action.payload };
      default:
          return state;
  }
};

export default combineReducers({
  all,
  byId
});

export const allMovies = ({ movies }) => {
  console.log(movies.all.map(id => movies.byId[id]));
  return movies.all.map(id => movies.byId[id]);
}
