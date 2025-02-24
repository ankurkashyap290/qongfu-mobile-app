import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Avatar, Button, HelperText} from 'react-native-paper';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import theme from '../styles/theme.style';
import TextField from '../components/custom/textField';
import styles from '../styles/rateUs.style';
import {
  savePlaceRating,
  resetPlaceRatingSuccessFlag,
} from '../../redux/app/actions';
import RatingStarBig from '../assets/img/ratings_score_big.svg';
import {IMAGE_URL_PREFIX} from '../../config';
import PageLayout from '../layout/PageLayout';
import CountDown from 'react-native-countdown-component';
import * as NavigationService from '../navigators/NavigationService';
import CustomAlert from '../components/custom/customAlert';

const countDownTime = 3;

const RateUs = (props) => {
  const [currentRating, setRating] = useState(0);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [review, setReview] = useState('');
  const [ratingError, setRatingError] = useState(false);

  const {
    token,
    isRatingSuccess,
    profile,
    data,
    savePlaceRating,
    reviewError,
    navigation,
    resetPlaceRatingSuccessFlag,
  } = props;

  const [pauseTimer, setPauseTimer] = useState(false);

  useEffect(() => {
    if (isRatingSuccess === false) {
      setPauseTimer(true);
      setAlreadySubmitted(false);
    } else if (isRatingSuccess) {
      setPauseTimer(false);
    }
  }, [isRatingSuccess]);

  useEffect(() => {
    if (token) {
      if (data && data.ratings.data) {
        const foundedReview = data.ratings.data.find(
          (rating) => parseInt(rating.user_id, 10) === parseInt(profile.id, 10),
        );
        if (foundedReview) {
          setAlreadySubmitted(true);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (reviewError === 'Review already exists') {
      setAlreadySubmitted(true);
    }
  }, [reviewError]);

  const handleSetRating = (value) => {
    setRating(value);
    setRatingError(false);
  };

  const handleSubmit = () => {
    if (currentRating === 0) {
      setRatingError(true);
    } else {
      savePlaceRating(
        {
          id: data.id,
          stars: currentRating,
          review: review === '' ? '--NO REVIEW--' : review,
        },
        token,
      );
    }
  };

  const handleReviewChange = (text) => {
    setReview(text);
  };

  const handleTimeCount = () => {
    if (navigation.state.routeName === 'RateUs') {
      resetPlaceRatingSuccessFlag();
      NavigationService.goBack();
    }
  };

  const imageUrl = data.place_logo_url
    ? `${IMAGE_URL_PREFIX}${data.place_logo_url}`
    : `https://via.placeholder.com/728.png?text=${data.place_name}`;

  return (
    <PageLayout>
      <View style={styles.rateContent}>
        <Text style={styles.rateTitle}>Rate Us!</Text>
        <View style={styles.avatarContainer}>
          <Avatar.Image size={80} source={{uri: imageUrl}} />
        </View>
        <Text style={styles.rateTitle}>{data.place_name}</Text>
        {alreadySubmitted ? (
          <View style={{marginTop: 70, marginBottom: 130}}>
            <Text style={styles.rateUsModalAlreadySubmit}>
              We have your rating and feedback for this place.
            </Text>
          </View>
        ) : isRatingSuccess ? (
          <View>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                marginTop: 20,
              }}>
              <RatingStarBig />
              <View
                style={{
                  position: 'absolute',
                }}>
                <Text style={{fontSize: 32, color: '#fff'}}>
                  {currentRating}
                </Text>
              </View>
            </View>
            <View style={{marginTop: 20, marginBottom: 60}}>
              <Text style={styles.successHeading}>Rating submitted!</Text>
              <Text style={styles.successMsg}>Thanks for your feedback!</Text>
            </View>
            <CountDown
              size={30}
              until={countDownTime}
              onFinish={() => handleTimeCount()}
              digitStyle={styles.counterDigitStyle}
              digitTxtStyle={styles.activeDigitStyle}
              timeLabelStyle={styles.labelTimeStyle}
              timeToShow={['S']}
              timeLabels={{s: 'Seconds'}}
              showSeparator
              running={!pauseTimer}
            />
          </View>
        ) : (
          <View>
            <View>
              <AirbnbRating
                type="star"
                ratingCount={5}
                startingValue={currentRating}
                imageSize={50}
                onFinishRating={handleSetRating}
                style={styles.ratingComponent}
                reviews={[]}
              />
              <HelperText
                type="error"
                visible={ratingError && currentRating === 0}
                style={{textAlign: 'center'}}>
                * Please select star ratings.
              </HelperText>
            </View>
            <Text style={styles.reviewHeading}>Give a Complement</Text>
            <View>
              <TextField
                mode="outlined"
                label="Write a review"
                placeholder="Please write your reviews"
                theme={{
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: theme.SECONDARY_COLOR,
                  },
                }}
                onChangeText={(text) => handleReviewChange(text)}
                style={styles.reviewTextBox}
                multiline={true}
                numberOfLines={4}
              />
            </View>
            {reviewError && !alreadySubmitted ? (
              <CustomAlert error={reviewError} />
            ) : null}

            <View style={styles.submitBtnContain}>
              <Button
                mode="contained"
                style={[
                  styles.submitBtn,
                  styles.submitBtnActive,
                  // currentRating !== 0
                  //   ? styles.submitBtnActive
                  //   : styles.submitBtnInactive,
                ]}
                labelStyle={styles.submitBtnLabel}
                // disabled={currentRating === 0}
                onPress={handleSubmit}>
                Submit
              </Button>
            </View>
          </View>
        )}

        <View style={styles.rateFooter}>
          <Text style={styles.footerDullText}>Your support to the </Text>
          <Text style={styles.footerActiveText}>Qongfu Community </Text>
          <Text style={styles.footerDullText}>is much appreciated! </Text>
        </View>
      </View>
    </PageLayout>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    data: state.app.place,
    token: state.user.token,
    isRatingSuccess: state.app.isRatingSuccess,
    profile: state.user.profile,
    reviewError: state.app.error['place-rating'] || null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      savePlaceRating,
      resetPlaceRatingSuccessFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(RateUs);
