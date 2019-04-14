import * as actionTypes from './moviesActionTypes';
import { combineReducers } from 'redux';

const initialState = {
  all: []
};

const all = (state = initialState.all, action) => {
  switch (action.type) {
      case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
          {
              return action.payload.all;
          }
      case actionTypes.DELETE_MOVIES_SUCCESS:
          return state.filter(id => id !== action.payload.id);
      default:
          return state;
  }
};

export default combineReducers({
  all
});