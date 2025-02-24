import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import ActionSheet from 'react-native-actionsheet';
import {getBusinessPlaceRatings} from '../../../redux/business/actions';
import styles from '../../styles/businessPlaceProfile.style';
import theme from '../../styles/theme.style';

import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import ReviewCard from '../Place/ReviewCard';
import ReportDialog from '../Place/ReportDialog';
import {getViewportHeight} from '../../../utils/helper';

const options = [
  {
    label: 'All Reviews',
    value: 'all',
  },
  {
    label: 'Good Reviews (5 & 4)',
    value: 'good',
  },
  {
    label: 'Bad Reviews (3 and below)',
    value: 'bad',
  },
  {
    label: 'Reported Reviews',
    value: 'reported',
  },
  {
    label: 'Cancel',
    value: 'cancel',
  },
];

const BusinessRatingsAndReviews = ({
  place,
  token,
  profile,
  navigation,
  placeRatings,
  ratingsLoading,
  getBusinessPlaceRatings,
}) => {
  const runDone = navigation.getParam('runDone');
  const [actionSheetRef, setActionSheetRef] = useState(null);

  useEffect(() => {
    if (runDone) {
      actionSheetRef.show();
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  const getFilteredRecords = () => {
    if (selectedOption === 'reported') {
      return placeRatings.data.filter((item) => item.report !== null);
    } else if (selectedOption === 'all') {
      return placeRatings.data;
    } else if (selectedOption === 'good') {
      return placeRatings.data.filter((item) => item.stars >= 4);
    } else if (selectedOption === 'bad') {
      return placeRatings.data.filter((item) => item.stars <= 3);
    }
  };

  const [reportVisible, toggleReportModal] = useState(false);
  const [selectedRatingCard, setSelectedRatingCard] = useState(null);
  const [selectedOption, setSelectedOption] = useState('all');

  const handleReportPost = (value) => {
    setSelectedRatingCard(value);
    toggleReportModal(true);
  };

  const renderLeftActions = (item) => {
    return (
      <TouchableOpacity onPress={() => handleReportPost(item)}>
        <View
          style={[
            styles.swipeLeftActions,
            {
              backgroundColor: '#EF5E5E',
              width: 100,
            },
          ]}>
          <Text style={styles.swipeText}>REPORT</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRatingCard = (item) => {
    return <ReviewCard isAdmin={true} review={item} />;
  };

  const renderOptions = () => {
    return options.map((item) => item.label);
  };

  const handleOptionSelection = (index) => {
    const foundIndex = options[index];
    setSelectedOption(foundIndex.value);
  };

  const handleLoadMoreList = () => {
    if (placeRatings.next_page_url) {
      getBusinessPlaceRatings({
        placeId: place.id,
        token,
        ratings_page: placeRatings.current_page + 1,
      });
    }
  };

  const handleRefreshList = () => {
    getBusinessPlaceRatings({
      placeId: place.id,
      ratings_page: 1,
      token: token,
      refresh: true,
    });
  };

  const isAlreadyReported = (item) => {
    if (item.report !== null) {
      if (item.report.user_id === profile.id) {
        return true;
      }
    }
    return false;
  };

  return (
    <View
      style={{
        backgroundColor: '#f8fcff',
        minHeight: getViewportHeight(true),
        paddingBottom: 80,
      }}>
      <GlobalOverlayLoading loading={ratingsLoading} textContent="" />
      <View style={{margin: 12}}>
        <FlatList
          data={getFilteredRecords()}
          renderItem={({item, index}) => {
            if (isAlreadyReported(item)) {
              return renderRatingCard(item);
            } else {
              return (
                <Swipeable renderLeftActions={() => renderLeftActions(item)}>
                  {renderRatingCard(item)}
                </Swipeable>
              );
            }
          }}
          onEndReached={() => handleLoadMoreList()}
          onEndReachedThreshold={0.01}
          initialNumToRender={20}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={ratingsLoading}
              onRefresh={handleRefreshList}
            />
          }
        />
      </View>

      <ReportDialog
        data={selectedRatingCard}
        type="review"
        visible={reportVisible}
        toggleReportModal={(flag) => {
          toggleReportModal(flag);
          getBusinessPlaceRatings({
            placeId: place.id,
            token,
            ratings_page: 1,
            refresh: true,
          });
        }}
      />
      <ActionSheet
        ref={(aSheet) => {
          setActionSheetRef(aSheet);
        }}
        cancelButtonIndex={4}
        styles={{
          titleText: {
            fontSize: 14,
            color: theme.PRIMARY_COLOR,
            textTransform: 'capitalize',
            lineHeight: 24,
            fontFamily: 'Roboto',
          },
          cancelButtonBox: {
            height: 50,
            marginTop: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          },
        }}
        title={'Select Filter'}
        options={renderOptions()}
        onPress={(index) => {
          handleOptionSelection(index);
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    place: state.business.place,
    placeRatings: state.business.placeRatings,
    token: state.user.token,
    profile: state.user.profile,
    ratingsLoading: state.business.loading['place-ratings'] || false,
    ratingsError: state.business.error['place-ratings'] || '',
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBusinessPlaceRatings,
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessRatingsAndReviews);
