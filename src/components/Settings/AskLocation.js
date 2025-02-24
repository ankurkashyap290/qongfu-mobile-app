import React, {useEffect, useState, useReducer} from 'react';
import {View, AppState} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  setLocation,
  setCountryLocation,
  updateCountryLocation,
  updateMapLocationChange,
} from '../../../redux/app/actions';
import Geocoder from 'react-native-geocoding';
import {getLocation, getDistance} from '../../../utils';
import {Map_Key, defaultCountry} from '../../../config';
import _ from 'lodash';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import moment from 'moment';

const LOCATION_STATUS = {
  NONE: -1,
  UNAVAILABLE: 0,
  REQUEST_PENDING: 1,
  GRANTED: 2,
  BLOCKED: 3,
  ERROR: 9,
};

Geocoder.init(Map_Key);

const AskLocation = ({
  setLocation,
  profile,
  countryLocation,
  setCountryLocation,
  userLocation,
  countries,
  appCountry,
  updateCountryLocation,
  updateMapLocationChange,
  token,
}) => {
  const [localToken, setLocalToken] = useState(null);
  const [lastActiveTime, setLastActiveTime] = useState(null);
  // const [appState, setAppState] = useState(AppState.currentState);
  const [appLocationStatus, setAppLocationStatus] = useState(
    LOCATION_STATUS.NONE,
  );

  useEffect(() => {
    // check cache from countries lat,lng if not available then grab it and update it
    const foundCountry = countries.find(
      (item) => parseInt(item.id, 10) === parseInt(appCountry),
    );
    if (foundCountry) {
      if (!foundCountry.location) {
        Geocoder.from(
          `${foundCountry.capital ? foundCountry.capital + ',' : ''}${
            foundCountry.country
          }`,
        ).then((json) => {
          if (json.results.length) {
            const {location} = json.results[0].geometry;
            updateCountryLocation({country: foundCountry.id, location});
            updateMapLocationChange(true);
          }
        });
      } else {
        updateMapLocationChange(true);
      }
    }
  }, [appCountry]);

  updateReduxLocation = (location) => {
    Geocoder.from(location.lat, location.lng).then((json) => {
      if (json.results.length) {
        const address = getLocation(json);
        const country =
          countries.find((item) => item.country === address.country) || null;
        setLocation({
          ...location,
          ...address,
          userAllowed: true,
          error: null,
          country: country ? {...country} : null,
        });
      }
    });
  };

  const getCountryByDialCodeOrDefault = () => {
    let country = defaultCountry;
    if (profile && profile.contact_country_code) {
      const foundCountry = countries.find(
        (country) => country.dial_code === profile.contact_country_code,
      );
      if (foundCountry) {
        country = foundCountry;
      }
    }
    return country;
  };

  useEffect(() => {
    // TODO: check set country and changed country
    // set profile country -> capital point or not found then defaultCountry ->capital point
    const country =
      profile && profile.country
        ? profile.country
        : getCountryByDialCodeOrDefault();
    if (
      country &&
      (countryLocation === null ||
        (countryLocation && countryLocation.country.id !== country.id))
    ) {
      Geocoder.from(
        `${country.capital ? country.capital + ',' : ''}${country.country}`,
      ).then((json) => {
        if (json.results.length) {
          const {location} = json.results[0].geometry;
          const address = getLocation(json);
          setCountryLocation({...location, ...address, country: {...country}});
        }
      });
    }
  }, [profile]);

  const updateLocationStatus = () => {
    console.log('Update Location Status');
    request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    )
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            console.log(
              'This feature is not available (on this device / in this context)',
            );
            // TODO: update geolocation with userAllowed false
            setAppLocationStatus(LOCATION_STATUS.UNAVAILABLE);
            break;
          case RESULTS.DENIED:
            console.log('The location permission can be requestable');
            setAppLocationStatus(LOCATION_STATUS.REQUEST_PENDING);
            break;
          case RESULTS.GRANTED:
            console.log('The location permission is granted');
            setAppLocationStatus(LOCATION_STATUS.GRANTED);
            break;
          case RESULTS.BLOCKED:
            console.log(
              'The  location permission is denied and not request able anymore',
            );
            //TODO: user blocked manually so update userAllowed false
            setAppLocationStatus(LOCATION_STATUS.BLOCKED);
            break;
        }
      })
      .catch((error) => {
        console.log('error', error);
        setAppLocationStatus(LOCATION_STATUS.ERROR);
      });
  };

  useEffect(() => {
    if (
      appLocationStatus === LOCATION_STATUS.GRANTED ||
      appLocationStatus === LOCATION_STATUS.REQUEST_PENDING
    ) {
      console.log('get current location now', userLocation);
      let lastActiveMinutes = 0;
      if (userLocation.userAllowed && userLocation.loaded) {
        //case when allowed and already grabbed
        // now need to check the last grabbed active time of the app
        // if passed 60 minutes then grab the location to refresh result
        lastActiveMinutes = moment
          .duration(moment().diff(lastActiveTime))
          .as('minutes');
        if (isNaN(lastActiveMinutes)) {
          lastActiveMinutes = 70;
        }
        console.log('lastActiveMinutes', lastActiveMinutes);
      }

      Geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          // check difference of last active position
          let userMovedOneMile = false;
          if (userLocation.userAllowed) {
            if (
              getDistance(
                userLocation.lat,
                userLocation.lng,
                location.lat,
                location.lng,
              ) >= 1.5
            ) {
              userMovedOneMile = true;
            }
          }

          if (
            !userLocation.userAllowed ||
            lastActiveMinutes >= 60 ||
            userMovedOneMile
          ) {
            updateReduxLocation(_.cloneDeep(location));
          }
        },
        (error) => {
          console.log('Location not found', JSON.stringify(error));
          // first time or active time passed 60minutes
          // if (!userLocation.loaded || lastActiveMinutes >= 60) {
          setLocation({
            lat: 0,
            lng: 0,
            city: '',
            address: '',
            country: null,
            area: '',
            region: '',
            userAllowed: false,
            error: 'POS_NOT_FOUND',
          });
          // }
        },
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 2000,
        },
      );
    } else if (appLocationStatus !== LOCATION_STATUS.NONE) {
      // set location not available
      console.log('LOCATION  NOT REQUESTABLE ANYMORE');
      setLocation({
        lat: 0,
        lng: 0,
        city: '',
        address: '',
        country: null,
        area: '',
        region: '',
        userAllowed: false,
        error: 'POS_NOT_FOUND',
      });
    }
  }, [appLocationStatus]);

  useEffect(() => {
    console.log('Ask Location App state event registered');
    setLocalToken(token);
    AppState.addEventListener('change', _handleAppStateChange);
    updateLocationStatus();

    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    // console.log('App state changed 2', appState, nextAppState);
    //appState.match(/inactive|background/) &&
    if (nextAppState === 'active') {
      console.log('App has come to the foreground!');
      updateLocationStatus();
    } else {
      setAppLocationStatus(LOCATION_STATUS.NONE);
      setLastActiveTime(moment());
    }
    // setAppState(nextAppState);
  };

  return <View />;
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    profile: state.user.profile,
    userLocation: state.app.geoLocation,
    countryLocation: state.app.countryLocation,
    countries: state.app.countries,
    appCountry: state.app.appCountry,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setLocation,
      setCountryLocation,
      updateCountryLocation,
      updateMapLocationChange,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AskLocation);
