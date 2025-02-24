import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {RadioButton, Button, Divider} from 'react-native-paper';
import styles from '../../styles/advanceFilter.style';
import {ADVANCE_SEARCH_OPTIONS, RATED_FILTERS} from '../../../config';
import {sortByIcon, filterIcon} from './filterIcons';
import theme from '../../styles/theme.style';
import {filterSelectedItem} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
const SortingList = (props) => {
  const {
    advanceSearchFilters,
    onSortingChange,
    onBack,
    isMapView,
    handleReset,
  } = props;

  const handleSelectedItemChecked = (sortBy) => {
    onSortingChange(sortBy);
  };

  const sortingObject = ADVANCE_SEARCH_OPTIONS.sortBy;
  const {itemValue, itemSelectedLabel} = filterSelectedItem(
    sortingObject,
    advanceSearchFilters.sortBy || null,
  );
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
          {/* {filterIcon['sortBy']} */}
          <Text style={styles.countryName}>Sort Places by</Text>
        </View>
      </View>
      <ScrollView style={{...styles.countryList, height: 300}}>
        <RadioButton.Group
          onValueChange={(value) => handleSelectedItemChecked(value)}
          value={`${itemValue}`}>
          {sortingObject.values.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  handleSelectedItemChecked(item.value);
                }}>
                <View
                  style={styles.countryFilterContainer}
                  key={`${item.value}-${index}`}>
                  <View style={styles.countryInner}>
                    <Text
                      style={{
                        fontSize: 25,
                      }}>
                      {sortByIcon[item.value]}
                    </Text>
                    <Text style={styles.countryLabel}>{item.label}</Text>
                  </View>
                  <RadioButton.Android
                    uncheckedColor="#f1f1f1"
                    value={item.value}
                    color={theme.PRIMARY_COLOR}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </RadioButton.Group>
      </ScrollView>
    </View>
  );
};

export default SortingList;
