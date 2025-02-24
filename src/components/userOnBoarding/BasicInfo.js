import React, {useState, useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, Portal, Dialog, List} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import styles from '../../styles/userInfo.style';
import TextField from '../custom/textField';
import theme from '../../styles/theme.style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import {GenderList} from '../../../config';
import LabelField from '../custom/LabelField';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import CustomAlert from '../custom/customAlert';
import {isUserLoggedIn} from '../../../utils';
import PageLayout from '../../layout/PageLayout';

const BasicInfo = ({
  updateUserDetails,
  token,
  loading,
  profile,
  error,
  userDetailsUpdated,
  resetUserDetailsUpdatedFlag,
}) => {
  useEffect(() => {
    if (userDetailsUpdated) {
      resetUserDetailsUpdatedFlag('user-onboarding-basic-info-update');
    }
  }, [userDetailsUpdated]);
  const validationSchema = () => {
    return Yup.object().shape({
      firstName: Yup.string().required(' First name is required'),
      lastName: Yup.string().required('Last name is required'),
    });
  };
  const [date, setDate] = useState(
    profile.date_of_birth !== null
      ? moment(profile.date_of_birth).toDate()
      : '',
  );

  const dobDialog = useRef();
  const [gender, setGenderValue] = useState(
    profile.gender ? profile.gender : '',
  );
  const [genderModalVisibility, setGenderModalVisibility] = useState(false);

  const handleDobModalOpen = () => {
    const tempDate = date ? date : new Date();
    if (dobDialog) {
      dobDialog.current.open({date: tempDate, maxDate: new Date()});
    }
  };
  const onDOBDatePicked = (date) => {
    setDate(date);
  };

  const handleGenderModalOpen = () => {
    setGenderModalVisibility(true);
  };
  const handleGenderModalClose = () => {
    setGenderModalVisibility(false);
  };
  const handleSelectGender = (gender) => {
    setGenderValue(gender);
  };

  const getInitialValues = () => {
    const initialValues = {
      firstName: isUserLoggedIn(profile) ? profile.first_name : '',
      lastName: isUserLoggedIn(profile) ? profile.last_name : '',
    };
    return initialValues;
  };
  const handleSubmit = (values) => {
    const fullname = `${values.firstName} ${values.lastName}`;
    let payload = {
      first_name: values.firstName,
      last_name: values.lastName,
      fullname,
      display_name: fullname,
      date_of_birth: date ? moment(date).format('YYYY-MM-DD') : '',
      gender: gender,
    };

    if (payload.date_of_birth === '') {
      delete payload.date_of_birth;
    }
    if (payload.gender === '') {
      delete payload.gender;
    }

    updateUserDetails(
      {
        ...payload,
      },
      token,
      'firstStep',
      'user-onboarding-basic-info-update',
    );
  };

  return (
    <PageLayout>
      <View style={styles.rootContainer}>
        <GlobalOverlayLoading loading={loading} textContent="" />
        <View>
          <Text style={styles.titleHeading}>
            Let’s start with your{'\n'} First and Last Name
          </Text>
          <Text style={styles.subHeading}>
            Your name is required so we could{'\n'} identity you.
          </Text>
        </View>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}>
          {({handleChange, values, handleSubmit, errors, touched}) => {
            return (
              <View
                style={{
                  // backgroundColor: 'red',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                  }}>
                  {error ? <CustomAlert error={error} /> : null}
                  <View style={[styles.userInfoInput, {minWidth: 300}]}>
                    <TextField
                      mode="outlined"
                      name="firstName"
                      label="FIRST NAME"
                      value={values.firstName}
                      placeholder="The name people calls you"
                      onChangeText={handleChange('firstName')}
                      style={styles.textSignUpInputField}
                      theme={{
                        roundness: 28,
                        colors: {
                          primary: theme.SECONDARY_COLOR,
                          underlineColor: theme.SECONDARY_COLOR,
                        },
                      }}
                      errorMessage={
                        errors.firstName &&
                        touched.firstName && <Text>{errors.firstName}</Text>
                      }
                    />
                  </View>
                  <View style={[styles.userInfoInput, , {minWidth: 300}]}>
                    <TextField
                      mode="outlined"
                      name="lastName"
                      label="LAST NAME"
                      value={values.lastName}
                      placeholder="Your family name"
                      onChangeText={handleChange('lastName')}
                      style={styles.textSignUpInputField}
                      theme={{
                        roundness: 28,
                        colors: {
                          primary: theme.SECONDARY_COLOR,
                          underlineColor: theme.SECONDARY_COLOR,
                        },
                      }}
                      errorMessage={
                        errors.lastName &&
                        touched.lastName && <Text>{errors.lastName}</Text>
                      }
                    />
                  </View>

                  <View
                    style={[
                      styles.userInfoInput,
                      {marginTop: 16, minWidth: 250},
                    ]}>
                    <LabelField
                      roundness={28}
                      label="BIRTH DATE"
                      placeholder="BIRTH DATE"
                      value={date ? moment(date).format('MM/DD/YYYY') : ''}
                      onPress={handleDobModalOpen}
                    />
                  </View>
                  <View
                    style={[
                      styles.userInfoInput,
                      {marginTop: 16, minWidth: 200},
                    ]}>
                    <LabelField
                      roundness={28}
                      label="GENDER"
                      placeholder="GENDER"
                      value={GenderList[gender] || ''}
                      onPress={handleGenderModalOpen}
                    />
                  </View>
                </View>
                <View style={styles.successCheckIconContainer}>
                  <Button
                    mode="outlined"
                    style={styles.mobileSubmitBtn}
                    labelStyle={styles.mobileSubmitBtnLabel}
                    onPress={handleSubmit}>
                    Next
                  </Button>
                </View>
              </View>
            );
          }}
        </Formik>

        <DatePickerDialog
          ref={dobDialog}
          onDatePicked={onDOBDatePicked}
          date={date}
        />
        <Portal>
          <Dialog
            visible={genderModalVisibility}
            onDismiss={handleGenderModalClose}>
            <Text style={styles.dobModalSubHeading}>
              Please select your gender
            </Text>
            <View style={[styles.userInfoInput, {position: 'relative'}]}>
              {Object.keys(GenderList).map((item) => (
                <List.Item
                  title={GenderList[item]}
                  right={(props) => (
                    <List.Icon
                      {...props}
                      icon={gender === item ? 'check' : ''}
                      color={theme.PRIMARY_COLOR}
                    />
                  )}
                  onPress={() => handleSelectGender(item)}
                  style={[styles.listItem, {marginTop: 10, marginBottom: 10}]}
                />
              ))}
            </View>
            <View style={styles.updateButtonContainer}>
              <Button
                mode="contained"
                style={styles.modalButton}
                labelStyle={styles.modalButtonLable}
                onPress={handleGenderModalClose}>
                Confirm
              </Button>
            </View>
          </Dialog>
        </Portal>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    token: state.user.token,
    profile: state.user.profile,
    error:
      state.user.error['update-details-user-onboarding-basic-info-update'] ||
      null,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      updateUserDetails,
      resetUserDetailsUpdatedFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
