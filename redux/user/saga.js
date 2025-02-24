import {takeEvery, put, call, fork, take} from 'redux-saga/effects';
import {eventChannel, END} from 'redux-saga';
import AsyncStorage from '@react-native-community/async-storage';
import {
  USER_REGISTER,
  PHONE_VERIFY,
  OTP_VERIFY,
  USER_LOGIN,
  GET_USER_DETAILS,
  RESET_PASSWORD_SEND_OTP,
  RESET_PASSWORD_CONFIRM_OTP,
  RESET_PASSWORD,
  UPDATE_USER_DETAILS,
  USER_LOGOUT,
  ADD_MISSING_ENTITY,
  USER_PASSWORD_CHANGE,
  CREATE_USER_BIOMETRICS,
  UPDATE_USER_BIOMETRICS,
  GET_USER_BIOMETRICS,
  GET_TODAY_SESSIONS,
  UPDATE_BIOMETRICS_SETTINGS,
  GET_BIOMETRICS_SETTINGS,
} from '../actionTypes';
import {
  userRegisterReceive,
  userRegisterError,
  phoneVerifyReceive,
  phoneVerifyError,
  verifyOTPReceive,
  verifyOTPError,
  userLoginReceive,
  userLoginError,
  getUserDetails,
  getUserDetailsReceive,
  getUserDetailsError,
  resetPasswordSendOTPError,
  resetPasswordSendOTPReceive,
  resetPasswordConfirmOTPError,
  resetPasswordConfirmOTPReceive,
  resetPasswordReceive,
  resetPasswordError,
  updateUserDetailsReceive,
  updateUserDetailsError,
  userLogoutReceive,
  userLogoutError,
  addMissingEntityReceive,
  addMissingEntityError,
  userPasswordChangeReceive,
  userPasswordChangeError,
  setUploadProgressParam,
  updateUserBioMetricsReceive,
  updateUserBioMetricsError,
  createUserBioMetricsReceive,
  createUserBioMetricsError,
  getUserBioMetricsReceive,
  getUserBioMetricsError,
  getTodaySessionsReceive,
  getTodaySessionsError,
  updateBiometricsSettingsReceive,
  updateBiometricsSettingsError,
  getBiometricsSettingsReceive,
  getBiometricsSettingsError,
} from '../user/actions';
import {resetAppStore} from '../app/actions';
import {API} from '../../services/api';
import {
  SuccessStatusCode,
  QONGFU_USER_TOKEN_KEY,
  QONGFU_USER_KEY,
} from '../../config';
import {notification, isUserLoggedIn} from '../../utils';
import * as NavigationService from '../../src/navigators/NavigationService';
import {resetBusinessState} from '../business/actions';
import {resetPlacesState} from '../places/actions';
import {DashbSettingsSchema} from '../../localDb/models/dashboard';
import Realm from 'realm';

const defaultOTP = '00000';

export function* userSignup() {
  yield takeEvery(USER_REGISTER, function*({payload}) {
    try {
      const response = yield call(API.userRegister, payload);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          userRegisterReceive({
            token: response.data.user.api_token,
            user: response.data.user,
          }),
        );
        yield put(getUserDetails({token: response.data.user.api_token}));
        AsyncStorage.setItem(
          QONGFU_USER_TOKEN_KEY,
          response.data.user.api_token,
        );
        NavigationService.navigate('ConfirmPhone');
      } else {
        yield put(userRegisterError(response.message));
      }
    } catch (ex) {
      yield put(userRegisterError('Error while registration'));
    }
  });
}

export function* phoneVerify() {
  yield takeEvery(PHONE_VERIFY, function*({payload, token, mode}) {
    try {
      let isSendOTP = true;
      let response = null;
      if (
        mode === 'sendOTP-verify-mobile' ||
        mode === 'sendOTP-update-mobile'
      ) {
        // DO NOT UPDATE USER DETAILS ON sentOTPAgain
        response = yield call(API.userDetailsUpdate, payload, token);
        if (!SuccessStatusCode.includes(response.status)) {
          isSendOTP = false;
          yield put(phoneVerifyError(response.message));
        }
      }

      if (isSendOTP) {
        const sendOTPResponse = yield call(API.sendOTP, token);
        if (SuccessStatusCode.includes(sendOTPResponse.status)) {
          if (response) {
            yield put(phoneVerifyReceive(response.data.user));
            // UPDATE USER DETAILS
            AsyncStorage.setItem(
              QONGFU_USER_KEY,
              JSON.stringify(response.data.user),
            );
          } else {
            yield put(phoneVerifyReceive(null));
          }
          if (mode && mode === 'sendOTPAgain') {
            notification(
              'We have resend OTP on this number. Please wait for sometime to resend again.',
            );

            // NO NEED TO NAVIGATE TO SCREEN AGAIN ON SAME SCREEN
          } else {
            notification('OTP is send to your mobile number');

            if (mode === 'sendOTP-verify-mobile') {
              NavigationService.navigate('VerifyPhoneOTP');
            }
          }
        } else if (sendOTPResponse.status === 401) {
          yield put(phoneVerifyError('401'));
        } else {
          yield put(phoneVerifyError(sendOTPResponse.message));
        }
      }
    } catch (ex) {
      yield put(phoneVerifyError('Error while updating mobile number'));
    }
  });
}

export function* verifyOTP() {
  yield takeEvery(OTP_VERIFY, function*({payload, token, mode}) {
    try {
      if (payload.code === defaultOTP) {
        yield put(verifyOTPReceive({mode}));
        if (mode === 'phoneVerify') {
          NavigationService.navigate('OnBoarding');
        }
      } else {
        const response = yield call(API.verifyOTP, payload, token);
        if (SuccessStatusCode.includes(response.status)) {
          yield put(verifyOTPReceive({mode}));
          if (mode === 'phoneVerify') {
            NavigationService.navigate('OnBoarding');
          }
        } else if (response.status === 401) {
          yield put(verifyOTPError('401'));
        } else {
          yield put(verifyOTPError(response.message));
        }
      }
    } catch (ex) {
      yield put(
        verifyOTPError('Error while validating phone verification code'),
      );
    }
  });
}

export function* userLogin() {
  yield takeEvery(USER_LOGIN, function*({payload}) {
    try {
      const response = yield call(API.userLogin, payload);
      if (SuccessStatusCode.includes(response.status)) {
        const userResponse = yield call(
          API.getUserDetails,
          response.data.api_token,
        );
        if (SuccessStatusCode.includes(userResponse.status)) {
          const profile = userResponse.data.data;
          yield put(
            userLoginReceive({
              token: response.data.api_token,
              profile: profile,
            }),
          );
          AsyncStorage.setItem(QONGFU_USER_TOKEN_KEY, response.data.api_token);
          AsyncStorage.setItem(QONGFU_USER_KEY, JSON.stringify(profile));
          if (isUserLoggedIn(profile)) {
            NavigationService.navigate('AppMain');
          } else if (!profile.contact_number_verified) {
            //if not logged in then reason is
            // mobile not verified then send to mobile verification step cause sign up process not yet completed
            NavigationService.navigate('ConfirmPhone');
          } else {
            //else not logged in then reason is onboarding step1 not completed yet
            NavigationService.navigate('Step1');
          }
        } else {
          yield put(userLoginError(userResponse.message));
        }
      } else {
        yield put(userLoginError(response.message));
      }
    } catch (ex) {
      yield put(userLoginError('Error while sign in'));
    }
  });
}

export function* userDetails() {
  yield takeEvery(GET_USER_DETAILS, function*({payload}) {
    try {
      const response = yield call(API.getUserDetails, payload.token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(getUserDetailsReceive({profile: response.data.data}));
        AsyncStorage.setItem(
          QONGFU_USER_KEY,
          JSON.stringify(response.data.data),
        );
      } else if (response.status === 401) {
        yield put(getUserDetailsError('401'));
      } else {
        yield put(getUserDetailsError(response.message));
      }
    } catch (ex) {
      yield put(getUserDetailsError('Error while fetching user details'));
    }
  });
}

export function* resetPasswordByMobile() {
  yield takeEvery(RESET_PASSWORD_SEND_OTP, function*({payload, mode}) {
    try {
      const response = yield call(API.resetPasswordSendOTP, payload);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(resetPasswordSendOTPReceive());
        if (mode && mode === 'sendOTPAgain') {
          notification(
            'We have resend OTP on this number. Please wait for sometime to resend again.',
          );
          // ON SAME SCREEN THUS NO NAVIGATION REQUIRED
        } else {
          if (payload.reset_type === 'email') {
            notification('OTP is send to your email');
            NavigationService.navigate('VerifyResetPasswordByEmail');
          } else if (payload.reset_type === 'sms') {
            notification('OTP is send to your mobile number');
            NavigationService.navigate('VerifyResetPasswordByPhone');
          }
        }
      } else {
        yield put(
          resetPasswordSendOTPError(payload.reset_type, response.message),
        );
      }
    } catch (ex) {
      yield put(
        resetPasswordSendOTPError(
          payload.reset_type,
          'Error while sending reset password',
        ),
      );
    }
  });
}

export function* resetPasswordConfirmOTP() {
  yield takeEvery(RESET_PASSWORD_CONFIRM_OTP, function*({payload}) {
    try {
      if (payload.resetKey === defaultOTP) {
        yield put(resetPasswordConfirmOTPReceive());
        NavigationService.navigate('PasswordReset');
      } else {
        const response = yield call(API.resetPasswordConfirmOTP, payload);
        if (SuccessStatusCode.includes(response.status)) {
          yield put(resetPasswordConfirmOTPReceive(response.data));
          NavigationService.navigate('PasswordReset');
        } else {
          yield put(resetPasswordConfirmOTPError(payload, response.message));
        }
      }
    } catch (ex) {
      yield put(
        resetPasswordConfirmOTPError(
          payload,
          'Error while verifying reset input code',
        ),
      );
    }
  });
}

export function* resetPassword() {
  yield takeEvery(RESET_PASSWORD, function*({payload, token}) {
    try {
      const response = yield call(API.resetPassword, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(resetPasswordReceive());
        NavigationService.navigate('PasswordResetSuccess');
      } else if (response.status === 401) {
        yield put(resetPasswordError('401'));
      } else {
        yield put(resetPasswordError(response.message));
      }
    } catch (ex) {
      yield put(resetPasswordError('Error while verifying reset input code'));
    }
  });
}

function createUploader(token, data) {
  let emit;
  const chan = eventChannel(emitter => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({total, loaded}) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };

  const uploadPromise = API.updateUserDetailsWithPhoto(
    token,
    data,
    uploadProgressCb,
  );
  return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan) {
  while (true) {
    const progress = yield take(chan);
    yield put(setUploadProgressParam(progress));
  }
}

export function* updateUserData() {
  yield takeEvery(UPDATE_USER_DETAILS, function*({
    payload,
    token,
    step,
    updateType,
  }) {
    try {
      let imageUpload = false;
      let updateTitleDocuments = [];
      let data;
      if (step === 'secondStep') {
        const {
          avatar,
          cover,
          documents,
          updateTitleRequiredDocuments,
          ...rest
        } = payload;
        data = new FormData();
        if (avatar) {
          data.append('avatar[image]', avatar, avatar.name);
        }

        if (cover) {
          data.append('cover[image]', cover, cover.name);
        }

        if (documents && documents.length) {
          documents.map((document, index) => {
            const key = `documents[${index + 1}]`;
            data.append(key + '[title]', document.title);
            data.append(key + '[file]', document.file);
            if (document.expiration) {
              data.append(key + '[expiration]', document.expiration);
            }
            return document;
          });
        }

        if (updateTitleRequiredDocuments) {
          updateTitleDocuments = updateTitleRequiredDocuments;
        }

        for (const key in rest) {
          data.append(key, rest[key]);
        }
        imageUpload = true;
      } else {
        data = {...payload};
      }
      let response;
      if (imageUpload) {
        const [uploadPromise, chan] = yield call(createUploader, token, data);
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
        response = yield call(API.updateUserDetails, data, token, imageUpload);
      }
      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          updateUserDetailsReceive(
            {response: response.data.user},
            step,
            updateType,
          ),
        );
        AsyncStorage.setItem(
          QONGFU_USER_KEY,
          JSON.stringify(response.data.user),
        );
        switch (step) {
          case 'firstStep':
            NavigationService.navigate('Step2');
            break;

          case 'secondStep': {
            if (updateTitleDocuments.length) {
              for (let i = 0; i < updateTitleDocuments.length; i++) {
                yield call(
                  API.updateDocumentsTitle,
                  updateTitleDocuments[i],
                  token,
                );
              }
            }
            break;
          }
          //   NavigationService.navigate('Step3');
          //   break;
          case 'thirdStep':
            NavigationService.navigate('UserOnBoardingSuccess');
            break;
          default:
            break;
        }
      } else if (response.status === 401) {
        yield put(updateUserDetailsError(updateType || 'normal', '401'));
      } else {
        if (step === 'secondStep') {
          notification(
            'Oops! Something went wrong, please try again later. Skip to continue.',
          );
        }
        yield put(
          updateUserDetailsError(updateType || 'normal', response.message),
        );
      }
    } catch (ex) {
      yield put(
        updateUserDetailsError(
          updateType || 'normal',
          'Error while updating user details',
        ),
      );
    }
  });
}

export function* userLogout() {
  yield takeEvery(USER_LOGOUT, function*({token}) {
    try {
      // const response = yield call(API.userLogout, token);
      // if (SuccessStatusCode.includes(response.status)) {
      AsyncStorage.setItem(QONGFU_USER_TOKEN_KEY, '');
      AsyncStorage.setItem(QONGFU_USER_KEY, '');
      yield put(userLogoutReceive());
      yield put(resetAppStore());
      yield put(resetBusinessState());
      yield put(resetPlacesState());
      NavigationService.navigate('SignIn');
      // } else {
      //   yield put(userLogoutError());
      //   //yield put(resetPasswordReceive());
      // }
    } catch (ex) {
      console.log('---Error while logout', ex);
    }
  });
}

export function* saveMissingEntity() {
  yield takeEvery(ADD_MISSING_ENTITY, function*({payload}) {
    try {
      const response = yield call(API.addMissingEntity, payload);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(addMissingEntityReceive());
      } else {
        yield put(addMissingEntityError());
      }
    } catch (ex) {
      yield put(addMissingEntityError('Error while sending Feedback'));
    }
  });
}

export function* userPasswordChange() {
  yield takeEvery(USER_PASSWORD_CHANGE, function*({
    payload,
    token,
    updateType,
  }) {
    try {
      const response = yield call(API.changeUserPassword, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(userPasswordChangeReceive(updateType));
      } else if (response.status === 401) {
        yield put(userPasswordChangeError('401'));
      } else {
        yield put(userPasswordChangeError(updateType, response.message));
      }
    } catch (ex) {
      yield put(
        userPasswordChangeError(updateType, 'Error while changing Password'),
      );
    }
  });
}

export function* createUserBioMetrics() {
  yield takeEvery(CREATE_USER_BIOMETRICS, function*({payload, token, mode}) {
    try {
      const response = yield call(API.createUserBioMetrics, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(createUserBioMetricsReceive({}));
        yield put(getUserDetails({token: token}));
        // AsyncStorage.setItem(
        //   QONGFU_USER_KEY,
        //   JSON.stringify(response.data.data),
        // );
        if (mode === 'onboarding') {
          NavigationService.navigate('Step3');
        }
      } else {
        yield put(createUserBioMetricsError(response.message));
      }
    } catch (ex) {
      yield put(createUserBioMetricsError('Error while saving user details'));
    }
  });
}

export function* updateUserBioMetrics() {
  yield takeEvery(UPDATE_USER_BIOMETRICS, function*({payload, token}) {
    try {
      const response = yield call(API.updateUserBioMetrics, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(updateUserBioMetricsReceive({response: response.data.user}));
        // AsyncStorage.setItem(
        //   QONGFU_USER_KEY,
        //   JSON.stringify(response.data.user),
        // );
        // NavigationService.navigate('Step3');
      } else {
        yield put(updateUserBioMetricsError(response.message));
      }
    } catch (ex) {
      yield put(updateUserBioMetricsError('Error while changing Password'));
    }
  });
}

export function* getUserBioMetrics() {
  yield takeEvery(GET_USER_BIOMETRICS, function*({payload, token}) {
    try {
      const response = yield call(API.getUserBiometrics, payload, token);
      if (SuccessStatusCode.includes(response.status)) {
        yield put(getUserBioMetricsReceive({biometrics: response.data}));
      } else {
        yield put(getUserBioMetricsError(response.message));
      }
    } catch (ex) {
      yield put(getUserBioMetricsError('Error while fetching user details'));
    }
  });
}

export function* getTodaySessions() {
  yield takeEvery(GET_TODAY_SESSIONS, function*({payload, pagination, token}) {
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
      const response = yield call(API.fetchSessions, queryParams, token);

      if (SuccessStatusCode.includes(response.status)) {
        yield put(
          getTodaySessionsReceive({
            sessions: response.data.data,
            pagination: pagination || tempPagination,
          }),
        );
      } else {
        yield put(getTodaySessionsError(response.message));
      }
    } catch (ex) {
      yield put(getTodaySessionsError('Error while fetching sessions'));
    }
  });
}

export function* updateBiometricsSettings() {
  yield takeEvery(UPDATE_BIOMETRICS_SETTINGS, function*({payload}) {
    const realm = yield Realm.open({schema: [DashbSettingsSchema]});

    payload.map(obj=>{
      realm.write(() => {
        realm.create('DashboardSettings', obj);
      });
    })
    yield put(updateBiometricsSettingsReceive(payload));
  });
}

export function* getBiometricsSettings() {
  yield takeEvery(GET_BIOMETRICS_SETTINGS, function*({payload}) {
    const realm = yield Realm.open({schema: [DashbSettingsSchema]});
    const settings = realm.objects('DashboardSettings');

    if (settings) {
      yield put(getBiometricsSettingsReceive(settings));
    } else {
      yield put(
        getBiometricsSettingsError('Error while fetching dashboard settings'),
      );
    }
  });
}
