import {takeEvery, put, call, fork, take} from 'redux-saga/effects';
import {API} from '../../services/api';
import {eventChannel, END} from 'redux-saga';
import {
  SAVE_PLACE_MEDIAS,
  GET_PLACE_MEDIAS,
  DELETE_PLACE_MEDIA,
  REPORT_A_POST,
  UPDATE_PLACE_MEDIA,
  GET_MEDIA_POST,
  UPDATE_MEDIA_POSITION,
} from '../actionTypes';
import {
  savePlaceMediasReceive,
  savePlaceMediasError,
  getPlaceMediasReceive,
  getPlaceMediasError,
  deletePlaceMediaReceive,
  deletePlaceMediaError,
  reportAPostReceive,
  reportAPostError,
  updatePlaceMediaReceive,
  updatePlaceMediaError,
  getMediaPostReceive,
  getMediaPostError,
  updateMediaPositionReceive,
  updateMediaPositionError,
} from './actions';
import {setUploadProgressParam} from '../business/actions';
import {SuccessStatusCode} from '../../config';

export function* savePlaceMedias() {
  yield takeEvery(SAVE_PLACE_MEDIAS, function* ({payload, token}) {
    try {
      const {media, ...rest} = payload;
      const data = new FormData();
      if (media && media.length) {
        media.map((media, index) => {
          const {position, ...file} = media;
          const key = `media[${index}]`;
          data.append(key + '[file]', file);
          data.append(key + '[position]', position);
          return media;
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
        API.savePlaceMedias,
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
        yield put(savePlaceMediasReceive(response.data.data));
      } else {
        yield put(savePlaceMediasError(response.message));
      }
    } catch (ex) {
      console.log('Error', ex);
      yield put(savePlaceMediasError('Error while saving post'));
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

export function* updatePlaceMedia() {
  yield takeEvery(UPDATE_PLACE_MEDIA, function* ({id, payload, token}) {
    try {
      const {media, positionedMedia, deletedMedia, ...rest} = payload;
      const data = new FormData();
      if (media && media.length) {
        media.map((media, index) => {
          const key = `media[${index + 1}]`;
          data.append(key + '[file]', media);
          data.append(key + '[position]', media.position);
          return media;
        });
      }
      for (const key in rest) {
        data.append(key, rest[key]);
      }

      // deleteMedia -
      if (deletedMedia && deletedMedia.length) {
        const deleteResponse = yield call(
          API.deleteGalleryMedia,
          id,
          deletedMedia,
          token,
        );
      }
      // change positions -
      if (positionedMedia && positionedMedia.length) {
        const positionResponse = yield call(
          API.changePositionsGalleryMedia,
          id,
          positionedMedia,
          token,
        );
      }

      const [uploadPromise, chan] = yield call(
        createUploader,
        id,
        token,
        data,
        API.updatePlaceMedia,
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
      if (SuccessStatusCode.includes(response.status)) {
        yield put(updatePlaceMediaReceive(response.data.data));
      } else {
        yield put(updatePlaceMediaError(response.message));
      }
    } catch (ex) {
      yield put(updatePlaceMediaError('Error while updating media post'));
    }
  });
}

export function* getPlaceMedias() {
  yield takeEvery(GET_PLACE_MEDIAS, function* ({payload, pagination, token}) {
    try {
      const tempPagination = {
        total: 0,
        page: 1,
        pageSize: 10,
      };
      if (pagination) {
        payload.page = pagination.page;
        payload.per_page = pagination.pageSize;
      }
      const response = yield call(API.fetchPlaceMedias, payload, token);

      if (SuccessStatusCode.includes(response.status)) {
        // if (pagination) {
        //   pagination.totalPage = response.data.rating.last_page;
        //   pagination.total = response.data.rating.total;
        // } else {
        //   tempPagination.totalPage = response.data.rating.last_page;
        //   tempPagination.total = response.data.rating.total;
        // }
        // if (pagination) {
        //   pagination.totalPage = response.meta.last_page;
        //   pagination.total = response.total;
        // } else {
        //   tempPagination.totalPage = response.meta.last_page;
        //   tempPagination.total = response.total;
        // }
        yield put(getPlaceMediasReceive(response.data.data));
      } else {
        yield put(getPlaceMediasError(response.message));
      }
    } catch (ex) {
      // yield call(toast, 'Error while fetching places');
      yield put(getPlaceMediasError('Error while fetching posts'));
    }
  });
}

export function* deletePlaceMedias() {
  yield takeEvery(DELETE_PLACE_MEDIA, function* ({payload, token}) {
    try {
      const response = yield call(API.deletePlaceMedia, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(deletePlaceMediaReceive());
      } else {
        yield put(deletePlaceMediaError(response.message));
      }
    } catch (ex) {
      yield put(deletePlaceMediaError('Error while deleting post'));
    }
  });
}

export function* reportAPost() {
  yield takeEvery(REPORT_A_POST, function* ({payload, token}) {
    try {
      const response = yield call(API.reportAPost, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(reportAPostReceive(response.data));
      } else {
        yield put(reportAPostError(response.message));
      }
    } catch (ex) {
      yield put(reportAPostError('Error while reporting a post'));
    }
  });
}

export function* getMediaPost() {
  yield takeEvery(GET_MEDIA_POST, function* ({payload, token}) {
    try {
      const response = yield call(API.getMediaPost, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(getMediaPostReceive(response.data.data));
      } else {
        yield put(getMediaPostError(response.message));
      }
    } catch (ex) {
      yield put(getMediaPostError('Error while fetching place'));
    }
  });
}

export function* updateMediaPosition() {
  yield takeEvery(UPDATE_MEDIA_POSITION, function* ({payload, token}) {
    try {
      const response = yield call(API.updateMediaPosition, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(updateMediaPositionReceive(response.data.data));
      } else {
        yield put(updateMediaPositionError(response.message));
      }
    } catch (ex) {
      yield put(updateMediaPositionError('Error while updating media post'));
    }
  });
}
