import React, {useEffect} from 'react';
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

const UserNameUpdate = (props) => {
  const {
    updateUserDetails,
    token,
    profile,
    userDetailsUpdated,
    resetUserDetailsUpdatedFlag,
    error,
  } = props;
  const runDone = props.navigation.getParam('runDone');

  let formHandleSubmit = null;

  useEffect(() => {
    if (runDone) {
      formHandleSubmit && formHandleSubmit();
      props.navigation.setParams({runDone: false});
    }
  }, [runDone]);

  const validationSchema = () => {
    return Yup.object().shape({
      first_name: Yup.string().required('First Name is required'),
      last_name: Yup.string().required('Last Name is required'),
    });
  };

  const handleSubmit = (values) => {
    const payload = {
      first_name: values.first_name,
      last_name: values.last_name,
    };
    updateUserDetails({...payload}, token, '', 'account-info-name-update');
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('account-info-name-update');
    NavigationService.goBack();
  };

  return (
    <PageLayout>
      <Formik
        initialValues={{
          first_name: profile.first_name,
          last_name: profile.last_name,
        }}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}>
        {({handleChange, values, handleSubmit, errors, touched}) => {
          formHandleSubmit = handleSubmit;
          return (
            <View>
              {error ? (
                <View style={{marginLeft: 30, marginRight: 30}}>
                  <CustomAlert error={error} />
                </View>
              ) : null}
              <Text style={styles.fieldHeadings}>First Name</Text>
              <View style={{margin: 20}}>
                <TextField
                  name="first_name"
                  value={values.first_name}
                  placeholder="first name"
                  onChangeText={handleChange('first_name')}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    errors.first_name &&
                    touched.first_name && <Text>{errors.first_name}</Text>
                  }
                />
              </View>
              <Text style={styles.fieldHeadings}>Last Name</Text>
              <View style={{margin: 20}}>
                <TextField
                  name="last_name"
                  value={values.last_name}
                  onChangeText={handleChange('last_name')}
                  placeholder="last name"
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    errors.last_name &&
                    touched.last_name && <Text>{errors.last_name}</Text>
                  }
                />
              </View>
            </View>
          );
        }}
      </Formik>
      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>
            First Name and Last Name Updated!
          </Text>

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
        'update-details-account-info-name-update'
      ] || null,
    error: state.user.error['update-details-account-info-name-update'] || null,
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

export default connect(mapStateToProps, mapDispatchToProps)(UserNameUpdate);
