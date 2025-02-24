import {
  FETCH_CONTACT_STATUS,
  FETCH_CONTACT_STATUS_RECEIVE,
  FETCH_CONTACT_STATUS_ERROR,
  SEND_INVITATION,
  SEND_INVITATION_RECEIVE,
  SEND_INVITATION_ERROR,
  RESET_INVITATION_FLAG,
  FETCH_FRIENDS,
  FETCH_FRIENDS_RECEIVE,
  FETCH_FRIENDS_ERROR,
  CREATE_FRIEND,
  CREATE_FRIEND_RECEIVE,
  CREATE_FRIEND_ERROR,
  UPDATE_FRIEND,
  UPDATE_FRIEND_RECEIVE,
  UPDATE_FRIEND_ERROR,
  RESET_REQUEST_ACCEPTED_FLAG,
  GET_FRIEND,
  GET_FRIEND_RECEIVE,
  GET_FRIEND_ERROR,
  DELETE_FRIEND,
  DELETE_FRIEND_RECEIVE,
  DELETE_FRIEND_ERROR,
  RESET_DELETE_FLAG,
  SAVE_LOCAL_CONTACTS,
} from '../actionTypes';
import {defaultPageSize} from '../../config';

const initState = {
  loading: {},
  error: {},
  contacts: [],
  isInvitationSent: false,
  friends: [],
  pagination: {
    total: 0,
    page: 1,
    pageSize: defaultPageSize,
  },
  isRequestAccepted: false,
  friend: null,
  isFriendDeleted: false,
  isRequestSent: false,
  localContacts: [],
};

const appReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case FETCH_CONTACT_STATUS:
      return {
        ...state,
        loading: {...state.loading, ['fetch-contact-status']: true},
        error: {
          ...state.error,
          ['fetch-contact-status']: null,
        },
      };
    case FETCH_CONTACT_STATUS_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['fetch-contact-status']: false},
        contacts: action.payload.contacts,
      };

    case FETCH_CONTACT_STATUS_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['fetch-contact-status']: false},
        contacts: [],
        error: {
          ...state.error,
          ['fetch-contact-status']: action.error,
        },
      };
    case SEND_INVITATION:
      return {
        ...state,
        loading: {...state.loading, ['send-invitation']: true},
        error: {
          ...state.error,
          ['send-invitation']: null,
        },
      };
    case SEND_INVITATION_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['send-invitation']: false},
        isInvitationSent: true,
      };

    case SEND_INVITATION_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['send-invitation']: false},

        error: {
          ...state.error,
          ['send-invitation']: action.error,
        },
      };
    case RESET_INVITATION_FLAG:
      return {
        ...state,
        isInvitationSent: false,
      };
    case FETCH_FRIENDS:
      return {
        ...state,
        loading: {...state.loading, ['fetch-friends']: true},
        error: {
          ...state.error,
          ['fetch-friends']: null,
        },
      };
    case FETCH_FRIENDS_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['fetch-friends']: false},
        friends:
          action.payload.mode === 'scroll'
            ? [...state.friends, ...action.payload.friends]
            : [...action.payload.friends],
        pagination: action.payload.pagination
          ? {...action.payload.pagination}
          : {...state.pagination},
      };

    case FETCH_FRIENDS_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['fetch-friends']: false},
        friends: [],
        pagination: {...state.pagination, total: 0, totalPage: 0},
        error: {
          ...state.error,
          ['fetch-friends']: action.error,
        },
      };
    case CREATE_FRIEND:
      return {
        ...state,
        loading: {...state.loading, ['create-friend']: true},
        error: {
          ...state.error,
          ['create-friend']: null,
        },
      };
    case CREATE_FRIEND_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['create-friend']: false},
        isRequestSent: true,
        friend: action.payload.friend.data,
      };

    case CREATE_FRIEND_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['create-friend']: false},
        error: {
          ...state.error,
          ['create-friend']: action.error,
        },
      };
    case UPDATE_FRIEND:
      return {
        ...state,
        loading: {...state.loading, ['update-friend']: true},
        error: {
          ...state.error,
          ['update-friend']: null,
        },
      };
    case UPDATE_FRIEND_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['update-friend']: false},
        isRequestAccepted: true,
        friend: action.payload.friend.data,
      };

    case UPDATE_FRIEND_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['update-friend']: false},
        isRequestAccepted: false,
        error: {
          ...state.error,
          ['update-friend']: action.error,
        },
      };
    case RESET_REQUEST_ACCEPTED_FLAG:
      return {
        ...state,
        isRequestAccepted: false,
      };
    case GET_FRIEND:
      return {
        ...state,
        loading: {...state.loading, ['get-friend']: true},
        error: {
          ...state.error,
          ['get-friend']: null,
        },
      };
    case GET_FRIEND_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['get-friend']: false},
        friend: action.payload.friend.data,
      };

    case GET_FRIEND_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['get-friend']: false},
        friend: null,
        error: {
          ...state.error,
          ['get-friend']: action.error,
        },
      };
    case DELETE_FRIEND:
      return {
        ...state,
        loading: {...state.loading, ['delete-friend']: true},
        error: {
          ...state.error,
          ['delete-friend']: null,
        },
      };
    case DELETE_FRIEND_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, ['delete-friend']: false},
        isFriendDeleted: true,
        friend: null,
      };

    case DELETE_FRIEND_ERROR:
      return {
        ...state,
        loading: {...state.loading, ['delete-friend']: false},
        error: {
          ...state.error,
          ['delete-friend']: action.error,
        },
      };
    case RESET_DELETE_FLAG:
      return {
        ...state,
        isFriendDeleted: false,
      };
    case SAVE_LOCAL_CONTACTS:
      return {
        ...state,
        localContacts: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
