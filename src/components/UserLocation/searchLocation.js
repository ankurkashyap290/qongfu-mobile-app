import React from 'react';
import {Map_Key} from '../../../config';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

const SearchLocation = props => {
  const {onSelect, placeholder} = props;

  return (
    <GooglePlacesAutocomplete
      placeholder={placeholder}
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      listViewDisplayed="false" // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => {
        onSelect({
          hometown: data.description,
          hometown_lat: details.geometry.location.lat.toFixed(8),
          hometown_lng: details.geometry.location.lng.toFixed(8),
        });
      }}
      query={{
        key: Map_Key,
        language: 'en', // language of the results
        types: '(cities)', // default: 'geocode'
      }}
      styles={{
        textInput: {
          height: 50,
          borderRadius: 30,
          borderWidth: 1,
        },

        textInputContainer: {
          backgroundColor: 'rgba(0,0,0,0)',
          borderTopWidth: 0,
          borderBottomWidth: 0,
        },

        listView: {
          elevation: 1,
          backgroundColor: '#fff',
          marginTop: 13,
          marginLeft: 10,
          marginRight: 10,
          zIndex: 999,
        },
      }}
      enablePoweredByContainer={false}
      debounce={200}
    />
  );
};

export default SearchLocation;
