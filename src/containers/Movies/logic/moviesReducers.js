import * as actionTypes from './moviesActionTypes';
import { combineReducers } from 'redux';

const initialState = {
  all: [],
  byId: {},
  filters: {
    title: '',
    star: ''
  },
  sorting: false
};

const all = (state = initialState.all, action) => {
  switch (action.type) {
      case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
        {
            return action.payload.all;
        }
      case actionTypes.ADD_MOVIES_FROM_FILE_SUCCESS:
        {
          return [...state, ...action.payload.all];
        }
      case actionTypes.DELETE_MOVIE_SUCCESS:
          return state.filter(id => id !== action.payload.id);
      default:
          return state;
  }
};

const byId = (state = initialState.byId, action) => {
  switch (action.type) {
      case actionTypes.FETCH_ALL_MOVIES_SUCCESS:
          return action.payload.byId;
      case actionTypes.FETCH_MOVIE_SUCCESS:
          return { ...state, 
                   [action.payload._id]: action.payload };
      case actionTypes.ADD_MOVIES_FROM_FILE_SUCCESS:
        {
          return {...state, ...action.payload.byId}
        }    
      default:
          return state;
  }
};

const filtering = (state = initialState.filters, action) => {
  switch (action.type) {
    case actionTypes.SET_FILTER_PROPERTY:
        return { ...state, 
          title: action.payload.title,
          star: action.payload.star
        }
    default:
        return state;
  }
}

const sorting = (state = initialState.sorting, action) => {
  switch (action.type) {
    case actionTypes.SET_SORTING:
        return action.payload.sort
    default:
        return state;
  }
}


export default combineReducers({
  all,
  byId,
  filtering,
  sorting
});

export const allMovies = ({ movies }) => {
  let transformetMovies = movies.all.map(id => {
    return movies.byId[id];
  });
  let filteredMovies = transformetMovies.filter(movie => {
    return filteringByParameters(movies.filtering.title.toLowerCase(), movies.filtering.star.toLowerCase(), movie)
  })
  console.log(movies.sorting);
  return movies.sorting ? filteredMovies.sort(sortTitles) : filteredMovies;
}

function filteringByParameters(title, star, movieObj) {
  switch(true) {
    case !!(title && star): {
      return movieObj.title.toLowerCase().indexOf(title) > -1 && movieObj.stars.some(item => item.toLowerCase().indexOf(star) > -1);
    }
    case !!title: {
      return movieObj.title.toLowerCase().indexOf(title) > -1;
    }
    case !!star: {
      return movieObj.stars.some(item => item.toLowerCase().indexOf(star) > -1);
    }
    default: {
      return true;
    }
  }
}

function sortTitles(a, b) {
  const title_a = a.title;
  const title_b = b.title;
  if (title_a > title_b) {
    return 1;
  } else if (title_a < title_b) {
    return -1;
  } else if (title_a === title_b) {
    return 0;
  }
}