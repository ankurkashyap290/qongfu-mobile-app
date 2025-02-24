import {
  GET_PLACE_RATINGS,
  GET_PLACE_RATINGS_RECEIVE,
  GET_PLACE_RATINGS_ERROR,
} from '../actionTypes';

export const getPlaceRatings = (payload, pagination) => {
  return {type: GET_PLACE_RATINGS, payload, pagination};
};

export const getPlaceRatingsReceive = payload => {
  return {type: GET_PLACE_RATINGS_RECEIVE, payload};
};

export const getPlaceRatingsError = () => {
  return {type: GET_PLACE_RATINGS_ERROR};
};
