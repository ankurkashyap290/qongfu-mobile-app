import {
  USER_REGISTER,
  USER_REGISTER_RECEIVE,
  USER_REGISTER_ERROR,
  PHONE_VERIFY,
  PHONE_VERIFY_RECEIVE,
  PHONE_VERIFY_ERROR,
  OTP_VERIFY,
  OTP_VERIFY_RECEIVE,
  OTP_VERIFY_ERROR,
  SET_IS_OTP_SEND,
  USER_LOGIN,
  USER_LOGIN_RECEIVE,
  USER_LOGIN_ERROR,
  GET_USER_DETAILS,
  GET_USER_DETAILS_RECEIVE,
  GET_USER_DETAILS_ERROR,
  RESET_PASSWORD_SEND_OTP,
  RESET_PASSWORD_SEND_OTP_RECEIVE,
  RESET_PASSWORD_SEND_OTP_ERROR,
  RESET_PASSWORD_CONFIRM_OTP,
  RESET_PASSWORD_CONFIRM_OTP_RECEIVE,
  RESET_PASSWORD_CONFIRM_OTP_ERROR,
  RESET_PASSWORD,
  RESET_PASSWORD_RECEIVE,
  RESET_PASSWORD_ERROR,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_RECEIVE,
  UPDATE_USER_DETAILS_ERROR,
  SET_TOKEN,
  USER_LOGOUT,
  USER_LOGOUT_RECEIVE,
  USER_LOGOUT_ERROR,
  RESET_USER_DETAILS_UPDATED_FLAG,
  ADD_MISSING_ENTITY,
  ADD_MISSING_ENTITY_RECEIVE,
  ADD_MISSING_ENTITY_ERROR,
  RESET_FEEDBACK_FLAG,
  USER_PASSWORD_CHANGE,
  USER_PASSWORD_CHANGE_RECEIVE,
  USER_PASSWORD_CHANGE_ERROR,
  UPDATE_PROGRESS_NUMBER,
  USER_ACCOUNT_DRAWER_TOGGLE,
  CREATE_USER_BIOMETRICS,
  CREATE_USER_BIOMETRICS_RECEIVE,
  CREATE_USER_BIOMETRICS_ERROR,
  UPDATE_USER_BIOMETRICS,
  UPDATE_USER_BIOMETRICS_RECEIVE,
  UPDATE_USER_BIOMETRICS_ERROR,
  GET_USER_BIOMETRICS,
  GET_USER_BIOMETRICS_RECEIVE,
  GET_USER_BIOMETRICS_ERROR,
  GET_TODAY_SESSIONS,
  GET_TODAY_SESSIONS_RECEIVE,
  GET_TODAY_SESSIONS_ERROR,
  UPDATE_BIOMETRICS_SETTINGS,
  UPDATE_BIOMETRICS_SETTINGS_RECEIVE,
  UPDATE_BIOMETRICS_SETTINGS_ERROR,
  GET_BIOMETRICS_SETTINGS,
  GET_BIOMETRICS_SETTINGS_RECEIVE,
  GET_BIOMETRICS_SETTINGS_ERROR,
} from '../actionTypes';

const initState = {
  loading: false,
  profile: null,
  token: '',
  error: {},
  mobileNumberVerified: false,
  newUser: false,
  verifiedInputCode: false,
  resetPasswordCodeSent: false,
  resetPasswordCodeVerified: false,
  newPasswordSaved: false,
  step: null,
  resetPasswordType: null,
  resetPasswordValue: null,
  userPasswordUpdated: false,
  user: null,
  isOTPSent: false,
  contactNumber: null,
  isPasswordReset: false,
  imageProgressValue: 0,
  userDetailsUpdated: {},
  feedbackSubmitted: false,
  resetPasswordToken: null,
  progressPercentage: 0,
  isAccountDrawerOpen: false,
  userBiometrics: null,
  sessions: [],
  biometricsSettings: [],
};

const userReducer = (state = initState, action = {}) => {
  switch (action.type) {
    case USER_REGISTER:
      return {
        ...state,
        loading: true,
        contactNumber: action.payload.contact_number,
        error: {...state.error, ['sign-up']: null},
      };
    case USER_REGISTER_RECEIVE:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        user: action.payload.user,
      };
    case USER_REGISTER_ERROR:
      return {
        ...state,
        loading: false,
        error: {...state.error, ['sign-up']: action.error},
      };
    case PHONE_VERIFY:
      return {
        ...state,
        loading: true,
        contactNumber: action.payload.contact_number,
        error: {...state.error, ['update-mobile']: null},
      };
    case PHONE_VERIFY_RECEIVE:
      return {
        ...state,
        loading: false,
        isOTPSent: true,
        profile: {...(action.payload ? action.payload : state.profile)},
      };
    case PHONE_VERIFY_ERROR:
      return {
        ...state,
        loading: false,
        error: {...state.error, ['update-mobile']: action.error},
      };
    case OTP_VERIFY: {
      return {
        ...state,
        loading: true,
        error: {...state.error, ['verify-mobile']: null},
      };
    }
    case OTP_VERIFY_RECEIVE: {
      const updateType =
        action.payload.mode !== 'phoneVerify'
          ? 'account-info-mobile-update'
          : 'signup-phone-verify';
      return {
        ...state,
        loading: false,
        mobileNumberVerified: true,
        userDetailsUpdated: {
          ...state.userDetailsUpdated,
          [`update-details-${updateType}`]: true,
        },
        isOTPSent: false,
      };
    }
    case OTP_VERIFY_ERROR: {
      return {
        ...state,
        loading: false,
        error: {...state.error, ['verify-mobile']: action.error},
      };
    }
    case SET_IS_OTP_SEND: {
      return {
        ...state,
        isOTPSent: action.payload.value,
      };
    }
    case USER_LOGIN: {
      return {
        ...state,
        loading: true,
        error: {...state.error, ['sign-in']: null},
      };
    }
    case USER_LOGIN_RECEIVE: {
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        profile: action.payload.profile,
      };
    }
    case USER_LOGIN_ERROR: {
      return {
        ...state,
        loading: false,
        error: {...state.error, ['sign-in']: action.error},
      };
    }
    case GET_USER_DETAILS: {
      return {
        ...state,
        loading: true,
        error: {...state.error, ['user-details']: null},
      };
    }
    case GET_USER_DETAILS_RECEIVE: {
      return {
        ...state,
        loading: false,
        profile: action.payload.profile,
      };
    }
    case GET_USER_DETAILS_ERROR: {
      return {
        ...state,
        loading: false,
        error: {...state.error, ['user-details']: action.error},
      };
    }
    case RESET_PASSWORD_SEND_OTP: {
      return {
        ...state,
        loading: true,
        contactNumber: action.payload.contact_number,
        error: {
          ...state.error,
          [`forgot-reset-${action.payload.reset_type}`]: null,
        },
      };
    }
    case RESET_PASSWORD_SEND_OTP_RECEIVE: {
      return {
        ...state,
        loading: false,
        isOTPSent: true,
      };
    }
    case RESET_PASSWORD_SEND_OTP_ERROR: {
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`forgot-reset-${action.payload}`]: action.error,
        },
      };
    }
    case RESET_PASSWORD_CONFIRM_OTP: {
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          [`verify-reset-${action.payload.reset_type}`]: null,
        },
      };
    }
    case RESET_PASSWORD_CONFIRM_OTP_RECEIVE: {
      return {
        ...state,
        loading: false,
        mobileNumberVerified: true,
        resetPasswordToken: action.payload,
      };
    }
    case RESET_PASSWORD_CONFIRM_OTP_ERROR: {
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`verify-reset-${action.payload.reset_type}`]: action.error,
        },
      };
    }
    case RESET_PASSWORD: {
      return {
        ...state,
        loading: true,
        error: {...state.error, ['reset-password-success']: null},
      };
    }
    case RESET_PASSWORD_RECEIVE: {
      return {
        ...state,
        loading: false,
        isPasswordReset: true,
        resetPasswordToken: null,
      };
    }
    case RESET_PASSWORD_ERROR: {
      return {
        ...state,
        loading: false,
        error: {...state.error, ['reset-password-success']: action.error},
      };
    }
    case UPDATE_USER_DETAILS: {
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          [`update-details-${action.updateType}`]: null,
        },
      };
    }
    case UPDATE_USER_DETAILS_RECEIVE: {
      const profile = action.payload.response
        ? {...action.payload.response}
        : {...state.profile};
      // const userUpdatedFlag = action.step
      //   ? action.step === 'secondStep'
      //     ? true
      //     : false
      //   : true;
      return {
        ...state,
        loading: false,
        profile: {...profile},
        userDetailsUpdated: {
          ...state.userDetailsUpdated,
          [`update-details-${action.updateType}`]: true,
        },
      };
    }
    case UPDATE_USER_DETAILS_ERROR: {
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`update-details-${action.updateType}`]: action.error,
        },
      };
    }
    case UPDATE_PROGRESS_NUMBER: {
      return {
        ...state,
        progressPercentage: action.payload,
      };
    }
    case SET_TOKEN: {
      return {
        ...state,
        token: action.token,
        profile: action.profile,
      };
    }
    case USER_LOGOUT: {
      return {
        ...state,
        loading: true,
      };
    }
    case USER_LOGOUT_RECEIVE: {
      return {
        ...initState,
      };
    }
    case USER_LOGOUT_ERROR: {
      return {
        ...state,
        loading: false,
      };
    }
    case RESET_USER_DETAILS_UPDATED_FLAG: {
      return {
        ...state,
        userDetailsUpdated: {
          ...state.userDetailsUpdated,
          [`update-details-${action.updateType}`]: false,
        },
      };
    }
    case ADD_MISSING_ENTITY: {
      return {
        ...state,
        loading: true,
      };
    }
    case ADD_MISSING_ENTITY_RECEIVE: {
      return {
        ...state,
        loading: false,
        feedbackSubmitted: true,
      };
    }
    case ADD_MISSING_ENTITY_ERROR: {
      return {
        ...state,
        loading: false,
        error: {...state.error, ['missing-entity']: action.error},
      };
    }
    case RESET_FEEDBACK_FLAG: {
      return {
        ...state,
        feedbackSubmitted: false,
      };
    }
    case USER_PASSWORD_CHANGE: {
      return {
        ...state,
        loading: true,
        error: {...state.error, [`update-details-${action.updateType}`]: null},
      };
    }
    case USER_PASSWORD_CHANGE_RECEIVE: {
      return {
        ...state,
        loading: false,
        userDetailsUpdated: {
          ...state.userDetailsUpdated,
          [`update-details-${action.updateType}`]: true,
        },
      };
    }
    case USER_PASSWORD_CHANGE_ERROR: {
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`update-details-${action.updateType}`]: action.error,
        },
      };
    }
    case USER_ACCOUNT_DRAWER_TOGGLE: {
      return {
        ...state,
        isAccountDrawerOpen: action.isAccountDrawerOpen,
      };
    }
    case CREATE_USER_BIOMETRICS: {
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          [`create-user-biometrics`]: null,
        },
      };
    }
    case CREATE_USER_BIOMETRICS_RECEIVE: {
      return {
        ...state,
        loading: false,
        userDetailsUpdated: {
          ...state.userDetailsUpdated,
          [`update-details-biometrics`]: true,
        },
      };
    }
    case CREATE_USER_BIOMETRICS_ERROR: {
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`create-user-biometrics`]: action.error,
        },
      };
    }
    case UPDATE_USER_BIOMETRICS: {
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          [`update-user-biometrics`]: null,
        },
      };
    }
    case UPDATE_USER_BIOMETRICS_RECEIVE: {
      const profile = action.payload.response
        ? {...action.payload.response}
        : {...state.profile};
      // const userUpdatedFlag = action.step
      //   ? action.step === 'secondStep'
      //     ? true
      //     : false
      //   : true;
      return {
        ...state,
        loading: false,
        profile: {...profile},
        userDetailsUpdated: {
          ...state.userDetailsUpdated,
          [`update-details-biometrics`]: true,
        },
      };
    }
    case UPDATE_USER_BIOMETRICS_ERROR: {
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          [`update-user-biometrics`]: action.error,
        },
      };
    }
    case GET_USER_BIOMETRICS: {
      return {
        ...state,
        loading: true,
        error: {...state.error, ['user-biometrics']: null},
      };
    }
    case GET_USER_BIOMETRICS_RECEIVE: {
      return {
        ...state,
        loading: false,
        userBiometrics: action.payload.biometrics,
      };
    }
    case GET_USER_BIOMETRICS_ERROR: {
      return {
        ...state,
        loading: false,
        error: {...state.error, ['user-biometrics']: action.error},
      };
    }
    case GET_TODAY_SESSIONS:
      return {
        ...state,
        loading: true,
        error: {
          ...state.error,
          ['fetch-sessions']: null,
        },
      };
    case GET_TODAY_SESSIONS_RECEIVE:
      return {
        ...state,
        loading: false,
        sessions:
          action.payload.mode === 'scroll'
            ? [...state.sessions, ...action.payload.sessions]
            : [...action.payload.sessions],
        pagination: action.payload.pagination
          ? {...action.payload.pagination}
          : {...state.pagination},
      };

    case GET_TODAY_SESSIONS_ERROR:
      return {
        ...state,
        loading: false,
        sessions: [],
        pagination: {...state.pagination, total: 0, totalPage: 0},
        error: {
          ...state.error,
          ['fetch-sessions']: action.error,
        },
      };
    case UPDATE_BIOMETRICS_SETTINGS:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BIOMETRICS_SETTINGS_RECEIVE:
      return {
        ...state,
        loading: false,
        biometricsSettings: action.payload,
        userDetailsUpdated: {
          ...state.userDetailsUpdated,
          [`update-details-biometrics-settings`]: true,
        },
      };

    case UPDATE_BIOMETRICS_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          ['update-biometrics-settings']: action.error,
        },
      };
    case GET_BIOMETRICS_SETTINGS:
      return {
        ...state,
        loading: true,
      };
    case GET_BIOMETRICS_SETTINGS_RECEIVE:
      return {
        ...state,
        loading: false,
        biometricsSettings: action.payload,
      };

    case GET_BIOMETRICS_SETTINGS_ERROR:
      return {
        ...state,
        loading: false,
        error: {
          ...state.error,
          ['biometrics-settings']: action.error,
        },
      };

    default:
      return state;
  }
};

export default userReducer;
