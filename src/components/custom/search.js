import React, {useState} from 'react';
import {View} from 'react-native';
import TextField from './textField';
import styles from '../../styles/mainLayout.style';
import theme from '../../styles/theme.style';

const Search = (props) => {
  const {
    handleSearch,
    pageName,
    onFocus,
    onBlur,
    button,
    value,
    autoFocus,
    paddingRight,
  } = props;
  const [localValue, setLocalValue] = useState('');
  const handleOnChange = (value) => {
    setLocalValue(value);
    handleSearch(value);
  };

  return (
    <View>
      <TextField
        // mode="outlined"
        value={typeof value !== undefined ? value : localValue}
        placeholder={props.placeholder}
        onChangeText={(text) => handleOnChange(text)}
        onFocus={(params) => onFocus && onFocus()}
        onBlur={(params) => onBlur && onBlur()}
        style={{
          fontSize: 15,
          // height: pageName === 'personalInfoUpdate' ? 60 : 40,
          // height: 40,
          minHeight: 20,
          backgroundColor: '#F7F7FA',
        }}
        containerStyle={{
          backgroundColor: '#F7F7FA',
          elevation: 0,
          borderWidth: 1,
          borderColor: '#DEDEDE',
          paddingRight: paddingRight ? paddingRight : undefined,
        }}
        icon={'search'}
        theme={{
          roundness: 50,
          colors: {
            primary: theme.SECONDARY_COLOR,
            underlineColor: theme.SECONDARY_COLOR,
          },
          fonts: {
            regular: 'Poppins',
          },
        }}
        iconAlign={pageName === 'personalInfoUpdate' ? 'right' : 'left'}
        marginLeft={40}
        button={button}
        autoFocus={autoFocus}
      />
    </View>
  );
};

export default Search;
