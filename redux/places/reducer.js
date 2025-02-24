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
  UPDATE_PLACE_MEDIA_PROGRESS_NUMBER,
  GET_MEDIA_POST,
  GET_MEDIA_POST_RECEIVE,
  GET_MEDIA_POST_ERROR,
  UPDATE_MEDIA_POSITION,
  UPDATE_MEDIA_POSITION_RECEIVE,
  UPDATE_MEDIA_POSITION_ERROR,
  RESET_UPDATE_PLACE_STATUS,
  RESET_PLACES_STATE,
} from '../actionTypes';

const initState = {
  loading: {
    saveMedia: false,
    getGallery: false,
    reportPost: false,
    updateMedia: false,
    getPost: false,
    deletePost: false,
  },
  error: {
    saveMedia: '',
    getGallery: '',
    reportPost: '',
    updateMedia: '',
    getPost: '',
    deletePost: '',
  },
  updatedStatus: {},
  mediaPost: {},
  gallery: [],
  isMediaSaved: false,
  reportPostStatus: false,
  isMediaDeleted: false,
  isMediaUpdated: false,
  progressPercentage: 0,
};

const appReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case SAVE_PLACE_MEDIAS:
      return {
        ...state,
        loading: {...state.loading, saveMedia: true},
        error: {...state.error, saveMedia: ''},
      };
    case SAVE_PLACE_MEDIAS_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, saveMedia: false},
        mediaPost: {...action.payload.post},
        updatedStatus: {...state.updatedStatus, ['saveMedia']: true},
      };
    }
    case SAVE_PLACE_MEDIAS_ERROR:
      return {
        ...state,
        loading: {...state.loading, saveMedia: false},
        error: {...state.error, saveMedia: action.error},
      };

    case GET_PLACE_MEDIAS:
      return {
        ...state,
        loading: {...state.loading, getGallery: true},
        error: {...state.error, getGallery: ''},
      };
    case GET_PLACE_MEDIAS_RECEIVE:
      return {
        ...state,
        loading: {...state.loading, getGallery: false},
        gallery: action.payload,
        mediaPost: {},
      };

    case GET_PLACE_MEDIAS_ERROR:
      return {
        ...state,
        loading: {...state.loading, getGallery: false},
        error: {...state.error, getGallery: action.error},
      };
    case DELETE_PLACE_MEDIA:
      return {
        ...state,
        loading: {...state.loading, deletePost: true},
        error: {...state.error, deletePost: action.error},
      };
    case DELETE_PLACE_MEDIA_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, deletePost: false},
        error: {...state.error, deletePost: action.error},
        updatedStatus: {...state.updatedStatus, ['deletePost']: true},
      };
    }
    case DELETE_PLACE_MEDIA_ERROR:
      return {
        ...state,
        loading: {...state.loading, deletePost: false},
        error: {...state.error, deletePost: action.error},
      };
    case REPORT_A_POST:
      return {
        ...state,
        error: {...state.error, reportPost: ''},
        loading: {...state.loading, reportPost: true},
      };
    case REPORT_A_POST_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, reportPost: false},
        updatedStatus: {...state.updatedStatus, ['reportPost']: true},
      };
    }
    case REPORT_A_POST_ERROR:
      return {
        ...state,
        loading: {...state.loading, reportPost: false},
        error: {...state.error, reportPost: action.error},
      };
    case RESET_REPORTED_POST_FLAG:
      return {
        ...state,
        reportPostStatus: false,
        isMediaSaved: false,
        isMediaDeleted: false,
        isMediaUpdated: false,
      };
    case UPDATE_PLACE_MEDIA:
      return {
        ...state,
        error: {...state.error, updateMedia: ''},
        loading: {
          ...state.loading,
          updateMedia: true,
        },
      };
    case UPDATE_PLACE_MEDIA_RECEIVE: {
      return {
        ...state,
        loading: {
          ...state.loading,
          updateMedia: false,
        },
        mediaPost: {...action.payload},
        updatedStatus: {...state.updatedStatus, ['updateMedia']: true},
      };
    }
    case UPDATE_PLACE_MEDIA_ERROR:
      return {
        ...state,
        error: {
          ...state.error,
          updateMedia: action.error,
        },
        loading: {
          ...state.loading,
          updateMedia: false,
        },
      };
    case UPDATE_PLACE_MEDIA_PROGRESS_NUMBER: {
      return {
        ...state,
        progressPercentage: action.payload,
      };
    }
    case GET_MEDIA_POST:
      return {
        ...state,
        error: {...state.error, getPost: ''},
        loading: {...state.loading, getPost: true},
      };
    case GET_MEDIA_POST_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, getPost: false},
        mediaPost: action.payload,
      };
    }
    case GET_MEDIA_POST_ERROR:
      return {
        ...state,
        loading: {...state.loading, getPost: false},
        mediaPost: null,
        error: {...state.error, getPost: action.error},
      };
    case UPDATE_MEDIA_POSITION:
      return {
        ...state,
        error: {...state.error, mediaPosition: ''},
        loading: {...state.loading, mediaPosition: true},
      };
    case UPDATE_MEDIA_POSITION_RECEIVE: {
      return {
        ...state,
        loading: {...state.loading, mediaPosition: false},
        mediaPost: {...action.payload.data},
        isMediaUpdated: true,
      };
    }
    case UPDATE_MEDIA_POSITION_ERROR:
      return {
        ...state,
        loading: {...state.loading, mediaPosition: false},
        mediaPost: null,
        error: {...state.error, mediaPosition: action.error},
      };
    case RESET_UPDATE_PLACE_STATUS:
      return {
        ...state,
        updatedStatus: {...state.updatedStatus, [action.resetKey]: false},
        progressPercentage: 0,
      };
    case RESET_PLACES_STATE: {
      return {
        ...initState,
      };
    }
    default:
      return state;
  }
};

export default appReducer;
