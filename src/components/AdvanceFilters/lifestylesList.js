import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Checkbox, Button, List} from 'react-native-paper';
import styles from '../../styles/advanceFilter.style';
import {ADVANCE_SEARCH_OPTIONS} from '../../../config';
import {lifestylesIcon} from './filterIcons';
import theme from '../../styles/theme.style';
import FilterLifestyles from '../../assets/img/lifestyle-colored.svg';
import {filterSelectedItem} from '../../../utils';
import Icon from 'react-native-vector-icons/MaterialIcons';

const LifestylesList = (props) => {
  const {advanceSearchFilters, onLifeStyleChange, onBack, isMapView} = props;
  const getItemChecked = (itemData, itemValue, item) => {
    const checked = itemData.multiSelect
      ? itemData.selectAll && item.value === itemData.allOption.value
        ? itemData.values.length === itemValue.length
        : false || itemValue.includes(item.label)
      : itemValue === item.value;

    if (checked) {
      return 'checked';
    } else {
      return 'unchecked';
    }
  };

  const handleSelectedItemChecked = (item) => {
    let newLifestyles = [...advanceSearchFilters.lifestyle];
    if (newLifestyles.includes(item.label)) {
      newLifestyles.splice(newLifestyles.indexOf(item.label), 1);
    } else {
      newLifestyles.push(item.label);
    }
    onLifeStyleChange(newLifestyles);
  };

  const lifestyleObject = ADVANCE_SEARCH_OPTIONS.lifestyle;
  const {itemValue, itemSelectedLabel} = filterSelectedItem(
    lifestyleObject,
    advanceSearchFilters.lifestyle || null,
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
          <FilterLifestyles style={{marginTop: 5, marginLeft: 5}} />
          <Text style={styles.countryName}>Lifestyles</Text>
        </View>
      </View>

      <ScrollView style={{...styles.countryList, height: 300}}>
        {lifestyleObject.values.map((item, index) => {
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
                    {lifestylesIcon[item.value]}
                  </Text>
                )}
                right={(props) => (
                  <Checkbox.Android
                    status={getItemChecked(lifestyleObject, itemValue, item)}
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

export default LifestylesList;
