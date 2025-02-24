import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Linking, RefreshControl} from 'react-native';
import styles from '../styles/home.style';
import PlacesCard from '../components/card/placeCard2';
import NearestIcon from '../assets/img/inner_filter_nearest_blue.svg';
import NearestIconGray from '../assets/img/inner_filter_nearest.svg';
import HighestRated from '../assets/img/inner_filter.svg';
import HighestRatedGray from '../assets/img/inner_filter_gray.svg';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Menu from 'react-native-material-menu';
import {List, Divider, Button, Portal, Dialog} from 'react-native-paper';
import GlobalOverlayLoading from '../components/custom/globalOverlayLoading';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchPlaces, setAdvanceFilter} from '../../redux/app/actions';
import {getFilterQueryParams, applyUserLocation} from '../../utils';
import AddNewPlace from '../components/PlaceDetails/addNewPlace';
import theme from '../styles/theme.style';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';

const NearbySort = ({selectedSort, nearByArea, onSortChange}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  let sortMenu = null;

  const handleMenuOpen = () => {
    setMenuVisible(true);
    sortMenu.show();
  };

  const handleMenuClose = () => {
    setMenuVisible(false);
  };

  const handleSortItemClick = (value) => {
    onSortChange(value);
    handleMenuClose(false);
    sortMenu.hide();
  };

  const getSortMenuTitle = () => {
    if (selectedSort === 'distance') {
      return 'Nearby Places';
    } else if (selectedSort === 'rating') {
      return 'Highest Rated Places';
    } else {
      return '--NONE--';
    }
  };

  return (
    <View>
      <View style={styles.nearByContainer}>
        <Text style={styles.nearByTitleStyle}>{getSortMenuTitle()}</Text>
        <Icon
          name={menuVisible ? 'chevron-up' : 'chevron-down'}
          style={styles.nearByIcon}
          size={24}
          onPress={() => handleMenuOpen()}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
        }}>
        <Menu
          ref={(ref) => (sortMenu = ref)}
          style={{width: 300}}
          onHidden={() => handleMenuClose()}>
          <List.Item
            title="Nearest"
            titleStyle={[
              selectedSort === 'distance' ? styles.sortTitleActive : null,
              styles.sortTitle,
            ]}
            onPress={() => handleSortItemClick('distance')}
            left={(props) =>
              selectedSort === 'distance' ? (
                <NearestIcon style={{marginTop: 6, marginRight: 5}} />
              ) : (
                <NearestIconGray style={{marginTop: 6, marginRight: 5}} />
              )
            }
            right={(props) =>
              selectedSort === 'distance' ? (
                <Icon name="check" size={18} style={[styles.sortCheckIcon]} />
              ) : null
            }
          />
          <Divider />
          <List.Item
            title="Highest Rated"
            titleStyle={[
              selectedSort === 'rating' ? styles.sortTitleActive : null,
              styles.sortTitle,
            ]}
            onPress={() => handleSortItemClick('rating')}
            left={(props) =>
              selectedSort === 'rating' ? (
                <HighestRated style={{marginTop: 6, marginRight: 5}} />
              ) : (
                <HighestRatedGray style={{marginTop: 6, marginRight: 5}} />
              )
            }
            right={(props) =>
              selectedSort === 'rating' ? (
                <Icon name="check" size={18} style={styles.sortCheckIcon} />
              ) : null
            }
          />
          {/* <Divider />
          <List.Item
            title="Most Reviewed"
            titleStyle={[
              selectedSort === 'views' ? styles.sortTitleActive : null,
              styles.sortTitle,
            ]}
            onPress={() => handleSortItemClick('views')}
            left={(props) => <MostReviewed style={{marginTop: 3}} />}
            right={(props) =>
              selectedSort === 'views' ? (
                <Icon name="check" size={18} style={styles.sortCheckIcon} />
              ) : null
            }
          /> */}
        </Menu>
      </View>
    </View>
  );
};

const Places = ({
  fetchPlaces,
  places,
  pagination,
  advanceSearchFilters,
  geoLocation,
  countryLocation,
  loading,
  setAdvanceFilter,
  // lifestyleSlug,
  pageKey,
  appCountry,
  navigation,
  headerComponent,
}) => {
  const suppressGeoLocation =
    navigation.getParam('suppressGeoLocation') || false;
  const [isLoadingPlaces, setPlacesLoading] = useState(false);
  const [addNewPlace, setAddNewPlace] = useState(false);

  // WAIT FOR GEOLOCATION TO SET
  // FETCH PLACES ON PAGE LOAD
  useEffect(() => {
    if (!suppressGeoLocation) {
      if (geoLocation.loaded) {
        let newFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
        newFilters = applyUserLocation(
          newFilters,
          geoLocation,
          countryLocation,
        );
        setAdvanceFilter(pageKey, newFilters);
      } else {
        console.log('waiting.....for....location');
      }
    } else {
      console.log('Not GeoLocation', pageKey);
      navigation.setParams({suppressGeoLocation: false});
    }
  }, [geoLocation]);

  // FETCH PLACES
  // a. FOR ANY FILTER CHANGE
  // b. FOR LOCATION CHANGE
  useEffect(() => {
    if (geoLocation.loaded) {
      console.log('Page Filter', JSON.stringify(advanceSearchFilters[pageKey]));
      if (
        advanceSearchFilters[pageKey].sortBy === 'distance' &&
        !advanceSearchFilters[pageKey].location_lat &&
        !advanceSearchFilters[pageKey].location_lng
      ) {
        console.log('Ignore fetch places');
        return;
      }
      //for location to load to apply any filter
      fetchPlaces(
        pageKey,
        {
          ...getFilterQueryParams(advanceSearchFilters[pageKey], true),
        },
        appCountry,
      );
    }
  }, [advanceSearchFilters[pageKey], appCountry]);

  useEffect(() => {
    const newFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
    if (
      geoLocation.userAllowed &&
      geoLocation.country &&
      parseInt(appCountry, 10) !== parseInt(geoLocation.country.id, 10) &&
      newFilters.sortBy === 'distance'
    ) {
      newFilters.sortBy = 'rating';
      newFilters.areaAndCities = [];
      setAdvanceFilter(pageKey, newFilters);
    }
    if (
      newFilters.sortBy === 'rating' &&
      parseInt(appCountry, 10) !== parseInt(newFilters.country, 10) &&
      newFilters.areaAndCities.length
    ) {
      newFilters.areaAndCities = [];
      setAdvanceFilter(pageKey, newFilters);
    }
  }, [appCountry]);

  // FETCH PLACES WHEN PAGE CHANGE
  const handleLoadMorePlaces = () => {
    // if (isLoadingPlaces) {
    //   return; // already loading
    // }
    const page = pagination[pageKey].page || 1;
    const total = pagination[pageKey].total || 0;
    const newPage = page + 1;
    if (places[pageKey].length < total) {
      // setPlacesLoading(true);
      fetchPlaces(
        pageKey,
        {...getFilterQueryParams(advanceSearchFilters[pageKey], true)},
        appCountry,
        {...pagination[pageKey], page: newPage},
        'scroll',
      );
    }
  };

  const hasMorePlacesToLoad = () => {
    const total = pagination[pageKey].total || 0;
    if (places[pageKey].length < total) {
      return true;
    }
    return loading[pageKey] ? true : false;
  };

  const handleSortChange = (sortBy) => {
    const newFilters = _.cloneDeep(advanceSearchFilters[pageKey]);
    newFilters.sortBy = sortBy;
    if (newFilters.sortBy === 'distance' && newFilters.areaAndCities.length) {
      newFilters.areaAndCities = [];
    }
    setAdvanceFilter(pageKey, newFilters);
  };

  const renderSuggestions = () => {
    return (
      <View style={{alignItems: 'center', marginBottom: 100}}>
        <Text>Can’t find the place you’re looking for?</Text>
        <Text>Would you like to help us Add it?</Text>
        <Button mode="text" onPress={() => handleAddNewPlace()}>
          Add new place
        </Button>
      </View>
    );
  };
  const renderAskLocation = () => {
    return (
      <View style={{alignItems: 'center', marginBottom: 100}}>
        <Text>To enable this feature you need to share your location</Text>
        <Button mode="text" onPress={() => handleShareLocation()}>
          Click to share location
        </Button>
      </View>
    );
  };

  const renderNotUserCountry = () => {
    return (
      <View style={{alignItems: 'center', margin: 20}}>
        <Text style={{color: 'red'}}>
          Nearby feature is only available for your current location.
        </Text>
      </View>
    );
  };
  const renderListFooter = () => {
    if (geoLocation.loaded) {
      if (
        !geoLocation.userAllowed ||
        (!nearByArea && selectedSort === 'distance')
      ) {
        return renderAskLocation();
      } else if (
        geoLocation.country &&
        selectedSort === 'distance' &&
        parseInt(geoLocation.country.id, 10) !== parseInt(appCountry, 10)
      ) {
        return renderNotUserCountry();
      } else if (hasMorePlacesToLoad()) {
        return (
          <Text style={{marginLeft: 20, marginBottom: 50}}>Loading...</Text>
        );
      } else {
        return renderSuggestions();
      }
    } else {
      return <Text style={{marginLeft: 20, marginBottom: 50}}>Loading...</Text>;
    }
  };

  const handleShareLocation = () => {
    Linking.openSettings();
  };

  const handleAddNewPlace = () => {
    setAddNewPlace(true);
  };

  const handleModalClose = () => {
    setAddNewPlace(false);
  };
  const selectedSort = advanceSearchFilters[pageKey].sortBy;
  const nearByArea = advanceSearchFilters[pageKey].nearByArea;
  const listLoading = loading[pageKey] || !geoLocation.loaded;
  return (
    <View style={{flex: 1}}>
      <GlobalOverlayLoading loading={listLoading} textContent="" />
      {/* <NearbySort
        selectedSort={selectedSort}
        nearByArea={nearByArea}
        onSortChange={handleSortChange}
      /> */}
      <View style={{flex: 1, backgroundColor: '#F8FCFF'}}>
        <FlatList
          data={places[pageKey]}
          renderItem={({item, index}) => (
            <PlacesCard key={`${item.place_name}-${index}`} data={item} />
          )}
          onEndReached={() => handleLoadMorePlaces()}
          onEndReachedThreshold={0.01}
          initialNumToRender={pagination[pageKey].pageSize}
          ListEmptyComponent={() => (
            <View style={{marginLeft: 20}}>
              {!listLoading && (
                <Text style={{margin: 20}}>No Places Found!</Text>
              )}
            </View>
          )}
          ListFooterComponent={() => <View>{renderListFooter()}</View>}
          ListHeaderComponent={() => {
            return headerComponent ? headerComponent() : null;
          }}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={listLoading}
              onRefresh={() => {
                fetchPlaces(
                  pageKey,
                  {
                    ...getFilterQueryParams(
                      advanceSearchFilters[pageKey],
                      true,
                    ),
                  },
                  appCountry,
                );
              }}
            />
          }
        />
      </View>
      <Portal>
        <Dialog visible={addNewPlace} onDismiss={handleModalClose}>
          <Icon1
            name="close"
            color={theme.PRIMARY_COLOR}
            size={32}
            style={styles.closeIcon}
            onPress={() => handleModalClose()}
          />
          <AddNewPlace handleModalClose={handleModalClose} />
        </Dialog>
      </Portal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.app.loading,
    places: state.app.places,
    pagination: state.app.pagination,
    advanceSearchFilters: state.app.advanceSearchFilters,
    geoLocation: state.app.geoLocation,
    countryLocation: state.app.countryLocation,
    // lifestyleSlug: state.app.lifestyleSlug,
    appCountry: state.app.appCountry,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchPlaces,
      setAdvanceFilter,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(Places);
