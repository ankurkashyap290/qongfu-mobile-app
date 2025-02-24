import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../styles/businessPlaceProfile.style';
import Header from '../components/Place/Header';
import {getUserPlace} from '../../redux/business/actions';
import GlobalOverlayLoading from '../components/custom/globalOverlayLoading';
import PageLayout from '../layout/PageLayout';
import AboutUs from '../components/Place/AboutUs';
import MoreInfo from '../components/PlaceDetails/moreInfo';
import Location from '../components/PlaceDetails/location';
import RatingsAndReviews from '../components/BusinessPlaceProfile/ratingAndReviews';
import * as NavigationService from '../navigators/NavigationService';
import LifestyleAndQongfus from '../components/PlaceDetails/lifestyleAndQongfuStyle2';
import WhatsNew from '../components/Place/WhatsNew';

const screenWidth = Math.round(Dimensions.get('window').width);

const BusinessPlaceProfile = ({
  navigation,
  place,
  getUserPlace,
  token,
  placeLoading,
  geoLocation,
  selectedBusiness,
}) => {
  const placeId = navigation.getParam('placeId');
  useEffect(() => {
    if (placeId) {
      getUserPlace({placeId, token, ratings_page: 1, gallery_page: 1});
    }
  }, []);

  useEffect(() => {
    if (selectedBusiness && navigation.state.routeName === 'BusinessHome') {
      getUserPlace({
        placeId: selectedBusiness.id,
        token,
        ratings_page: 1,
        gallery_page: 1,
      });
    }
  }, [selectedBusiness]);

  useEffect(() => {
    if (place && placeId !== place.id) {
      navigation.setParams({placeId: place.id});
    }
  }, [place]);

  const renderPlaceInfo = () => {
    return (
      <React.Fragment>
        <Header place={place} isAdmin={true} showPlaceInfo={true} />
        <View>
          <WhatsNew isAdmin={true} place={place} />
        </View>
        <View style={{padding: 20}}>
          <AboutUs isAdmin={false} place={place} />
        </View>
        <View style={{padding: 20}}>
          <LifestyleAndQongfus
            lifestyles={place.lifestyles ? place.lifestyles : []}
            qongfus={place.qongfus ? place.qongfus : []}
            qongfuMax={5}
          />
        </View>
        <View style={{padding: 20}}>
          <MoreInfo amenities={place.amenities || []} />
        </View>
        <View style={{padding: 20}}>
          <Location
            geoLocation={geoLocation}
            placeLocation={{
              lat: parseFloat(place.location_lat),
              lng: parseFloat(place.location_lng),
            }}
            zoom={14}
            address={place.address}
            location={place.location}
          />
        </View>
        <View style={{padding: 20}}>
          <RatingsAndReviews place={place} />
        </View>
      </React.Fragment>
    );
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={placeLoading} textContent="" />
      {place && place.id === placeId ? (
        renderPlaceInfo()
      ) : (
        <View style={{width: screenWidth}} />
      )}
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    place: state.business.place,
    token: state.user.token,
    placeLoading: state.business.loading['getPlace'] || false,
    geoLocation: state.app.geoLocation,
    selectedBusiness: state.business.selectedBusiness,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserPlace,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessPlaceProfile);
