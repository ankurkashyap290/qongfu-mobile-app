import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Avatar, List, Divider, Surface} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Settings from '../../assets/img/settings.svg';
import {ScrollView} from 'react-native-gesture-handler';
import {IMAGE_URL_PREFIX} from '../../../config';
import {selectBusiness} from '../../../redux/business/actions';
import {getUserRoleLabel} from '../../../utils';
import * as NavigationService from '../../navigators/NavigationService';
import {toggleAccountDrawer} from '../../../redux/user/actions';
import {getUserPlace} from '../../../redux/business/actions';

const ClaimedList = ({
  profile,
  selectedBusiness,
  selectBusiness,
  toggleAccountDrawer,
  getUserPlace,
  token,
}) => {
  const [claimedPlaces, setClaimedPlaces] = useState([]);

  useEffect(() => {
    if (profile.places) {
      //   const currentSelected = selectedBusiness ? selectedBusiness : {id: 0};
      //   currentSelected.id !== place.id &&
      const claimed = profile.places.filter(
        (place) => place.verified && place.claimed && !place.hidden,
      );
      setClaimedPlaces(claimed);
    }
  }, [profile.places]);

  const getLogoUrl = (item, mode) => {
    const logo_url = mode === 'place' ? item.place_logo_url : item.avatar_url;
    return logo_url
      ? `${IMAGE_URL_PREFIX}${logo_url}`
      : `https://via.placeholder.com/728.png?text=${getName(item, mode)}`;
  };

  const getName = (item, mode) => {
    return mode === 'place' ? item.place_name : item.display_name;
  };

  const getDescription = (item, mode) => {
    return mode === 'place' ? item.location : getUserRoleLabel(item);
  };

  const handleItemSelect = (item, mode) => {
    selectBusiness(mode === 'place' ? item : null);
  };
  const handleEditItem = (item, mode) => {
    toggleAccountDrawer(false);
    if (mode === 'place') {
      getUserPlace({
        placeId: item.id,
        token,
        ratings_page: 1,
        gallery_page: 1,
      });
      NavigationService.navigate('EditMenu', {}, 'BusinessManage');
    } else if (mode === 'user') {
      NavigationService.navigate('ViewProfile');
    }
  };

  const renderBusinessCards = (item, mode) => {
    return (
      <View
        key={`claim-item-${item.id}`}
        style={{
          justifyContent: 'center',
          flexDirection: 'column',
          flex: 1,
          marginLeft: 16,
          marginRight: 16,
        }}>
        <List.Item
          elevation={4}
          title={getName(item, mode)}
          description={getDescription(item, mode)}
          left={(props) => (
            <View style={{justifyContent: 'center'}}>
              <Surface
                style={{
                  elevation: 1,
                  borderRadius: 30,
                  borderColor: '#fff',
                  borderWidth: 2,
                  height: 44,
                  width: 44,
                }}>
                <Avatar.Image
                  {...props}
                  size={40}
                  source={{uri: getLogoUrl(item, mode)}}
                />
              </Surface>
            </View>
          )}
          titleStyle={{
            fontFamily: 'Roboto',
            lineHeight: 24,
            color: '#4f4f4f',
            fontSize: 14,
            marginLeft: 10,
          }}
          descriptionStyle={{
            fontFamily: 'Roboto',
            lineHeight: 24,
            color: '#858585',
            fontSize: 12,
            marginLeft: 10,
          }}
          right={(props) => (
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  handleEditItem(item, mode);
                }}>
                <Settings {...props} />
              </TouchableOpacity>
            </View>
          )}
          onPress={() => {
            handleItemSelect(item, mode);
          }}
        />

        <Divider
          style={{
            backgroundColor: '#dedede',
            width: '100%',
            marginLeft: 70,
          }}
        />
      </View>
    );
  };
  return (
    <ScrollView style={{flex: 1}} keyboardShouldPersistTaps="always">
      {selectedBusiness ? renderBusinessCards(profile, 'user') : null}
      {claimedPlaces.map((item) => renderBusinessCards(item, 'place'))}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    selectedBusiness: state.business.selectedBusiness,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {selectBusiness, toggleAccountDrawer, getUserPlace},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(ClaimedList);
