import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Checkbox, Divider, Button} from 'react-native-paper';
import styles from '../../styles/advanceFilter.style';
import theme from '../../styles/theme.style';
import {FilterAreaAndCities} from '../../../config';
import FilterArea from '../../assets/img/filter_areas_colored.svg';
import TextField from '../../components/custom/textField';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AreaAndCitesList = props => {
  const [filteredList, setFilteredList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [searchPhrase, setSearchPhrase] = useState('');

  const {
    onBack,
    handleAreaAndCitiesChange,
    advanceSearchFilters,
    areaAndCities,
  } = props;

  const getRegionFlatListOfAreasAndCities = region => {
    const flatList = [];
    region.cities.map(city => {
      flatList.push(city.name);
      city.area &&
        city.area.map(item => {
          flatList.push(item.name);
          return item;
        });
      return city;
    });
    return flatList;
  };

  useEffect(() => {
    const regions = areaAndCities.length ? areaAndCities[0].regions || [] : [];
    setRegionsList(
      regions.map(region => {
        const list = getRegionFlatListOfAreasAndCities(region);
        return {
          label: region.name,
          value: region.id,
          areasAndCities: [...list],
        };
      }),
    );
  }, [areaAndCities]);

  useEffect(() => {
    handleFilterAreaList(searchPhrase);
  }, [regionsList]);

  const handleSelectLocation = (value, mode) => {
    let currentLocation = [...advanceSearchFilters.areaAndCities];
    if (mode === 'region') {
      const region = filteredList.find(item => item.label === value);
      // toggle area
      if (currentLocation.includes(value)) {
        currentLocation = currentLocation.filter(item => item !== value);
      } else {
        currentLocation = currentLocation.filter(
          item => !region.areasAndCities.includes(item),
        );
        currentLocation.push(value);
      }
    } else {
      const region = filteredList.find(item =>
        item.areasAndCities.includes(value),
      );
      if (currentLocation.includes(value)) {
        currentLocation = currentLocation.filter(item => item !== value);
      } else if (currentLocation.includes(region.label)) {
        currentLocation = region.areasAndCities.filter(item => item !== value);
      } else {
        currentLocation.push(value);
      }
      // check if all region areas and cities selected
      // then select its region as selection
      if (
        currentLocation.filter(item => region.areasAndCities.includes(item))
          .length === region.areasAndCities.length
      ) {
        return handleSelectLocation(region.label, 'region');
      }
    }
    handleAreaAndCitiesChange(currentLocation);
  };

  const getRegionList = region => {
    return region.areasAndCities.map((item, index) => {
      return (
        <TouchableOpacity
          key={`${region.value}-${index}`}
          onPress={() => handleSelectLocation(item, 'cities')}>
          <View style={styles.countryFilterContainer}>
            <View style={[styles.countryInner, {marginLeft: 10, marginTop: 5}]}>
              <Text style={styles.areaCitiesRegionLabel}>{item}</Text>
            </View>
            <Checkbox.Android
              status={
                hasSelectedValue(region.label) || hasSelectedValue(item)
                  ? 'checked'
                  : 'unchecked'
              }
              color={theme.PRIMARY_COLOR}
              uncheckedColor="#f1f1f1"
            />
          </View>
        </TouchableOpacity>
      );
    });
  };

  const handleFilterAreaList = searchText => {
    setSearchPhrase(searchText);
    if (searchText.length > 2) {
      setFilteredList(
        _.cloneDeep(regionsList)
          .filter(
            region =>
              region.label.toLowerCase().indexOf(searchText.toLowerCase()) >=
                0 ||
              region.areasAndCities.filter(
                area =>
                  area.toLowerCase().indexOf(searchText.toLowerCase()) >= 0,
              ).length > 0,
          )
          .map(region => {
            region.areasAndCities = region.areasAndCities.filter(
              area => area.toLowerCase().indexOf(searchText.toLowerCase()) >= 0,
            );
            return region;
          }),
      );
    } else {
      setFilteredList(_.cloneDeep(regionsList));
    }
  };

  const hasSelectedValue = value => {
    const currentSelected = [...advanceSearchFilters.areaAndCities];
    return currentSelected.includes(value);
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
          <FilterArea />
          <Text style={styles.countryName}>Area & Cities</Text>
        </View>
      </View>

      <View style={styles.countryList}>
        <View>
          <TextField
            mode="outlined"
            placeholder="Search Areas & Cities"
            value={searchPhrase}
            style={styles.inputField}
            theme={{
              roundness: 50,
              colors: {
                primary: theme.SECONDARY_COLOR,
                underlineColor: theme.SECONDARY_COLOR,
              },
            }}
            onChangeText={text => handleFilterAreaList(text)}
          />
          <Text style={styles.areaCitiesNote}>
            Note: Any selection will disable nearby sorting option.
          </Text>
        </View>
      </View>
      <ScrollView style={{height: 270}}>
        {filteredList.map((item, index) => {
          return (
            <View>
              <TouchableOpacity
                key={`${item.id}-${index}`}
                onPress={() => handleSelectLocation(item.label, 'region')}>
                <View style={styles.countryFilterContainer}>
                  <View
                    style={[
                      styles.countryInner,
                      {marginLeft: 8, marginTop: 0},
                    ]}>
                    <Text style={styles.areaCitiesLabel}>{item.label}</Text>
                  </View>
                  <Checkbox.Android
                    status={
                      hasSelectedValue(item.label) ? 'checked' : 'unchecked'
                    }
                    color={theme.PRIMARY_COLOR}
                    uncheckedColor="#f1f1f1"
                  />
                </View>
              </TouchableOpacity>
              {getRegionList(item)}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AreaAndCitesList;
