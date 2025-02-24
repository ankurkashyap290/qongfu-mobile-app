import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  ScrollView,
  Alert,
  Keyboard,
  FlatList,
  Platform,
} from 'react-native';
import {
  Appbar,
  List,
  Divider,
  Button,
  Surface,
  Portal,
  IconButton,
  RadioButton,
  Avatar,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from 'react-native-material-menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/mainLayout.style';
import Search from '../custom/search';
import {
  searchPlaces,
  searchSuggestions,
  setAdvanceFilterOpen,
  setLifestyleSlug,
  setAdvanceFilter,
  setAppCountry,
} from '../../../redux/app/actions';
import theme from '../../styles/theme.style';
import HeaderTitle from './HeaderTitle';
import FilterDrawer from '../AdvanceFilters/FilterDrawer';
import * as NavigationService from '../../navigators/NavigationService';
import LocationPrimary from '../../assets/img/location-primary-color.svg';
import TopBar from '../PlaceDetails/TopBar';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';
import _ from 'lodash';
import {
  getPageKeyByRoute,
  applyUserLocation,
  isFilterChanged,
  isUserLoggedIn,
} from '../../../utils';
import {defaultSearchFilters, IMAGE_URL_PREFIX} from '../../../config';
import EditIcon from '../../assets/img/edit-gray.svg';

// import CountriesList from '../AdvanceFilters/countryList';
import {toggleAccountDrawer} from '../../../redux/user/actions';
import {getUserPlace} from '../../../redux/business/actions';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const CustomAppBar = ({
  navigation,
  searchPlaces,
  setAdvanceFilterOpen,
  pageName,
  searchLoading,
  searchedPlaces,
  lifestyleSlug,
  setLifestyleSlug,
  place,
  placeLoading,
  advanceSearchFilters,
  setAdvanceFilter,
  geoLocation,
  setAppCountry,
  appCountry,
  countries,
  countryLocation,
  profile,
  searchedSuggestions,
  searchSuggestions,
  businessPlace,
  isAccountDrawerOpen,
  toggleAccountDrawer,
  selectedBusiness,
  getUserPlace,
  token,
}) => {
  const pageKey = getPageKeyByRoute(navigation.state.routeName);

  const [openSearchList, setSearchList] = useState(false);
  const [searchPhrase, setSearchPhrase] = useState('');
  const [listData, setDataList] = useState([]);
  const [listDataGroups, setDataListGroups] = useState([]);
  const [suggestionsList, setSuggestionsList] = useState([]);
  const [suggestionsListGroups, setSuggestionsListGroups] = useState([]);

  let menu = null;
  const setAppCountryMenuRef = (ref) => {
    menu = ref;
  };

  const handleAppCountryMenuOpen = () => {
    menu.show();
  };

  useEffect(() => {
    if (advanceSearchFilters[pageKey].search !== searchPhrase) {
      setSearchPhrase(advanceSearchFilters[pageKey].search);
    }
  }, [advanceSearchFilters[pageKey]]);

  useEffect(() => {
    if (searchedPlaces) {
      let places = searchedPlaces.places.map((place) => ({
        group: 'Places',
        linkedId: place.slug,
        title: place.place_name,
        description: place.location,
      }));
      let qongfus = searchedPlaces.qongfus.map((qongfu) => ({
        group: 'Qongfu',
        linkedId: qongfu.qongfu,
        title: qongfu.qongfu,
        description: '',
      }));
      let regions = searchedPlaces.locations.regions.map((region) => ({
        group: 'Locations',
        linkedId: region.name,
        title: region.name,
        description: '',
      }));
      let cities = searchedPlaces.locations.cities.map((city) => ({
        group: 'Locations',
        linkedId: city.name,
        title: city.name,
        description: '',
      }));
      let areas = searchedPlaces.locations.areas.map((area) => ({
        group: 'Locations',
        linkedId: area.name,
        title: area.name,
        description: '',
      }));
      setDataList([...places, ...qongfus, ...regions, ...cities, ...areas]);
    }
  }, [searchedPlaces]);

  useEffect(() => {
    if (listData.length > 0) {
      const groups = [];
      listData.map((item) => {
        if (!groups.includes(item.group)) {
          groups.push(item.group);
        }
      });
      setDataListGroups(groups);
    }
  }, [listData]);

  useEffect(() => {
    if (searchedSuggestions) {
      let qongfus = searchedSuggestions.qongfus.map((qongfu) => ({
        group: 'Qongfu',
        linkedId: qongfu.qongfu,
        title: qongfu.qongfu,
        description: '',
      }));
      let hotspots = searchedSuggestions.hotspots.map((hotspot) => ({
        group: 'Hotspots',
        linkedId: hotspot.name,
        title: hotspot.name,
        description: '',
      }));
      setSuggestionsList([...hotspots, ...qongfus]);
    }
  }, [searchedSuggestions]);

  useEffect(() => {
    if (suggestionsList.length) {
      const groups = [];
      suggestionsList.map((item) => {
        if (!groups.includes(item.group)) {
          groups.push(item.group);
        }
      });
      setSuggestionsListGroups(groups);
    }
  }, [suggestionsList]);

  const handleLogoClick = () => {
    if (!isAccountDrawerOpen) {
      toggleAccountDrawer(true);
    }
  };

  const getMainLogo = () => {
    if (selectedBusiness) {
      return selectedBusiness.place_logo_url
        ? `${IMAGE_URL_PREFIX}${selectedBusiness.place_logo_url}`
        : `https://via.placeholder.com/728.png?text=${selectedBusiness.place_name}`;
    } else {
      return profile.avatar_url
        ? `${IMAGE_URL_PREFIX}${profile.avatar_url}`
        : `https://via.placeholder.com/728.png?text=${profile.display_name}`;
    }
  };

  const handleSearch = (search) => {
    let searchPayload = {search};
    if (lifestyleSlug) {
      searchPayload.lifestyles = lifestyleSlug;
    }
    setSearchPhrase(search);
    searchPlaces({search: search.toLowerCase()});
  };
  const handleSearchFocus = () => {
    if (searchPhrase.length) {
      searchPlaces({search: searchPhrase});
    } else {
      searchSuggestions({country_id: appCountry, user_id: profile.id});
    }

    setSearchList(true);
  };
  const handleSearchBlur = () => {
    setSearchList(false);
  };

  const handleMenuOnHide = () => {
    // setMenuRef.current.hide();
  };

  const handleFilterOpen = () => {
    setAdvanceFilterOpen(pageKey, true);
  };

  const handleBack = () => {
    console.log(pageName, 'pageName');
    if (pageName === 'Home' && lifestyleSlug) {
      setLifestyleSlug('');
    } else if (pageName === 'place' || pageName === 'Search') {
      NavigationService.navigate('Explorer');
    } else if (pageName === 'Maps') {
      NavigationService.goBack();
    } else {
      NavigationService.goBack();
    }
  };

  const renderPlaceName = () => {
    return (!placeLoading && place) || pageName === 'business-place' ? (
      <View
        style={[
          {
            flexDirection: 'row',
            width: screenWidth - 180,
          },
        ]}>
        <LocationPrimary style={styles.locationIcon} />
        <Text style={styles.topBarTitle} ellipsizeMode="tail" numberOfLines={1}>
          {pageName === 'business-place'
            ? businessPlace.place_name
            : place.place_name}
        </Text>
      </View>
    ) : null;
  };

  const handleListItemClick = (item) => {
    Keyboard.dismiss();
    if (item.group === 'Places') {
      NavigationService.navigate('PlaceDetails', {
        slug: item.linkedId,
      });
    } else if (item.group === 'Qongfu') {
      const newFilters = _.cloneDeep(advanceSearchFilters['dashboard']);
      newFilters.search = item.linkedId;
      setAdvanceFilter('search', newFilters);
      NavigationService.navigate('ExplorerSearch');
    } else if (item.group === 'Locations' || item.group === 'Hotspots') {
      const newFilters = _.cloneDeep(advanceSearchFilters['dashboard']);
      newFilters.search = '';
      newFilters.areaAndCities = [item.linkedId];
      setAdvanceFilter('search', newFilters);
      NavigationService.navigate('ExplorerSearch');
    }
  };

  const handleSearchButtonPress = () => {
    Keyboard.dismiss();
    if (searchPhrase) {
      let newFilters = _.cloneDeep(defaultSearchFilters);
      let localSearchText = searchPhrase;
      let localPageKey = pageKey;
      if (pageName === 'Home') {
        setSearchPhrase(''); //empty searchbox
        localPageKey = 'search';
        newFilters = _.cloneDeep(advanceSearchFilters['dashboard']);
      } else if (pageName === 'Search' || pageName === 'Maps') {
        newFilters = _.cloneDeep(advanceSearchFilters[localPageKey]);
      } else {
        newFilters = applyUserLocation(
          newFilters,
          geoLocation,
          countryLocation,
        );
      }
      newFilters.search = localSearchText;
      setAdvanceFilter(localPageKey, newFilters);
      if (pageName === 'Home') {
        NavigationService.navigate('ExplorerSearch', {
          suppressGeoLocation: true,
        });
      }
    }
  };

  const getListData = () => {
    if (searchPhrase.length) {
      return listData;
    } else {
      return suggestionsList;
    }
  };

  const getListGroups = () => {
    if (searchPhrase.length) {
      return listDataGroups;
    } else {
      return suggestionsListGroups;
    }
  };

  const renderSearchBox = () => {
    return (
      <View style={styles.searchBoxCt}>
        <View style={{zIndex: 1}}>
          <Search
            value={searchPhrase}
            handleSearch={handleSearch}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            paddingRight={90}
            placeholder={
              lifestyleSlug
                ? `Search ${lifestyleSlug} Places`
                : pageName === 'places'
                ? 'Search Places'
                : `Rocket Search ${getAppCountry().country}`
            }
          />
        </View>
        {openSearchList && (
          <Portal>
            <View
              style={[
                styles.searchButtonContainer,
                {
                  top:
                    Platform.OS === 'android' ? 10 : getStatusBarHeight() + 10,
                },
              ]}>
              <Button
                mode="outlined"
                style={styles.searchButton}
                labelStyle={styles.searchButtonText}
                onPress={() => handleSearchButtonPress()}>
                Search
              </Button>
            </View>

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View
                style={[
                  styles.searchOverlay,
                  {height: screenHeight + 56, width: screenWidth + 46},
                ]}
              />
            </TouchableWithoutFeedback>
            <Surface
              style={[
                styles.searchListView,
                {
                  top:
                    Platform.OS === 'android' ? 56 : getStatusBarHeight() + 56,
                },
              ]}>
              <ScrollView keyboardShouldPersistTaps="always">
                {searchLoading ? (
                  <List.Item title="Loading..." />
                ) : getListData().length === 0 ? (
                  <List.Item title="Not Found" />
                ) : (
                  getListGroups().map((group) => (
                    <List.Section>
                      <List.Subheader style={{fontWeight: '600'}}>
                        {group}
                      </List.Subheader>
                      {getListData().map((item, index) => {
                        if (item.group === group) {
                          return (
                            <List.Item
                              key={`${item.title}-${index}`}
                              title={item.title}
                              description={item.description}
                              titleStyle={styles.searchListTitle}
                              descriptionStyle={styles.searchListDesc}
                              onPress={() => handleListItemClick(item)}
                            />
                          );
                        }
                      })}
                      {/* <Divider style={styles.groupDivider} /> */}
                    </List.Section>
                  ))
                )}
              </ScrollView>
            </Surface>
          </Portal>
        )}
      </View>
    );
  };

  const getAppCountry = () => {
    const country = countries.find(
      (country) => parseInt(country.id, 10) === parseInt(appCountry, 10),
    );
    return country;
  };

  const renderCountriesList = () => {
    return (
      <ScrollView style={{height: 150}}>
        <RadioButton.Group
          onValueChange={(value) => handleChangeAppCountry(value)}
          value={parseInt(appCountry, 10)}>
          {countries.map((item, index) => {
            return item.approved === 1 ? (
              <View
                style={styles.countryFilterContainer}
                key={`${item.value}-${index}`}>
                <View style={styles.countryInner}>
                  <Text
                    style={{
                      fontSize: 25,
                    }}>
                    {item.flag}
                  </Text>
                  <Text style={styles.countryLabel}>{item.country}</Text>
                </View>
                <RadioButton.Android
                  uncheckedColor="#f1f1f1"
                  value={item.id}
                  color={theme.PRIMARY_COLOR}
                />
              </View>
            ) : null;
          })}
        </RadioButton.Group>
      </ScrollView>
    );
  };

  const handleChangeAppCountry = (countryId) => {
    setAppCountry(countryId);
    menu.hide();
  };

  const handleMapIconClick = () => {
    if (pageName !== 'Maps') {
      NavigationService.navigate('MapView', {
        suppressGeoLocation: true,
      });
    }
  };

  const renderSearchBoxIcons = () => {
    const showIcons = !openSearchList
      ? pageName !== 'place' && pageName !== 'business-place'
      : false;

    if (showIcons) {
      return (
        <View
          style={[
            styles.filterButtonContainer,
            {
              height: 56,
              flexDirection: 'row',
              alignItems: 'center',
              backgroundColor: 'transparent',
              width: 80,
            },
          ]}>
          <View>
            <IconButton
              icon="tune"
              size={26}
              color={
                isFilterChanged(advanceSearchFilters[pageKey])
                  ? theme.PRIMARY_COLOR
                  : undefined
              }
              color="#979797"
              rippleColor={theme.PRIMARY_COLOR}
              onPress={() => handleFilterOpen()}
            />
            <FilterDrawer pageKey={pageKey} />
          </View>
          <View>
            <Text
              style={styles.appCountryFlag}
              onPress={() => handleAppCountryMenuOpen()}>
              {getAppCountry().flag}
            </Text>
            <Menu ref={setAppCountryMenuRef}>{renderCountriesList()}</Menu>
          </View>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View
      style={[
        {backgroundColor: '#fff'},
        {paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight()},
      ]}>
      <Appbar
        style={[
          styles.pageLayoutHeader,
          {
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.18,
            shadowRadius: 1.0,
          },
        ]}>
        <View style={{marginLeft: 10, marginRight: 10}}>
          {pageName === 'Home' && !lifestyleSlug ? (
            <React.Fragment>
              <TouchableOpacity onPress={() => handleLogoClick()}>
                <Surface
                  style={{
                    elevation: 1,
                    borderRadius: 30,
                    borderColor: '#fff',
                    borderWidth: 2,
                    height: 40,
                    width: 40,
                  }}>
                  <Avatar.Image size={36} source={{uri: getMainLogo()}} />
                </Surface>
              </TouchableOpacity>
            </React.Fragment>
          ) : (
            <TouchableOpacity onPress={() => handleBack()}>
              <Icon name="chevron-left" size={36} color={theme.PRIMARY_COLOR} />
            </TouchableOpacity>
          )}
        </View>
        {pageName === 'place' || pageName === 'business-place'
          ? renderPlaceName()
          : renderSearchBox()}
        {renderSearchBoxIcons()}
        {pageName === 'place' ? (
          <View></View>
        ) : pageName === 'business-place' ? (
          <TouchableOpacity
            onPress={() => {
              getUserPlace({
                placeId: businessPlace.id,
                token,
                ratings_page: 1,
                gallery_page: 1,
              });
              NavigationService.navigate('EditMenu');
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={{color: '#474747'}}>Edit </Text>
              <EditIcon />
            </View>
          </TouchableOpacity>
        ) : pageName === 'Maps' ? (
          <View style={{width: 40}}></View>
        ) : (
          <View>
            <IconButton
              icon="map-outline"
              size={24}
              color={theme.PRIMARY_COLOR}
              rippleColor={theme.PRIMARY_COLOR}
              // style={{backgroundColor: theme.PRIMARY_COLOR}}
              onPress={handleMapIconClick}
            />
          </View>
        )}
      </Appbar>
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    searchLoading: state.app.searchLoading,
    searchedPlaces: state.app.searchedPlaces,
    lifestyleSlug: state.app.lifestyleSlug,
    place: state.app.place,
    placeLoading: state.app.placeLoading,
    advanceSearchFilters: state.app.advanceSearchFilters,
    geoLocation: state.app.geoLocation,
    appCountry: state.app.appCountry,
    countries: state.app.countries,
    countryLocation: state.app.countryLocation,
    profile: state.user.profile,
    searchedSuggestions: state.app.searchedSuggestions,
    businessPlace: state.business.place,
    isAccountDrawerOpen: state.user.isAccountDrawerOpen,
    selectedBusiness: state.business.selectedBusiness,
    token: state.user.token,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      searchPlaces,
      setAdvanceFilterOpen,
      setLifestyleSlug,
      setAdvanceFilter,
      setAppCountry,
      searchSuggestions,
      toggleAccountDrawer,
      getUserPlace,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(CustomAppBar);
