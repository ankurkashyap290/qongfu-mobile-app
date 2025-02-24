import {takeEvery, put, call} from 'redux-saga/effects';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import {API} from '../../services/api';
import {
  FETCH_ALL_QONGFUS,
  GET_ALL_LIFESTYLES,
  FETCH_PLACES,
  SEARCH_PLACES,
  GET_PLACE,
  SAVE_PLACE_RATING,
  FETCH_INITIAL_DATA,
  FETCH_SEARCH_SUGGESTIONS,
  FETCH_GLOBAL_CONFIG,
  FETCH_FCM_TOKEN,
  GET_PUBLIC_PLACE_RATINGS,
  GET_PUBLIC_PLACE_GALLERIES,
} from '../actionTypes';
import {
  getAllQongfusReceive,
  getAllQongfusError,
  getAllLifestylesReceive,
  getAllLifestylesError,
  fetchPlacesReceive,
  fetchPlacesError,
  searchPlacesReceive,
  searchPlacesError,
  getPlaceReceive,
  getPlaceError,
  savePlaceRatingReceive,
  savePlaceRatingError,
  setGlobalLoading,
  fetchInitialDataReceive,
  setAreasAndCities,
  searchSuggestionsReceive,
  searchSuggestionsError,
  fetchGlobalConfigReceive,
  fetchGlobalConfigError,
  fetchFirebaseTokenReceive,
  fetchFirebaseTokenError,
  getPlaceRatingsReceive,
  getPlaceRatingsError,
  getPlaceGalleriesReceive,
  getPlaceGalleriesError,
} from './actions';
import {SuccessStatusCode, QONGFU_FCM_TOKEN_KEY} from '../../config';

export function* fecthInitialData() {
  yield takeEvery(FETCH_INITIAL_DATA, function* ({}) {
    const lifestylesResponse = yield call(API.getAllLifestyles);
    const qongfusResponse = yield call(API.getAllQongfus);
    const countriesResponse = yield call(API.getAllCountries);
    const languagesResponse = yield call(API.getAllLanguages);
    const amenitiesResponse = yield call(API.getAllAmenities);
    const globalConfigResponse = yield call(API.getGlobalConfiguration, {
      per_page: 100,
    });

    let response = {
      lifestyles: [],
      qongfus: [],
      countries: [],
      languages: [],
      amenities: [],
      globalConfig: null,
    };

    if (SuccessStatusCode.includes(lifestylesResponse.status)) {
      response.lifestyles = lifestylesResponse.data.data;
    }

    if (SuccessStatusCode.includes(qongfusResponse.status)) {
      response.qongfus = qongfusResponse.data.data;
    }

    if (SuccessStatusCode.includes(countriesResponse.status)) {
      const tempCountries = countriesResponse.data.data.map((country) => {
        if (country.id === 102) {
          country.approved = 1;
          return country;
        }
        return country;
      });
      response.countries = tempCountries;
    }

    if (SuccessStatusCode.includes(languagesResponse.status)) {
      response.languages = languagesResponse.data.records;
    }

    if (SuccessStatusCode.includes(amenitiesResponse.status)) {
      response.amenities = amenitiesResponse.data.data;
    }

    if (SuccessStatusCode.includes(globalConfigResponse.status)) {
      response.globalConfig = globalConfigResponse.data.data;
    }

    yield put(fetchInitialDataReceive(response));
  });
}

export function* getAllQongfus() {
  yield takeEvery(FETCH_ALL_QONGFUS, function* ({}) {
    // yield put(setGlobalLoading(true));
    const response = yield call(API.getAllQongfus);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(getAllQongfusReceive({qongfus: response.data.data}));
      //  yield put(setGlobalLoading(false));
    } else {
      yield put(getAllQongfusError());
      // yield put(setGlobalLoading(false));
    }
  });
}

export function* getAllLifestyles() {
  yield takeEvery(GET_ALL_LIFESTYLES, function* ({}) {
    //  yield put(setGlobalLoading(true));
    const response = yield call(API.getAllLifestyles);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(getAllLifestylesReceive({lifestyles: response.data.data}));
      //  yield put(setGlobalLoading(false));
    } else {
      //  yield put(setGlobalLoading(false));
      yield put(getAllLifestylesError());
    }
  });
}

export function* getPlaces() {
  yield takeEvery(FETCH_PLACES, function* ({
    pageKey,
    payload,
    selectedCountry,
    pagination,
    mode,
  }) {
    try {
      const queryParams = {...payload, country_id: selectedCountry};
      const tempPagination = {
        total: 0,
        page: 1,
        pageSize: 10,
      };
      if (pagination) {
        queryParams.page = pagination.page;
        queryParams.per_page = pagination.pageSize;
      }
      const response = yield call(API.getPlaces, queryParams);
      if (SuccessStatusCode.includes(response.status)) {
        if (pagination) {
          pagination.totalPage = response.data.data.last_page;
          pagination.total = response.data.total;
        } else {
          tempPagination.totalPage = response.data.data.last_page;
          tempPagination.total = response.data.total;
        }
        yield put(
          fetchPlacesReceive(pageKey, {
            places: response.data.data,
            locations: response.data.locations,
            params: response.data.params,
            pagination: pagination || tempPagination,
            mode,
          }),
        );

        yield put(setAreasAndCities(response.data.locations));
      } else {
        yield put(fetchPlacesError(pageKey));
      }
    } catch (ex) {
      yield put(fetchPlacesError(pageKey));
    }
  });
}

export function* searchPlaces() {
  yield takeEvery(SEARCH_PLACES, function* ({payload}) {
    try {
      const queryParams = {...payload};
      if (queryParams.search.length === 0) {
        delete queryParams.search;
      }
      const response = yield call(API.searchPlaces, queryParams);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(searchPlacesReceive(response.data));
      } else {
        yield put(searchPlacesError());
      }
    } catch (ex) {
      yield put(searchPlacesError());
    }
  });
}

export function* getPlace() {
  yield takeEvery(GET_PLACE, function* ({payload}) {
    const response = yield call(API.getPlace, payload);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(getPlaceReceive({place: response.data.data}));
    } else {
      yield put(getPlaceError());
    }
  });
}

export function* savePlaceRating() {
  yield takeEvery(SAVE_PLACE_RATING, function* ({payload, token}) {
    try {
      const response = yield call(API.savePlaceRating, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(savePlaceRatingReceive());
      } else {
        yield put(savePlaceRatingError(response.message));
      }
    } catch (ex) {
      yield put(
        savePlaceRatingError('Error while saving your reviews and ratings.'),
      );
    }
  });
}

export function* searchSuggestions() {
  yield takeEvery(FETCH_SEARCH_SUGGESTIONS, function* ({payload}) {
    try {
      const queryParams = {...payload};
      const response = yield call(API.searchSuggestions, queryParams);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(searchSuggestionsReceive(response.data));
      } else {
        yield put(searchSuggestionsError());
      }
    } catch (ex) {
      yield put(searchSuggestionsError());
    }
  });
}

export function* fetchGlobalConfig() {
  yield takeEvery(FETCH_GLOBAL_CONFIG, function* ({payload}) {
    try {
      const queryParams = {...payload, per_page: 100};
      const response = yield call(API.getGlobalConfiguration, queryParams);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(fetchGlobalConfigReceive(response.data));
      } else {
        yield put(fetchGlobalConfigError(response.data.message));
      }
    } catch (ex) {
      yield put(
        fetchGlobalConfigError('Error while fetching global configuration'),
      );
    }
  });
}

export function* fetchFirebaseToken() {
  yield takeEvery(FETCH_FCM_TOKEN, function* ({payload}) {
    try {
      // check fcm permission first
      const fcm = messaging();
      const enabled = yield fcm.hasPermission();
      console.log('hasPermission', enabled);
      let accessGranted = false;
      if (!enabled) {
        accessGranted = yield fcm.requestPermission();
        console.log('accessGrant', accessGranted);
      } else {
        accessGranted = true;
      }
      if (accessGranted) {
        const token = yield fcm.getToken();
        console.log('fcm token ***', token);
        AsyncStorage.setItem(QONGFU_FCM_TOKEN_KEY, token);
        yield put(fetchFirebaseTokenReceive({token: token}));
      } else {
        yield put(fetchFirebaseTokenError('Permission denied'));
      }
    } catch (ex) {
      console.log('ex', ex);
      yield put(
        fetchFirebaseTokenError(
          'Error while fetching firebase token for notifications',
        ),
      );
    }
  });
}

export function* getPlaceRatings() {
  yield takeEvery(GET_PUBLIC_PLACE_RATINGS, function* ({payload}) {
    const {refresh, ...queryParams} = payload;
    const response = yield call(API.getPlace, queryParams);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(getPlaceRatingsReceive({place: response.data.data}, refresh));
    } else {
      yield put(getPlaceRatingsError());
    }
  });
}

export function* getPlaceGalleries() {
  yield takeEvery(GET_PUBLIC_PLACE_GALLERIES, function* ({payload}) {
    const {refresh, ...queryParams} = payload;
    const response = yield call(API.getPlace, queryParams);
    if (SuccessStatusCode.includes(response.status)) {
      yield put(getPlaceGalleriesReceive({place: response.data.data}, refresh));
    } else {
      yield put(getPlaceGalleriesError());
    }
  });
}
