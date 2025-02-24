import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {Divider, Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FilterList from './filterList';
import CountryList from './countryList';
import LifestylesList from './lifestylesList';
import RatingsList from './ratingsList';
import AreaAndCitesList from './areaAndCities';
import {defaultSearchFilters, FilterAreaAndCities} from '../../../config';
import _ from 'lodash';
import {setAdvanceFilter, setAreasAndCities} from '../../../redux/app/actions';
import {applyUserLocation} from '../../../utils';
import SortingList from './sortingList';

const AdvanceFilterSearch = ({
  advanceSearchFilters,
  setAdvanceFilter,
  setRbSheetHeight,
  isMapView,
  countries,
  areaAndCities,
  pageKey,
  geoLocation,
  countryLocation,
}) => {
  const [currentTab, setCurrentTab] = useState('');

  // useEffect(() => {
  //   if (isMapView) {
  //     setCurrentTab('lifestyle');
  //   } else {
  //     setCurrentTab('');
  //   }
  // }, [isMapView]);

  const handleSetCurrentTab = (value) => {
    setCurrentTab(value);
    // if (value === 'country') {
    //   setRbSheetHeight(380);
    // }
  };

  const handleBackBtnClick = () => {
    setCurrentTab('');
  };

  const handleCountryChange = (value) => {
    const tempAdvanceFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
    tempAdvanceFilters.country = value;
    setAdvanceFilter(pageKey, tempAdvanceFilters);
  };

  const handleLifestyleChange = (lifestyles) => {
    const tempAdvanceFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
    tempAdvanceFilters.lifestyle = [...lifestyles];
    setAdvanceFilter(pageKey, tempAdvanceFilters);
  };

  const handleRatingChange = (ratings) => {
    const tempAdvanceFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
    tempAdvanceFilters.rated = [...ratings];
    setAdvanceFilter(pageKey, tempAdvanceFilters);
  };

  const handleSortingChange = (sortBy) => {
    const tempAdvanceFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
    tempAdvanceFilters.sortBy = sortBy;
    if (
      tempAdvanceFilters.sortBy === 'distance' &&
      tempAdvanceFilters.areaAndCities.length
    ) {
      tempAdvanceFilters.areaAndCities = [];
    }
    setAdvanceFilter(pageKey, tempAdvanceFilters);
  };

  const handleResetFilter = () => {
    // check for geoLocation to set nearby
    let newFilters = _.cloneDeep(defaultSearchFilters);
    newFilters = applyUserLocation(newFilters, geoLocation, countryLocation);
    setAdvanceFilter(pageKey, newFilters);
  };

  const handleAreaAndCitiesChange = (location) => {
    const tempAdvanceFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
    tempAdvanceFilters.areaAndCities = [...location];
    if (location.length) {
      tempAdvanceFilters.sortBy = 'rating';
    }
    setAdvanceFilter(pageKey, tempAdvanceFilters);
  };

  const getCurrentSelectedTab = () => {
    switch (currentTab) {
      // case 'country': {
      //   setRbSheetHeight(400);
      //   return (
      //     <CountryList
      //       advanceSearchFilters={advanceSearchFilters[pageKey]}
      //       onBack={handleBackBtnClick}
      //       onCountryChange={handleCountryChange}
      //       countries={countries}
      //     />
      //   );
      // }
      case 'sortBy': {
        setRbSheetHeight(250);
        return (
          <SortingList
            advanceSearchFilters={advanceSearchFilters[pageKey]}
            onBack={handleBackBtnClick}
            onSortingChange={handleSortingChange}
            isMapView={isMapView}
            handleReset={handleResetFilter}
          />
        );
      }
      case 'lifestyle': {
        setRbSheetHeight(400);
        return (
          <LifestylesList
            advanceSearchFilters={advanceSearchFilters[pageKey]}
            onBack={handleBackBtnClick}
            onLifeStyleChange={handleLifestyleChange}
            isMapView={isMapView}
            handleReset={handleResetFilter}
          />
        );
      }
      case 'rated': {
        setRbSheetHeight(300);
        return (
          <RatingsList
            advanceSearchFilters={advanceSearchFilters[pageKey]}
            onBack={handleBackBtnClick}
            onRatingChange={handleRatingChange}
            isMapView={isMapView}
            handleReset={handleResetFilter}
          />
        );
      }
      case 'areaAndCities': {
        setRbSheetHeight(500);
        return (
          <AreaAndCitesList
            onBack={handleBackBtnClick}
            handleAreaAndCitiesChange={handleAreaAndCitiesChange}
            areaAndCities={areaAndCities}
            advanceSearchFilters={advanceSearchFilters[pageKey]}
          />
        );
      }
      default:
        setRbSheetHeight(isMapView ? 250 : 350);
        return (
          <FilterList
            advanceSearchFilters={advanceSearchFilters[pageKey]}
            handleSetCurrentTab={handleSetCurrentTab}
            handleResetFilter={handleResetFilter}
            countries={countries}
            areaAndCities={areaAndCities}
            isMapView={isMapView}
          />
        );
    }
  };
  return (
    <View>
      {getCurrentSelectedTab()}
      <Divider />
      <View>
        <Button
          mode="text"
          labelStyle={{textTransform: 'none', fontSize: 16}}
          onPress={() => handleResetFilter()}>
          Reset Settings (Default)
        </Button>
      </View>
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    countries: state.app.countries,
    areaAndCities: state.app.areaAndCities,
    advanceSearchFilters: state.app.advanceSearchFilters,
    geoLocation: state.app.geoLocation,
    countryLocation: state.app.countryLocation,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({setAdvanceFilter, setAreasAndCities}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AdvanceFilterSearch);
