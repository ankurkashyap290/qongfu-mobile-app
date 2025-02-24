import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/sendOTP.style';
import TextField from '../custom/textField';
import theme from '../../styles/theme.style';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {resetPasswordSendOTP} from '../../../redux/user/actions';
import * as NavigationService from '../../navigators/NavigationService';
import CustomAlert from '../custom/customAlert';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import {getViewportHeight} from '../../../utils/helper';
const SendOTPByEmail = props => {
  const {title, mode, subTitle, resetPasswordError} = props;
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required(' Email is required')
        .email('Please enter valid format'),
    });
  };

  const handleSubmit = values => {
    const {resetPasswordSendOTP} = props;
    resetPasswordSendOTP({
      reset_type: 'email',
      email: values.email,
    });
    //TODO: CHECK ERROR OF EMAIL NOT EXISTS SHOW
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
              </View>

              <Formik
                initialValues={{email: ''}}
                onSubmit={values => handleSubmit(values)}
                validationSchema={validationSchema}>
                {({handleChange, values, handleSubmit, errors, touched}) => (
                  <View>
                    {resetPasswordError ? (
                      <CustomAlert error={resetPasswordError} />
                    ) : null}
                    <View>
                      <Text
                        style={
                          mode === 'passwordReset'
                            ? styles.resetPasswordSubHeading
                            : styles.sendOtpSubHeading
                        }>
                        {subTitle}
                      </Text>
                      <View>
                        <TextField
                          name="email"
                          placeholder="Email"
                          style={styles.emailTextInputField}
                          value={values.email}
                          onChangeText={handleChange('email')}
                          theme={{
                            roundness: 28,
                            colors: {
                              primary: 'transparent',
                              underlineColor: 'transparent',
                              color: theme.PRIMARY_COLOR,
                            },
                          }}
                          errorMessage={
                            errors.email &&
                            touched.email && <Text>{errors.email}</Text>
                          }
                          validFieldMessage="The email is valid."
                        />
                      </View>
                      {mode === 'passwordReset' ? (
                        <View>
                          <Text
                            style={[
                              styles.emailRegisterText,
                              styles.emailRegisterTextAlign,
                            ]}
                            onPress={() =>
                              NavigationService.navigate(
                                'RecoverPasswordByPhone',
                              )
                            }>
                            Would you like to receive the reset code through
                            your registered mobile number instead?
                          </Text>
                        </View>
                      ) : null}
                      <View>
                        <Button
                          mode="contained"
                          style={styles.sendOtpSubmitBtn}
                          labelStyle={styles.sendOtpSubmitBtnLabel}
                          onPress={handleSubmit}>
                          Send OTP to this email
                        </Button>
                      </View>
                    </View>
                  </View>
                )}
              </Formik>
            </View>
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
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    resetPasswordError: state.user.error['forgot-reset-email'] || null,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetPasswordSendOTP,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SendOTPByEmail);
