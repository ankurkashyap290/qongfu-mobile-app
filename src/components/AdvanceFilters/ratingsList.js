import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Checkbox, Button, List} from 'react-native-paper';
import styles from '../../styles/advanceFilter.style';
import {ADVANCE_SEARCH_OPTIONS, RATED_FILTERS} from '../../../config';
import {lifestylesIcon} from './filterIcons';
import theme from '../../styles/theme.style';
import FilterLifestyles from '../../assets/img/lifestyle-colored.svg';
import FilterRating from '../../assets/img/star_outline.svg';
import {filterSelectedItem} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RatingsList = (props) => {
  const {
    advanceSearchFilters,
    onRatingChange,
    onBack,
    isMapView,
    handleReset,
  } = props;

  const getItemChecked = (itemData, itemValue, item) => {
    const checked = itemData.multiSelect
      ? itemData.selectAll && item.value === itemData.allOption.value
        ? itemData.values.length === itemValue.length
        : false || itemValue.includes(item.value)
      : itemValue === item.value;

    if (checked) {
      return 'checked';
    } else {
      return 'unchecked';
    }
  };

  const handleSelectedItemChecked = (item) => {
    let newRatings = [...advanceSearchFilters.rated];
    if (newRatings.includes(item.value)) {
      newRatings.splice(newRatings.indexOf(item.value), 1);
    } else {
      newRatings.push(item.value);
    }
    onRatingChange(newRatings);
  };

  const ratingObject = ADVANCE_SEARCH_OPTIONS.rated;
  const {itemValue, itemSelectedLabel} = filterSelectedItem(
    ratingObject,
    advanceSearchFilters.rated || null,
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
          <FilterRating />
          <Text style={styles.countryName}>Rated</Text>
        </View>
      </View>
      <ScrollView style={{...styles.countryList, height: 300}}>
        {ratingObject.values.map((item, index) => {
          return (
            <View
              style={styles.countryFilterContainer}
              key={`${item.value}-${index}`}>
              <List.Item
                title={item.label}
                onPress={() => handleSelectedItemChecked(item)}
                left={(props) => (
                  <Text
                    style={{
                      textAlignVertical: 'center',
                      marginTop: 7,
                      // backgroundColor: 'red',
                    }}>
                    <FilterRating />
                  </Text>
                )}
                right={(props) => (
                  <Checkbox.Android
                    status={getItemChecked(ratingObject, itemValue, item)}
                    color={theme.PRIMARY_COLOR}
                    uncheckedColor="#f1f1f1"
                  />
                )}
                titleStyle={styles.countryLabel}
                style={[styles.lifestyleFilterList]}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default RatingsList;
