import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import CountDown from 'react-native-countdown-component';
import styles from '../../styles/confirmOTP.style';
import {
  confirmOTPTimeLimit,
  MaxSendOTPAgainLimit,
  EnableSendOTPAgain,
} from '../../../config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  verifyOTP,
  resetPasswordConfirmOTP,
  resetPasswordSendOTP,
  phoneVerify,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import * as NavigationService from '../../navigators/NavigationService';
import CustomAlert from '../custom/customAlert';

const ConfirmOTP = props => {
  const {
    token,
    verifyOTP,
    resetPasswordConfirmOTP,
    resetType,
    mode,
    verifyResetPasswordSMSError,
    verifyResetPasswordEmailError,
    verifyMobileError,
    profile,
    phoneVerify,
    contactNumber,
    userDetailsUpdated,
    resetUserDetailsUpdatedFlag,
  } = props;
  const [value, setValue] = useState('');
  const [timeCountFinished, setTimeCountFinished] = useState(false);
  const CELL_COUNT = 5;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [countDownProps, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const [timeLimit, setTimeLimit] = useState(confirmOTPTimeLimit);
  const [OTPAgainLimit, setOTPAgainLimit] = useState(0);
  const [disableSendOTPAgain, setDisableSendOTPAgain] = useState(false);

  useEffect(() => {
    if (userDetailsUpdated) {
      resetUserDetailsUpdatedFlag('signup-phone-verify');
    }
  }, [userDetailsUpdated]);

  const handleTimeCount = () => {
    setTimeCountFinished(true);
  };

  const handleSubmit = () => {
    if (value && !timeCountFinished) {
      if (props.mode === 'passwordReset') {
        resetPasswordConfirmOTP({
          reset_type: resetType,
          reset_key: value,
        });
      } else {
        verifyOTP({code: value}, token, mode);
      }
    }
  };
  const handleSendOTP = () => {
    setTimeLimit(timeLimit - 1);
    setOTPAgainLimit(OTPAgainLimit + 1);
    setTimeCountFinished(false);
    setDisableSendOTPAgain(true);
    if (props.mode === 'phoneVerify' || props.mode === 'mobileUpdate') {
      phoneVerify(
        {
          contact_number: contactNumber,

          first_name: profile.first_name,
          last_name: profile.last_name,
        },
        token,
        'sendOTPAgain',
      );
    } else {
      resetPasswordSendOTP(
        {
          reset_type: resetType,
          contact_number: contactNumber,
          contact_country_code: selectedCountry.dial_code,
        },
        'sendOTPAgain',
      );
    }
    setTimeout(() => {
      setDisableSendOTPAgain(false);
    }, EnableSendOTPAgain);
  };

  return (
    <View style={styles.confirmOtpContainer}>
      <View>
        <View>
          <Text style={styles.confirmOTPHeading}>
            {props.mode === 'passwordReset'
              ? 'Password Reset'
              : 'Confirm the OTP'}
          </Text>
          <Text style={styles.confirmOTPSubHeading}>
            Please type the OTP code we sent to your{'\n'}{' '}
            {resetType === 'email' ? 'email' : 'mobile number'}.
          </Text>
        </View>
        {verifyResetPasswordSMSError ? (
          <CustomAlert error={verifyResetPasswordSMSError} />
        ) : null}

        {verifyResetPasswordEmailError ? (
          <CustomAlert error={verifyResetPasswordEmailError} />
        ) : null}

        {verifyMobileError ? <CustomAlert error={verifyMobileError} /> : null}
        <View>
          <CodeField
            ref={ref}
            {...countDownProps}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <View key={index} onLayout={getCellOnLayoutHandler(index)}>
                <Text style={[styles.cell, isFocused && styles.focusCell]}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </Text>
              </View>
            )}
          />
        </View>
        <View style={styles.timerContainer}>
          <View>
            <CountDown
              size={30}
              until={timeLimit}
              onFinish={() => handleTimeCount()}
              digitStyle={styles.counterDigitStyle}
              digitTxtStyle={
                timeCountFinished
                  ? styles.inactiveDigitStyle
                  : styles.activeDigitStyle
              }
              separatorStyle={
                timeCountFinished
                  ? styles.inactiveSeparator
                  : styles.activeSeparator
              }
              timeToShow={['M', 'S']}
              timeLabels={{m: null, s: null}}
              showSeparator
            />
          </View>
          <View>
            <Text style={styles.timeRemaining}>remaining </Text>
          </View>
        </View>
        <View style={styles.submitBtnContainer}>
          <Button
            mode="contained"
            style={value === '' ? styles.submitButtonDisable : styles.submitBtn}
            labelStyle={
              value === ''
                ? styles.submitBtnDisableLabel
                : styles.submitBtnLabel
            }
            disabled={value === ''}
            onPress={() => handleSubmit()}>
            Submit
          </Button>
          {MaxSendOTPAgainLimit > OTPAgainLimit ? (
            <Button
              mode="text"
              style={styles.sendAgainBtn}
              labelStyle={
                disableSendOTPAgain
                  ? styles.sendAgainLabelDisabled
                  : styles.sendAgainLabel
              }
              disabled={disableSendOTPAgain}
              onPress={handleSendOTP}>
              Send OTP again
            </Button>
          ) : null}
        </View>
      </View>
      <View>
        <Button
          mode="text"
          labelStyle={styles.cancelBtnLabel}
          onPress={() => NavigationService.goBack()}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    profile: state.user.profile,
    token: state.user.token,
    verifyResetPasswordSMSError: state.user.error['verify-reset-sms'] || null,
    verifyResetPasswordEmailError:
      state.user.error['verify-reset-email'] || null,
    verifyMobileError: state.user.error['verify-mobile'] || null,
    userDetailsUpdated:
      state.user.userDetailsUpdated['update-details-signup-phone-verify'] ||
      null,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      verifyOTP,
      resetPasswordConfirmOTP,
      resetPasswordSendOTP,
      phoneVerify,
      resetUserDetailsUpdatedFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmOTP);
