import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import * as NavigationService from '../navigators/NavigationService';
import GlobalOverlayLoading from '../components/custom/globalOverlayLoading';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  setAdvanceFilter,
  fetchPlaces,
  updateMapLocationChange,
} from '../../redux/app/actions';
import Maps from '../components/Maps';
import {defaultSearchFilters} from '../../config';
import {
  getFilterQueryParams,
  getPageKeyByRoute,
  applyUserLocation,
} from '../../utils';

import _ from 'lodash';

const defaultDistance = 20;
const PlacesMapView = ({
  fetchPlaces,
  places,
  advanceSearchFilters,
  geoLocation,
  loading,
  navigation,
  setAdvanceFilter,
  profile,
  countryLocation,
  appCountry,
  updateMapLocationChange,
  mapLocationChanged,
  countries,
}) => {
  const pageKey = getPageKeyByRoute('MapView');
  const suppressGeoLocation =
    navigation.getParam('suppressGeoLocation') || false;
  const [initialLoaded, setInitialLoad] = useState(false);
  const [localProfileLocation, setLocalProfileLocation] = useState(null);
  const [animateMapCenter, toggleAnimateMapCenter] = useState(false);

  const [mapInfo, updateMapInfo] = useState({
    max_distance: defaultDistance,
    location_lat: '',
    location_lng: '',
    map: true,
  });

  const setMapFilters = (newFilters) => {
    // always near by
    const center = getDefaultCenter();
    newFilters.location_lat = center.latitude;
    newFilters.location_lng = center.longitude;
    newFilters.nearByArea = true;
    newFilters.sortBy = 'distance';
    newFilters.areaAndCities = []; // empty cause on map search this filter not applied
    setAdvanceFilter(pageKey, newFilters);
  };

  useEffect(() => {
    if (!initialLoaded) {
      // set defaultCenter or profile location
      // specially profile location to check with cause it is changeable prop
      setInitialLoad(true);
      setLocalProfileLocation({
        lat: profile.location_lat,
        lng: profile.location_lng,
      });
    }
  }, []);

  useEffect(() => {
    if (!suppressGeoLocation) {
      if (geoLocation.loaded) {
        let newFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
        setMapFilters(newFilters);
      } else {
        console.log('waiting.....for....location');
      }
    }
  }, [geoLocation]);

  useEffect(() => {
    if (suppressGeoLocation) {
      console.log('Click from link and icon');
      let newFilters = _.cloneDeep(advanceSearchFilters['dashboard']);
      setMapFilters(newFilters);
      navigation.setParams({suppressGeoLocation: false});
    }
  }, [suppressGeoLocation]);

  //TODO: if change advanceFilters set local filters also to check with
  useEffect(() => {
    fetchPlaces(
      pageKey,
      {
        ...getFilterQueryParams(advanceSearchFilters[pageKey], true),
        ...(mapInfo.max_distance ? mapInfo : {}),
      },
      appCountry,
    );
  }, [advanceSearchFilters[pageKey], appCountry]);

  // // consider geoLocation change only if profile location not set
  // useEffect(() => {
  //   if (
  //     geoLocation.lat &&
  //     geoLocation.lng &&
  //     !profile.location_lat &&
  //     !profile.location_lng
  //   ) {
  //     handlerMapChange({
  //       center: {
  //         latitude: geoLocation.lat,
  //         longitude: geoLocation.lng,
  //       },
  //       distance: defaultDistance,
  //     });
  //   }
  // }, [geoLocation]);

  useEffect(() => {
    if (
      initialLoaded &&
      !geoLocation.userAllowed &&
      profile.location_lat &&
      profile.location_lng &&
      localProfileLocation.lat !== profile.location_lat &&
      localProfileLocation.lng !== profile.location_lng
    ) {
      setLocalProfileLocation({
        lat: profile.location_lat,
        lng: profile.location_lng,
      });
      handlerMapChange({
        center: {
          latitude: parseFloat(profile.location_lat),
          longitude: parseFloat(profile.location_lng),
        },
        distance: defaultDistance,
      });
    }
  }, [profile]);

  useEffect(() => {
    if (mapLocationChanged) {
      updateMapLocationChange(false);
      // animate to country region
      toggleAnimateMapCenter(true);
    }
  }, [mapLocationChanged]);

  const handlerMapChange = ({center, distance}) => {
    const mapDetails = {
      max_distance: Math.ceil(distance),
      location_lat: center.latitude.toFixed(8),
      location_lng: center.longitude.toFixed(8),
      map: true,
    };
    updateMapInfo(mapDetails);
    fetchPlaces(
      pageKey,
      {
        ...getFilterQueryParams(advanceSearchFilters[pageKey], true),
        ...mapDetails,
      },
      appCountry,
    );
  };

  const getDefaultCenter = () => {
    // if user location allowed then show user location as center point
    // if not allowed then check profile location set then set profile location center
    // else geolocation get by country->capital
    if (
      geoLocation.userAllowed &&
      geoLocation.country &&
      parseInt(geoLocation.country.id, 10) === parseInt(appCountry, 10)
    ) {
      return {latitude: geoLocation.lat, longitude: geoLocation.lng};
    } else {
      const foundCountry = countries.find(
        (item) => parseInt(item.id, 10) === parseInt(appCountry, 10),
      );
      if (foundCountry && foundCountry.location) {
        return {
          latitude: foundCountry.location.lat,
          longitude: foundCountry.location.lng,
        };
      }
      return {latitude: countryLocation.lat, longitude: countryLocation.lng};
    }
  };

  return (
    <View>
      <GlobalOverlayLoading loading={loading[pageKey]} textContent="" />
      <Maps
        defaultRegion={{
          ...getDefaultCenter(),
        }}
        places={places[pageKey]}
        onMapChange={handlerMapChange}
        animateMapCenter={animateMapCenter}
        onCompleteAnimate={() => toggleAnimateMapCenter(false)}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    loading: state.app.loading,
    places: state.app.places,
    advanceSearchFilters: state.app.advanceSearchFilters,
    geoLocation: state.app.geoLocation,
    countryLocation: state.app.countryLocation,
    appCountry: state.app.appCountry,
    mapLocationChanged: state.app.mapLocationChanged,
    countries: state.app.countries,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchPlaces,
      setAdvanceFilter,
      updateMapLocationChange,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlacesMapView);
