import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, Portal, Dialog, List} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import styles from '../../styles/businessPlaceProfile.style';
import PageLayout from '../../layout/PageLayout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as NavigationService from '../../navigators/NavigationService';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import Header from '../Place/Header';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import TextField from '../custom/textField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import theme from '../../styles/theme.style';
import CustomAlert from '../custom/customAlert';

const BusinessProfileInfo = ({
  navigation,
  place,
  token,
  updatePlace,
  resetBusinessUpdateStatus,
  updateProfileLoading,
  businessInfoUpdateStatus,
  updateProfileError,
}) => {
  let formHandleSubmit = null;
  const runDone = navigation.getParam('runDone') || false;
  useEffect(() => {
    if (runDone) {
      formHandleSubmit && formHandleSubmit();
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  const clientType =
    place && place.amenities && place.amenities.length > 0
      ? place.amenities.find((item) => item.label === 'Client type')
      : null;
  const contactNumber =
    place && place.contact_number
      ? `+${place.contact_country_code} ${place.contact_number}`
      : '';

  const handleSuccessModalClose = () => {
    if (businessInfoUpdateStatus) {
      resetBusinessUpdateStatus('update-place-business-info');
      NavigationService.goBack();
    }
  };

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
        // validateExtras();
        return getErrorsFromValidationError(error);
      }
    };
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

  const handleSubmit = (values) => {
    updatePlace(
      {
        id: place.id,
        place_name: values.display_name,
        description: values.bio,
        location_lat: place.location_lat,
        location_lng: place.location_lng,
        country_id: place.country_id,
        location_data: place.location_data,
      },
      token,
      'business-info',
    );
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={updateProfileLoading} textContent={''} />
      <Header place={place} isAdmin={true} showPlaceInfo={false} />
      <View style={{marginTop: 40, marginBottom: 40}}>
        <Formik
          initialValues={{
            display_name: place.place_name,
            bio: place.description,
          }}
          onSubmit={(values) => handleSubmit(values)}
          validate={validate(validationSchema)}>
          {({handleChange, values, handleSubmit, errors, touched}) => {
            formHandleSubmit = handleSubmit;
            return (
              <View>
                {updateProfileError ? (
                  <View style={{marginLeft: 30, marginRight: 30}}>
                    <CustomAlert error={updateProfileError} />
                  </View>
                ) : null}
                <Text style={styles.fieldHeadings}>Display Name</Text>
                <View style={{marginLeft: 20, marginRight: 20}}>
                  <TextField
                    name="display_name"
                    placeholder="Enter Place Name"
                    value={values.display_name}
                    onChangeText={handleChange('display_name')}
                    theme={{
                      roundness: 5,
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
                    placeholder="Enter Bio"
                    value={values.bio}
                    style={{height: 100}}
                    multiline={true}
                    numberOfLines={4}
                    theme={{
                      roundness: 5,
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

                <Text style={styles.fieldHeadings}>Contact No.</Text>
                <List.Item
                  title={contactNumber || 'Select contact number'}
                  titleStyle={styles.fieldsValue}
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  onPress={() =>
                    NavigationService.navigate('BusinessContactUpdate')
                  }
                  style={styles.listItem}
                />

                <Text style={styles.fieldHeadings}>Client Type</Text>
                <List.Item
                  title={clientType ? clientType.info : 'Select client type'}
                  titleStyle={styles.fieldsValue}
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  onPress={() => NavigationService.navigate('ClientTypeUpdate')}
                  style={styles.listItem}
                />

                <Text style={styles.fieldHeadings}>Languages Spoken</Text>
                <List.Item
                  title={
                    place && place.languages && place.languages.length > 0
                      ? place.languages.map((item, index) => {
                          if (index === place.languages.length - 1) {
                            return `${item.language}`;
                          } else {
                            return `${item.language}, `;
                          }
                        })
                      : 'Select Languages'
                  }
                  titleStyle={styles.fieldsValue}
                  right={(props) => (
                    <List.Icon {...props} icon="chevron-right" />
                  )}
                  onPress={() =>
                    NavigationService.navigate('BusinessLanguagesUpdate')
                  }
                  style={styles.listItem}
                />
              </View>
            );
          }}
        </Formik>
      </View>
      <Portal>
        <Dialog
          visible={businessInfoUpdateStatus}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>
            Business Info Updated!
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

const mapStateToProps = (state) => {
  return {
    place: state.business.place,
    token: state.user.token,
    profile: state.user.profile,
    businessInfoUpdateStatus:
      state.business.businessUpdateStatus['update-place-business-info'] ||
      false,
    updateProfileLoading:
      state.business.loading['update-place-business-info'] || false,
    updateProfileError:
      state.business.error['update-place-business-info'] || '',
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({updatePlace, resetBusinessUpdateStatus}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessProfileInfo);
