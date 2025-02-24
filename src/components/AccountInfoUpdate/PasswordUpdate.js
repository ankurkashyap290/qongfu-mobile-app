import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Portal, Dialog} from 'react-native-paper';
import styles from '../../styles/accountInfo.style';
import theme from '../../styles/theme.style';
import {
  userPasswordChange,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import TextField from '../custom/textField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TextPasswordStrengthDisplay} from 'react-native-password-strength-meter';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';

const UserNameUpdate = (props) => {
  const {
    userPasswordChange,
    token,
    userDetailsUpdated,
    resetUserDetailsUpdatedFlag,
    error,
  } = props;

  const validationSchema = () => {
    return Yup.object().shape({
      old_password: Yup.string()
        .required('Password is required')
        .min(
          8,
          'Minimum of 8 characters with a capital letter, a number, and a symbol.',
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Minimum of 8 characters with a capital letter, a number, and a symbol.',
        ),
      new_password: Yup.string()
        .required('Password is required')
        .min(
          8,
          'Minimum of 8 characters with a capital letter, a number, and a symbol.',
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Minimum of 8 characters with a capital letter, a number, and a symbol.',
        ),
      confirm_password: Yup.string()
        .required('Confirm password is required')
        .oneOf([Yup.ref('new_password'), null], 'Password does not match.'),
    });
  };

  const handleSubmit = (values) => {
    const payload = {
      old_password: values.old_password,
      password: values.new_password,
    };
    userPasswordChange({...payload}, token, 'account-info-password-update');
  };
  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('account-info-password-update');
    NavigationService.goBack();
  };
  return (
    <PageLayout>
      <Formik
        initialValues={{
          old_password: '',
          new_password: '',
          confirm_password: '',
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}>
        {({handleChange, values, handleSubmit, errors, touched}) => (
          <View>
            {error ? (
              <View style={{marginLeft: 30, marginRight: 30}}>
                <CustomAlert error={error} />
              </View>
            ) : null}

            <Text style={styles.fieldHeadings}>Current Password</Text>
            <View style={styles.passwordSection}>
              <View style={styles.fieldContainer}>
                <TextField
                  name="old_password"
                  secureTextEntry
                  placeholder="********"
                  onChangeText={handleChange('old_password')}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    errors.old_password &&
                    touched.old_password && <Text>{errors.old_password}</Text>
                  }
                />
              </View>
              {values.old_password === '' ? null : (
                <Icon
                  name={
                    error || errors.old_password
                      ? 'close-circle'
                      : 'check-circle'
                  }
                  style={
                    error || errors.old_password
                      ? styles.passwordCheckIconError
                      : styles.passwordCheckIconGreen
                  }
                  // size={20}
                />
              )}
            </View>
            <Text style={styles.fieldHeadings}>New Password</Text>
            <View style={styles.passwordSection}>
              <View style={styles.fieldContainer}>
                <TextField
                  name="new_password"
                  secureTextEntry
                  onChangeText={handleChange('new_password')}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    errors.new_password &&
                    touched.new_password && <Text>{errors.new_password}</Text>
                  }
                />
              </View>
              {values.new_password === '' ? null : (
                <Icon
                  name={errors.new_password ? 'close-circle' : 'check-circle'}
                  style={
                    errors.new_password
                      ? styles.passwordCheckIconError
                      : styles.passwordCheckIconGreen
                  }
                />
              )}
            </View>
            <View style={[styles.passwordSection]}>
              {errors.new_password ? null : (
                <View style={[styles.fieldContainer, {marginBottom: 20}]}>
                  <TextPasswordStrengthDisplay
                    meterType="bar"
                    password={values.new_password}
                    wrapperStyle={{right: 0}}
                  />
                </View>
              )}
            </View>
            <Text style={styles.fieldHeadings}>Confirm Password</Text>
            <View style={styles.passwordSection}>
              <View style={styles.fieldContainer}>
                <TextField
                  name="confirm_password"
                  secureTextEntry
                  onChangeText={handleChange('confirm_password')}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    errors.confirm_password &&
                    touched.confirm_password && (
                      <Text>{errors.confirm_password}</Text>
                    )
                  }
                />
              </View>
              {values.confirm_password === '' ? null : (
                <Icon
                  name={
                    errors.confirm_password ? 'close-circle' : 'check-circle'
                  }
                  style={
                    errors.confirm_password
                      ? styles.passwordCheckIconError
                      : styles.passwordCheckIconGreen
                  }
                />
              )}
            </View>
            <View style={styles.updateButtonContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.updateButton}
                labelStyle={styles.updateButtonLable}>
                Confirm
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>Password Updated!</Text>

          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              style={styles.successButton}
              labelStyle={styles.successButtonLable}
              onPress={handleSuccessModalClose}>
              OK
            </Button>
          </View>
        </Dialog>
      </Portal>
    </PageLayout>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    userLoading: state.user.loading,
    token: state.user.token,
    userDetailsUpdated:
      state.user.userDetailsUpdated[
        'update-details-account-info-password-update'
      ] || null,
    error:
      state.user.error['update-details-account-info-password-update'] || null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      resetUserDetailsUpdatedFlag,
      userPasswordChange,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(UserNameUpdate);
