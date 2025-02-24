import React, {useState, useRef, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, Portal, Dialog, List, HelperText} from 'react-native-paper';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import styles from '../../styles/userInfoStyle2.style';
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
import CalendarIcon from '../../assets/img/calendar-icon.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as NavigationService from '../../navigators/NavigationService';

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

  const dobDialog = useRef();
  const [gender, setGenderValue] = useState(
    profile.gender ? profile.gender : '',
  );
  const [genderModalVisibility, setGenderModalVisibility] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [genderError, setGenderError] = useState(false);

  const handleDobModalOpen = () => {
    const tempDate = date ? date : new Date();
    if (dobDialog) {
      dobDialog.current.open({date: tempDate, maxDate: new Date()});
    }
  };
  const onDOBDatePicked = date => {
    setDate(date);
  };

  const handleGenderModalOpen = () => {
    setGenderModalVisibility(true);
  };
  const handleGenderModalClose = () => {
    setGenderModalVisibility(false);
  };
  const handleSelectGender = gender => {
    setGenderValue(gender);
  };

  const getInitialValues = () => {
    const initialValues = {
      firstName: isUserLoggedIn(profile) ? profile.first_name : '',
      lastName: isUserLoggedIn(profile) ? profile.last_name : '',
      date:
        profile.date_of_birth !== null
          ? moment(profile.date_of_birth).toDate()
          : '',
      gender: profile.gender ? profile.gender : '',
    };
    return initialValues;
  };

  const validate = getValidationSchema => {
    return values => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, {abortEarly: false});
        return {};
      } catch (error) {
        validateExtras();
        return getErrorsFromValidationError(error);
      }
    };
  };

  const getErrorsFromValidationError = validationError => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      };
    }, {});
  };

  const validateExtras = () => {
    let update = true;
    if (!date) {
      setDobError(true);
    }
    if (!gender) {
      setGenderError(true);
    }

    return update;
  };

  const [date, setDate] = useState(
    profile.date_of_birth !== null
      ? moment(profile.date_of_birth).toDate()
      : '',
  );

  const handleSubmit = values => {
    if (validateExtras(values)) {
      setDobError(false);
      setGenderError(false);
      const fullname = `${values.firstName} ${values.lastName}`;
      let payload = {
        first_name: values.firstName,
        last_name: values.lastName,
        fullname,
        display_name: fullname,
        date_of_birth: date ? moment(date).format('YYYY-MM-DD') : '',
        gender: gender,
      };

      updateUserDetails(
        {
          ...payload,
        },
        token,
        'firstStep',
        'user-onboarding-basic-info-update',
      );
    }
  };

  return (
    <PageLayout>
      <View style={styles.rootContainer}>
        <GlobalOverlayLoading loading={loading} textContent="" />
        <View>
          <Text style={styles.titleHeading}>
            Let’s start with your First{'\n'} and Last Name
          </Text>
          <Text style={styles.subHeading}>
            Your name is required so we could identity you.
          </Text>
        </View>
        <Formik
          initialValues={getInitialValues()}
          onSubmit={values => handleSubmit(values)}
          validate={validate(validationSchema)}>
          {({handleChange, values, handleSubmit, errors, touched}) => {
            return (
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '100%',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    // alignItems: 'flex-start',
                  }}>
                  {error ? <CustomAlert error={error} /> : null}
                  <View style={[styles.userInfoInput, {minWidth: 300}]}>
                    <Text style={styles.fieldLabel}>
                      FIRST NAME <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <TextField
                      mode="outlined"
                      name="firstName"
                      value={values.firstName}
                      placeholder="The name people calls you"
                      onChangeText={handleChange('firstName')}
                      style={styles.basicInfoTextField}
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
                      containerStyle={{
                        elevation: 0,
                        borderWidth: 1,
                        borderColor: '#DEDEDE',
                      }}
                    />
                  </View>
                  <View style={[styles.userInfoInput, , {minWidth: 300}]}>
                    <Text style={styles.fieldLabel}>
                      LAST NAME <Text style={styles.asterisk}>*</Text>
                    </Text>
                    <TextField
                      mode="outlined"
                      name="lastName"
                      value={values.lastName}
                      placeholder="Your family name"
                      onChangeText={handleChange('lastName')}
                      style={styles.basicInfoTextField}
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
                      containerStyle={{
                        elevation: 0,
                        borderWidth: 1,
                        borderColor: '#DEDEDE',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      flex: 1,
                    }}>
                    <View
                      style={[
                        styles.userInfoInput,
                        {marginTop: 16, minWidth: 150},
                      ]}>
                      <Text style={styles.fieldLabel}>
                        BIRTH DATE <Text style={styles.asterisk}>*</Text>
                      </Text>
                      <LabelField
                        roundness={28}
                        placeholder="Birth Date"
                        value={date ? moment(date).format('DD MMM YYYY') : ''}
                        onPress={handleDobModalOpen}
                        containerStyle={{
                          elevation: 0,
                          borderWidth: 1,
                          borderColor: '#DEDEDE',
                        }}
                        icon={<CalendarIcon />}
                        iconAlign="right"
                        inputStyle={styles.basicInfoLabelField}
                      />
                      <HelperText
                        type="error"
                        visible={dobError && !date}
                        style={styles.errorText}>
                        * Birth date is required
                      </HelperText>
                    </View>
                    <View
                      style={[
                        styles.userInfoInput,
                        {marginTop: 16, minWidth: 50},
                      ]}>
                      <Text style={styles.fieldLabel}>
                        GENDER <Text style={styles.asterisk}>*</Text>
                      </Text>

                      <LabelField
                        roundness={28}
                        placeholder="Gender"
                        value={GenderList[gender] || ''}
                        onPress={handleGenderModalOpen}
                        containerStyle={{
                          elevation: 0,
                          borderWidth: 1,
                          borderColor: '#DEDEDE',
                        }}
                        icon={
                          <Icon name="chevron-down" color="#ACACAC" size={28} />
                        }
                        iconAlign="right"
                        inputStyle={styles.basicInfoLabelField}
                      />
                      <HelperText
                        type="error"
                        visible={genderError && !GenderList[gender]}
                        style={styles.errorText}>
                        * Gender is required
                      </HelperText>
                    </View>
                  </View>
                </View>
                <View style={styles.successCheckIconContainer}>
                  <Button
                    mode="outlined"
                    style={styles.nextButton}
                    labelStyle={styles.nextButtonLabel}
                    onPress={handleSubmit}>
                    Next
                  </Button>
                  <Button
                    mode="text"
                    labelStyle={styles.cancelButtonLabel}
                    onPress={() => NavigationService.navigate('SignIn')}>
                    Cancel
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
              {Object.keys(GenderList).map(item => (
                <List.Item
                  title={GenderList[item]}
                  right={props => (
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

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    token: state.user.token,
    profile: state.user.profile,
    error:
      state.user.error['update-details-user-onboarding-basic-info-update'] ||
      null,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserDetails,
      resetUserDetailsUpdatedFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BasicInfo);
