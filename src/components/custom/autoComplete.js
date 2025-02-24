import React, {useState} from 'react';
import {View, Text} from 'react-native';
import TextField from './textField';
import theme from '../../styles/theme.style';
import styles from '../../styles';

const Autocomplete = (props) => {
  const handleSearch = (query) => {
    const {data} = props;
    if (query.length > 2) {
      const searchText = query.toLowerCase();
      const suggestions = data.filter((item) => {
        const name = item.qongfu.toLowerCase();
        return name.indexOf(searchText) > -1;
      });
      if (suggestions && suggestions.length) {
        props.setAutocompleteSuggestion(suggestions);
      }
    }
  };
  return (
    <View>
      <TextField
        mode="outlined"
        placeholder="i.e. Boxing, Pilates or Horse Riding"
        onChangeText={(text) => handleSearch(text)}
        style={styles.textSignUpInputField}
        icon={'search'}
        theme={{
          roundness: 50,
          colors: {
            primary: theme.SECONDARY_COLOR,
            underlineColor: theme.SECONDARY_COLOR,
          },
        }}
      />
    </View>
  );
};

export default Autocomplete;
