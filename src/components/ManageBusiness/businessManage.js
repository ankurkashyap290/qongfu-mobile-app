import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  FlatList,
  RefreshControl,
} from 'react-native';
import {Button, Card, Avatar, Surface} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import styles from '../../styles/manageBusiness.style';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import AuthenticatedIcon from '../../assets/img/authenticated_seal_16x16.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fetchBusinesses,
  updatePlace,
  resetBusinessUpdateStatus,
  getUserPlace,
} from '../../../redux/business/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import {IMAGE_URL_PREFIX} from '../../../config';
import CustomAlert from '../custom/customAlert';
import {getViewportHeight} from '../../../utils/helper';

const BusinessManage = ({
  loading,
  navigation,
  fetchBusinesses,
  token,
  places,
  claims,
  updateHideLoading,
  updateHideError,
  updatePlace,
  resetBusinessUpdateStatus,
  updateHideStatus,
  getUserPlace,
  loadedPlace,
  placeLoading,
}) => {
  const runDone = navigation.getParam('runDone');
  const reset = navigation.getParam('reset');
  const [whichAction, setActionClicked] = useState('');

  useEffect(() => {
    const skippedRoute = NavigationService.getSkipped();
    if (skippedRoute.includes('BusinessManage')) {
      NavigationService.removeSkipped('BusinessManage');
      setTimeout(() => {
        fetchBusinesses(token);
      }, 500);
    }
  });

  useEffect(() => {
    if (runDone) {
      NavigationService.navigate('BusinessSetupStep1');
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  useEffect(() => {
    if (reset) {
      navigation.setParams({reset: false});
      fetchBusinesses(token);
    }
  }, [reset]);

  useEffect(() => {
    if (loadedPlace && whichAction === 'edit') {
      getUserPlace({
        placeId: loadedPlace.id,
        token,
        ratings_page: 1,
        gallery_page: 1,
      });
      NavigationService.navigate('EditMenu');
      setActionClicked('');
    }
  }, [loadedPlace]);

  useEffect(() => {
    if (updateHideStatus) {
      resetBusinessUpdateStatus('update-place-hide');
      fetchBusinesses(token);
    }
  }, [updateHideStatus]);

  const handlePendingBusinessCards = (item, action) => {
    if (action !== 'invalid') {
      NavigationService.navigate('PendingClaim', {
        reset: true,
        claimItem: {...item},
        action: action,
      });
    } else {
      Alert.alert('error', 'Invalid Action');
    }
  };

  const handleCardPress = (item, pendingObj) => {
    if (pendingObj) {
      handlePendingBusinessCards(item, pendingObj.action);
    } else {
      const place = getItemPlace(item) || item;
      NavigationService.navigate('BusinessPlaceProfile', {
        placeId: place.id,
      });
    }
  };

  const updatePlaceHidden = (place, hidden) => {
    updatePlace(
      {
        id: place.id,
        place_name: place.place_name,
        location_lat: place.location_lat,
        location_lng: place.location_lng,
        country_id: place.country_id,
        location_data: place.location_data,
        hidden: hidden,
      },
      token,
      'hide',
    );
  };

  const handleHideCard = (place) => {
    updatePlaceHidden(place, true);
  };

  const handleUnhideCard = (item) => {
    updatePlaceHidden(item, false);
  };

  const getItemPlace = (item) => {
    return item.place_details ? item.place_details : null;
  };
  const isVerified = (item) => {
    const place = getItemPlace(item);
    if (place) {
      return place.verified && place.claimed;
    }
    return false;
  };

  const isPendingClaim = (item) => {
    const place = getItemPlace(item);
    if (place) {
      return !place.verified && !place.claimed && place.user_id === null;
    }
    return false;
  };

  const isPendingApproval = (item) => {
    const place = getItemPlace(item);
    if (place) {
      return (
        !place.verified &&
        !place.claimed &&
        place.user_id !== null &&
        !hasToResubmitDocuments(item)
      );
    }
    return false;
  };

  const isPendingDocuments = (item) => {
    if (item.claim_applications) {
      return item.claim_applications.documents.length === 0;
    }
    return false;
  };

  const hasToResubmitDocuments = (item) => {
    if (item.claim_applications) {
      return (
        item.claim_applications.approved === 0 &&
        item.claim_applications.documents.filter(
          (document) => document.status === 2,
        ).length > 0
      );
    }
    return false;
  };

  const isRejected = (item) => {
    if (item.claim_applications) {
      return item.claim_applications.approved === 2;
    }
    return false;
  };

  const isHidden = (item) => {
    if (item.place_details) {
      return item.place_details.hidden;
    } else {
      return item.hidden;
    }
  };

  const getNotClaimed = () => {
    const claimedPlaceIds = claims.map((claim) => claim.place_id);
    return places.filter((place) => !claimedPlaceIds.includes(place.id));
  };

  const isClaimedRequired = (item) => {
    return !item.claim_applications;
  };

  const isUserCreatedPlace = (item) => {
    const foundCreatedPlace = places.find(
      (place) => place.id === item.place_id,
    );
    if (foundCreatedPlace) {
      return true;
    }
    return false;
  };

  const getPendingLabel = (item) => {
    if (isRejected(item)) {
      return {
        action: isUserCreatedPlace(item)
          ? 'rejected-approval'
          : 'rejected-claims',
        label: (
          <Text style={[styles.claimButtonLabel, {color: '#FF0000'}]}>
            Rejected
          </Text>
        ),
      };
    } else if (isClaimedRequired(item) || isPendingClaim(item)) {
      return {
        action: isClaimedRequired(item) ? 'claim-required' : 'pending-claims',
        label: <Text style={[styles.claimButtonLabel]}>Pending Claim</Text>,
      };
    }
    if (hasToResubmitDocuments(item) || isPendingDocuments(item)) {
      return {
        action: hasToResubmitDocuments(item)
          ? 'pending-documents-update'
          : 'pending-documents',
        label: (
          <Text style={[styles.claimButtonLabel, {color: '#FF0000'}]}>
            Pending Documents
          </Text>
        ),
      };
    } else if (isPendingApproval(item)) {
      return {
        action: 'pending-approval',
        label: <Text style={[styles.claimButtonLabel]}>Pending Approval</Text>,
      };
    }
    return {
      action: 'invalid',
      label: (
        <Text style={[styles.claimButtonLabel, {color: '#FF0000'}]}>
          Invalid
        </Text>
      ),
    };
  };

  const getLogoUrl = (place) => {
    return place.place_logo_url
      ? `${IMAGE_URL_PREFIX}${place.place_logo_url}`
      : `https://via.placeholder.com/728.png?text=${place.place_name}`;
  };

  const renderRightActions = (item) => {
    const place = getItemPlace(item) || item;
    return (
      <TouchableOpacity
        onPress={() => {
          getUserPlace({
            placeId: place.id,
            token,
            ratings_page: 1,
            gallery_page: 1,
          });
          setActionClicked('edit');
        }}>
        <View
          style={[
            styles.swipeRightActions,
            {
              backgroundColor: theme.PRIMARY_COLOR,
              width: 100,
            },
          ]}>
          <Icon size={20} name="square-edit-outline" color="#fff" />
          <Text style={styles.swipeText}>Edit</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderLeftActions = (item) => {
    const place = getItemPlace(item) || item;
    return !isHidden(place) ? (
      <TouchableOpacity onPress={() => handleHideCard(place)}>
        <View
          style={[
            styles.swipeLeftActions,
            {
              backgroundColor: '#B5B5B5',
              width: 100,
            },
          ]}>
          <Icon size={20} name="eye-off" color="#fff" />
          <Text style={styles.swipeText}>Hide</Text>
        </View>
      </TouchableOpacity>
    ) : null;
  };

  const renderBusinessCards = (item) => {
    const place = getItemPlace(item) || item;
    const pendingObj = !isVerified(item) ? getPendingLabel(item) : null;
    return (
      <Card
        elevation={4}
        style={
          !isVerified(item)
            ? styles.manageBusinessPendingCard
            : styles.manageBusinessCard
        }
        onPress={() => {
          handleCardPress(item, pendingObj);
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Surface
            style={[
              {
                elevation: 0,
                borderRadius: 80,
                borderColor: '#fff',
                borderWidth: 1,
              },
            ]}>
            <Avatar.Image
              size={64}
              source={{uri: getLogoUrl(place)}}
              style={{backgroundColor: '#fff'}}
            />
          </Surface>
          <View style={{marginLeft: 10, flex: 1, flexDirection: 'column'}}>
            {!isVerified(item) ? (
              <View style={[styles.claimButton, {alignItems: 'flex-end'}]}>
                <Text>{pendingObj.label}</Text>
              </View>
            ) : place.hidden ? (
              <View style={[styles.claimButton, {alignItems: 'flex-end'}]}>
                <TouchableOpacity onPress={() => handleUnhideCard(place)}>
                  <Icon name="eye-off" color={theme.PRIMARY_COLOR} size={20} />
                </TouchableOpacity>
              </View>
            ) : null}
            {isVerified(item) ? (
              <View style={{flexDirection: 'row'}}>
                <AuthenticatedIcon style={{marginTop: 3}} />
                <Text
                  style={[
                    styles.manageBusinessPlaceName,
                    {flexDirection: 'row', flexShrink: 1},
                  ]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {place.place_name}
                </Text>
              </View>
            ) : (
              <View>
                <Text
                  style={[
                    styles.manageBusinessPlaceName,
                    {flexDirection: 'row', flexShrink: 1},
                  ]}
                  ellipsizeMode="tail"
                  numberOfLines={1}>
                  {place.place_name}
                </Text>
              </View>
            )}
            <View>
              <Text
                style={[
                  styles.manageBusinessPlaceLocation,
                  {flexDirection: 'row', flexShrink: 1},
                ]}
                ellipsizeMode="tail"
                numberOfLines={1}>
                {place.location}
              </Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#f8fcff',
        minHeight: getViewportHeight(true),
        paddingBottom: 80,
      }}>
      <GlobalOverlayLoading
        loading={updateHideLoading || loading || placeLoading}
        textContent=""
      />
      <View style={{marginTop: 20}}>
        {updateHideError ? (
          <View style={{margin: 16}}>
            <CustomAlert error={updateHideError} />
          </View>
        ) : null}
        <FlatList
          data={[...claims, ...getNotClaimed()]}
          renderItem={({item}) => {
            const isClaim = getItemPlace(item) ? true : false;
            if (isClaim) {
              return isVerified(item) ? (
                <Swipeable
                  renderRightActions={() => renderRightActions(item)}
                  renderLeftActions={() => renderLeftActions(item)}>
                  {renderBusinessCards(item)}
                </Swipeable>
              ) : (
                renderBusinessCards(item)
              );
            } else {
              return renderBusinessCards(item);
            }
          }}
          onEndReached={() => {}}
          onEndReachedThreshold={0.01}
          initialNumToRender={20}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={loading}
              onRefresh={() => {
                fetchBusinesses(token);
              }}
            />
          }
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    places: state.business.places,
    loadedPlace: state.business.place,
    claims: state.business.claims,
    loading: state.business.loading['fetchBusiness'] || false,
    error: state.business.error['fetchBusiness'] || '',
    updateHideLoading: state.business.loading['update-place-hide'] || false,
    updateHideError: state.business.error['update-place-hide'] || '',
    updateHideStatus:
      state.business.businessUpdateStatus['update-place-hide'] || false,
    placeLoading: state.business.loading['getPlace'] || false,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchBusinesses,
      updatePlace,
      resetBusinessUpdateStatus,
      getUserPlace,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BusinessManage);
