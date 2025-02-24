import React, {useState, useEffect} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {Button, Portal, Dialog} from 'react-native-paper';
import styles from '../../styles/businessSetup.style';
import styles2 from '../../styles/locationSetup.style';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Map_Key} from '../../../config';
import UserLocation from '../../components/UserLocation';
import {getViewportHeight} from '../../../utils/helper';
import TextField from '../../components/custom/textField';
import theme from '../../styles/theme.style';
import {
  resetBusinessUpdateStatus,
  createPlace,
  updatePlace,
} from '../../../redux/business/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import CustomAlert from '../custom/customAlert';

const screenWidth = Math.round(Dimensions.get('window').width);

const LocationSetupStep4 = ({
  navigation,
  newlyCreatedPlace,
  countries,
  createPlace,
  token,
  businessUpdateStatus,
  createPlaceLoading,
  createPlaceError,
  resetBusinessUpdateStatus,
  updatePlace,
  updatePlaceLoading,
  updatePlaceError,
  businessLocationUpdateStatus,
}) => {
  const country = navigation.getParam('country');
  const businessName = navigation.getParam('businessName');
  const logo = navigation.getParam('logo');
  const isLocateMe = navigation.getParam('isLocateMe') || false;
  const mode = navigation.getParam('mode');
  const place = navigation.getParam('place');

  const foundCountry = () => {
    const foundedCountry = countries.find(
      (country) => country.id === place.country_id,
    );
    return foundedCountry;
  };

  const [isLocationChanged, setConfirmButton] = useState(false);
  const [updatedLocation, setLocationChanged] = useState(null);
  const [localLocation, updateLocalLocation] = useState({
    lat: place && mode === 'update' ? place.location_lat : 0,
    lng: place && mode === 'update' ? place.location_lng : 0,
    address: place && mode === 'update' ? place.address : '',
    area:
      place && place.location_data && mode === 'update'
        ? place.location_data.area
        : '',
    city:
      place && place.location_data && mode === 'update'
        ? place.location_data.city
        : '',
    region:
      place && place.location_data && mode === 'update'
        ? place.location_data.region
        : '',
    country: place && mode === 'update' ? foundCountry().country : '',
  });

  const [validationError, setValidationError] = useState(false);

  useEffect(() => {
    if (businessUpdateStatus) {
      resetBusinessUpdateStatus('create-place');
      if (newlyCreatedPlace) {
        NavigationService.navigate('BusinessSetupStep5', {
          place: {...newlyCreatedPlace},
        });
      }
    }
  }, [businessUpdateStatus]);

  const setLocateMe = (flag) => {
    navigation.setParams({isLocateMe: flag});
  };

  const isLocalLocationFilled = () => {
    return localLocation.lat && localLocation.lng;
  };

  const handleLocationChange = (address) => {
    const tempAddress = address;
    setLocationChanged({...tempAddress});
  };

  const handleSetLocation = () => {
    if (isLocationChanged) {
      updateLocalLocation({...updatedLocation});
      setConfirmButton(false);
    }
    setLocateMe(false);
  };

  const handleAreaChange = (value) => {
    const tempUserAddress = {...localLocation};
    tempUserAddress.area = value;
    updateLocalLocation({...tempUserAddress});
  };

  const handleCityChange = (value) => {
    const tempUserAddress = {...localLocation};
    tempUserAddress.city = value;
    updateLocalLocation({...tempUserAddress});
  };

  const handleAddressChange = (value) => {
    const tempUserAddress = {...localLocation};
    tempUserAddress.address = value;
    updateLocalLocation({...tempUserAddress});
  };

  const handleCreatePlace = () => {
    setValidationError(true);
    if (
      (localLocation.area !== '' || localLocation.city !== '') &&
      localLocation.region !== '' &&
      localLocation.country !== ''
    ) {
      const location_data = {
        region: localLocation.region,
        city: localLocation.city,
        area: localLocation.area,
      };

      if (mode === 'create') {
        const payload = {
          country_id: country.id,
          place_name: businessName,
          logo: logo,
          location: localLocation.address,
          location_lat: localLocation.lat,
          location_lng: localLocation.lng,
          location_data,
        };
        createPlace(payload, token);
      } else {
        const payload = {
          country_id: place.country_id,
          place_name: place.place_name,
          id: place.id,
          location: localLocation.address,
          location_lat: localLocation.lat,
          location_lng: localLocation.lng,
          location_data,
        };
        updatePlace(payload, token, 'location');
      }
    }
  };

  const handleSuccessModalClose = () => {
    resetBusinessUpdateStatus('update-place-location');
    navigation.goBack();
  };

  const renderLocateMeOn = () => {
    return (
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
            location={{
              lat: parseFloat(localLocation.lat),
              lng: parseFloat(localLocation.lng),
            }}
            userCurrentPin={{
              lat:
                mode === 'update'
                  ? parseFloat(place.location_lat)
                  : country.location.lat,
              lng:
                mode === 'update'
                  ? parseFloat(place.location_lng)
                  : country.location.lng,
            }}
            onLocationChange={handleLocationChange}
            setIsLocationChange={setConfirmButton}
            countries={countries}
            country={mode === 'update' ? foundCountry() : country}
          />
          <View style={styles.locationConfirmButton}>
            <Button
              mode="contained"
              disabled={!isLocationChanged}
              onPress={() => handleSetLocation()}
              style={
                !isLocationChanged
                  ? styles.confirmButtonDisable
                  : styles.confirmButton
              }
              labelStyle={
                !isLocationChanged
                  ? styles.confirmButtonLableDisable
                  : styles.confirmButtonLable
              }>
              Confirm
            </Button>
          </View>
        </View>
      </View>
    );
  };

  const renderLocationFields = () => {
    return (
      <View>
        <View
          style={{
            marginLeft: 40,
            marginRight: 40,
            flex: 1,
            alignItems: 'center',
            marginTop: 16,
          }}>
          <Button
            compact
            mode="contained"
            onPress={() => {
              setLocateMe(true);
            }}
            style={[styles2.locateButton, {marginRight: 0, width: 100}]}
            labelStyle={[
              styles2.locateButtonLable,
              {marginVertical: 2, fontSize: 12},
            ]}>
            Relocate
          </Button>
        </View>

        {createPlaceError ? (
          <View style={{marginLeft: 30, marginRight: 30}}>
            <CustomAlert error={createPlaceError} />
          </View>
        ) : null}
        {updatePlaceError ? (
          <View style={{marginLeft: 30, marginRight: 30}}>
            <CustomAlert error={updatePlaceError} />
          </View>
        ) : null}
        <Text style={styles2.textFieldLabels}>ADDRESS (Optional)</Text>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <TextField
            value={localLocation.address}
            placeholder="i.e. House No. or Flat No.Building No. Block No. Road No. District"
            // style={styles2.textInputField}
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
        <Text style={styles2.textFieldLabels}>AREA</Text>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <TextField
            value={localLocation.area}
            placeholder="Area Name"
            // style={styles2.textInputField}
            theme={{
              roundness: 10,
              colors: {
                primary: theme.SECONDARY_COLOR,
                underlineColor: theme.SECONDARY_COLOR,
              },
            }}
            onChangeText={(value) => handleAreaChange(value)}
            errorMessage={
              !localLocation.city && !localLocation.area && validationError
                ? 'Either Area or City is required'
                : ''
            }
          />
        </View>
        <Text style={styles2.textFieldLabels}>CITY</Text>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <TextField
            value={localLocation.city}
            placeholder="City Name"
            onChangeText={(value) => handleCityChange(value)}
            // style={styles2.textInputField}
            theme={{
              roundness: 10,
              colors: {
                primary: theme.SECONDARY_COLOR,
                underlineColor: theme.SECONDARY_COLOR,
              },
            }}
            errorMessage={
              !localLocation.city && !localLocation.area && validationError
                ? 'Either Area or City is required'
                : ''
            }
          />
        </View>
        <Text style={styles2.textFieldLabels}>REGION</Text>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <TextField
            value={localLocation.region}
            editable={false}
            // style={styles2.textInputField}
            icon="lock"
            theme={{
              roundness: 10,
              colors: {
                primary: theme.PRIMARY_COLOR,
                underlineColor: theme.PRIMARY_COLOR,
              },
            }}
            errorMessage={
              !localLocation.region && validationError
                ? 'Region is required'
                : ''
            }
          />
        </View>
        <Text style={styles2.textFieldLabels}>COUNTRY</Text>
        <View style={{marginLeft: 20, marginRight: 20}}>
          <TextField
            value={localLocation.country}
            icon="lock"
            editable={false}
            // style={styles2.textInputField}
            theme={{
              roundness: 10,
              colors: {
                primary: theme.SECONDARY_COLOR,
                underlineColor: theme.SECONDARY_COLOR,
              },
            }}
            errorMessage={
              localLocation.country === '' && validationError
                ? 'Country is required'
                : ''
            }
          />
        </View>
      </View>
    );
  };
  const renderNormal = () => {
    const placeLocation = isLocalLocationFilled()
      ? localLocation
      : country
      ? country.location
      : {lat: 0, lng: 0};
    let imgUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${
      placeLocation.lat
    },${placeLocation.lng}&zoom=17&size=${
      screenWidth - 40
    }x176&maptype=roadmap&key=${Map_Key}`;

    if (isLocalLocationFilled()) {
      imgUrl = `${imgUrl}&markers=color:red|${placeLocation.lat},${placeLocation.lng}`;
    }

    return (
      <PageLayout>
        <GlobalOverlayLoading
          loading={createPlaceLoading || updatePlaceLoading}
          textContent=""
        />
        <View style={{flexDirection: 'column'}}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Image
              source={{uri: imgUrl}}
              style={[styles.mapImage, {width: screenWidth - 40}]}
            />
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Text style={styles.areaText}>
              {[
                localLocation.area,
                localLocation.city,
                localLocation.region,
                localLocation.country,
              ]
                .filter((item) => item)
                .join(', ')}
            </Text>
          </View>
          {isLocalLocationFilled() ? (
            renderLocationFields()
          ) : (
            <React.Fragment>
              <View
                style={{
                  marginLeft: 40,
                  marginRight: 40,
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Button
                  mode="contained"
                  onPress={() => {
                    setLocateMe(true);
                  }}
                  style={[styles2.locateButton, {marginRight: 0}]}
                  labelStyle={[
                    styles2.locateButtonLable,
                    {marginVertical: 2, fontSize: 14},
                  ]}>
                  TAP HERE TO LOCATE MY BUSINESS
                </Button>
              </View>

              <Text style={[styles.setupHeadings, {marginTop: 40}]}>
                Add your Location
              </Text>

              <Text style={styles.setupSubHeadings}>
                Adding a location to your business helps Qongfu{'\n'} members
                locate your place.
              </Text>
            </React.Fragment>
          )}
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            marginTop: 16,
          }}>
          <Button
            mode="contained"
            disabled={isLocalLocationFilled() ? false : true}
            onPress={handleCreatePlace}
            style={styles.nextButton}
            labelStyle={styles.nextButtonLabel}>
            {mode === 'update' ? 'Update' : 'Next'}
          </Button>
          {mode === 'update' ? null : (
            <Button
              mode="text"
              onPress={() => {
                NavigationService.navigate('BusinessManage', {reset: true});
              }}
              style={[styles.exitButton, {marginTop: 10}]}
              labelStyle={styles.exitButtonLabel}>
              Exit
            </Button>
          )}
        </View>
        <Portal>
          <Dialog
            visible={businessLocationUpdateStatus}
            onDismiss={handleSuccessModalClose}>
            <Text style={styles.successDialogHeading}>
              Place Location Updated!
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

  return isLocateMe ? renderLocateMeOn() : renderNormal();
};

const mapStateToProps = (state) => {
  return {
    countries: state.app.countries,
    businessUpdateStatus:
      state.business.businessUpdateStatus['create-place'] || false,
    createPlaceLoading: state.business.loading['createPlace'] || false,
    createPlaceError: state.business.error['createPlace'] || '',
    profile: state.user.profile,
    token: state.user.token,
    newlyCreatedPlace: state.business.newlyCreatedPlace,
    updatePlaceLoading:
      state.business.loading['update-place-location'] || false,
    updatePlaceError: state.business.error['update-place-location'] || '',
    businessLocationUpdateStatus:
      state.business.businessUpdateStatus['update-place-location'] || false,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {createPlace, resetBusinessUpdateStatus, updatePlace},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(LocationSetupStep4);
