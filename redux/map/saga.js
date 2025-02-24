import {takeEvery, put, call} from 'redux-saga/effects';
import {API} from '../../services/api';
import {FETCH_ALL_PLACES} from '../actionTypes';
import {fetchAllPlacesReceive, fetchAllPlacesError} from './actions';
import {SuccessStatusCode} from '../../config';

export function* fetchAllPlaces() {
  yield takeEvery(FETCH_ALL_PLACES, function*({payload}) {
    const {__extras, ...data} = payload;
    const queryParams = {...data};
    try {
      const response = yield call(API.fetchMapPlaces, queryParams);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          fetchAllPlacesReceive(
            {
              places: response.data.data,
              locations: response.data.locations,
              params: response.data.params,
            },
            __extras,
          ),
        );
      } else {
        yield put(fetchAllPlacesError('Error while fetching places'));
      }
    } catch (ex) {
      // yield call(toast, 'Error while fetching places');
      yield put(fetchAllPlacesError('Error while fetching places'));
    }
  });
}
