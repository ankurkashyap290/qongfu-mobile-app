import React from 'react';
import {View} from 'react-native';
import {Marker} from 'react-native-maps';
import MapPinFitness from '../../assets/img/map_pin_fitness.svg';
import MapPinMartialArts from '../../assets/img/map_pin_martial_arts.svg';
import MapPinSports from '../../assets/img/map_pin_sports.svg';
import MapPinWellness from '../../assets/img/map_pin_wellness.svg';

const SimpleMarker = (props) => {
  const {place, onMarkerClick, coordinate, currentIndex} = props;
  const markerIcon = {
    fitness: <MapPinFitness />,
    'martial-arts': <MapPinMartialArts />,
    sports: <MapPinSports />,
    wellness: <MapPinWellness />,
  };

  const getMarker = (name) => {
    return markerIcon[name] || markerIcon.sports;
  };

  return (
    <Marker coordinate={coordinate} onPress={() => onMarkerClick(currentIndex)}>
      <View>
        {getMarker(
          place.lifestyles.length ? place.lifestyles[0].slug : 'sports',
        )}
      </View>
    </Marker>
  );
};

export default SimpleMarker;
