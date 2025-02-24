import {
  SAVE_PLACE_MEDIAS,
  SAVE_PLACE_MEDIAS_ERROR,
  SAVE_PLACE_MEDIAS_RECEIVE,
  GET_PLACE_MEDIAS,
  GET_PLACE_MEDIAS_ERROR,
  GET_PLACE_MEDIAS_RECEIVE,
  DELETE_PLACE_MEDIA,
  DELETE_PLACE_MEDIA_ERROR,
  DELETE_PLACE_MEDIA_RECEIVE,
  REPORT_A_POST,
  REPORT_A_POST_RECEIVE,
  REPORT_A_POST_ERROR,
  RESET_REPORTED_POST_FLAG,
  UPDATE_PLACE_MEDIA,
  UPDATE_PLACE_MEDIA_RECEIVE,
  UPDATE_PLACE_MEDIA_ERROR,
  UPDATE_PLACEM_MEDIA_PROGRESS_NUMBER,
  GET_MEDIA_POST,
  GET_MEDIA_POST_RECEIVE,
  GET_MEDIA_POST_ERROR,
  UPDATE_MEDIA_POSITION,
  UPDATE_MEDIA_POSITION_RECEIVE,
  UPDATE_MEDIA_POSITION_ERROR,
  RESET_UPDATE_PLACE_STATUS,
  RESET_PLACES_STATE,
} from '../actionTypes';

export const savePlaceMedias = (payload, token) => {
  return {type: SAVE_PLACE_MEDIAS, payload, token};
};

export const savePlaceMediasReceive = (payload) => {
  return {type: SAVE_PLACE_MEDIAS_RECEIVE, payload};
};

export const savePlaceMediasError = (error) => {
  return {type: SAVE_PLACE_MEDIAS_ERROR, error};
};

export const getPlaceMedias = (payload, pagination, token) => {
  return {type: GET_PLACE_MEDIAS, payload, pagination, token};
};

export const getPlaceMediasReceive = (payload) => {
  return {type: GET_PLACE_MEDIAS_RECEIVE, payload};
};

export const getPlaceMediasError = (error) => {
  return {type: GET_PLACE_MEDIAS_ERROR, error};
};
export const deletePlaceMedia = (payload, token) => {
  return {type: DELETE_PLACE_MEDIA, payload, token};
};

export const deletePlaceMediaReceive = (payload) => {
  return {type: DELETE_PLACE_MEDIA_RECEIVE, payload};
};

export const deletePlaceMediaError = (error) => {
  return {type: DELETE_PLACE_MEDIA_ERROR, error};
};

export const reportAPost = (payload, token) => {
  return {type: REPORT_A_POST, payload, token};
};

export const reportAPostReceive = (payload) => {
  return {type: REPORT_A_POST_RECEIVE, payload};
};

export const reportAPostError = (error) => {
  return {type: REPORT_A_POST_ERROR, error};
};

export const resetReportedPostFlag = () => {
  return {type: RESET_REPORTED_POST_FLAG};
};

export const updatePlaceMedia = (id, payload, token) => {
  return {type: UPDATE_PLACE_MEDIA, id, payload, token};
};

export const updatePlaceMediaReceive = (payload) => {
  return {type: UPDATE_PLACE_MEDIA_RECEIVE, payload};
};

export const updatePlaceMediaError = (error) => {
  return {type: UPDATE_PLACE_MEDIA_ERROR, error};
};

export const setMediaUploadProgressParam = (payload) => {
  return {type: UPDATE_PLACEM_MEDIA_PROGRESS_NUMBER, payload};
};

export const getMediaPost = (payload, token) => {
  return {type: GET_MEDIA_POST, payload, token};
};

export const getMediaPostReceive = (payload) => {
  return {type: GET_MEDIA_POST_RECEIVE, payload};
};

export const getMediaPostError = (error) => {
  return {type: GET_MEDIA_POST_ERROR, error};
};

export const updateMediaPosition = (payload, token) => {
  return {type: UPDATE_MEDIA_POSITION, payload, token};
};

export const updateMediaPositionReceive = (payload) => {
  return {type: UPDATE_MEDIA_POSITION_RECEIVE, payload};
};

export const updateMediaPositionError = (error) => {
  return {type: UPDATE_MEDIA_POSITION_ERROR, error};
};

export const resetUpdatedStatusFlag = (resetKey) => {
  return {type: RESET_UPDATE_PLACE_STATUS, resetKey};
};

export const resetPlacesState = () => {
  return {type: RESET_PLACES_STATE};
};
