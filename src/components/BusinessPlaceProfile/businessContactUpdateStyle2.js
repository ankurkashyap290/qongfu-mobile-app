import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Portal, Dialog} from 'react-native-paper';
import styles from '../../styles/businessPlaceProfile.style';
import theme from '../../styles/theme.style';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MobileNumber from '../custom/mobileNumber';
import {defaultCountry} from '../../../config';
import CountriesList from '../auth/countriesList';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const BusinessContactUpdate = props => {
  const {
    token,
    loading,
    businessUpdateStatus,
    error,
    countries,
    place,
    updatePlace,
    resetBusinessUpdateStatus,
  } = props;
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [showCountry, setShowCountry] = useState(false);

  const runDone = props.navigation.getParam('runDone');

  let formHandleSubmit = null;

  useEffect(() => {
    if (runDone) {
      formHandleSubmit && formHandleSubmit();
      props.navigation.setParams({runDone: false});
    }
  }, [runDone]);

  useEffect(() => {
    if (place && place.contact_country_code) {
      const country = countries.find(
        country => country.dial_code === place.contact_country_code,
      );
      setSelectedCountry(country || defaultCountry);
    }
  }, [place]);

  const validationSchema = () => {
    return Yup.object().shape({
      contact_number: Yup.string()
        .required(' Phone number is required')
        .matches(phoneRegex, 'Please enter a valid phone number'),
    });
  };

  const handleSubmit = values => {
    updatePlace(
      {
        id: place.id,
        place_name: place.place_name,
        contact_number: values.contact_number,
        contact_country_code: selectedCountry.dial_code,
        location_lat: place.location_lat,
        location_lng: place.location_lng,
        country_id: place.country_id,
        location_data: place.location_data,
      },
      token,
      'phone',
    );
  };

  const handleSetShowCountry = () => {
    setShowCountry(true);
  };
  const _hideDialogClose = () => {
    setShowCountry(false);
  };
  const handleCountryClick = value => {
    setSelectedCountry(value);
    setShowCountry(false);
  };

  const handleSuccessModalClose = () => {
    resetBusinessUpdateStatus('update-place-phone');
    NavigationService.goBack();
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={loading} textContent="" />
      <View style={{marginTop: 30, marginRight: 20}}>
        <Formik
          initialValues={{contact_number: ''}}
          onSubmit={values => handleSubmit(values)}
          validationSchema={validationSchema}>
          {({handleChange, values, handleSubmit, errors, touched}) => {
            formHandleSubmit = handleSubmit;
            return (
              <View>
                <View style={{marginLeft: 16}}>
                  {error ? <CustomAlert error={error} /> : null}
                </View>
                <Text style={styles.fieldHeadings}>Phone Number</Text>

                <View style={{marginLeft: 18}}>
                  <MobileNumber
                    mode="outlined"
                    theme={{
                      roundness: 50,
                      colors: {
                        primary: theme.SECONDARY_COLOR,
                        underlineColor: '#ffffff',
                      },
                    }}
                    underlineColorAndroid="transparent"
                    icon={selectedCountry.flag}
                    countryCode={selectedCountry.dial_code}
                    onIconClick={handleSetShowCountry}
                    value={values.contact_number}
                    onChangeText={handleChange('contact_number')}
                    errorMessage={
                      errors.contact_number &&
                      touched.contact_number && (
                        <Text>{errors.contact_number}</Text>
                      )
                    }
                  />
                </View>
                <Text style={styles.fieldHeadings}>
                  This phone number will be used by users to contact your
                  business
                </Text>
              </View>
            );
          }}
        </Formik>
      </View>
      <Portal>
        <Dialog
          visible={showCountry}
          onDismiss={_hideDialogClose}
          style={styles.countryDialog}>
          <Dialog.Title style={styles.countryDialogTitle}>
            Select your country location
          </Dialog.Title>
          <Dialog.Content>
            <CountriesList
              handleCountryClick={handleCountryClick}
              selectedCountry={selectedCountry}
            />
          </Dialog.Content>
        </Dialog>
      </Portal>

      <Portal>
        <Dialog
          visible={businessUpdateStatus}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>
            Mobile Number Updated!
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
const mapStateToProps = state => {
  return {
    place: state.business.place,
    token: state.user.token,
    countries: state.app.countries,
    loading: state.business.loading['update-place-phone'] || false,
    error: state.business.error['update-place-phone'] || '',
    businessUpdateStatus:
      state.business.businessUpdateStatus['update-place-phone'] || false,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updatePlace,
      resetBusinessUpdateStatus,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessContactUpdate);
