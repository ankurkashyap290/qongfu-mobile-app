import {takeEvery, put, call} from 'redux-saga/effects';
import {API} from '../../services/api';
import {GET_PLACE_RATINGS} from '../actionTypes';
import {getPlaceRatingsReceive, getPlaceRatingsError} from './actions';
import {SuccessStatusCode} from '../../config';

export function* getPlaceRating() {
  yield takeEvery(GET_PLACE_RATINGS, function*({payload, pagination}) {
    const {slug, ...queryParams} = payload;
    const tempPagination = {
      total: 0,
      page: 1,
      pageSize: 10,
    };
    if (pagination) {
      queryParams.page = pagination.page;
      queryParams.per_page = pagination.pageSize;
    }
    const response = yield call(API.getPlaceRating, slug, queryParams);
    if (SuccessStatusCode.includes(response.status)) {
      if (pagination) {
        pagination.totalPage = response.data.rating.last_page;
        pagination.total = response.data.rating.total;
      } else {
        tempPagination.totalPage = response.data.rating.last_page;
        tempPagination.total = response.data.rating.total;
      }
      yield put(
        getPlaceRatingsReceive({
          place: response.data.place,
          ratings: response.data.rating,
          pagination: pagination || tempPagination,
        }),
      );
    } else {
      yield put(getPlaceRatingsError());
    }
  });
}
