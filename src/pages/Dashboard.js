import React from 'react';
import {View, Text, ScrollView, Platform} from 'react-native';
import {IconButton, Surface} from 'react-native-paper';
// import DashboardNavBar from '../components/header/DashboardNavBar';
import LifestyleCard2 from '../components/card/lifestyleCard2';
import styles from '../styles/home.style';
import * as NavigationService from '../navigators/NavigationService';
import Places from './Places';
import {LIFESTYLES, defaultSearchFilters} from '../../config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setAdvanceFilter} from '../../redux/app/actions';
import {getViewportHeight} from '../../utils/helper';
import {getPageKeyByRoute, applyUserLocation} from '../../utils';
import _ from 'lodash';
import DashboardNavBar2 from '../components/header/DashboardNavBar2';

const WelcomeMessage = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Qongfu!</Text>
      <Text style={styles.subHeading}>How can we help you today?</Text>
    </View>
  );
};

const LifestyleCarousal = ({onSelect}) => {
  const getIcon = (icon) => {
    switch (icon) {
      case 'fitness':
        return require('../assets/img/lifestyles/fitness.jpg');
      case 'martial_arts':
        return require('../assets/img/lifestyles/martial_arts.jpg');
      case 'sports':
        return require('../assets/img/lifestyles/sports.jpg');
      case 'wellness':
        return require('../assets/img/lifestyles/wellness.jpg');
      case 'recreation':
        return require('../assets/img/lifestyles/recreation.jpg');
      default:
        return require('../assets/img/sports.png');
    }
  };
  return (
    <ScrollView horizontal={true}>
      {LIFESTYLES.map((item) => {
        return (
          <LifestyleCard2
            onSelect={onSelect}
            key={item.label}
            name={item.label}
            imageUrl={getIcon(item.icon)}
          />
        );
      })}
    </ScrollView>
  );
};

const Dashboard = ({
  setAdvanceFilter,
  geoLocation,
  navigation,
  countryLocation,
  advanceSearchFilters,
}) => {
  const handleLifestyleChange = (value) => {
    const pageKey = getPageKeyByRoute('ExplorerSearch');
    let newFilters = _.cloneDeep(advanceSearchFilters['dashboard']);
    newFilters = applyUserLocation(newFilters, geoLocation, countryLocation);
    newFilters.lifestyle = [value];
    setAdvanceFilter(pageKey, newFilters);
    NavigationService.navigate('ExplorerSearch');
  };

  const renderHeader = () => {
    return (
      <Surface
        style={{
          flex: 1,
          backgroundColor: '#fff',
          paddingLeft: 16,
          paddingRight: 8,
          // height: 119,
          elevation: 1,
          paddingTop: 16,
          paddingBottom: 6,
          marginBottom: 8,
        }}>
        <DashboardNavBar2 />
        <LifestyleCarousal onSelect={handleLifestyleChange} />
      </Surface>
    );
  };

  return (
    <View style={{backgroundColor: '#fff', minHeight: getViewportHeight(true)}}>
      {/* <DashboardNavBar /> */}
      <Places
        pageKey="dashboard"
        navigation={navigation}
        headerComponent={renderHeader}
      />
      {/* </ScrollView> */}
      {/* <View style={styles.floatingOuter}>
        <View
          style={
            Platform.OS === 'android'
              ? styles.floatingAndroid
              : styles.floatingIos
          }>
          <IconButton
            icon="map-outline"
            size={32}
            color="#fff"
            onPress={() =>
              NavigationService.navigate('Maps', {
                resetFilter: false,
              })
            }
          />
        </View>
      </View> */}
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    geoLocation: state.app.geoLocation,
    countryLocation: state.app.countryLocation,
    advanceSearchFilters: state.app.advanceSearchFilters,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setAdvanceFilter,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
