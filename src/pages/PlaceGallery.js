import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {Card} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../styles/mediaGallery.style';
import PlayVideoIcon from '../assets/img/play_video.svg';
import * as NavigationService from '../navigators/NavigationService';
import {getPlaceGalleries} from '../../redux/app/actions';
import PostCard from '../components/Place/PostCard';
import {getViewportHeight} from '../../utils/helper';

const PlaceGallery = ({
  place,
  placeGalleries,
  getPlaceGalleries,
  listLoading,
  profile,
}) => {
  const handleLoadMoreList = () => {
    if (placeGalleries.next_page_url) {
      getPlaceGalleries({
        slug: place.slug,
        gallery_page: placeGalleries.current_page + 1,
      });
    }
  };

  const handleRefreshList = () => {
    getPlaceGalleries({
      slug: place.slug,
      gallery_page: 1,
      refresh: true,
    });
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

  return (
    <View
      style={{
        backgroundColor: '#f8fcff',
        minHeight: getViewportHeight(true),
        paddingBottom: 80,
      }}>
      <View style={{marginTop: 10, marginBottom: 10}}>
        <FlatList
          data={placeGalleries.data}
          renderItem={({item}) => {
            return (
              <View
                style={{
                  marginLeft: 20,
                  marginRight: 20,
                  marginBottom: 10,
                  marginTop: 10,
                }}>
                <PostCard
                  post={item}
                  isAdmin={false}
                  refreshList={() => {
                    handleRefreshList();
                  }}
                  isAlreadyReported={getAlreadyReported(item)}
                />
              </View>
            );
          }}
          onEndReached={() => handleLoadMoreList()}
          onEndReachedThreshold={0.01}
          initialNumToRender={10}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={listLoading}
              onRefresh={handleRefreshList}
            />
          }
        />
      </View>
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    placeGalleries: state.app.placeGalleries,
    place: state.app.place,
    listLoading: state.app.loading['place-galleries'] || false,
    profile: state.user.profile,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({getPlaceGalleries}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PlaceGallery);
