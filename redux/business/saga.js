import {takeEvery, put, call, fork, take} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import {API} from '../../services/api';
import moment from 'moment';
import {
  FETCH_ACCOUNT_STATUS,
  DEACTIVATE_BUSINESS_ACCOUNT,
  CREATE_PLACE,
  UPDATE_PLACE,
  FETCH_USER_PLACES,
  GET_USER_PLACE,
  CREATE_CLAIM,
  FETCH_BUSINESSES,
  UPDATE_CLAIM,
  FETCH_REPORTED_REVIEWS,
  REPORT_A_REVIEW,
  DELETE_REPORTED_REVIEW,
  SEARCH_UNCLAIMED,
  CREATE_CALENDER_SCHEDULE,
  UPDATE_CALENDER_SCHEDULE,
  DELETE_CALENDER_SCHEDULE,
  GET_BUSINESS_PLACE_RATINGS,
  GET_BUSINESS_PLACE_GALLERIES,
} from '../actionTypes';

import {
  fetchAccountStatusReceive,
  fetchAccountStatusError,
  deactivateBusinessAccountReceive,
  deactivateBusinessAccountError,
  createPlaceReceive,
  createPlaceError,
  updatePlaceReceive,
  updatePlaceError,
  setUploadProgressParam,
  fetchUserPlacesReceive,
  fetchUserPlacesError,
  getUserPlaceReceive,
  getUserPlaceError,
  createClaimReceive,
  createClaimError,
  fetchBusinessesReceive,
  fetchBusinessesError,
  updateClaimReceive,
  updateClaimError,
  fetchReportedReviewsReceive,
  fetchReportedReviewsError,
  reportAReviewReceive,
  reportAReviewError,
  deleteReportedReviewReceive,
  deleteReportedReviewError,
  searchUnClaimedReceive,
  searchUnClaimedError,
  createCalenderScheduleReceive,
  createCalenderScheduleError,
  updateCalenderScheduleReceive,
  updateCalenderScheduleError,
  deleteCalenderScheduleReceive,
  deleteCalenderScheduleError,
  getBusinessPlaceRatingsReceive,
  getBusinessPlaceRatingsError,
  getBusinessPlaceGalleriesReceive,
  getBusinessPlaceGalleriesError,
} from './actions';

import {SuccessStatusCode} from '../../config';

export function* fetchAccountStatus() {
  yield takeEvery(FETCH_ACCOUNT_STATUS, function* ({token}) {
    try {
      const response = yield call(API.getAccountStatus, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          fetchAccountStatusReceive({
            data: {
              ...response.data.data,
              lastFetchedTime: moment(),
            },
          }),
        );
      } else {
        yield put(fetchAccountStatusError(response.message));
      }
    } catch (ex) {
      yield put(fetchAccountStatusError('Error while fetching places'));
    }
  });
}

export function* deactivateBusinessAccount() {
  yield takeEvery(DEACTIVATE_BUSINESS_ACCOUNT, function* ({payload, token}) {
    try {
      const response = yield call(API.deactivateAccount, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(deactivateBusinessAccountReceive(response.data));
      } else {
        yield put(deactivateBusinessAccountError(response.message));
      }
    } catch (ex) {
      yield put(
        deactivateBusinessAccountError(
          'Error while deactivating business account',
        ),
      );
    }
  });
}

export function* createPlace() {
  yield takeEvery(CREATE_PLACE, function* ({payload, token}) {
    try {
      const {logo, location_data, ...rest} = payload;
      const data = new FormData();
      if (logo) {
        data.append('logo[image]', logo, logo.name);
      }
      if (location_data) {
        Object.keys(location_data).map((item) => {
          if (location_data[item]) {
            //not empty
            data.append(`location_data[${item}]`, location_data[item]);
          }
        });
      }
      for (const key in rest) {
        data.append(key, rest[key]);
      }
      const [uploadPromise, chan] = yield call(
        createUploader,
        null,
        token,
        data,
        API.createUserPlaceWithMedia,
      );
      yield fork(uploadProgressWatcher, chan);
      const result = yield call(() => uploadPromise);
      const response = {
        data: result.data,
        status: result.status,
        message:
          result.status === 'ERROR'
            ? result.error.error
              ? result.error.error.message
              : result.error.message
            : '',
      };
      if (SuccessStatusCode.includes(response.status)) {
        yield put(createPlaceReceive(response.data.data));
      } else {
        yield put(createPlaceError(response.message));
      }
    } catch (ex) {
      console.log('Error', ex);
      yield put(createPlaceError('Error while creating place'));
    }
  });
}

function createUploader(placeId, token, data, apiFn) {
  let emit;
  const chan = eventChannel((emitter) => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({total, loaded}) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };

  const uploadPromise = placeId
    ? apiFn(placeId, token, data, uploadProgressCb)
    : apiFn(token, data, uploadProgressCb);
  return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan) {
  while (true) {
    const progress = yield take(chan);
    yield put(setUploadProgressParam(progress));
  }
}

export function* updatePlace() {
  yield takeEvery(UPDATE_PLACE, function* ({payload, token, updateType}) {
    try {
      let imageUpload = false;
      let data;
      let placeId;
      if (['logo', 'cover', 'media'].includes(updateType)) {
        const {id, logo, cover, location_data, ...rest} = payload;
        placeId = id;
        data = new FormData();
        if (logo) {
          data.append('logo[image]', logo, logo.name);
        }
        if (cover) {
          data.append('cover[image]', cover, cover.name);
        }
        if (location_data) {
          Object.keys(location_data).map((item) => {
            if (location_data[item]) {
              //not empty
              data.append(`location_data[${item}]`, location_data[item]);
            }
          });
        }
        for (const key in rest) {
          data.append(key, rest[key]);
        }
        imageUpload = true;
      } else {
        const {id, ...rest} = payload;
        placeId = id;
        data = rest;
      }
      if (!placeId) {
        throw new Error('Missing Place Id');
      }
      let response;
      if (imageUpload) {
        const [uploadPromise, chan] = yield call(
          createUploader,
          placeId,
          token,
          data,
          API.updatePlaceWithMedia,
        );
        yield fork(uploadProgressWatcher, chan);
        const result = yield call(() => uploadPromise);
        response = {
          data: result.data,
          status: result.status,
          message:
            result.status === 'ERROR'
              ? result.error.error
                ? result.error.error.message
                : result.error.message
              : '',
        };
      } else {
        response = yield call(API.updatePlace, placeId, data, token);
      }

      if (SuccessStatusCode.includes(response.status)) {
        yield put(updatePlaceReceive(response.data, updateType));
      } else if (response.status === 401) {
        yield put(updatePlaceError(updateType, '401'));
      } else {
        yield put(updatePlaceError(updateType, response.message));
      }
    } catch (ex) {
      console.log('ex**********', ex);
      yield put(updatePlaceError(updateType, 'Error while updating place'));
    }
  });
}

export function* fetchUserPlaces() {
  yield takeEvery(FETCH_USER_PLACES, function* ({token}) {
    try {
      const response = yield call(API.fetchUserPlaces, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(fetchUserPlacesReceive(response.data));
      } else {
        yield put(fetchUserPlacesError(response.message));
      }
    } catch (ex) {
      yield put(fetchUserPlacesError('Error while fetching places'));
    }
  });
}

export function* getUserPlace() {
  yield takeEvery(GET_USER_PLACE, function* ({payload}) {
    try {
      const {placeId, token, ...queryParams} = payload;
      const response = yield call(
        API.getUserPlace,
        placeId,
        queryParams,
        token,
      );
      if (SuccessStatusCode.includes(response.status)) {
        yield put(getUserPlaceReceive(response));
      } else {
        yield put(getUserPlaceError(response.message));
      }
    } catch (ex) {
      console.log('get user place errpr', ex);
      yield put(getUserPlaceError('Error while fetching place'));
    }
  });
}

export function* createClaim() {
  yield takeEvery(CREATE_CLAIM, function* ({payload, token}) {
    try {
      const {documents, updateTitleRequiredDocuments, ...rest} = payload;
      const data = new FormData();
      if (documents && documents.length) {
        documents.map((document, index) => {
          const key = `documents[${index + 1}]`;
          data.append(key + '[label]', document.title);
          data.append(key + '[document]', document.file);
          if (document.expiration) {
            data.append(key + '[expiration]', document.expiration);
          }
          return document;
        });
      }
      for (const key in rest) {
        data.append(key, rest[key]);
      }

      const [uploadPromise, chan] = yield call(
        createUploader,
        null,
        token,
        data,
        API.createClaimMedia,
      );
      yield fork(uploadProgressWatcher, chan);
      const result = yield call(() => uploadPromise);
      const response = {
        data: result.data,
        status: result.status,
        message:
          result.status === 'ERROR'
            ? result.error.error
              ? result.error.error.message
              : result.error.message
            : '',
      };
      if (SuccessStatusCode.includes(response.status)) {
        if (
          updateTitleRequiredDocuments &&
          updateTitleRequiredDocuments.length
        ) {
          for (let i = 0; i < updateTitleRequiredDocuments.length; i++) {
            yield call(
              API.updateDocumentsTitle,
              updateTitleRequiredDocuments[i],
              token,
            );
          }
        }
        yield put(createClaimReceive(response.data.data));
      } else {
        yield put(createClaimError(response.message));
      }
    } catch (ex) {
      console.log('Error', ex);
      yield put(createClaimError('Error while creating claim'));
    }
  });
}

export function* fetchBusinesses() {
  yield takeEvery(FETCH_BUSINESSES, function* ({token}) {
    try {
      let places = [];
      let claims = [];
      const placesResponse = yield call(API.fetchUserPlaces, token);
      if (SuccessStatusCode.includes(placesResponse.status)) {
        places = [...placesResponse.data.data];
      }
      const claimsResponse = yield call(API.fetchUserClaims, token);
      if (SuccessStatusCode.includes(claimsResponse.status)) {
        claims = [...claimsResponse.data.data];
      }
      yield put(fetchBusinessesReceive({places, claims}));
    } catch (ex) {
      yield put(fetchBusinessesError('Error while fetching businesses'));
    }
  });
}

export function* reportAReview() {
  yield takeEvery(REPORT_A_REVIEW, function* ({payload, token}) {
    try {
      const response = yield call(API.reportAReview, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(reportAReviewReceive(response.data));
      } else {
        yield put(reportAReviewError(response.message));
      }
    } catch (ex) {
      yield put(reportAReviewError('Error while reporting a review'));
    }
  });
}

export function* updateClaim() {
  yield takeEvery(UPDATE_CLAIM, function* ({id, payload, token}) {
    try {
      const {documents, updateTitleRequiredDocuments, ...rest} = payload;
      const data = new FormData();
      if (documents && documents.length) {
        documents.map((document, index) => {
          const key = `documents[${index + 1}]`;
          data.append(key + '[label]', document.title);
          data.append(key + '[document]', document.file);
          if (document.expiration) {
            data.append(key + '[expiration]', document.expiration);
          }
          return document;
        });
      }
      for (const key in rest) {
        data.append(key, rest[key]);
      }

      const [uploadPromise, chan] = yield call(
        createUploader,
        id,
        token,
        data,
        API.updateClaimMedia,
      );
      yield fork(uploadProgressWatcher, chan);
      const result = yield call(() => uploadPromise);
      const response = {
        data: result.data,
        status: result.status,
        message:
          result.status === 'ERROR'
            ? result.error.error
              ? result.error.error.message
              : result.error.message
            : '',
      };
      if (SuccessStatusCode.includes(response.status)) {
        if (
          updateTitleRequiredDocuments &&
          updateTitleRequiredDocuments.length
        ) {
          for (let i = 0; i < updateTitleRequiredDocuments.length; i++) {
            yield call(
              API.updateDocumentsTitle,
              updateTitleRequiredDocuments[i],
              token,
            );
          }
        }
        yield put(updateClaimReceive(response.data.data));
      } else {
        yield put(updateClaimError(response.message));
      }
    } catch (ex) {
      console.log('Error', ex);
      yield put(updateClaimError('Error while updating claim'));
    }
  });
}

export function* fetchReportedReviews() {
  yield takeEvery(FETCH_REPORTED_REVIEWS, function* ({token}) {
    try {
      const response = yield call(API.fetchReportedReviews, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(fetchReportedReviewsReceive(response.data));
      } else {
        yield put(fetchReportedReviewsError(response.message));
      }
    } catch (ex) {
      yield put(
        fetchReportedReviewsError('Error while fetching reported reviews'),
      );
    }
  });
}

export function* deleteReportedReview() {
  yield takeEvery(DELETE_REPORTED_REVIEW, function* ({payload, token}) {
    try {
      const response = yield call(API.deleteReportedReview, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(deleteReportedReviewReceive(response.data));
      } else {
        yield put(deleteReportedReviewError(response.message));
      }
    } catch (ex) {
      yield put(reportAReviewError('Error while deleting reported review'));
    }
  });
}

export function* searchUnClaimed() {
  yield takeEvery(SEARCH_UNCLAIMED, function* ({payload}) {
    try {
      const response = yield call(API.searchUnclaimed, payload);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          searchUnClaimedReceive(
            response.data.filter((place) => place.user_id === null),
          ),
        );
      } else {
        yield put(searchUnClaimedError(response.message));
      }
    } catch (ex) {
      yield put(searchUnClaimedError('Error while searching unclaimed list'));
    }
  });
}

export function* createCalenderSchedule() {
  yield takeEvery(CREATE_CALENDER_SCHEDULE, function* ({
    placeId,
    payload,
    token,
  }) {
    try {
      const response = yield call(
        API.createCalenderSchedule,
        placeId,
        payload,
        token,
      );
      if (SuccessStatusCode.includes(response.status)) {
        yield put(createCalenderScheduleReceive(response.data.data));
      } else {
        yield put(createCalenderScheduleError(response.message));
      }
    } catch (ex) {
      yield put(createCalenderScheduleError('Error while creating schedule'));
    }
  });
}

export function* updateCalenderSchedule() {
  yield takeEvery(UPDATE_CALENDER_SCHEDULE, function* ({
    id,
    placeId,
    payload,
    token,
  }) {
    try {
      const response = yield call(
        API.updateCalenderSchedule,
        id,
        placeId,
        payload,
        token,
      );
      if (SuccessStatusCode.includes(response.status)) {
        yield put(updateCalenderScheduleReceive(response.data.data));
      } else {
        yield put(updateCalenderScheduleError(response.message));
      }
    } catch (ex) {
      yield put(updateCalenderScheduleError('Error while creating schedule'));
    }
  });
}

export function* deleteCalenderSchedule() {
  yield takeEvery(DELETE_CALENDER_SCHEDULE, function* ({id, placeId, token}) {
    try {
      const response = yield call(
        API.deleteCalenderSchedule,
        id,
        placeId,
        token,
      );
      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          deleteCalenderScheduleReceive({...response.data.data, id: id}),
        );
      } else {
        yield put(deleteCalenderScheduleError(response.message));
      }
    } catch (ex) {
      yield put(deleteCalenderScheduleError('Error while creating schedule'));
    }
  });
}

export function* getBusinessPlaceRatings() {
  yield takeEvery(GET_BUSINESS_PLACE_RATINGS, function* ({payload}) {
    const {refresh, placeId, token, ...queryParams} = payload;
    const response = yield call(API.getUserPlace, placeId, queryParams, token);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(
        getBusinessPlaceRatingsReceive({place: response.data}, refresh),
      );
    } else {
      yield put(getBusinessPlaceRatingsError());
    }
  });
}

export function* getBusinessPlaceGalleries() {
  yield takeEvery(GET_BUSINESS_PLACE_GALLERIES, function* ({payload}) {
    const {refresh, placeId, token, ...queryParams} = payload;
    const response = yield call(API.getUserPlace, placeId, queryParams, token);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(
        getBusinessPlaceGalleriesReceive({place: response.data}, refresh),
      );
    } else {
      yield put(getBusinessPlaceGalleriesError());
    }
  });
}
