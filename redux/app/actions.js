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
  SEARCH_PLACES_ERROR,
  SEARCH_PLACES_RECEIVE,
  SET_LOCATION,
  SET_COUNTRY_LOCATION,
  GET_PLACE,
  GET_PLACE_RECEIVE,
  GET_PLACE_ERROR,
  SAVE_PLACE_RATING,
  SAVE_PLACE_RATING_ERROR,
  SAVE_PLACE_RATING_RECEIVE,
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
  FETCH_SEARCH_SUGGESTIONS_RECEIVE,
  FETCH_SEARCH_SUGGESTIONS_ERROR,
  FETCH_GLOBAL_CONFIG,
  FETCH_GLOBAL_CONFIG_RECEIVE,
  FETCH_GLOBAL_CONFIG_ERROR,
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

export const fetchInitialData = () => {
  return {type: FETCH_INITIAL_DATA};
};

export const fetchInitialDataReceive = (payload) => {
  return {type: FETCH_INITIAL_DATA_RECEIVE, payload};
};

export const fetchInitialDataError = () => {
  return {type: FETCH_INITIAL_DATA_ERROR};
};

export const getAllQongfus = () => {
  return {type: FETCH_ALL_QONGFUS};
};

export const getAllQongfusReceive = (payload) => {
  return {type: FETCH_ALL_QONGFUS_RECEIVE, payload};
};

export const getAllQongfusError = () => {
  return {type: FETCH_ALL_QONGFUS_ERROR};
};

export const getAllLifestyles = () => {
  return {type: GET_ALL_LIFESTYLES};
};

export const getAllLifestylesReceive = (payload) => {
  return {type: GET_ALL_LIFESTYLES_RECEIVE, payload};
};

export const getAllLifestylesError = () => {
  return {type: GET_ALL_LIFESTYLES_ERROR};
};

export const fetchPlaces = (
  pageKey,
  payload,
  selectedCountry,
  pagination,
  mode,
) => {
  return {
    type: FETCH_PLACES,
    pageKey,
    payload,
    selectedCountry,
    pagination,
    mode,
  };
};

export const fetchPlacesReceive = (pageKey, payload) => {
  return {type: FETCH_PLACES_RECEIVE, pageKey, payload};
};

export const fetchPlacesError = (pageKey) => {
  return {type: FETCH_PLACES_ERROR, pageKey};
};

export const setAdvanceFilterOpen = (pageKey, value) => {
  return {type: ADVANCE_FILTER_OPEN, pageKey, value};
};

export const setAdvanceFilter = (pageKey, payload) => {
  return {type: SET_ADVANCE_FILTER, pageKey, payload};
};

export const searchPlaces = (payload) => {
  return {type: SEARCH_PLACES, payload};
};

export const searchPlacesReceive = (payload) => {
  return {type: SEARCH_PLACES_RECEIVE, payload};
};

export const searchPlacesError = () => {
  return {type: SEARCH_PLACES_ERROR};
};

export const setLocation = (payload) => {
  return {type: SET_LOCATION, payload};
};

export const setCountryLocation = (payload) => {
  return {type: SET_COUNTRY_LOCATION, payload};
};

export const getPlace = (payload) => {
  return {type: GET_PLACE, payload};
};

export const getPlaceReceive = (payload) => {
  return {type: GET_PLACE_RECEIVE, payload};
};

export const getPlaceError = (payload) => {
  return {type: GET_PLACE_ERROR, payload};
};

export const savePlaceRating = (payload, token) => {
  return {type: SAVE_PLACE_RATING, payload, token};
};

export const savePlaceRatingReceive = (payload) => {
  return {type: SAVE_PLACE_RATING_RECEIVE, payload};
};

export const savePlaceRatingError = (error) => {
  return {type: SAVE_PLACE_RATING_ERROR, error};
};

export const resetAppStore = () => {
  return {type: RESET_APP_STORE};
};

export const setGlobalLoading = (value) => {
  return {type: SET_GLOBAL_LOADING, value};
};

export const setLifestyleSlug = (value) => {
  return {type: SET_LIFESTYLE_SLUG, value};
};

export const resetPlaceRatingSuccessFlag = () => {
  return {type: RESET_PLACE_RATING_SUCCESS_FLAG};
};

export const setAreasAndCities = (payload) => {
  return {type: SET_AREAS_AND_CITIES, payload};
};

export const setAppCountry = (payload) => {
  return {type: SET_APP_COUNTRY, payload};
};

export const updateCountryLocation = (payload) => {
  return {type: UPDATE_COUNTRY_LOCATION, payload};
};

export const updateMapLocationChange = (payload) => {
  return {type: UPDATE_MAP_LOCATION_CHANGE, payload};
};

export const searchSuggestions = (payload) => {
  return {type: FETCH_SEARCH_SUGGESTIONS, payload};
};

export const searchSuggestionsReceive = (payload) => {
  return {type: FETCH_SEARCH_SUGGESTIONS_RECEIVE, payload};
};

export const searchSuggestionsError = () => {
  return {type: FETCH_SEARCH_SUGGESTIONS_ERROR};
};

export const fetchGlobalConfig = (payload) => {
  return {type: FETCH_GLOBAL_CONFIG, payload};
};

export const fetchGlobalConfigReceive = (payload) => {
  return {type: FETCH_GLOBAL_CONFIG_RECEIVE, payload};
};

export const fetchGlobalConfigError = (error) => {
  return {type: FETCH_GLOBAL_CONFIG_ERROR, error};
};

export const updateGlobalConfig = (payload) => {
  return {type: UPDATE_GLOBAL_CONFIG, payload};
};

export const addNotificationToQueue = (payload) => {
  return {type: ADD_NOTIFICATION_TO_QUEUE, payload};
};

export const removeNotificationFromQueue = (id) => {
  return {type: REMOVE_NOTIFICATION_FROM_QUEUE, id};
};

export const clearNotificationQueue = () => {
  return {type: CLEAR_NOTIFICATION_QUEUE};
};

export const fetchFirebaseToken = () => {
  return {type: FETCH_FCM_TOKEN};
};

export const fetchFirebaseTokenReceive = (payload) => {
  return {type: FETCH_FCM_TOKEN_RECEIVE, payload};
};

export const fetchFirebaseTokenError = (error) => {
  return {type: FETCH_FCM_TOKEN_ERROR, error};
};

export const setParentScrollView = (flag) => {
  return {type: SET_PARENT_SCROLL, flag};
};

export const getPlaceRatings = (payload) => {
  return {type: GET_PUBLIC_PLACE_RATINGS, payload};
};

export const getPlaceRatingsReceive = (payload, refresh) => {
  return {type: GET_PUBLIC_PLACE_RATINGS_RECEIVE, payload, refresh};
};

export const getPlaceRatingsError = (error) => {
  return {type: GET_PUBLIC_PLACE_RATINGS_ERROR, error};
};

export const getPlaceGalleries = (payload) => {
  return {type: GET_PUBLIC_PLACE_GALLERIES, payload};
};

export const getPlaceGalleriesReceive = (payload, refresh) => {
  return {type: GET_PUBLIC_PLACE_GALLERIES_RECEIVE, payload, refresh};
};

export const getPlaceGalleriesError = (error) => {
  return {type: GET_PUBLIC_PLACE_GALLERIES_ERROR, error};
};
