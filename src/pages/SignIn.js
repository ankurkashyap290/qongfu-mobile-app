import React, {useState} from 'react';
import {View, Text, Platform} from 'react-native';
import AuthLayout from '../layout/AuthLayout';
import {Button, Dialog, Portal} from 'react-native-paper';
import styles from '../styles';
import theme from '../styles/theme.style';
import TextField from '../components/custom/textField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userLogin} from '../../redux/user/actions';
import * as NavigationService from '../navigators/NavigationService';
import CustomAlert from '../components/custom/customAlert';
import DeviceInfo from 'react-native-device-info';

const SignIn = (props) => {
  const [isSecure, setIsSecure] = useState(true);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required(' Email is required')
        .email('Please enter valid format'),
      password: Yup.string().required('Password is required'),
    });
  };

  const _handleIsSecure = () => {
    setIsSecure(!isSecure);
    // NavigationService.navigate('Dashboard')
  };

  const handleSubmit = (values) => {
    const {userLogin, fcmInit, fcmToken} = props;
    const payload = {
      email: values.email,
      password: values.password,
      for_mobile: true,
      device_id: fcmInit ? fcmToken : '',
      device_name: DeviceInfo.getDeviceId(),
      device_type: Platform.IOS ? 'ios' : 'android',
    };
    console.log('Login detils', payload);
    userLogin(payload, null);
  };

  const _hideDialogPassword = () => {
    setForgotPasswordVisible(!forgotPasswordVisible);
  };

  const handleNavigation = (route) => {
    _hideDialogPassword();
    NavigationService.navigate(route);
  };

  return (
    <AuthLayout
      {...props}
      page="sign-in"
      title="Making Health & Fitness a Lifestyle">
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}>
        {({handleChange, values, handleSubmit, errors, touched}) => (
          <View>
            {props.error ? <CustomAlert error={props.error} /> : null}
            <View>
              <Text style={styles.formFieldLabel}>Email</Text>
              <TextField
                name="email"
                mode="outlined"
                value={values.email}
                placeholder="Your email here"
                onChangeText={handleChange('email')}
                underlineColorAndroid="transparent"
                style={styles.textInputField}
                theme={{
                  roundness: 50,
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: '#fff',
                  },
                }}
                errorMessage={
                  errors.email && touched.email && <Text>{errors.email}</Text>
                }
                // validFieldMessage="Your email is good."
              />
            </View>
            <View>
              <Text style={styles.formFieldLabel}>Password</Text>
              <TextField
                name="password"
                mode="outlined"
                secureTextEntry={isSecure}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="********"
                style={styles.textInputField}
                iconActive={isSecure}
                underlineColorAndroid="transparent"
                icon="eye"
                theme={{
                  roundness: 50,
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: theme.SECONDARY_COLOR,
                  },
                }}
                onIconClick={_handleIsSecure}
                errorMessage={
                  errors.password &&
                  touched.password && <Text>{errors.password}</Text>
                }
              />
            </View>
            <View style={styles.signUpBtnContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.signUpEnable}
                labelStyle={styles.signUpLabel}>
                Sign in now
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <View>
        <Button
          mode="text"
          onPress={_hideDialogPassword}
          style={styles.forgotBtn}
          labelStyle={styles.forgotBtnLabel}>
          Forgot Password?
        </Button>
      </View>
      <Portal>
        <Dialog
          visible={forgotPasswordVisible}
          onDismiss={_hideDialogPassword}
          style={styles.passwordDialog}>
          <Text style={styles.passwordDialogHeading}>Forgot Password</Text>
          <Text style={styles.passwordDialogSubHeading}>
            Where would you like us to send your{'\n'} password reset codes?
          </Text>
          <Button
            mode="text"
            style={styles.passwordDialogBtn}
            labelStyle={styles.passwordDialogBtnLabel}
            onPress={() => handleNavigation('RecoverPasswordByPhone')}>
            Mobile Number
          </Button>
          <Button
            mode="text"
            style={styles.passwordDialogBtn}
            labelStyle={styles.passwordDialogBtnLabel}
            onPress={() => handleNavigation('RecoverPasswordByEmail')}>
            Email Address
          </Button>
          <Button
            mode="text"
            style={styles.passwordDialogBtn}
            onPress={_hideDialogPassword}
            labelStyle={styles.passwordDialogBtnCancelLabel}>
            Cancel
          </Button>
        </Dialog>
      </Portal>
    </AuthLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    user: state.user.user,
    error: state.user.error['sign-in'] || null,
    fcmToken: state.app.fcmToken,
    fcmInit: state.app.fcmInit,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userLogin,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
