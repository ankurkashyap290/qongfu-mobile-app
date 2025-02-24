import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {RadioButton, Divider, Button} from 'react-native-paper';
import styles from '../../styles/advanceFilter.style';
import theme from '../../styles/theme.style';
import FilterCountry from '../../assets/img/filter_country_colored.svg';
import Icon from 'react-native-vector-icons/MaterialIcons';

const CountryList = props => {
  const {onBack, onCountryChange, advanceSearchFilters, countries} = props;
  const [activeCountries, setActiveCountries] = useState([]);
  const selectedCountry = advanceSearchFilters.country;
  useEffect(() => {
    if (countries && countries.length) {
      setActiveCountries(
        countries
          .filter(item => item.approved)
          .map(item => ({
            label: item.country,
            value: item.id + '',
            icon: item.flag,
            emoji: true,
          })),
      );
    }
  }, [countries]);

  const handleOnCountryChange = value => {
    onCountryChange(value);
  };

  return (
    <View>
      <View style={styles.countryListHeader}>
        <Icon
          onPress={() => onBack()}
          name="chevron-left"
          size={30}
          color={theme.PRIMARY_COLOR}
          style={{marginTop: 2}}
        />
        <View style={styles.countryListHeaderIconCon}>
          <FilterCountry />
          <Text style={styles.countryName}>Country</Text>
        </View>
      </View>

      <ScrollView style={{...styles.countryList, height: 300}}>
        <RadioButton.Group
          onValueChange={value => handleOnCountryChange(value)}
          value={`${selectedCountry}`}>
          {activeCountries.map((item, index) => {
            return (
              <View
                style={styles.countryFilterContainer}
                key={`${item.value}-${index}`}>
                <View style={styles.countryInner}>
                  <Text
                    style={{
                      fontSize: 25,
                    }}>
                    {item.icon}
                  </Text>
                  <Text style={styles.countryLabel}>{item.label}</Text>
                </View>
                <RadioButton.Android
                  uncheckedColor="#f1f1f1"
                  value={item.value}
                  color={theme.PRIMARY_COLOR}
                />
              </View>
            );
          })}
        </RadioButton.Group>
      </ScrollView>
    </View>
  );
};

export default CountryList;
