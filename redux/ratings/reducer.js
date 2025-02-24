import {
  GET_PLACE_RATINGS,
  GET_PLACE_RATINGS_RECEIVE,
  GET_PLACE_RATINGS_ERROR,
} from '../actionTypes';

import {defaultPageSize, defaultSearchFilters} from '../../config';

const initState = {
  loading: false,
  error: null,
  place: {},
  ratings: [],
  pagination: {
    total: 0,
    page: 1,
    pageSize: defaultPageSize,
  },
};

const appReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case GET_PLACE_RATINGS:
      return {
        ...state,
        loading: true,
      };
    case GET_PLACE_RATINGS_RECEIVE: {
      return {
        ...state,
        loading: false,
        ratings:
          action.payload.place.id === state.place.id
            ? [...state.ratings, ...action.payload.ratings.data]
            : [...action.payload.ratings.data],
        place:
          action.payload.place.id === state.place.id
            ? state.place
            : action.payload.place,
        pagination: action.payload.pagination
          ? {...action.payload.pagination}
          : {...state.pagination},
      };
    }
    case GET_PLACE_RATINGS_ERROR: {
      return {
        ...state,
        places: [],
        locations: [],
        pagination: {...state.pagination, total: 0, totalPage: 0},
        loading: false,
      };
    }

    default:
      return state;
  }
};

export default appReducer;
