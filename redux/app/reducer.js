import {
  FETCH_ALL_QONGFUS,
  FETCH_ALL_QONGFUS_ERROR,
  FETCH_ALL_QONGFUS_RECEIVE,
  GET_ALL_LIFESTYLES,
  GET_ALL_LIFESTYLES_RECEIVE,
  GET_ALL_LIFESTYLES_ERROR,
  FETCH_PLACES,
  FETCH_PLACES_RECEIVE,
  FETCH_PLACES_ERROR,
  SET_ADVANCE_FILTER,
  ADVANCE_FILTER_OPEN,
  SEARCH_PLACES,
  SEARCH_PLACES_RECEIVE,
  SEARCH_PLACES_ERROR,
  SET_LOCATION,
  SET_COUNTRY_LOCATION,
  GET_PLACE,
  GET_PLACE_RECEIVE,
  GET_PLACE_ERROR,
  SAVE_PLACE_RATING,
  SAVE_PLACE_RATING_RECEIVE,
  SAVE_PLACE_RATING_ERROR,
  RESET_APP_STORE,
  SET_GLOBAL_LOADING,
  SET_LIFESTYLE_SLUG,
  RESET_PLACE_RATING_SUCCESS_FLAG,
  FETCH_INITIAL_DATA,
  FETCH_INITIAL_DATA_RECEIVE,
  FETCH_INITIAL_DATA_ERROR,
  SET_AREAS_AND_CITIES,
  SET_APP_COUNTRY,
  UPDATE_COUNTRY_LOCATION,
  UPDATE_MAP_LOCATION_CHANGE,
  FETCH_SEARCH_SUGGESTIONS,
  FETCH_SEARCH_SUGGESTIONS_ERROR,
  FETCH_SEARCH_SUGGESTIONS_RECEIVE,
  FETCH_GLOBAL_CONFIG,
  FETCH_GLOBAL_CONFIG_ERROR,
  FETCH_GLOBAL_CONFIG_RECEIVE,
  UPDATE_GLOBAL_CONFIG,
  ADD_NOTIFICATION_TO_QUEUE,
  REMOVE_NOTIFICATION_FROM_QUEUE,
  CLEAR_NOTIFICATION_QUEUE,
  FETCH_FCM_TOKEN,
  FETCH_FCM_TOKEN_RECEIVE,
  FETCH_FCM_TOKEN_ERROR,
  SET_PARENT_SCROLL,
  GET_PUBLIC_PLACE_RATINGS,
  GET_PUBLIC_PLACE_RATINGS_RECEIVE,
  GET_PUBLIC_PLACE_RATINGS_ERROR,
  GET_PUBLIC_PLACE_GALLERIES,
  GET_PUBLIC_PLACE_GALLERIES_RECEIVE,
  GET_PUBLIC_PLACE_GALLERIES_ERROR,
} from '../actionTypes';
import {
  defaultPageSize,
  defaultSearchFilters,
  defaultCountry,
} from '../../config';
import _ from 'lodash';

const initState = {
  qongfus: [],
  loading: {
    app: false,
    dashboard: false,
    search: false,
    map: false,
    globalConfig: false,
  },
  lifestyles: [],
  places: {dashboard: [], search: [], map: []},
  locations: [],
  params: {},
  pagination: {
    dashboard: {
      total: 0,
      page: 1,
      pageSize: defaultPageSize,
    },
    search: {
      total: 0,
      page: 1,
      pageSize: defaultPageSize,
    },
    map: null,
  },
  advanceSearchFilters: {
    dashboard: {...defaultSearchFilters},
    search: {...defaultSearchFilters},
    map: {...defaultSearchFilters},
  },
  advanceFilterOpen: {dashboard: false, map: false, search: false},
  searchLoading: false,
  geoLocation: {
    lat: null,
    lng: null,
    city: '',
    address: '',
    country: '',
    area: '',
    region: '',
    userAllowed: false,
    error: null,
    loaded: false,
  },
  countryLocation: null,
  place: null,
  placeGalleries: null,
  placeRatings: null,
  placeSlug: '',
  isRatingSuccess: false,
  globalLoading: false,
  lifestyleSlug: '',
  countries: [],
  languages: [],
  isAppInitialized: false,
  searchedPlaces: {
    places: [],
    specialists: [],
    members: [],
    qongfus: [],
    locations: {
      countries: [],
      regions: [],
      cities: [],
      areas: [],
    },
  },
  areaAndCities: [],
  error: {},
  appCountry: `${defaultCountry.id}`,
  mapLocationChanged: false,
  searchedSuggestions: null,
  amenities: [],
  globalConfig: null,
  notificationsQueue: [],
  fcmToken: null,
  fcmInit: false,
  isParentScrollDisabled: false,
};

const appReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case FETCH_INITIAL_DATA:
      return {
        ...state,
        loading: {...state.loading, ['app']: true},
      };
    case FETCH_INITIAL_DATA_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
        qongfus: action.payload.qongfus,
        lifestyles: action.payload.lifestyles,
        countries: action.payload.countries,
        languages: action.payload.languages,
        amenities: action.payload.amenities,
        globalConfig: action.payload.globalConfig,
        isAppInitialized: true,
      };
    case FETCH_INITIAL_DATA_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
        isAppInitialized: false,
      };
    case FETCH_ALL_QONGFUS:
      return {
        ...state,
        loading: {...state.loading, ['app']: true},
      };
    case FETCH_ALL_QONGFUS_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
        qongfus: [...action.payload.qongfus],
      };
    case FETCH_ALL_QONGFUS_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
      };
    case GET_ALL_LIFESTYLES:
      return {
        ...state,
        loading: {...state.loading, ['app']: true},
      };
    case GET_ALL_LIFESTYLES_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
        lifestyles: [...action.payload.lifestyles],
      };
    case GET_ALL_LIFESTYLES_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
      };
    case FETCH_PLACES:
      return {
        ...state,
        loading: {...state.loading, [action.pageKey]: true},
      };
    case FETCH_PLACES_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, [action.pageKey]: false},
        places: {
          ...state.places,
          [action.pageKey]:
            action.payload.mode === 'scroll'
              ? [...state.places[action.pageKey], ...action.payload.places]
              : [...action.payload.places],
        },
        pagination: {
          ...state.pagination,
          [action.pageKey]: action.payload.pagination
            ? {...action.payload.pagination}
            : {...state.pagination[pageKey]},
        },
      };
    }
    case FETCH_PLACES_ERROR: {
      return {
        ...state,
        places: {...state.places, [action.pageKey]: []},
        // locations: [],
        pagination: {
          ...state.pagination,
          [action.pageKey]: {
            ...state.pagination[action.pageKey],
            page: 1,
            total: 0,
            totalPage: 0,
          },
        },
        loading: {...state.loading, [action.pageKey]: false},
      };
    }
    case SET_ADVANCE_FILTER: {
      return {
        ...state,
        advanceSearchFilters: {
          ...state.advanceSearchFilters,
          [action.pageKey]: {...action.payload},
        },
      };
    }
    case ADVANCE_FILTER_OPEN: {
      return {
        ...state,
        advanceFilterOpen: {
          ...state.advanceFilterOpen,
          [action.pageKey]: action.value,
        },
      };
    }
    case SEARCH_PLACES: {
      return {
        ...state,
        searchLoading: true,
      };
    }
    case SEARCH_PLACES_RECEIVE: {
      return {
        ...state,
        searchLoading: false,
        searchedPlaces: action.payload,
      };
    }
    case SEARCH_PLACES_ERROR: {
      return {
        ...state,
        searchLoading: false,
        searchedPlaces: null,
      };
    }
    case SET_LOCATION: {
      const newState = {
        ...state,
        geoLocation: {...action.payload, loaded: true},
      };
      if (action.payload.userAllowed) {
        newState.appCountry = action.payload.country
          ? action.payload.country.id
          : defaultCountry.id;
      }
      return newState;
    }
    case SET_COUNTRY_LOCATION: {
      const newState = {
        ...state,
        countryLocation: {...action.payload},
      };
      return newState;
    }
    case GET_PLACE: {
      return {
        ...state,
        loading: {...state.loading, ['app']: true},
        placeSlug: action.payload.slug,
      };
    }
    case GET_PLACE_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
        place: {...action.payload.place},
        placeGalleries: {...action.payload.place.galleries},
        placeRatings: {...action.payload.place.ratings},
      };
    }
    case GET_PLACE_ERROR: {
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
        place: null,
        placeGalleries: null,
        placeRatings: null,
      };
    }
    case SAVE_PLACE_RATING: {
      return {
        ...state,
        loading: {...state.loading, ['app']: true},
      };
    }
    case SAVE_PLACE_RATING_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
        isRatingSuccess: true,
      };
    }
    case SAVE_PLACE_RATING_ERROR: {
      return {
        ...state,
        loading: {...state.loading, ['app']: false},
        error: {...state.error, ['place-rating']: action.error},
      };
    }
    case RESET_APP_STORE: {
      return {
        ...initState,
        geoLocation: state.geoLocation,
        countryLocation: state.countryLocation,
        countries: state.countries,
        lifestyles: state.lifestyles,
        qongfus: state.qongfus,
        languages: state.languages,
        amenities: state.amenities,
        globalConfig: state.globalConfig,
        fcmToken: state.fcmToken,
        fcmInit: state.fcmInit,
      };
    }
    case SET_GLOBAL_LOADING: {
      return {
        ...initState,
        globalLoading: action.value,
      };
    }
    case SET_LIFESTYLE_SLUG: {
      return {
        ...state,
        lifestyleSlug: action.value,
      };
    }
    case RESET_PLACE_RATING_SUCCESS_FLAG: {
      return {
        ...state,
        isRatingSuccess: false,
        error: {...state.error, ['place-rating']: null},
      };
    }
    case SET_AREAS_AND_CITIES: {
      return {
        ...state,
        areaAndCities: action.payload,
      };
    }
    case SET_APP_COUNTRY: {
      return {
        ...state,
        appCountry: action.payload,
      };
    }
    case UPDATE_COUNTRY_LOCATION: {
      const newState = {
        ...state,
      };
      const foundCountry = newState.countries.findIndex(
        (item) => parseInt(item.id, 10) === parseInt(action.payload.country),
      );
      if (foundCountry >= 0) {
        newState.countries[foundCountry].location = {
          ...action.payload.location,
        };
      }
      return newState;
    }
    case UPDATE_MAP_LOCATION_CHANGE: {
      return {...state, mapLocationChanged: action.payload};
    }
    case FETCH_SEARCH_SUGGESTIONS: {
      return {
        ...state,
        searchLoading: true,
      };
    }
    case FETCH_SEARCH_SUGGESTIONS_RECEIVE: {
      return {
        ...state,
        searchLoading: false,
        searchedSuggestions: action.payload,
      };
    }
    case FETCH_SEARCH_SUGGESTIONS_ERROR: {
      return {
        ...state,
        searchLoading: false,
        searchedSuggestions: null,
      };
    }
    case FETCH_GLOBAL_CONFIG: {
      return {
        ...state,
        loading: {...state.loading, ['globalConfig']: true},
        error: {...state.error, ['globalConfig']: null},
      };
    }
    case FETCH_GLOBAL_CONFIG_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, ['globalConfig']: false},
        globalConfig: action.payload,
      };
    }
    case FETCH_GLOBAL_CONFIG_ERROR: {
      return {
        ...state,
        loading: {...state.loading, ['globalConfig']: false},
        error: {...state.error, ['globalConfig']: action.error},
        globalConfig: null,
      };
    }
    case UPDATE_GLOBAL_CONFIG: {
      const newConfig = _.cloneDeep(state.globalConfig);
      const foundedIndex = newConfig.data.findIndex(
        (item) => item.id === action.payload.id,
      );
      if (foundedIndex >= 0) {
        newConfig.data[foundedIndex] = {...action.payload};
      }
      return {
        ...state,
        globalConfig: {...newConfig},
      };
    }
    case ADD_NOTIFICATION_TO_QUEUE: {
      const nQueue = _.cloneDeep(state.notificationsQueue);
      nQueue.push({...action.payload});
      return {
        ...state,
        notificationsQueue: nQueue,
      };
    }
    case REMOVE_NOTIFICATION_FROM_QUEUE: {
      const nQueue = _.cloneDeep(state.notificationsQueue);
      const foundedIndex = nQueue.findIndex((item) => item.id === action.id);
      if (foundedIndex >= 0) {
        nQueue.splice(foundedIndex, 1);
      }
      return {
        ...state,
        notificationsQueue: nQueue,
      };
    }
    case CLEAR_NOTIFICATION_QUEUE: {
      return {
        ...state,
        notificationsQueue: [],
      };
    }
    case FETCH_FCM_TOKEN: {
      return {
        ...state,
        loading: {...state.loading, ['fcmToken']: true},
        error: {...state.error, ['fcmToken']: null},
      };
    }
    case FETCH_FCM_TOKEN_RECEIVE: {
      console.log('FCM TOKEN SET', action.payload);
      return {
        ...state,
        loading: {...state.loading, ['fcmToken']: false},
        fcmToken: action.payload.token,
        fcmInit: true,
      };
    }
    case FETCH_FCM_TOKEN_ERROR: {
      return {
        ...state,
        loading: {...state.loading, ['fcmToken']: false},
        error: {...state.error, ['fcmToken']: action.error},
        fcmToken: null,
        fcmInit: true,
      };
    }
    case SET_PARENT_SCROLL:
      return {
        ...state,
        isParentScrollDisabled: action.flag,
      };

    case GET_PUBLIC_PLACE_RATINGS: {
      return {
        ...state,
        loading: {...state.loading, ['place-ratings']: true},
      };
    }
    case GET_PUBLIC_PLACE_RATINGS_RECEIVE: {
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
    case GET_PUBLIC_PLACE_RATINGS_ERROR: {
      return {
        ...state,
        loading: {...state.loading, ['place-ratings']: false},
        error: {...state.error, ['place-ratings']: null},
      };
    }
    case GET_PUBLIC_PLACE_GALLERIES: {
      return {
        ...state,
        loading: {...state.loading, ['place-galleries']: true},
      };
    }
    case GET_PUBLIC_PLACE_GALLERIES_RECEIVE: {
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
    case GET_PUBLIC_PLACE_GALLERIES_ERROR: {
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

export default appReducer;
