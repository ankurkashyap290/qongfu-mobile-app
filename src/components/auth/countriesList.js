import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {List} from 'react-native-paper';
import styles from '../../styles/sendOTP.style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/FontAwesome5';

const CountriesList = props => {
  const {countries, selectedCountry, handleCountryClick} = props;
  const fileteredCountries = countries.filter(
    country => country.approved === 1,
  );

  return (
    <React.Fragment>
      <ScrollView>
        <View style={{borderTopColor: '#f0f0f0', borderTopWidth: 2}}>
          {fileteredCountries.map(item => {
            return (
              <View>
                <List.Item
                  key={`${item.country_code}`}
                  title={item.country}
                  left={() => <Text style={{fontSize: 28}}>{item.flag}</Text>}
                  right={() =>
                    selectedCountry.id === item.id ? (
                      <View style={{justifyContent: 'center'}}>
                        <Icon
                          style={{
                            fontSize: 24,
                            color: '#4fa11b',
                          }}
                          name="check-circle"
                        />
                      </View>
                    ) : null
                  }
                  onPress={() => handleCountryClick(item)}
                  style={
                    selectedCountry.id === item.id
                      ? styles.selectedCountryListItem
                      : styles.countryListItem
                  }
                  titleStyle={styles.countryListTitle}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.app.countries,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountriesList);
