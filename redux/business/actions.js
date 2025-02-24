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

export const fetchAccountStatus = (token) => {
  return {type: FETCH_ACCOUNT_STATUS, token};
};

export const fetchAccountStatusReceive = (payload) => {
  return {type: FETCH_ACCOUNT_STATUS_RECEIVE, payload};
};

export const fetchAccountStatusError = (error) => {
  return {type: FETCH_ACCOUNT_STATUS_ERROR, error};
};

export const deactivateBusinessAccount = (payload, token) => {
  return {type: DEACTIVATE_BUSINESS_ACCOUNT, payload, token};
};

export const deactivateBusinessAccountReceive = (payload) => {
  return {type: DEACTIVATE_BUSINESS_ACCOUNT_RECEIVE, payload};
};

export const deactivateBusinessAccountError = (error) => {
  return {type: DEACTIVATE_BUSINESS_ACCOUNT_ERROR, error};
};

export const resetBusinessUpdateStatus = (key) => {
  return {type: RESET_BUSINESS_UPDATE_STATUS, key};
};

export const createPlace = (payload, token) => {
  return {type: CREATE_PLACE, payload, token};
};

export const createPlaceReceive = (payload) => {
  return {type: CREATE_PLACE_RECEIVE, payload};
};

export const createPlaceError = (error) => {
  return {type: CREATE_PLACE_ERROR, error};
};

export const updatePlace = (payload, token, updateType) => {
  return {type: UPDATE_PLACE, payload, token, updateType};
};

export const updatePlaceReceive = (payload, updateType) => {
  return {type: UPDATE_PLACE_RECEIVE, payload, updateType};
};

export const updatePlaceError = (updateType, error) => {
  return {type: UPDATE_PLACE_ERROR, error, updateType};
};

export const setUploadProgressParam = (payload) => {
  return {type: UPDATE_PLACE_PROGRESS_NUMBER, payload};
};

export const fetchUserPlaces = (token) => {
  return {type: FETCH_USER_PLACES, token};
};

export const fetchUserPlacesReceive = (payload) => {
  return {type: FETCH_USER_PLACES_RECEIVE, payload};
};

export const fetchUserPlacesError = (error) => {
  return {type: FETCH_USER_PLACES_ERROR, error};
};

export const getUserPlace = (payload, pagination, token, mode) => {
  return {type: GET_USER_PLACE, payload, pagination, token, mode};
};

export const getUserPlaceReceive = (payload, mode) => {
  return {type: GET_USER_PLACE_RECEIVE, payload, mode};
};

export const getUserPlaceError = (error) => {
  return {type: GET_USER_PLACE_ERROR, error};
};

export const createClaim = (payload, token) => {
  return {type: CREATE_CLAIM, payload, token};
};

export const createClaimReceive = (payload) => {
  return {type: CREATE_CLAIM_RECEIVE, payload};
};

export const createClaimError = (error) => {
  return {type: CREATE_CLAIM_ERROR, error};
};

export const fetchBusinesses = (token) => {
  return {type: FETCH_BUSINESSES, token};
};

export const fetchBusinessesReceive = (payload) => {
  return {type: FETCH_BUSINESSES_RECEIVE, payload};
};

export const fetchBusinessesError = (error) => {
  return {type: FETCH_BUSINESSES_ERROR, error};
};

export const updateClaim = (id, payload, token) => {
  return {type: UPDATE_CLAIM, id, payload, token};
};

export const updateClaimReceive = (payload) => {
  return {type: UPDATE_CLAIM_RECEIVE, payload};
};

export const updateClaimError = (error) => {
  return {type: UPDATE_CLAIM_ERROR, error};
};

export const reportAReview = (payload, token) => {
  return {type: REPORT_A_REVIEW, payload, token};
};

export const reportAReviewReceive = (payload) => {
  return {type: REPORT_A_REVIEW_RECEIVE, payload};
};

export const reportAReviewError = (error) => {
  return {type: REPORT_A_REVIEW_ERROR, error};
};

export const fetchReportedReviews = (token) => {
  return {type: FETCH_REPORTED_REVIEWS, token};
};

export const fetchReportedReviewsReceive = (payload) => {
  return {type: FETCH_REPORTED_REVIEWS_RECEIVE, payload};
};

export const fetchReportedReviewsError = (error) => {
  return {type: FETCH_REPORTED_REVIEWS_ERROR, error};
};

export const deleteReportedReview = (payload, token) => {
  return {type: DELETE_REPORTED_REVIEW, payload, token};
};

export const deleteReportedReviewReceive = (payload) => {
  return {type: DELETE_REPORTED_REVIEW_RECEIVE, payload};
};

export const deleteReportedReviewError = (error) => {
  return {type: DELETE_REPORTED_REVIEW_ERROR, error};
};

export const resetReportedReviewFlag = () => {
  return {type: RESET_REPORTED_REVIEW_FLAG};
};

export const searchUnClaimed = (payload) => {
  return {type: SEARCH_UNCLAIMED, payload};
};

export const searchUnClaimedReceive = (payload) => {
  return {type: SEARCH_UNCLAIMED_RECEIVE, payload};
};

export const searchUnClaimedError = (error) => {
  return {type: SEARCH_UNCLAIMED_ERROR, error};
};

export const selectBusiness = (payload) => {
  return {type: SELECT_BUSINESS, payload};
};

export const createCalenderSchedule = (placeId, payload, token) => {
  return {type: CREATE_CALENDER_SCHEDULE, placeId, payload, token};
};

export const createCalenderScheduleReceive = (payload) => {
  return {type: CREATE_CALENDER_SCHEDULE_RECEIVE, payload};
};

export const createCalenderScheduleError = (error) => {
  return {type: CREATE_CALENDER_SCHEDULE_ERROR, error};
};

export const updateCalenderSchedule = (id, placeId, payload, token) => {
  return {type: UPDATE_CALENDER_SCHEDULE, id, placeId, payload, token};
};

export const updateCalenderScheduleReceive = (payload) => {
  return {type: UPDATE_CALENDER_SCHEDULE_RECEIVE, payload};
};

export const updateCalenderScheduleError = (error) => {
  return {type: UPDATE_CALENDER_SCHEDULE_ERROR, error};
};

export const deleteCalenderSchedule = (id, placeId, token) => {
  return {type: DELETE_CALENDER_SCHEDULE, id, placeId, token};
};

export const deleteCalenderScheduleReceive = (payload) => {
  return {type: DELETE_CALENDER_SCHEDULE_RECEIVE, payload};
};

export const deleteCalenderScheduleError = (error) => {
  return {type: DELETE_CALENDER_SCHEDULE_ERROR, error};
};

export const updateAccountStatus = (payload) => {
  return {type: UPDATE_ACCOUNT_STATUS, payload};
};

export const resetBusinessState = () => {
  return {type: RESET_BUSINESS_STATE};
};

export const getBusinessPlaceRatings = (payload) => {
  return {type: GET_BUSINESS_PLACE_RATINGS, payload};
};

export const getBusinessPlaceRatingsReceive = (payload, refresh) => {
  return {type: GET_BUSINESS_PLACE_RATINGS_RECEIVE, payload, refresh};
};

export const getBusinessPlaceRatingsError = (error) => {
  return {type: GET_BUSINESS_PLACE_RATINGS_ERROR, error};
};

export const getBusinessPlaceGalleries = (payload) => {
  return {type: GET_BUSINESS_PLACE_GALLERIES, payload};
};

export const getBusinessPlaceGalleriesReceive = (payload, refresh) => {
  return {type: GET_BUSINESS_PLACE_GALLERIES_RECEIVE, payload, refresh};
};

export const getBusinessPlaceGalleriesError = (error) => {
  return {type: GET_BUSINESS_PLACE_GALLERIES_ERROR, error};
};
