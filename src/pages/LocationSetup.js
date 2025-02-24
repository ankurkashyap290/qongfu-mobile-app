import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, Dimensions, Image} from 'react-native';
import {Button, Portal, Dialog} from 'react-native-paper';
import styles from '../styles/locationSetup.style';
import theme from '../styles/theme.style';
import TextField from '../components/custom/textField';
import UserLocation from '../components/UserLocation';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../redux/user/actions';
import {getViewportHeight} from '../../utils/helper';
import {Map_Key, defaultCountry} from '../../config';
import * as NavigationService from '../navigators/NavigationService';
import PageLayout from '../layout/PageLayout';

const screenWidth = Math.round(Dimensions.get('window').width);

const LocationSetup = ({
  profile,
  geoLocation,
  token,
  updateUserDetails,
  countries,
  resetUserDetailsUpdatedFlag,
  userDetailsUpdated,
  navigation,
  countryLocation,
}) => {
  // const [locateMe, setlocateMe] = useState(false);
  const isLocateMe = navigation.getParam('isLocateMe') || false;
  const isLocationChanged = navigation.getParam('isLocationChanged') || false;
  const [isLocationChange, setIsLocationChange] = useState(false);
  const [defaultLocationLoaded, setDefaultLocation] = useState(null);
  const [isProfileLoaded, setProfileLoaded] = useState(false);
  const [userAddress, setUserAddress] = useState({});
  const [validationError, setValidationError] = useState(false);
  const [isLocationPinChanged, setIsLocationPinChanged] = useState(false);
  const [updatedLocation, setLocationChanged] = useState(null);

  useEffect(() => {
    // wait for ask location to grab lat,lng and load it
    if (geoLocation.loaded) {
      const currentLocation = geoLocation.userAllowed
        ? geoLocation
        : countryLocation;
      setDefaultLocation({
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        country: {...currentLocation.country},
      });
    }
  }, [geoLocation]);

  useEffect(() => {
    // wait for profile update until default location grabbed and set
    if (profile && !isProfileLoaded) {
      setProfileLoaded(true);
      updateProfileAddress();
    }
  }, [profile]);

  const updateProfileAddress = () => {
    // override grabbed location with profile location set
    setUserAddress({
      lat:
        profile && profile.location_lat ? parseFloat(profile.location_lat) : 0,
      lng:
        profile && profile.location_lng ? parseFloat(profile.location_lng) : 0,
      area: profile && profile.area ? profile.area : '',
      city: profile && profile.city ? profile.city : '',
      region: profile && profile.region ? profile.region : '',
      address: profile && profile.location ? profile.location : '',
      country: profile && profile.country ? profile.country.country : '',
    });
  };

  const runDone = navigation.getParam('runDone') || false;

  useEffect(() => {
    if (runDone) {
      handleUpdateLocation();
      setValidationError(true);
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  const handleLocationChange = (address) => {
    const tempAddress = address;
    setLocationChanged({...tempAddress});
  };

  const handleAreaChange = (value) => {
    const tempUserAddress = userAddress;
    tempUserAddress.area = value;
    setUserAddress({...tempUserAddress});
    navigation.setParams({isLocationChanged: true});
  };

  const handleCityChange = (value) => {
    const tempUserAddress = userAddress;
    tempUserAddress.city = value;
    setUserAddress({...tempUserAddress});
    navigation.setParams({isLocationChanged: true});
  };

  const handleAddressChange = (value) => {
    const tempUserAddress = userAddress;
    tempUserAddress.address = value;
    setUserAddress({...tempUserAddress});
    navigation.setParams({isLocationChanged: true});
  };

  const handleUpdateLocation = () => {
    if (
      (userAddress.area !== '' || userAddress.city !== '') &&
      userAddress.region !== '' &&
      userAddress.country !== ''
    ) {
      const location_data = {
        region: userAddress.region,
        city: userAddress.city,
        area: userAddress.area,
      };

      const tempCountry = countries.find(
        (country) => country.country === userAddress.country,
      );
      const payload = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        location: userAddress.address,
        location_lat: userAddress.lat,
        location_lng: userAddress.lng,
        country_id: tempCountry.id,
        region: userAddress.region,
        city: userAddress.city,
        area: userAddress.area,
        location_data,
      };
      updateUserDetails({...payload}, token, '', 'location-setup-update');
    }
  };

  const handleLocateMeButton = () => {
    // setlocateMe(true);
    setIsLocationChange(false);
    navigation.setParams({isLocateMe: true});
  };
  const handleSetLocation = () => {
    setUserAddress({...updatedLocation});
    setIsLocationChange(false);
    navigation.setParams({isLocateMe: false, isLocationChanged: true});
    setIsLocationPinChanged(true);
    // setlocateMe(false);
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('location-setup-update');
    NavigationService.goBack();
  };

  const getImageUrl = () => {
    let location;
    let showMarker = true;
    if (userAddress.lat && userAddress.lng) {
      location = userAddress;
    } else {
      location = defaultLocationLoaded;
      showMarker = false;
    }

    if (location) {
      let uri = `https://maps.googleapis.com/maps/api/staticmap?center=${
        location.lat
      },${location.lng}&zoom=20&size=${
        screenWidth - 20
      }x179&maptype=roadmap&key=${Map_Key}`;
      if (showMarker) {
        uri = `${uri}&markers=color:red|${location.lat},${location.lng}`;
      }
      return uri;
    } else {
      return `https://maps.googleapis.com/maps/api/staticmap?center=${
        defaultCountry.country
      }&zoom=20&size=${screenWidth - 20}x179&maptype=roadmap
      &key=${Map_Key}`;
    }
  };

  const imgUrl = getImageUrl();

  return profile ? (
    <React.Fragment>
      {isLocateMe ? (
        <View>
          <View
            style={[
              {
                width: screenWidth,
                position: 'relative',
                height: getViewportHeight(true),
              },
            ]}>
            <UserLocation
              location={{lat: userAddress.lat, lng: userAddress.lng}}
              userCurrentPin={{
                lat: defaultLocationLoaded.lat,
                lng: defaultLocationLoaded.lng,
              }}
              onLocationChange={handleLocationChange}
              setIsLocationChange={setIsLocationChange}
              countries={countries}
              country={
                userAddress.lat && userAddress.lng
                  ? profile.country
                  : defaultLocationLoaded.country
              }
            />
            <View style={styles.locationConfirmButton}>
              <Button
                mode="contained"
                disabled={!isLocationChange}
                onPress={() => handleSetLocation()}
                style={
                  !isLocationChange
                    ? styles.confirmButtonDisable
                    : styles.confirmButton
                }
                labelStyle={
                  !isLocationChange
                    ? styles.confirmButtonLableDisable
                    : styles.confirmButtonLable
                }>
                Confirm
              </Button>
            </View>
          </View>
        </View>
      ) : (
        <PageLayout>
          <View>
            <View style={{margin: 10}}>
              <Text style={styles.locationHeading}>
                Please share your Location for optimized search results.
              </Text>
            </View>
            <View style={styles.locateButtonContainer}>
              <Text style={[{color: '#a3a3a3'}]}>GEOLOCATION</Text>
              <View>
                <Button
                  mode="contained"
                  onPress={handleLocateMeButton}
                  style={styles.locateButton}
                  labelStyle={styles.locateButtonLable}>
                  {isLocationPinChanged ? 'Relocate Me' : 'Locate Me'}
                </Button>
              </View>
            </View>
            <View style={[styles.container]}>
              <Image
                source={{uri: imgUrl}}
                style={{width: screenWidth - 20, height: 179}}
              />
            </View>
            <View>
              <Text style={styles.textFieldLabels}>ADDRESS (Optional)</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  value={userAddress.address}
                  placeholder="i.e. House No. or Flat No.Building No. Block No. Road No. District"
                  // style={styles.textInputField}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  multiline
                  numberOfLines={4}
                  onChangeText={(value) => handleAddressChange(value)}
                />
              </View>
              <Text style={styles.textFieldLabels}>AREA</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  value={userAddress.area}
                  placeholder="Area Name"
                  // style={styles.textInputField}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  onChangeText={(value) => handleAreaChange(value)}
                  errorMessage={
                    !userAddress.city && !userAddress.area && validationError
                      ? 'Either Area or City is required'
                      : ''
                  }
                />
              </View>
              <Text style={styles.textFieldLabels}>CITY</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  value={userAddress.city}
                  placeholder="City Name"
                  onChangeText={(value) => handleCityChange(value)}
                  // style={styles.textInputField}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    !userAddress.city && !userAddress.area && validationError
                      ? 'Either Area or City is required'
                      : ''
                  }
                />
              </View>
              <Text style={styles.textFieldLabels}>REGION</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  value={userAddress.region}
                  editable={false}
                  // style={styles.textInputField}
                  icon="lock"
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.PRIMARY_COLOR,
                      underlineColor: theme.PRIMARY_COLOR,
                    },
                  }}
                  errorMessage={
                    !userAddress.region && validationError
                      ? 'Region is required'
                      : ''
                  }
                />
              </View>
              <Text style={styles.textFieldLabels}>COUNTRY</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  value={userAddress.country}
                  icon="lock"
                  editable={false}
                  // style={styles.textInputField}
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    userAddress.country === '' && validationError
                      ? 'Country is required'
                      : ''
                  }
                />
              </View>
            </View>
          </View>
        </PageLayout>
      )}
      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>Location Updated!</Text>

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
    </React.Fragment>
  ) : null;
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    userLoading: state.user.loading,
    profile: state.user.profile,
    geoLocation: state.app.geoLocation,
    countryLocation: state.app.countryLocation,
    token: state.user.token,
    countries: state.app.countries,
    userDetailsUpdated:
      state.user.userDetailsUpdated['update-details-location-setup-update'] ||
      null,
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

export default connect(mapStateToProps, mapDispatchToProps)(LocationSetup);
