import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  View,
  Text,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {Button, List, Portal, Dialog, HelperText} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from '../styles/personalInfo.style';
import Header from '../components/PersonalInfo/Header';
import theme from '../styles/theme.style';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../redux/user/actions';
import TextField from '../components/custom/textField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import * as NavigationService from '../navigators/NavigationService';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import CustomAlert from '../components/custom/customAlert';
import {
  GenderList,
  MaxImageSize,
  acceptedFiles,
  IMAGE_URL_PREFIX,
} from '../../config';
import ImagePicker from 'react-native-image-picker';
import PageLayout from '../layout/PageLayout';

const screenWidth = Math.round(Dimensions.get('window').width);

const PersonalInfo = (props) => {
  const {
    profile,
    token,
    updateUserDetails,
    resetUserDetailsUpdatedFlag,
    userDetailsUpdated,
    error,
    navigation,
    userAvatarUpdated,
    countries,
  } = props;

  const [date, setDate] = useState(
    profile.date_of_birth ? moment(profile.date_of_birth).toDate() : '',
  );
  const [dobError, setDobError] = useState(false);

  const getNationality = () => {
    const nationality = countries.find(
      (country) => country.id === profile.nationality_id,
    );
    return nationality.nationality;
  };

  const dobDialog = useRef();

  let formHandleSubmit = null;

  const runDone = navigation.getParam('runDone') || false;

  useEffect(() => {
    if (runDone) {
      formHandleSubmit && formHandleSubmit();
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  const validationSchema = () => {
    return Yup.object().shape({
      display_name: Yup.string().required(' Display Name is required'),
      bio: Yup.string().required('Bio is required'),
    });
  };

  const validate = (getValidationSchema) => {
    return (values) => {
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

  const validateExtras = () => {
    let update = true;
    if (!date) {
      setDobError(true);
      update = false;
    }

    return update;
  };

  const getErrorsFromValidationError = (validationError) => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      };
    }, {});
  };

  const handleDobModalOpen = () => {
    const tempDate = date ? date : new Date();
    setDobError(false);
    if (dobDialog) {
      dobDialog.current.open({date: tempDate, maxDate: new Date()});
    }
  };

  const handleSubmit = (values) => {
    if (validateExtras(values)) {
      const payload = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        display_name: values.display_name,
        bio: values.bio,
        date_of_birth: date ? moment(date).format('YYYY-MM-DD') : '',
      };
      updateUserDetails({...payload}, token, '', 'personal-info-update');
    }
  };

  const onDOBDatePicked = (date) => {
    setDate(date);
  };

  const handleSuccessModalClose = () => {
    if (userAvatarUpdated) {
      resetUserDetailsUpdatedFlag('personal-info-avatar-update');
    } else {
      resetUserDetailsUpdatedFlag('personal-info-update');
      NavigationService.goBack();
    }
  };

  const handleUploadUpdate = (payload) => {
    updateUserDetails(
      payload,
      token,
      'secondStep',
      'personal-info-avatar-update',
    );
  };

  const handleCoverCameraClick = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let tempImageError = '';
        if (response.uri) {
          if (response.fileSize > MaxImageSize) {
            tempImageError = 'Image size must be lower then 512Kb';
          }
          const typeArr = response.type.split('/');
          if (!acceptedFiles.includes(typeArr[1])) {
            tempImageError = `Supported formats are ${acceptedFiles.toString()}`;
          }
          if (!tempImageError) {
            const payload = {
              cover: getImageObj(response),
              first_name: profile.first_name,
              last_name: profile.last_name,
            };
            handleUploadUpdate(payload);
          } else {
            Alert.alert('error', tempImageError);
          }
        }
      }
    });
  };

  const getImageObj = (photo) => {
    let uri = '';
    if (Platform.OS === 'android') {
      uri = photo.uri;
    } else {
      uri = photo.uri.replace('file://', '');
    }
    return {
      uri: uri,
      type: photo.type,
      name:
        encodeURIComponent(
          profile.display_name ? profile.display_name : profile.first_name,
        ) +
        '-cover.' +
        uri.split('.').pop(),
    };
  };

  return (
    <PageLayout>
      <View style={[styles.imageContainer, {width: screenWidth}]}>
        <ImageBackground
          source={{
            uri: profile.cover_url
              ? `${IMAGE_URL_PREFIX}${profile.cover_url}`
              : `https://via.placeholder.com/728.png?text=${profile.display_name}`,
          }}
          style={styles.image}>
          <TouchableOpacity
            style={styles.cameraCoverIcon}
            onPress={() => handleCoverCameraClick()}>
            <View style={styles.cameraIcon}>
              <Icon name="camera" size={20} style={{color: '#bab7b7'}} />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <Header
        profile={profile}
        pageType="personal-info"
        onUploadAvatar={handleUploadUpdate}
      />
      <View style={{marginTop: 40, marginBottom: 40}}>
        <Formik
          initialValues={{
            display_name: profile.display_name,
            bio: profile.bio || '',
          }}
          onSubmit={(values) => handleSubmit(values)}
          validate={validate(validationSchema)}>
          {({handleChange, values, handleSubmit, errors, touched}) => {
            formHandleSubmit = handleSubmit;
            return (
              <View>
                {error ? (
                  <View style={{marginLeft: 30, marginRight: 30}}>
                    <CustomAlert error={error} />
                  </View>
                ) : null}
                <Text style={styles.fieldHeadings}>Display Name</Text>
                <View style={{marginLeft: 20, marginRight: 20}}>
                  <TextField
                    name="display_name"
                    placeholder="Enter your Display Name"
                    value={values.display_name}
                    onChangeText={handleChange('display_name')}
                    // style={styles.textInputField}
                    theme={{
                      roundness: 10,
                      colors: {
                        primary: theme.SECONDARY_COLOR,
                        underlineColor: theme.SECONDARY_COLOR,
                      },
                    }}
                    errorMessage={
                      errors.display_name &&
                      touched.display_name && <Text>{errors.display_name}</Text>
                    }
                  />
                </View>
                <Text style={styles.fieldHeadings}>Bio</Text>
                <View style={{marginLeft: 20, marginRight: 20}}>
                  <TextField
                    name="bio"
                    onChangeText={handleChange('bio')}
                    placeholder="Enter your Bio"
                    value={values.bio}
                    style={{height: 100}}
                    multiline={true}
                    numberOfLines={4}
                    theme={{
                      roundness: 10,
                      colors: {
                        primary: theme.SECONDARY_COLOR,
                        underlineColor: theme.SECONDARY_COLOR,
                      },
                    }}
                    errorMessage={
                      errors.bio && touched.bio && <Text>{errors.bio}</Text>
                    }
                  />
                </View>

                <Text style={styles.fieldHeadings}>DOB</Text>

                <List.Item
                  title={
                    date
                      ? moment(date).format('Do MMMM, YYYY')
                      : 'Date of Birth'
                  }
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  onPress={handleDobModalOpen}
                  style={styles.listItem}
                />
                <HelperText
                  type="error"
                  visible={dobError}
                  style={styles.dobErrorText}>
                  * Date of birth is required
                </HelperText>

                <Text style={styles.fieldHeadings}>Gender</Text>
                <List.Item
                  title={GenderList[profile.gender] || 'Select your Gender'}
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  onPress={() => NavigationService.navigate('GenderUpdate')}
                  style={styles.listItem}
                />
                <Text style={styles.fieldHeadings}>Home Town/City</Text>
                <List.Item
                  title={
                    profile.hometown ? profile.hometown : 'Select your Hometown'
                  }
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  onPress={() => NavigationService.navigate('HomeTownUpdate')}
                  style={styles.listItem}
                />
                <Text style={styles.fieldHeadings}>Nationality</Text>
                <List.Item
                  title={
                    profile.nationality_id
                      ? getNationality()
                      : 'Select your Nationality'
                  }
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  onPress={() =>
                    NavigationService.navigate('NationalityUpdate')
                  }
                  style={styles.listItem}
                />
                <Text style={styles.fieldHeadings}>Languages</Text>
                <List.Item
                  title={
                    profile.languages.length > 0
                      ? profile.languages.map((item, index) => {
                          if (index === profile.languages.length - 1) {
                            return `${item.language}`;
                          } else {
                            return `${item.language}, `;
                          }
                        })
                      : 'Select Languages'
                  }
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  onPress={() => NavigationService.navigate('LanguagesUpdate')}
                  style={styles.listItem}
                />
              </View>
            );
          }}
        </Formik>
      </View>
      <DatePickerDialog
        ref={dobDialog}
        onDatePicked={onDOBDatePicked}
        date={date}
      />
      <Portal>
        <Dialog
          visible={userDetailsUpdated || userAvatarUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>
            {userAvatarUpdated
              ? 'Uploaded Successfully!'
              : 'Personal Info Updated!'}
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
    lifestyles: state.app.lifestyles,
    userDetailsUpdated:
      state.user.userDetailsUpdated['update-details-personal-info-update'] ||
      null,
    userAvatarUpdated:
      state.user.userDetailsUpdated[
        'update-details-personal-info-avatar-update'
      ] || null,
    error: state.user.error['update-details-personal-info-update'] || null,
    countries: state.app.countries,
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

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
