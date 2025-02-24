import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/businessPlaceProfile.style';
import * as NavigationService from '../../navigators/NavigationService';
import {getBusinessPlaceRatings} from '../../../redux/business/actions';
import EditIcon from '../../assets/img/edit-gray.svg';
import {isBusinessAdmin} from '../../../utils';
import ReviewCard from '../Place/ReviewCard';

const RatingAndReviews = ({
  place,
  placeRatings,
  getBusinessPlaceRatings,
  token,
}) => {
  const handleLoadMoreList = () => {
    if (placeRatings.next_page_url) {
      getBusinessPlaceRatings({
        placeId: place.id,
        token,
        ratings_page: placeRatings.current_page + 1,
      });
    }
  };

  const renderLoadMoreList = () => {
    return placeRatings.data.map((item) => {
      return (
        <ReviewCard
          key={`b-place-review-card-${item.id}`}
          isAdmin={true}
          review={item}
        />
      );
    });
  };

  return placeRatings ? (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        {placeRatings.data.length > 0 ? (
          <View>
            <Text style={styles.placeProfileTitle}>
              Our Reviews{' '}
              <Text style={styles.reviewCountStyle2}>
                ({placeRatings.total})
              </Text>
            </Text>
          </View>
        ) : (
          <Text style={styles.placeProfileTitle}>No Reviews Yet</Text>
        )}
        {isBusinessAdmin ? (
          <TouchableOpacity
            onPress={() =>
              placeRatings.data.length > 0
                ? NavigationService.navigate('BusinessRatingsAndReviews')
                : NavigationService.navigate('BusinessRatings')
            }>
            <EditIcon />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={{marginTop: 16}}>
        {placeRatings.data.length ? renderLoadMoreList() : null}
        {placeRatings.next_page_url ? (
          <View style={{textAlign: 'center', marginBottom: 40}}>
            <Button
              mode="text"
              onPress={() => handleLoadMoreList()}
              labelStyle={styles.loadMoreLabel}>
              Load more
            </Button>
          </View>
        ) : null}
      </View>
    </View>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    place: state.business.place,
    placeRatings: state.business.placeRatings,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getBusinessPlaceRatings,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(RatingAndReviews);
