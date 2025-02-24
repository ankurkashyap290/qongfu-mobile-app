import React, {useState} from 'react';
import MapView from 'react-native-map-clustering';
import {View, Text} from 'react-native';
import {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import {Map_Key, defaultCountry} from '../../../config';
import theme from '../../styles/theme.style';
import styles from '../../styles/locationSetup.style';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {getLocation} from '../../../utils';

const UserLocation = props => {
  const {
    onLocationChange,
    location,
    setIsLocationChange,
    userCurrentPin,
    countries,
    country,
  } = props;
  const [mapRef, setMapRef] = useState(null);
  const [markerCoords, updateMarkerPoint] = useState(null);
  const [searchedCountry, setSearchedCountry] = useState(country);

  let centerCoords = {...userCurrentPin};

  if (location.lat && location.lng) {
    centerCoords = {lat: location.lat, lng: location.lng};
  }
  const [region, updateRegion] = useState(null);

  const handleSetCurrentLocation = () => {
    // updateRegion({...userCurrentPin, latitudeDelta: 0.5, longitudeDelta: 0.5});
    // animate region
    mapRef.animateToRegion(
      {
        latitude: userCurrentPin.lat,
        longitude: userCurrentPin.lng,
        latitudeDelta: 0.000496831273615328,
        longitudeDelta: 0.00027760863304138184,
      },
      1000,
    );
    // setTimeout(() => {
    // updateMarkerPoint(userCurrentPin);
    // onMarkerDragEnd(userCurrentPin);
    // }, 1200);
  };

  const onMarkerDragEnd = evt => {
    const lat = evt.latitude || evt.lat;
    const lng = evt.longitude || evt.lng;
    Geocoder.init(Map_Key);
    Geocoder.from(lat, lng).then(json => {
      if (json.results.length) {
        const location = getLocation(json);
        onLocationChange({
          lat: parseFloat(lat.toFixed(8)),
          lng: parseFloat(lng.toFixed(8)),
          area: location.area,
          city: location.city,
          address: location.address,
          country: location.country,
          region: location.region,
        });
        const country = countries.find(
          country => country.country === location.country,
        );
        setSearchedCountry(country);
      }
    });
    setIsLocationChange(true);
  };

  const handleMapChange = (region, markers) => {
    const center = {lat: region.latitude, lng: region.longitude, ...region};
    // updateRegion(center);
    updateMarkerPoint(center);
    onMarkerDragEnd(center);
  };

  const renderCountryFlag = () => {
    const country = countries.find(
      country => country.country === searchedCountry.country,
    );
    return (
      <View style={styles.countryFlag}>
        <Text
          style={{
            fontSize: 30,
          }}>
          {country ? country.flag : ''}
        </Text>
      </View>
    );
  };

  return (
    <React.Fragment>
      <MapView
        mapRef={map => {
          setMapRef(map);
        }}
        provider={PROVIDER_GOOGLE}
        // showsUserLocation
        style={styles.map}
        initialRegion={{
          latitude: centerCoords.lat,
          longitude: centerCoords.lng,
          latitudeDelta: 0.000496831273615328,
          longitudeDelta: 0.00027760863304138184,
        }}
        // region={
        //   region
        //     ? {
        //         latitude: region.lat,
        //         longitude: region.lng,
        //         latitudeDelta: region.latitudeDelta,
        //         longitudeDelta: region.longitudeDelta,
        //       }
        //     : {
        //         latitude: centerCoords.lat,
        //         longitude: centerCoords.lng,
        //         latitudeDelta: 0.5,
        //         longitudeDelta: 0.5,
        //       }
        // }
        clusterColor={theme.PRIMARY_COLOR}
        onRegionChangeComplete={handleMapChange}>
        <Marker
          draggable
          coordinate={{
            latitude: markerCoords ? markerCoords.lat : centerCoords.lat,
            longitude: markerCoords ? markerCoords.lng : centerCoords.lng,
          }}
          onDragEnd={e => {
            onMarkerDragEnd(e.nativeEvent.coordinate);
          }}></Marker>
      </MapView>
      <View style={{right: 10, bottom: 80, position: 'absolute'}}>
        <Icon
          name="my-location"
          size={30}
          color="#808080"
          style={{
            backgroundColor: '#fff',
            borderRadius: 30,
            padding: 10,
          }}
          onPress={handleSetCurrentLocation}
        />
      </View>
      <View
        style={{
          position: 'absolute',
          width: '100%',
          top: 0,
          left: 0,
        }}>
        <GooglePlacesAutocomplete
          placeholder="Area or City"
          renderLeftButton={() => (
            <Icon
              name="search"
              size={30}
              color={theme.SECONDARY_COLOR}
              style={{position: 'absolute', left: 20, top: 17, zIndex: 99}}
            />
          )}
          renderRightButton={() => renderCountryFlag()}
          minLength={2} // minimum length of text to search
          autoFocus={false}
          returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
          listViewDisplayed="false" // true/false/undefined
          fetchDetails={true}
          renderDescription={row => row.description} // custom description render
          onPress={(data, details = null) => {
            const center = {
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            };
            // console.log('Details', JSON.stringify(details));
            // updateRegion(center);
            // updateMarkerPoint(center);
            // onMarkerDragEnd(center);
            mapRef.fitToCoordinates([center], {
              top: 50,
              left: 50,
              right: 50,
              bottom: 50,
            });
          }}
          query={{
            key: Map_Key,
            language: 'en', // language of the results
            components: `country:${searchedCountry.country_code}`,
            // types: '(cities)', // default: 'geocode'
          }}
          styles={{
            textInput: {
              height: 50,
              borderRadius: 30,
              paddingLeft: 50,
            },
            textInputContainer: {
              backgroundColor: 'rgba(0,0,0,0)',
              borderTopWidth: 0,
              borderBottomWidth: 0,
              marginLeft: 20,
              marginRight: 60,
            },
            listView: {
              elevation: 1,
              backgroundColor: '#fff',
              marginTop: 13,
              marginLeft: 10,
              marginRight: 10,
            },
          }}
          enablePoweredByContainer={false}
          debounce={200}
        />
      </View>
    </React.Fragment>
  );
};

export default UserLocation;
