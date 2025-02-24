import {
  FETCH_ALL_PLACES,
  FETCH_ALL_PLACES_ERROR,
  FETCH_ALL_PLACES_RECEIVE,
} from '../actionTypes';

export const fetchAllPlaces = payload => {
  return {type: FETCH_ALL_PLACES, payload};
};

export const fetchAllPlacesReceive = (payload, __extras) => {
  return {type: FETCH_ALL_PLACES_RECEIVE, payload, __extras};
};

export const fetchAllPlacesError = () => {
  return {type: FETCH_ALL_PLACES_ERROR};
};
