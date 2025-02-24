import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {Button, Card} from 'react-native-paper';
import styles from '../../styles/mediaCarousal.style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PostCard from './PostCard';
import * as NavigationService from '../../navigators/NavigationService';
import {getUserPlace} from '../../../redux/business/actions';

const WhatsNew = ({isAdmin, place, token, getUserPlace, profile}) => {
  const [localPlace, setLocalPlace] = useState(null);
  useEffect(() => {
    if (place && place.id) {
      setLocalPlace({...place});
    } else {
      setLocalPlace(null);
    }
  }, [place]);

  const handleSeeAll = () => {
    if (isAdmin) {
      NavigationService.navigate('BusinessUploadMedia');
    } else {
      NavigationService.navigate('PlaceGallery');
    }
  };

  const getAlreadyReported = (post) => {
    if (isAdmin) return false;
    const foundUser = post.reports
      ? post.reports.find((item) => item.user_id === profile.id)
      : null;
    if (foundUser) {
      return true;
    }
    return false;
  };

  const posts = localPlace ? localPlace.galleries.data || [] : [];

  return isAdmin || posts.length ? (
    <View style={styles.mediaCarouselContainer}>
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.mediaCarouselTitle}>What's New</Text>
          <Button
            mode="text"
            onPress={() => handleSeeAll()}
            labelStyle={styles.seeAllButtonLabel}>
            See all
          </Button>
        </View>
      </View>
      {posts.length ? (
        <ScrollView
          horizontal={true}
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 2,
            paddingBottom: 10,
          }}>
          {posts.map((post) => (
            <PostCard
              post={post}
              isAdmin={isAdmin}
              refreshList={() => {
                getUserPlace({
                  placeId: localPlace.id,
                  token,
                  ratings_page: 1,
                  gallery_page: 1,
                });
              }}
              isAlreadyReported={getAlreadyReported(post)}
            />
          ))}
          <View style={{width: 20}}>
            <Text> </Text>
          </View>
        </ScrollView>
      ) : (
        <View
          style={{
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 2,
            paddingBottom: 10,
          }}>
          <PostCard post={{}} isAdmin={isAdmin} />
        </View>
      )}
    </View>
  ) : null;
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    profile: state.user.profile,
    token: state.user.token,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getUserPlace,
      //   setToken,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(WhatsNew);
