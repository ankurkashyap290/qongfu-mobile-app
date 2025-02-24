import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button, Portal, Dialog} from 'react-native-paper';
import MobileNumber from '../custom/mobileNumber';
import styles from '../../styles/sendOTP.style';
import theme from '../../styles/theme.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {phoneVerify, resetPasswordSendOTP} from '../../../redux/user/actions';
import {defaultCountry} from '../../../config';
import * as NavigationService from '../../navigators/NavigationService';
import CountriesList from './countriesList';
import CustomAlert from '../custom/customAlert';
import {getViewportHeight} from '../../../utils/helper';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = () => {
  return Yup.object().shape({
    phoneNumber: Yup.string()
      .required(' Phone number is required')
      .matches(phoneRegex, 'Please enter a valid phone number'),
  });
};

const SendOTP = props => {
  const {title, mode, subTitle, resetPasswordError, updateMobileError} = props;
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [showCountry, setShowCountry] = useState(false);

  const handleCountryClick = value => {
    setSelectedCountry(value);
    setShowCountry(false);
  };

  const handleSetShowCountry = () => {
    setShowCountry(true);
  };

  const _hideDialogClose = () => {
    setShowCountry(false);
  };

  const handleSubmit = values => {
    const {token, profile, phoneVerify, resetPasswordSendOTP} = props;
    if (mode === 'phoneVerify') {
      phoneVerify(
        {
          contact_number: `+${selectedCountry.dial_code}${values.phoneNumber}`,
          contact_country_code: selectedCountry.dial_code,
          first_name: profile.first_name,
          last_name: profile.last_name,
        },
        token,
        'sendOTP-verify-mobile',
      );
    } else {
      resetPasswordSendOTP(
        {
          reset_type: 'sms',
          contact_number: `+${selectedCountry.dial_code}${values.phoneNumber}`,
        },
        'sendOTP',
      );
    }
  };
  return (
    <View style={{backgroundColor: '#fff'}}>
      <ScrollView>
        <GlobalOverlayLoading loading={props.loading} textContent="" />
        <View style={[{minHeight: getViewportHeight(false)}]}>
          <View style={[styles.sendOTPContainer]}>
            <View>
              <View
                style={{
                  paddingTop: 20,
                  alignItems: 'center',
                  flexDirection: 'column',
                }}>
                <Text
                  style={
                    mode === 'passwordReset'
                      ? styles.resetPasswordHeading
                      : styles.sendOtpHeading
                  }>
                  {title}
                </Text>
                <Text
                  style={
                    mode === 'passwordReset'
                      ? styles.resetPasswordSubHeading
                      : styles.sendOtpSubHeading
                  }>
                  {subTitle}
                </Text>
              </View>
              <Formik
                initialValues={{phoneNumber: ''}}
                onSubmit={values => handleSubmit(values)}
                validationSchema={validationSchema}>
                {({handleChange, values, handleSubmit, errors, touched}) => (
                  <View>
                    {resetPasswordError ? (
                      <CustomAlert error={resetPasswordError} />
                    ) : null}

                    {updateMobileError ? (
                      <CustomAlert error={updateMobileError} />
                    ) : null}
                    <View>
                      <MobileNumber
                        mode="outlined"
                        theme={{
                          roundness: 50,
                          colors: {
                            primary: theme.SECONDARY_COLOR,
                            underlineColor: '#ffffff',
                          },
                        }}
                        underlineColorAndroid="transparent"
                        icon={selectedCountry.flag}
                        countryCode={selectedCountry.dial_code}
                        onIconClick={handleSetShowCountry}
                        value={values.phoneNumber}
                        onChangeText={handleChange('phoneNumber')}
                        errorMessage={
                          errors.phoneNumber &&
                          touched.phoneNumber && (
                            <Text>{errors.phoneNumber}</Text>
                          )
                        }
                      />
                    </View>
                    {mode === 'passwordReset' ? (
                      <View>
                        <Text style={styles.resetPasswordSubLine}>
                          Choose your country code and type local number.
                        </Text>
                        <Text
                          style={styles.emailRegisterText}
                          onPress={() =>
                            NavigationService.navigate('RecoverPasswordByEmail')
                          }>
                          Would you like to receive the reset code through your
                          registered Email?
                        </Text>
                      </View>
                    ) : null}
                    <View>
                      <Button
                        mode="contained"
                        style={styles.sendOtpSubmitBtn}
                        labelStyle={styles.sendOtpSubmitBtnLabel}
                        onPress={handleSubmit}>
                        Send OTP to this number
                      </Button>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
            <View style={styles.cancelBtnContainer}>
              <Button
                mode="text"
                style={styles.cancelBtn}
                labelStyle={styles.cancelOtpLabel}
                onPress={() => NavigationService.navigate('SignIn')}>
                Cancel
              </Button>
            </View>
          </View>
        </View>
      </ScrollView>
      <Portal>
        <Dialog
          visible={showCountry}
          onDismiss={_hideDialogClose}
          style={styles.countryDialog}>
          <Dialog.Title style={styles.countryDialogTitle}>
            Select your country location
          </Dialog.Title>
          <Dialog.Content>
            <CountriesList
              handleCountryClick={handleCountryClick}
              selectedCountry={selectedCountry}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    token: state.user.token,
    profile: state.user.profile,
    resetPasswordError: state.user.error['forgot-reset-sms'] || null,
    updateMobileError: state.user.error['update-mobile'] || null,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      phoneVerify,
      resetPasswordSendOTP,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SendOTP);
