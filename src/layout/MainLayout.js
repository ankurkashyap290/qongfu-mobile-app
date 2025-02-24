import React, {useEffect} from 'react';
import {View, Text, Image, Dimensions} from 'react-native';
import {Appbar, List} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Menu from 'react-native-material-menu';
import styles from '../styles/mainLayout.style';
import Search from '../components/custom/search';
import GlobalOverlayLoading from '../components/custom/globalOverlayLoading';

const MainLayout = (props) => {
  const {loading, children, title, navigation, backUrl, openFilter} = props;
  const {
    searchPlacesReceive,
    searchPlacesList,
    placeLoading,
  } = props.screenProps;

  const screenWidth = Math.round(Dimensions.get('window').width);

  let menu = null;
  const setMenuRef = (ref) => {
    menu = ref;
  };

  useEffect(() => {
    if (searchPlacesList.length) {
      menu.show();
    }
  });

  const handleFilterOpen = () => {
    openFilter();
  };

  const handleMenuOnHide = () => {
    searchPlacesReceive({places: []});
  };

  const handleListItemClick = (slug) => {
    props.navigation.navigate('PlaceDetails', {
      slug,
      backUrl: 'Home',
    });
  };

  return (
    <View>
      <GlobalOverlayLoading loading={placeLoading} textContent="" />
      <View>
        <Menu
          ref={setMenuRef}
          style={{width: screenWidth - 20}}
          onHidden={() => handleMenuOnHide()}>
          {searchPlacesList.map((item, index) => {
            return index < 3 ? (
              <List.Item
                key={`${item.place_name}-${index}`}
                style={{width: screenWidth - 40}}
                title={item.place_name}
                description={`${item.distance_formatted}-${item.location}`}
                titleStyle={styles.searchListTitle}
                descriptionStyle={styles.searchListDesc}
                onPress={() => handleListItemClick(item.slug)}
              />
            ) : null;
          })}
        </Menu>
      </View>
      <View style={{marginTop: 10}}>{children}</View>
    </View>
  );
};

export default MainLayout;
