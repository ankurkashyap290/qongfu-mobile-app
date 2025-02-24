import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Portal, Dialog} from 'react-native-paper';
import styles from '../../styles/accountInfo.style';
import theme from '../../styles/theme.style';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import TextField from '../custom/textField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';

const EmailUpdate = (props) => {
  const {
    updateUserDetails,
    token,
    profile,
    userDetailsUpdated,
    resetUserDetailsUpdatedFlag,
    error,
  } = props;

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Please enter valid format'),
    });
  };

  const handleSubmit = (values) => {
    const payload = {
      email: values.email,
      first_name: profile.first_name,
      last_name: profile.last_name,
    };
    updateUserDetails({...payload}, token, '', 'account-info-email-update');
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('account-info-email-update');
    NavigationService.goBack();
  };
  return (
    <PageLayout>
      <Formik
        initialValues={{email: ''}}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}>
        {({handleChange, values, handleSubmit, errors, touched}) => (
          <View>
            {error ? (
              <View style={{marginLeft: 30, marginRight: 30}}>
                <CustomAlert error={error} />
              </View>
            ) : null}
            <Text style={styles.textFieldLabels}>Old Email</Text>
            <View style={{marginLeft: 20, marginRight: 20}}>
              <TextField
                value={profile && profile.email}
                editable={false}
                // style={styles.textInputField}
                theme={{
                  roundness: 10,
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: theme.SECONDARY_COLOR,
                  },
                }}
              />
            </View>
            <Text style={styles.textFieldLabels}>New Email</Text>
            <View style={{marginLeft: 20, marginRight: 20}}>
              <TextField
                name="email"
                onChangeText={handleChange('email')}
                value={values.email}
                placeholder="your email address"
                theme={{
                  roundness: 10,
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: theme.SECONDARY_COLOR,
                  },
                }}
                errorMessage={
                  errors.email && touched.email && <Text>{errors.email}</Text>
                }
              />
            </View>
            <View style={styles.updateButtonContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.updateButton}
                labelStyle={styles.updateButtonLable}>
                Send Email
              </Button>
            </View>
          </View>
        )}
      </Formik>
      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>
            We’ve sent you an email.
          </Text>
          <Text style={styles.successDialogHeading}>Please verify.</Text>
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
    profile: state.user.profile,
    token: state.user.token,
    userDetailsUpdated:
      state.user.userDetailsUpdated[
        'update-details-account-info-email-update'
      ] || null,
    error: state.user.error['update-details-account-info-email-update'] || null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserDetails,
      resetUserDetailsUpdatedFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(EmailUpdate);
