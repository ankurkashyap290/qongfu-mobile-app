import {
  FETCH_ALL_PLACES,
  FETCH_ALL_PLACES_ERROR,
  FETCH_ALL_PLACES_RECEIVE,
} from '../actionTypes';

const initState = {
  loading: false,
  places: [],
  filters: [],
};

const appReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case FETCH_ALL_PLACES:
      return {...state, loading: true};
    case FETCH_ALL_PLACES_RECEIVE: {
      if (
        action.payload.__extras &&
        action.payload.__extras.isPaginationScroll
      ) {
        return {
          ...state,
          loading: false,
          places: [...state.places, ...action.payload.places],
          //   locations: [...state.locations, ...action.payload.response.locations!],
          // params: { ...action.payload.response.params },
        };
      } else {
        return {
          ...state,
          loading: false,
          places: [...action.payload.places],
          // locations: [...action.payload.response.locations!],
          //   params: { ...action.payload.response.params },
        };
      }
    }

    case FETCH_ALL_PLACES_ERROR:
      return {
        ...state,
        loading: false,
        places: [],
        // locations: [],
        // pagination: { ...state.pagination, total: 0, totalPage: 0 },
        // error: action.payload.error,
      };
    default:
      return state;
  }
};

export default appReducer;
