import _ from 'lodash';
import {
  FETCH_ACCOUNT_STATUS,
  FETCH_ACCOUNT_STATUS_ERROR,
  FETCH_ACCOUNT_STATUS_RECEIVE,
  DEACTIVATE_BUSINESS_ACCOUNT,
  DEACTIVATE_BUSINESS_ACCOUNT_RECEIVE,
  DEACTIVATE_BUSINESS_ACCOUNT_ERROR,
  RESET_BUSINESS_UPDATE_STATUS,
  CREATE_PLACE,
  CREATE_PLACE_RECEIVE,
  CREATE_PLACE_ERROR,
  UPDATE_PLACE,
  UPDATE_PLACE_RECEIVE,
  UPDATE_PLACE_ERROR,
  UPDATE_PLACE_PROGRESS_NUMBER,
  FETCH_USER_PLACES,
  FETCH_USER_PLACES_RECEIVE,
  FETCH_USER_PLACES_ERROR,
  GET_USER_PLACE,
  GET_USER_PLACE_RECEIVE,
  GET_USER_PLACE_ERROR,
  CREATE_CLAIM,
  CREATE_CLAIM_RECEIVE,
  CREATE_CLAIM_ERROR,
  FETCH_BUSINESSES,
  FETCH_BUSINESSES_RECEIVE,
  FETCH_BUSINESSES_ERROR,
  UPDATE_CLAIM,
  UPDATE_CLAIM_RECEIVE,
  UPDATE_CLAIM_ERROR,
  REPORT_A_REVIEW,
  REPORT_A_REVIEW_RECEIVE,
  REPORT_A_REVIEW_ERROR,
  FETCH_REPORTED_REVIEWS,
  FETCH_REPORTED_REVIEWS_RECEIVE,
  FETCH_REPORTED_REVIEWS_ERROR,
  DELETE_REPORTED_REVIEW,
  DELETE_REPORTED_REVIEW_RECEIVE,
  DELETE_REPORTED_REVIEW_ERROR,
  RESET_REPORTED_REVIEW_FLAG,
  SEARCH_UNCLAIMED,
  SEARCH_UNCLAIMED_RECEIVE,
  SEARCH_UNCLAIMED_ERROR,
  SELECT_BUSINESS,
  CREATE_CALENDER_SCHEDULE,
  CREATE_CALENDER_SCHEDULE_RECEIVE,
  CREATE_CALENDER_SCHEDULE_ERROR,
  UPDATE_CALENDER_SCHEDULE,
  UPDATE_CALENDER_SCHEDULE_RECEIVE,
  UPDATE_CALENDER_SCHEDULE_ERROR,
  DELETE_CALENDER_SCHEDULE,
  DELETE_CALENDER_SCHEDULE_RECEIVE,
  DELETE_CALENDER_SCHEDULE_ERROR,
  UPDATE_ACCOUNT_STATUS,
  RESET_BUSINESS_STATE,
  GET_BUSINESS_PLACE_RATINGS,
  GET_BUSINESS_PLACE_RATINGS_RECEIVE,
  GET_BUSINESS_PLACE_RATINGS_ERROR,
  GET_BUSINESS_PLACE_GALLERIES,
  GET_BUSINESS_PLACE_GALLERIES_RECEIVE,
  GET_BUSINESS_PLACE_GALLERIES_ERROR,
} from '../actionTypes';

const initState = {
  loading: {
    accountStatus: false,
    deActiveBusiness: false,
    createPlace: false,
    fetchPlaces: false,
    getPlace: false,
  },
  error: {
    accountStatus: '',
    deActiveBusiness: '',
    createPlace: '',
    fetchPlaces: '',
    getPlace: '',
  },
  accountStatus: null,
  deActiveBusinessStatus: null,
  businessUpdateStatus: {},
  places: [],
  claims: [],
  progressPercentage: 0,
  newlyCreatedPlace: null,
  place: {},
  reportedReviews: [],
  reportReviewStatus: false,
  unclaimedPlaces: [],
  selectedBusiness: null,
  placeRatings: null,
  placeGalleries: null,
};

const businessReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case FETCH_ACCOUNT_STATUS:
      return {
        ...state,
        error: {...state.error, accountStatus: ''},
        loading: {...state.loading, accountStatus: true},
      };
    case FETCH_ACCOUNT_STATUS_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, accountStatus: false},
        accountStatus: action.payload.data,
      };
    }
    case FETCH_ACCOUNT_STATUS_ERROR:
      return {
        ...state,
        loading: {...state.loading, accountStatus: false},
        accountStatus: null,
        error: {...state.error, accountStatus: action.error},
      };
    case DEACTIVATE_BUSINESS_ACCOUNT:
      return {
        ...state,
        error: {...state.error, deActiveBusiness: ''},
        loading: {...state.loading, deActiveBusiness: true},
      };
    case DEACTIVATE_BUSINESS_ACCOUNT_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, deActiveBusiness: false},
        deActiveBusinessStatus: action.payload,
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          ['deactivate-business']: true,
        },
      };
    }
    case DEACTIVATE_BUSINESS_ACCOUNT_ERROR:
      return {
        ...state,
        error: {...state.error, deActiveBusiness: action.error},
        loading: {...state.loading, deActiveBusiness: false},
        deActiveBusinessStatus: null,
      };
    case RESET_BUSINESS_UPDATE_STATUS: {
      return {
        ...state,
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          [action.key]: false,
        },
        progressPercentage: 0,
      };
    }
    case CREATE_PLACE:
      return {
        ...state,
        error: {...state.error, createPlace: ''},
        loading: {...state.loading, createPlace: true},
      };
    case CREATE_PLACE_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, createPlace: false},
        places: [...state.places, {...action.payload}],
        newlyCreatedPlace: {...action.payload},
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          ['create-place']: true,
        },
      };
    }
    case CREATE_PLACE_ERROR:
      return {
        ...state,
        error: {...state.error, createPlace: action.error},
        loading: {...state.loading, createPlace: false},
      };
    case UPDATE_PLACE:
      return {
        ...state,
        error: {...state.error, [`update-place-${action.updateType}`]: ''},
        loading: {
          ...state.loading,
          [`update-place-${action.updateType}`]: true,
        },
      };
    case UPDATE_PLACE_RECEIVE: {
      const newPlaces = _.cloneDeep(state.places);
      const foundIndex = newPlaces.findIndex(
        (place) => place.id === action.payload.data.id,
      );
      if (foundIndex >= 0) {
        newPlaces[foundIndex] = {
          ...newPlaces[foundIndex],
          ...action.payload.data,
        };
      }
      return {
        ...state,
        loading: {
          ...state.loading,
          [`update-place-${action.updateType}`]: false,
        },
        places: [...newPlaces],
        place: {...state.place, ...action.payload.data},
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          [`update-place-${action.updateType}`]: true,
        },
      };
    }
    case UPDATE_PLACE_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          [`update-place-${action.updateType}`]: action.error,
        },
        loading: {
          ...state.loading,
          [`update-place-${action.updateType}`]: false,
        },
      };
    case UPDATE_PLACE_PROGRESS_NUMBER: {
      return {
        ...state,
        progressPercentage: action.payload,
      };
    }
    case FETCH_USER_PLACES:
      return {
        ...state,
        error: {...state.error, fetchPlaces: ''},
        loading: {...state.loading, fetchPlaces: true},
      };
    case FETCH_USER_PLACES_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, fetchPlaces: false},
        places: [...action.payload.data],
      };
    }
    case FETCH_USER_PLACES_ERROR:
      return {
        ...state,
        loading: {...state.loading, fetchPlaces: false},
        places: [],
        error: {...state.error, fetchPlaces: action.error},
      };
    case GET_USER_PLACE:
      return {
        ...state,
        error: {...state.error, getPlace: ''},
        loading: {...state.loading, getPlace: true},
      };
    case GET_USER_PLACE_RECEIVE: {
      const place = action.payload.data;
      return {
        ...state,
        loading: {...state.loading, getPlace: false},
        place: {...place},
        placeRatings: place.ratings,
        placeGalleries: place.galleries,
      };
    }
    case GET_USER_PLACE_ERROR:
      return {
        ...state,
        loading: {...state.loading, getPlace: false},
        place: null,
        placeRatings: null,
        placeGalleries: null,
        error: {...state.error, getPlace: action.error},
      };
    case CREATE_CLAIM:
      return {
        ...state,
        error: {...state.error, ['update-business-documents']: ''},
        loading: {...state.loading, ['update-business-documents']: true},
      };
    case CREATE_CLAIM_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['update-business-documents']: false},
        // places: [...state.places, action.payload.data],
        claim: {...action.payload.data},
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          ['update-business-documents']: true,
        },
      };
    }
    case CREATE_CLAIM_ERROR:
      return {
        ...state,
        error: {...state.error, ['update-business-documents']: action.error},
        loading: {...state.loading, ['update-business-documents']: false},
      };
    case FETCH_BUSINESSES:
      return {
        ...state,
        error: {...state.error, fetchBusiness: ''},
        loading: {...state.loading, fetchBusiness: true},
      };
    case FETCH_BUSINESSES_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, fetchBusiness: false},
        places: [...action.payload.places],
        claims: [...action.payload.claims],
      };
    }
    case FETCH_BUSINESSES_ERROR:
      return {
        ...state,
        loading: {...state.loading, fetchBusiness: false},
        places: [],
        claims: [],
        error: {...state.error, fetchBusiness: action.error},
      };
    case UPDATE_CLAIM:
      return {
        ...state,
        error: {...state.error, ['update-business-documents']: ''},
        loading: {...state.loading, ['update-business-documents']: true},
      };
    case UPDATE_CLAIM_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['update-business-documents']: false},
        claim: {...action.payload.data},
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          ['update-business-documents']: true,
        },
      };
    }
    case UPDATE_CLAIM_ERROR:
      return {
        ...state,
        error: {...state.error, ['update-business-documents']: action.error},
        loading: {...state.loading, ['update-business-documents']: false},
      };
    case REPORT_A_REVIEW:
      return {
        ...state,
        error: {...state.error, ['report-review']: ''},
        loading: {...state.loading, ['report-review']: true},
      };
    case REPORT_A_REVIEW_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['report-review']: false},
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          ['report-review']: true,
        },
      };
    }
    case REPORT_A_REVIEW_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['report-review']: false},
        error: {...state.error, ['report-review']: action.error},
      };
    case FETCH_REPORTED_REVIEWS:
      return {
        ...state,
        error: {...state.error, ['fetch-reported-reviews']: ''},
        loading: {...state.loading, ['fetch-reported-reviews']: true},
      };
    case FETCH_REPORTED_REVIEWS_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['fetch-reported-reviews']: false},
        reportedReviews: action.payload.data,
      };
    }
    case FETCH_REPORTED_REVIEWS_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['fetch-reported-reviews']: false},
        reportedReviews: null,
        error: {...state.error, ['fetch-reported-reviews']: action.error},
      };
    case DELETE_REPORTED_REVIEW:
      return {
        ...state,
        error: {...state.error, ['delete-reported-review']: ''},
        loading: {...state.loading, ['delete-reported-review']: true},
      };
    case DELETE_REPORTED_REVIEW_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['delete-reported-review']: false},
        // reportedReviews: action.payload.data,
      };
    }
    case DELETE_REPORTED_REVIEW_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['delete-reported-review']: false},
        // reportedReviews: null,
        error: {...state.error, ['delete-reported-review']: action.error},
      };
    case RESET_REPORTED_REVIEW_FLAG:
      return {
        reportReviewStatus: false,
      };
    case SEARCH_UNCLAIMED:
      return {
        ...state,
        error: {...state.error, ['unclaimed-search']: ''},
        loading: {...state.loading, ['unclaimed-search']: true},
      };
    case SEARCH_UNCLAIMED_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['unclaimed-search']: false},
        unclaimedPlaces: [...action.payload],
      };
    }
    case SEARCH_UNCLAIMED_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['unclaimed-search']: false},
        error: {...state.error, ['unclaimed-search']: action.error},
        unclaimedPlaces: [],
      };
    case SELECT_BUSINESS:
      return {
        ...state,
        selectedBusiness: action.payload ? {...action.payload} : null,
      };

    case CREATE_CALENDER_SCHEDULE:
      return {
        ...state,
        error: {...state.error, ['create-schedule']: ''},
        loading: {...state.loading, ['create-schedule']: true},
      };
    case CREATE_CALENDER_SCHEDULE_RECEIVE: {
      const newPlace = _.cloneDeep(state.place);
      newPlace.calendars.push({...action.payload.data});
      return {
        ...state,
        loading: {...state.loading, ['create-schedule']: false},
        //  update place calender here
        place: newPlace,
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          ['create-schedule']: true,
        },
      };
    }
    case CREATE_CALENDER_SCHEDULE_ERROR:
      return {
        ...state,
        error: {...state.error, ['create-schedule']: action.error},
        loading: {...state.loading, ['create-schedule']: false},
      };
    case UPDATE_CALENDER_SCHEDULE:
      return {
        ...state,
        error: {...state.error, ['update-schedule']: ''},
        loading: {...state.loading, ['update-schedule']: true},
      };
    case UPDATE_CALENDER_SCHEDULE_RECEIVE: {
      const newPlace = _.cloneDeep(state.place);
      const foundedIndex = newPlace.calendars.findIndex(
        (schedule) => schedule.id === action.payload.data.id,
      );
      if (foundedIndex >= 0) {
        newPlace.calendars[foundedIndex] = {...action.payload.data};
      }
      return {
        ...state,
        loading: {...state.loading, ['update-schedule']: false},
        //  update place calender here
        place: newPlace,
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          ['update-schedule']: true,
        },
      };
    }
    case UPDATE_CALENDER_SCHEDULE_ERROR:
      return {
        ...state,
        error: {...state.error, ['update-schedule']: action.error},
        loading: {...state.loading, ['update-schedule']: false},
      };
    case DELETE_CALENDER_SCHEDULE:
      return {
        ...state,
        error: {...state.error, ['delete-schedule']: ''},
        loading: {...state.loading, ['delete-schedule']: true},
      };
    case DELETE_CALENDER_SCHEDULE_RECEIVE: {
      const newPlace = _.cloneDeep(state.place);
      newPlace.calendars = newPlace.calendars.filter(
        (schedule) => schedule.id !== action.payload.id,
      );
      return {
        ...state,
        loading: {...state.loading, ['delete-schedule']: false},
        place: newPlace,
        businessUpdateStatus: {
          ...state.businessUpdateStatus,
          ['delete-schedule']: true,
        },
      };
    }
    case DELETE_CALENDER_SCHEDULE_ERROR:
      return {
        ...state,
        error: {...state.error, ['delete-schedule']: action.error},
        loading: {...state.loading, ['delete-schedule']: false},
      };
    case UPDATE_ACCOUNT_STATUS: {
      return {
        ...state,
        accountStatus: {...action.payload},
      };
    }
    case RESET_BUSINESS_STATE: {
      return {
        ...initState,
      };
    }

    case GET_BUSINESS_PLACE_RATINGS: {
      return {
        ...state,
        loading: {...state.loading, ['place-ratings']: true},
      };
    }
    case GET_BUSINESS_PLACE_RATINGS_RECEIVE: {
      const refresh = action.refresh || false;
      const ratings = {
        ...action.payload.place.ratings,
      };
      if (!refresh) {
        ratings.data = [
          ...state.placeRatings.data,
          [...action.payload.place.ratings.data],
        ];
      }

      return {
        ...state,
        loading: {...state.loading, ['place-ratings']: false},
        placeRatings: ratings,
      };
    }
    case GET_BUSINESS_PLACE_RATINGS_ERROR: {
      return {
        ...state,
        loading: {...state.loading, ['place-ratings']: false},
        error: {...state.error, ['place-ratings']: null},
      };
    }
    case GET_BUSINESS_PLACE_GALLERIES: {
      return {
        ...state,
        loading: {...state.loading, ['place-galleries']: true},
      };
    }
    case GET_BUSINESS_PLACE_GALLERIES_RECEIVE: {
      const refresh = action.refresh || false;
      const galleries = {
        ...action.payload.place.galleries,
      };

      if (!refresh) {
        galleries.data = [
          ...state.placeGalleries.data,
          [...action.payload.place.galleries.data],
        ];
      }

      return {
        ...state,
        loading: {...state.loading, ['place-galleries']: false},
        placeGalleries: galleries,
      };
    }
    case GET_BUSINESS_PLACE_GALLERIES_ERROR: {
      return {
        ...state,
        loading: {...state.loading, ['place-galleries']: false},
        error: {...state.error, ['place-galleries']: null},
      };
    }

    default:
      return state;
  }
};

export default businessReducer;
