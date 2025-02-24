import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AirbnbRating} from 'react-native-ratings';
import {Surface} from 'react-native-paper';
import TopBar from '../components/PlaceDetails/TopBar';
import styles from '../styles/placeDetails.style';
import Header from '../components/Place/Header';
import {getPlace} from '../../redux/app/actions';
import MediaTab from '../components/PlaceDetails/mediaTab';
import InfoTab from '../components/PlaceDetails/infoTab';
import GlobalOverlayLoading from '../components/custom/globalOverlayLoading';
import {IMAGE_URL_PREFIX} from '../../config';
import {resetPlaceRatingSuccessFlag} from '../../redux/app/actions';
import PageLayout from '../layout/PageLayout';
import {numberFormatter} from '../../utils';
import OurServices from '../components/PlaceDetails/ourServices';
import LogoAndCoverHeader from '../components/Place/LogoAndCoverHeader';
import WhatsNew from '../components/Place/WhatsNew';

const screenWidth = Math.round(Dimensions.get('window').width);

const PlaceDetails = ({
  navigation,
  place,
  getPlace,
  placeLoading,
  resetPlaceRatingSuccessFlag,
  pagination,
  geoLocation,
}) => {
  const placeSlug = navigation.getParam('slug');

  useEffect(() => {
    getPlace({slug: placeSlug, ratings_page: 1, gallery_page: 1});
  }, []);

  useEffect(() => {
    if (navigation.state.routeName !== 'RateUs') {
      resetPlaceRatingSuccessFlag();
    }
  }, [navigation.state.routeName]);

  return place && place.slug === placeSlug ? (
    <View>
      <PageLayout>
        <GlobalOverlayLoading
          loading={placeLoading}
          textContent=""
          overlayColor="rgba(255, 255, 255, .9)"
        />
        <Header place={place} isAdmin={false} showPlaceInfo={true} />
        <View>
          <WhatsNew isAdmin={false} place={place} />
        </View>
        <View style={styles.placeDetailContent}>
          <InfoTab place={place} geoLocation={geoLocation} />
        </View>
      </PageLayout>
      {/* <OurServices /> */}
    </View>
  ) : (
    <GlobalOverlayLoading
      loading={placeLoading}
      textContent=""
      overlayColor="rgba(255, 255, 255, .9)"
    />
  );
};

const mapStateToProps = (state) => {
  return {
    place: state.app.place,
    placeLoading: state.app.loading,
    pagination: state.ratings.pagination,
    geoLocation: state.app.geoLocation,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPlace,
      resetPlaceRatingSuccessFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetails);
