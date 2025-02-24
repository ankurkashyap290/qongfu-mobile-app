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
  RESET_PASSWORD_CONFIRM_OTP_ERROR,
  RESET_PASSWORD_CONFIRM_OTP,
  RESET_PASSWORD_CONFIRM_OTP_RECEIVE,
  RESET_PASSWORD,
  RESET_PASSWORD_RECEIVE,
  RESET_PASSWORD_ERROR,
  UPDATE_USER_DETAILS,
  UPDATE_USER_DETAILS_RECEIVE,
  UPDATE_USER_DETAILS_ERROR,
  UPDATE_PROGRESS_NUMBER,
  SET_TOKEN,
  USER_LOGOUT,
  USER_LOGOUT_ERROR,
  USER_LOGOUT_RECEIVE,
  RESET_USER_DETAILS_UPDATED_FLAG,
  ADD_MISSING_ENTITY,
  ADD_MISSING_ENTITY_RECEIVE,
  ADD_MISSING_ENTITY_ERROR,
  RESET_FEEDBACK_FLAG,
  USER_PASSWORD_CHANGE,
  USER_PASSWORD_CHANGE_RECEIVE,
  USER_PASSWORD_CHANGE_ERROR,
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

export const userRegister = (payload, navigation) => {
  return {
    type: USER_REGISTER,
    payload,
    navigation,
  };
};

export const userRegisterReceive = payload => {
  return {type: USER_REGISTER_RECEIVE, payload};
};

export const userRegisterError = error => {
  return {type: USER_REGISTER_ERROR, error};
};

export const phoneVerify = (payload, token, mode) => {
  return {type: PHONE_VERIFY, payload, token, mode};
};

export const phoneVerifyReceive = payload => {
  return {type: PHONE_VERIFY_RECEIVE, payload};
};

export const phoneVerifyError = error => {
  return {type: PHONE_VERIFY_ERROR, error};
};

export const verifyOTP = (payload, token, mode) => {
  return {type: OTP_VERIFY, payload, token, mode};
};

export const verifyOTPReceive = payload => {
  return {type: OTP_VERIFY_RECEIVE, payload};
};

export const verifyOTPError = error => {
  return {type: OTP_VERIFY_ERROR, error};
};

export const setIsOTPSend = value => {
  return {type: SET_IS_OTP_SEND, payload: {value}};
};

export const userLogin = (payload, navigation) => {
  return {type: USER_LOGIN, payload, navigation};
};

export const userLoginReceive = payload => {
  return {type: USER_LOGIN_RECEIVE, payload};
};

export const userLoginError = error => {
  return {type: USER_LOGIN_ERROR, error};
};

export const getUserDetails = payload => {
  return {type: GET_USER_DETAILS, payload};
};

export const getUserDetailsReceive = payload => {
  return {type: GET_USER_DETAILS_RECEIVE, payload};
};

export const getUserDetailsError = () => {
  return {type: GET_USER_DETAILS_ERROR};
};

export const resetPasswordSendOTP = (payload, mode) => {
  return {type: RESET_PASSWORD_SEND_OTP, payload, mode};
};

export const resetPasswordSendOTPReceive = () => {
  return {type: RESET_PASSWORD_SEND_OTP_RECEIVE};
};

export const resetPasswordSendOTPError = (payload, error) => {
  return {type: RESET_PASSWORD_SEND_OTP_ERROR, payload, error};
};

export const resetPasswordConfirmOTP = payload => {
  return {type: RESET_PASSWORD_CONFIRM_OTP, payload};
};

export const resetPasswordConfirmOTPReceive = payload => {
  return {type: RESET_PASSWORD_CONFIRM_OTP_RECEIVE, payload};
};

export const resetPasswordConfirmOTPError = (payload, error) => {
  return {type: RESET_PASSWORD_CONFIRM_OTP_ERROR, payload, error};
};

export const resetPassword = (payload, token) => {
  return {type: RESET_PASSWORD, payload, token};
};

export const resetPasswordReceive = payload => {
  return {type: RESET_PASSWORD_RECEIVE, payload};
};

export const resetPasswordError = (payload, error) => {
  return {type: RESET_PASSWORD_ERROR, payload, error};
};

export const updateUserDetails = (payload, token, step, updateType) => {
  return {type: UPDATE_USER_DETAILS, payload, token, step, updateType};
};

export const updateUserDetailsReceive = (payload, step, updateType) => {
  return {type: UPDATE_USER_DETAILS_RECEIVE, payload, step, updateType};
};

export const updateUserDetailsError = (updateType, error) => {
  return {type: UPDATE_USER_DETAILS_ERROR, updateType, error};
};

export const setUploadProgressParam = payload => {
  return {type: UPDATE_PROGRESS_NUMBER, payload};
};

export const setToken = (token, profile) => {
  return {type: SET_TOKEN, token, profile};
};

export const userLogout = (token, navigation) => {
  return {type: USER_LOGOUT, token, navigation};
};

export const userLogoutReceive = () => {
  return {type: USER_LOGOUT_RECEIVE};
};

export const userLogoutError = () => {
  return {type: USER_LOGOUT_ERROR};
};

export const resetUserDetailsUpdatedFlag = updateType => {
  return {type: RESET_USER_DETAILS_UPDATED_FLAG, updateType};
};

export const addMissingEntity = payload => {
  return {type: ADD_MISSING_ENTITY, payload};
};

export const addMissingEntityReceive = () => {
  return {type: ADD_MISSING_ENTITY_RECEIVE};
};

export const addMissingEntityError = () => {
  return {type: ADD_MISSING_ENTITY_ERROR};
};

export const resetFeedbackFlag = () => {
  return {type: RESET_FEEDBACK_FLAG};
};

export const userPasswordChange = (payload, token, updateType) => {
  return {type: USER_PASSWORD_CHANGE, payload, token, updateType};
};

export const userPasswordChangeReceive = updateType => {
  return {type: USER_PASSWORD_CHANGE_RECEIVE, updateType};
};

export const userPasswordChangeError = (updateType, error) => {
  return {type: USER_PASSWORD_CHANGE_ERROR, updateType, error};
};

export const toggleAccountDrawer = isAccountDrawerOpen => {
  return {type: USER_ACCOUNT_DRAWER_TOGGLE, isAccountDrawerOpen};
};

export const createUserBioMetrics = (payload, token, mode) => {
  return {type: CREATE_USER_BIOMETRICS, payload, token, mode};
};

export const createUserBioMetricsReceive = () => {
  return {type: CREATE_USER_BIOMETRICS_RECEIVE};
};

export const createUserBioMetricsError = error => {
  return {type: CREATE_USER_BIOMETRICS_ERROR, error};
};

export const updateUserBioMetrics = (payload, token) => {
  return {type: UPDATE_USER_BIOMETRICS, payload, token};
};

export const updateUserBioMetricsReceive = payload => {
  return {type: UPDATE_USER_BIOMETRICS_RECEIVE, payload};
};

export const updateUserBioMetricsError = error => {
  return {type: UPDATE_USER_BIOMETRICS_ERROR, error};
};

export const getUserBioMetrics = (payload, token) => {
  return {type: GET_USER_BIOMETRICS, payload, token};
};

export const getUserBioMetricsReceive = payload => {
  return {type: GET_USER_BIOMETRICS_RECEIVE, payload};
};

export const getUserBioMetricsError = error => {
  return {type: GET_USER_BIOMETRICS_ERROR, error};
};

export const getTodaySessions = (payload, pagination, token) => {
  return {type: GET_TODAY_SESSIONS, payload, pagination, token};
};

export const getTodaySessionsReceive = payload => {
  return {type: GET_TODAY_SESSIONS_RECEIVE, payload};
};

export const getTodaySessionsError = error => {
  return {type: GET_TODAY_SESSIONS_ERROR, error};
};

export const updateBiometricsSettings = payload => {
  return {type: UPDATE_BIOMETRICS_SETTINGS, payload};
};

export const updateBiometricsSettingsReceive = payload => {
  return {type: UPDATE_BIOMETRICS_SETTINGS_RECEIVE, payload};
};

export const updateBiometricsSettingsError = error => {
  return {type: UPDATE_BIOMETRICS_SETTINGS_ERROR, error};
};

export const getBiometricsSettings = payload => {
  return {type: GET_BIOMETRICS_SETTINGS, payload};
};

export const getBiometricsSettingsReceive = payload => {
  return {type: GET_BIOMETRICS_SETTINGS_RECEIVE, payload};
};

export const getBiometricsSettingsError = error => {
  return {type: GET_BIOMETRICS_SETTINGS_ERROR, error};
};
