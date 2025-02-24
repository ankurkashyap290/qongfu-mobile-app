import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {List, Divider, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {ADVANCE_SEARCH_OPTIONS} from '../../../config';
import {filterIcon} from '../../components/AdvanceFilters/filterIcons';
import {filterSelectedItem} from '../../../utils';
import styles from '../../styles/advanceFilter.style';
import DropdownInactive from '../../assets/img/dropdown_inactive.svg';

const FilterList = (props) => {
  const {
    advanceSearchFilters,
    handleSetCurrentTab,
    handleResetFilter,
    countries,
    areaAndCities,
    isMapView,
  } = props;
  // const [activeCountries, setActiveCountries] = useState([]);
  const [selectedRegions, setRegionsList] = useState([]);
  const [allAreasAndCities, setAllAreasAndCities] = useState([]);

  // useEffect(() => {
  //   if (countries && countries.length) {
  //     setActiveCountries(
  //       countries
  //         .filter(item => item.approved)
  //         .map(item => ({
  //           label: item.country,
  //           value: item.id + '',
  //           icon: item.flag,
  //           emoji: true,
  //         })),
  //     );
  //   }
  // }, [countries]);

  useEffect(() => {
    const regions = areaAndCities.length ? areaAndCities[0].regions || [] : [];
    setRegionsList(
      regions.map((region) => {
        return {label: region.name, value: region.id, cities: region.cities};
      }),
    );
    // flat list of all areas and cities for all regions
    const flatList = [];
    regions.map((region) => {
      region.cities.map((city) => {
        flatList.push(city.name);
        city.area &&
          city.area.map((item) => {
            flatList.push(item.name);
            return item;
          });
        return city;
      });
      return region;
    });

    setAllAreasAndCities(flatList);
  }, [areaAndCities]);

  const handleFilterItemClick = (value) => {
    handleSetCurrentTab(value);
  };

  const handleReset = () => {
    handleResetFilter();
  };

  return (
    <View>
      <Text style={styles.filterListTitle}>Filter</Text>
      {Object.keys(ADVANCE_SEARCH_OPTIONS)
        .filter(
          (key) =>
            !(isMapView && (key === 'areaAndCities' || key === 'sortBy')),
        )
        .map((key) => {
          const item = ADVANCE_SEARCH_OPTIONS[key];
          if (key === 'areaAndCities') {
            item.values = [...selectedRegions];
            item.extraData = [...allAreasAndCities];
          }
          // else if (key === 'country') {
          //   item.values = [...activeCountries];
          // }
          const {itemValue, itemSelectedLabel} = filterSelectedItem(
            item,
            advanceSearchFilters[key] || null,
          );
          return (
            <View>
              <Divider />
              <List.Item
                title={item.label}
                onPress={() => handleFilterItemClick(key, item)}
                left={(props) => filterIcon[key]}
                right={(props) => (
                  <View style={[styles.filterListItemContain]}>
                    <Text
                      style={styles.filterListSelected}
                      numberOfLines={1}
                      ellipsizeMode="tail">
                      {itemSelectedLabel}
                    </Text>
                    <DropdownInactive style={styles.filterListRightIcon} />
                  </View>
                )}
                titleStyle={styles.filterListName}
                style={styles.filterListItems}
              />
            </View>
          );
        })}
    </View>
  );
};

export default FilterList;
