import React, {useState, useEffect} from 'react';
import {View, Dimensions, Text, TouchableOpacity, Image} from 'react-native';
import MapView from 'react-native-map-clustering';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Carousel from 'react-native-snap-carousel';
import theme from '../../styles/theme.style';
import SimpleMarker from './SimpleMarker';
import PlacesCard from '../card/placeCard2';
import styles from '../../styles/map.style';
import LocationIcon from '../../assets/img/inner_filter_nearest.svg';
import {Marker, Circle, PROVIDER_GOOGLE} from 'react-native-maps';

import {getDistance} from '../../../utils';
import {getViewportHeight} from '../../../utils/helper';

const screenWidth = Math.round(Dimensions.get('window').width);

const Maps = ({
  places,
  onMapChange,
  defaultRegion,
  animateMapCenter,
  onCompleteAnimate,
}) => {
  const SLIDER_WIDTH = screenWidth - 80;
  const ITEM_WIDTH = screenWidth - 80;
  const [currentSlide, setCurrentSlide] = useState(-1);
  const [hideCarousel, setHideCarousel] = useState(true);
  const [localDefaultRegion, setLocalDefaultRegion] = useState({
    latitude: 26.2030679,
    longitude: 50.5430425,
    // latitudeDelta: 0.08,
    // longitudeDelta: 0.08,
  });
  const [theMapProps, setTheMapProps] = useState({
    center: {lat: 26.2030679, lng: 50.5430425},
    zoom: 12, //11,
    bounds: null,
    distance: 10,
    region: {
      latitude: 26.2030679,
      longitude: 50.5430425,
      latitudeDelta: 0.08,
      longitudeDelta: 0.08,
    },
  });

  const [mapRef, setMapRef] = useState(null);

  const [localMarkers, updateLocalMarkers] = useState([]);

  useEffect(() => {
    const localPlaces = getLocalSortedMarkers();
    updateLocalMarkers(localPlaces);
  }, [places]);

  useEffect(() => {
    if (JSON.stringify(localDefaultRegion) !== JSON.stringify(defaultRegion)) {
      setTheMapProps({...theMapProps, region: {...defaultRegion}});
      setLocalDefaultRegion({...defaultRegion});
      if (animateMapCenter) {
        mapRef &&
          mapRef.animateToRegion({
            ...defaultRegion,
            ...getDefaultZoom(),
          });
        onCompleteAnimate && onCompleteAnimate();
      }
    }
  }, [defaultRegion]);

  const _renderItem = (item) => {
    return (
      <PlacesCard
        key={`${item.item.place_name}-${item.index}`}
        data={item.item}
      />
    );
  };

  const renderActionsAndCarousal = () => {
    return (
      <React.Fragment>
        <View
          style={
            !hideCarousel ? styles.hideBtnContainer : styles.showBtnContainer
          }>
          <TouchableOpacity onPress={() => handleSetHideCarousel()}>
            <View style={styles.showHideBtn}>
              <Text style={styles.showHideBtnLabel}>
                {!hideCarousel ? 'Hide' : 'Show Place'}
              </Text>
              <Icon
                size={20}
                name={!hideCarousel ? 'expand-less' : 'expand-more'}
                style={styles.showHideBtnIcon}
              />
            </View>
          </TouchableOpacity>
          {/* <Text
          style={{
            backgroundColor: 'red',
            textAlign: 'center',
          }}>{`Zoom: ${theMapProps.zoom}`}</Text> */}
        </View>
        {/* <View
        style={
          !hideCarousel
            ? styles.hideLocationContainer
            : styles.showLocationContainer
        }>

        <Icon
          name="my-location"
          size={30}
          color="#fff"
          style={{
            backgroundColor: theme.SECONDARY_COLOR,
            borderRadius: 30,
            padding: 10,
          }}
          // onPress={handleSetCurrentLocation}
        />
      </View> */}
        {!hideCarousel && currentSlide >= 0 ? (
          <View
            style={[
              {position: 'absolute', left: 0, bottom: 50},
              {width: '100%'},
            ]}>
            {_renderItem({item: places[currentSlide]})}
            {/* <View>
               <Carousel
                layout={'default'}
                data={places}
                renderItem={_renderItem}
                sliderWidth={SLIDER_WIDTH}
                itemWidth={ITEM_WIDTH}
                firstItem={currentSlide}
              />
            </View> */}
          </View>
        ) : null}
      </React.Fragment>
    );
  };

  const handleSetCurrentSlide = (value) => {
    setHideCarousel(false);
    setCurrentSlide(value);
  };

  const handleNextClick = () => {
    if (currentSlide !== places.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentSlide !== 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleSetHideCarousel = () => {
    setHideCarousel(!hideCarousel);
  };

  const handleMapChange = (region) => {
    const zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    const nw_lat = region.latitude + region.latitudeDelta / 2;
    const nw_lng = region.longitude - region.longitudeDelta / 2;
    const se_lat = region.latitude - region.latitudeDelta / 2;
    const se_lng = region.longitude + region.longitudeDelta / 2;
    const distance = getDistance(nw_lng, se_lat, se_lng, nw_lat);
    setTheMapProps({
      center: {lat: region.latitude, lng: region.longitude},
      zoom: zoom,
      bounds: {nw_lat, nw_lng, se_lat, se_lng},
      region: {...region},
      distance,
    });
    if (zoom > 6) {
      //only fetch places when zoom level greater then 6 below 6 not showing anything
      onMapChange({center: {...region}, distance});
    }
  };

  const getDefaultZoom = () => {
    const LATITUDE_DELTA = 0.5;
    const LONGITUDE_DELTA =
      LATITUDE_DELTA * (screenWidth / getViewportHeight(true));
    return {latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA};
  };

  const getLocalSortedMarkers = () => {
    const newList = [];
    const newLocal = [];
    localMarkers.map((item) => {
      const place = places.find((place) => place.id === item.id);
      if (place) {
        newList.push(place);
        newLocal.push(place.id);
      }
    });
    const newPlaces = places.filter((place) => !newLocal.includes(place.id));
    return [...newList, ...newPlaces];
  };

  return (
    <View
      style={[
        styles.container,
        {width: screenWidth, height: getViewportHeight(true)},
      ]}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapRef={(map) => {
          setMapRef(map);
        }}
        // showsUserLocation
        // showsMyLocationButton
        // radius={screenWidth * 4.5}
        maxZoom={10}
        style={styles.map}
        initialRegion={{...localDefaultRegion, ...getDefaultZoom()}}
        // region={{...theMapProps.region}}
        onRegionChangeComplete={(region) => handleMapChange(region)}
        renderCluster={(cluster) => {
          const {id, geometry, onPress, properties} = cluster;
          const points = properties.point_count;
          if (theMapProps.zoom > 6 && theMapProps.zoom < 11) {
            return (
              <Marker
                key={`cluster-${id}`}
                coordinate={{
                  longitude: geometry.coordinates[0],
                  latitude: geometry.coordinates[1],
                }}
                onPress={onPress}>
                <View
                  style={{
                    position: 'relative',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={
                      points <= 10
                        ? require('../../assets/img/Cluster_9.png')
                        : points < 100
                        ? require('../../assets/img/Cluster_10+.png')
                        : require('../../assets/img/cluster_extraLg.png')
                    }
                  />

                  <View
                    style={{
                      position: 'absolute',
                      top: 0,
                      bottom: 0,
                      justifyContent: 'center',
                    }}>
                    <Text style={{color: '#fff'}}>{points}</Text>
                  </View>
                </View>
              </Marker>
            );
          } else {
            return null;
          }
        }}>
        {localMarkers.map((item, index) => {
          return (
            <SimpleMarker
              coordinate={{
                latitude: parseFloat(item.location_lat),
                longitude: parseFloat(item.location_lng),
              }}
              place={item}
              currentIndex={index}
              onMarkerClick={handleSetCurrentSlide}
            />
          );
        })}
        {/* Region center marker */}
        {/* <Marker
          coordinate={{
            latitude: theMapProps.region.latitude,
            longitude: theMapProps.region.longitude,
          }}>
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icon name="home" size={31} color="red" />
            <View style={{backgroundColor: '#fff'}}>
              <Text>
                lat: {theMapProps.region.latitude.toFixed(8)}, lng:
                {theMapProps.region.longitude.toFixed(8)}
              </Text>
              <Text>Distance: {Math.ceil(theMapProps.distance / 2)}</Text>
            </View>
          </View>
        </Marker> */}
      </MapView>
      {localMarkers.length ? renderActionsAndCarousal() : null}
    </View>
  );
};

export default Maps;
