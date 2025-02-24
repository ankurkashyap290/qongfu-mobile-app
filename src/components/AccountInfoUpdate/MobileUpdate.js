import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Portal, Dialog} from 'react-native-paper';
import styles from '../../styles/accountInfo.style';
import theme from '../../styles/theme.style';
import {
  phoneVerify,
  resetUserDetailsUpdatedFlag,
  verifyOTP,
} from '../../../redux/user/actions';
import TextField from '../custom/textField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import MobileNumber from '../custom/mobileNumber';
import {defaultCountry} from '../../../config';
import ConfirmOTP from '../auth/ConfirmOTP';
import CountriesList from '../auth/countriesList';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';

const phoneRegex = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const MobileUpdate = props => {
  const {
    phoneVerify,
    token,
    profile,
    isOTPSent,
    userDetailsUpdated,
    resetUserDetailsUpdatedFlag,
    error,
    countries,
  } = props;
  const [selectedCountry, setSelectedCountry] = useState(defaultCountry);
  const [showCountry, setShowCountry] = useState(false);
  const [profileCountry, setProfileCountry] = useState(defaultCountry);

  useEffect(() => {
    if (profile && profile.contact_country_code) {
      const country = countries.find(
        country => country.dial_code === profile.contact_country_code,
      );
      setProfileCountry(country || defaultCountry);
    }
  }, [profile]);

  const validationSchema = () => {
    return Yup.object().shape({
      contact_number: Yup.string()
        .required(' Phone number is required')
        .matches(phoneRegex, 'Please enter a valid phone number'),
    });
  };

  const handleSubmit = values => {
    phoneVerify(
      {
        contact_number: `+${selectedCountry.dial_code}${values.contact_number}`,
        contact_country_code: selectedCountry.dial_code,
        first_name: profile.first_name,
        last_name: profile.last_name,
      },
      token,
      'sendOTP-update-mobile',
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

  const getProfileContactNumber = () => {
    let contactNumber =
      profile && profile.contact_number ? profile.contact_number : '';
    if (profileCountry.dial_code) {
      return contactNumber.replace(`+${profileCountry.dial_code}`, '');
    }
    return contactNumber;
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('account-info-mobile-update');
    NavigationService.goBack();
  };
  return (
    <PageLayout>
      {isOTPSent ? (
        <ConfirmOTP mode="mobileUpdate" {...props} resetType="sms" />
      ) : (
        <React.Fragment>
          <Formik
            initialValues={{contact_number: ''}}
            onSubmit={values => handleSubmit(values)}
            validationSchema={validationSchema}>
            {({handleChange, values, handleSubmit, errors, touched}) => (
              <View>
                {error ? (
                  <View style={{marginLeft: 20, marginRight: 20}}>
                    <CustomAlert error={error} />
                  </View>
                ) : null}
                <Text style={styles.fieldHeadings}>Current</Text>
                <View style={{marginLeft: 20, marginRight: 20}}>
                  <MobileNumber
                    mode="outlined"
                    editable={false}
                    theme={{
                      roundness: 10,
                      colors: {
                        primary: theme.SECONDARY_COLOR,
                        underlineColor: '#ffffff',
                      },
                    }}
                    icon={profileCountry ? profileCountry.flag : null}
                    countryCode={profileCountry.dial_code || ''}
                    onIconClick={() => {}}
                    value={getProfileContactNumber()}
                    // errorMessage={errors.contact_number}
                    pageName="accountSettingsMobileUpdate"
                  />
                </View>
                <Text style={styles.fieldHeadings}>New</Text>
                <View style={{marginLeft: 20, marginRight: 20}}>
                  <MobileNumber
                    mode="outlined"
                    theme={{
                      roundness: 10,
                      colors: {
                        primary: theme.SECONDARY_COLOR,
                        underlineColor: '#ffffff',
                      },
                    }}
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
                    pageName="accountSettingsMobileUpdate"
                  />
                </View>
                <View style={styles.updateButtonContainer}>
                  <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.updateButton}
                    labelStyle={styles.updateButtonLable}>
                    Send Pin Code
                  </Button>
                </View>
              </View>
            )}
          </Formik>
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
        </React.Fragment>
      )}
      <Portal>
        <Dialog
          visible={userDetailsUpdated}
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
    userLoading: state.user.loading,
    profile: state.user.profile,
    token: state.user.token,
    isOTPSent: state.user.isOTPSent,
    userDetailsUpdated:
      state.user.userDetailsUpdated[
        'update-details-account-info-mobile-update'
      ] || null,
    error: state.user.error['update-mobile'] || null,
    countries: state.app.countries,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      phoneVerify,
      resetUserDetailsUpdatedFlag,
      verifyOTP,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MobileUpdate);
