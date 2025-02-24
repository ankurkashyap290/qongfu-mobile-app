import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/placeDetails.style';
import {getPlaceRatings} from '../../../redux/app/actions';
import ReviewCard from '../Place/ReviewCard';

const RatingAndReviews = ({place, placeRatings, getPlaceRatings}) => {
  const handleLoadMoreList = () => {
    if (placeRatings.next_page_url) {
      getPlaceRatings({
        slug: place.slug,
        ratings_page: placeRatings.current_page + 1,
      });
    }
  };

  const renderLoadMoreList = () => {
    return placeRatings.data.map((item) => {
      return (
        <ReviewCard
          key={`place-review-card${item.id}`}
          isAdmin={false}
          review={item}
        />
      );
    });
  };

  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={styles.aboutUsTitle}>
          Our Reviews{' '}
          <Text style={styles.reviewCountStyle2}>({placeRatings.total})</Text>
        </Text>
      </View>
      <View>
        <View>
          {placeRatings.data.length ? (
            renderLoadMoreList()
          ) : (
            <Text>No reviews yet!</Text>
          )}
          {placeRatings.data.length < placeRatings.total ? (
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
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    place: state.app.place,
    placeRatings: state.app.placeRatings,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getPlaceRatings,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(RatingAndReviews);
