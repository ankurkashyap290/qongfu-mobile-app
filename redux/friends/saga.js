import {takeEvery, put, call} from 'redux-saga/effects';
import {API} from '../../services/api';
import {
  FETCH_CONTACT_STATUS,
  SEND_INVITATION,
  FETCH_FRIENDS,
  CREATE_FRIEND,
  UPDATE_FRIEND,
  GET_FRIEND,
  DELETE_FRIEND,
} from '../actionTypes';
import {
  fetchContactStatusReceive,
  fetchContactStatusError,
  sendInvitationReceive,
  sendInvitationError,
  fetchFriendsReceive,
  fetchFriendsError,
  createFriendReceive,
  createFriendError,
  updateFriendReceive,
  updateFriendError,
  getFriendReceive,
  getFriendError,
  deleteFriendReceive,
  deleteFriendError,
} from './actions';
import {SuccessStatusCode} from '../../config';

export function* fetchContactStatus() {
  yield takeEvery(FETCH_CONTACT_STATUS, function*({payload, token}) {
    try {
      const response = yield call(API.fetchContactStatus, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          fetchContactStatusReceive({
            contacts: response.data.data.contacts,
          }),
        );
      } else {
        yield put(fetchContactStatusError(response.message));
      }
    } catch (ex) {
      yield put(
        fetchContactStatusError("Error while fetching contact's status"),
      );
    }
  });
}
export function* sendInvitation() {
  yield takeEvery(SEND_INVITATION, function*({payload, token}) {
    try {
      const response = yield call(API.sendInvitation, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(sendInvitationReceive());
      } else {
        yield put(sendInvitationError(response.message));
      }
    } catch (ex) {
      yield put(sendInvitationError('Error while sending invitation'));
    }
  });
}

export function* fetchFriends() {
  yield takeEvery(FETCH_FRIENDS, function*({payload, pagination, token}) {
    try {
      const {mode, ...queryParams} = payload;
      const tempPagination = {
        total: 0,
        page: 1,
        pageSize: 10,
      };
      if (pagination) {
        queryParams.page = pagination.page;
        queryParams.per_page = pagination.pageSize;
      }
      const response = yield call(API.fetchFriends, queryParams, token);

      if (SuccessStatusCode.includes(response.status)) {
        // if (pagination) {
        //   // check response.data for fieldname
        //   pagination.totalPage = response.data.activities.last_page;
        //   pagination.total = response.data.activities.total;
        // } else {
        //   tempPagination.totalPage = response.data.activities.last_page;
        //   tempPagination.total = response.data.activities.total;
        // }
        yield put(
          fetchFriendsReceive({
            friends: response.data.data,
            pagination: pagination || tempPagination,
          }),
        );
      } else {
        yield put(fetchFriendsError(response.message));
      }
    } catch (ex) {
      yield put(fetchFriendsError('Error while fetching your friends'));
    }
  });
}

export function* createFriend() {
  yield takeEvery(CREATE_FRIEND, function*({payload, token}) {
    try {
      const response = yield call(API.createFriend, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          createFriendReceive({
            friend: response.data.data,
          }),
        );
      } else {
        yield put(createFriendError(response.message));
      }
    } catch (ex) {
      yield put(createFriendError('Error while sending friend request'));
    }
  });
}

export function* updateFriend() {
  yield takeEvery(UPDATE_FRIEND, function*({payload, token}) {
    try {
      const response = yield call(API.updateFriend, payload, token);

      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          updateFriendReceive({
            friend: response.data.data,
          }),
        );
      } else {
        yield put(updateFriendError(response.message));
      }
    } catch (ex) {
      yield put(updateFriendError('Error while updating friend status'));
    }
  });
}

export function* getFriend() {
  yield takeEvery(GET_FRIEND, function*({payload, token}) {
    try {
      const response = yield call(API.getFriend, payload, token);

      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          getFriendReceive({
            friend: response.data.data,
          }),
        );
      } else {
        yield put(getFriendError(response.message));
      }
    } catch (ex) {
      yield put(getFriendError('Error while fetching friend profile'));
    }
  });
}

export function* deleteFriend() {
  yield takeEvery(DELETE_FRIEND, function*({payload, token}) {
    try {
      const response = yield call(API.deleteFriend, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(deleteFriendReceive());
      } else {
        yield put(deleteFriendError(response.message));
      }
    } catch (ex) {
      yield put(deleteFriendError('Error while removing friend'));
    }
  });
}
