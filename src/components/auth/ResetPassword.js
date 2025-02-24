import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/resetPassword.style';
import theme from '../../styles/theme.style';
import TextField from '../custom/textField';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {resetPassword} from '../../../redux/user/actions';
import {TextPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import CustomAlert from '../custom/customAlert';
import {getViewportHeight} from '../../../utils/helper';

const ResetPassword = props => {
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const {resetPassword, resetPasswordToken, resetPasswordError} = props;

  const validationSchema = () => {
    return Yup.object().shape({
      password: Yup.string()
        .required('Password is required')
        .min(
          8,
          'Minimum of 8 characters with a capital letter, a number, and a symbol.',
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Minimum of 8 characters with a capital letter, a number, and a symbol.',
        ),
      confirmPassword: Yup.string()
        .required('Password does not match.')
        .oneOf([Yup.ref('password'), null], 'Password does not match.'),
    });
  };

  let confirmPasswordMessage = 'Strong Password';

  const handleSubmit = values => {
    const {resetPassword} = props;
    resetPassword(
      {
        password: values.password,
      },
      resetPasswordToken,
    );
  };

  const getErrorSet = errors => {
    if (errors.password && !passwordError) {
      setPasswordError(true);
    }
    if (errors.confirmPassword && !confirmPasswordError) {
      setConfirmPasswordError(true);
    }
  };

  return (
    <View
      style={[
        styles.resetPasswordRoot,
        {backgroundColor: '#fff', height: getViewportHeight(false)},
      ]}>
      <Text style={styles.resetPasswordTitle}>Password Reset</Text>
      <Formik
        initialValues={{password: '', confirmPassword: ''}}
        onSubmit={values => handleSubmit(values)}
        validationSchema={validationSchema}>
        {({handleChange, values, handleSubmit, errors, touched}) => {
          getErrorSet(errors);
          return (
            <View>
              {resetPasswordError ? <Alert error={resetPasswordError} /> : null}
              <View style={styles.textFieldContainer}>
                <TextField
                  mode="Flat"
                  name="password"
                  label="Password"
                  secureTextEntry={true}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  placeholder="********"
                  theme={{
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: 'transparent',
                    },
                  }}
                  errorMessage={
                    errors.password &&
                    touched.password && <Text>{errors.password}</Text>
                  }
                />
                <View>
                  <TextPasswordStrengthDisplay password={values.password} />
                </View>
                <View style={styles.checkIconContainer}>
                  <Icon
                    name="check-circle"
                    size={32}
                    style={
                      errors.password
                        ? styles.checkIconInactive
                        : passwordError
                        ? styles.checkIconActive
                        : styles.checkIconInactive
                    }
                  />
                </View>
              </View>
              <View style={styles.textFieldContainer}>
                <TextField
                  mode="Flat"
                  name="confirmPassword"
                  label="Confirm Password"
                  secureTextEntry={true}
                  value={values.confirmPassword}
                  onChangeText={handleChange('confirmPassword')}
                  placeholder="********"
                  theme={{
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: 'transparent',
                    },
                  }}
                  errorMessage={
                    errors.confirmPassword &&
                    touched.confirmPassword && (
                      <Text>{errors.confirmPassword}</Text>
                    )
                  }
                />
                <View style={styles.checkIconContainer}>
                  <Icon
                    name="check-circle"
                    size={32}
                    style={
                      errors.confirmPassword
                        ? styles.checkIconInactive
                        : confirmPasswordError
                        ? styles.checkIconActive
                        : styles.checkIconInactive
                    }
                  />
                </View>
              </View>

              <View style={styles.submitBtnContainer}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.submitBtn}
                  labelStyle={styles.submitBtnLabel}>
                  Confirm
                </Button>
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    resetPasswordToken: state.user.resetPasswordToken,
    resetPasswordError: state.user.error['reset-password-success'] || null,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetPassword,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
