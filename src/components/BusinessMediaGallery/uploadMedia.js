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
import styles from '../../styles/mediaGallery.style';
import PlayVideoIcon from '../../assets/img/play_video.svg';
import * as NavigationService from '../../navigators/NavigationService';
import {getBusinessPlaceGalleries} from '../../../redux/business/actions';
import PostCard from '../Place/PostCard';
import {getViewportHeight} from '../../../utils/helper';

const UploadMedia = ({
  placeGalleries,
  place,
  navigation,
  getBusinessPlaceGalleries,
  token,
  listLoading,
}) => {
  const runDone = navigation.getParam('runDone');
  const refreshList = navigation.getParam('refresh') || false;

  // useEffect(() => {
  //   console.log('place changed', place, gallery);
  // }, [place]);

  useEffect(() => {
    if (runDone) {
      NavigationService.navigate('CreateMediaPost');
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  useEffect(() => {
    if (refreshList) {
      handleRefreshList();
      navigation.setParams({refresh: false});
    }
  }, [refreshList]);

  const handleLoadMoreList = () => {
    if (placeGalleries.next_page_url) {
      getBusinessPlaceGalleries({
        placeId: place.id,
        gallery_page: placeGalleries.current_page + 1,
        token: token,
      });
    }
  };

  const handleRefreshList = () => {
    getBusinessPlaceGalleries({
      placeId: place.id,
      gallery_page: 1,
      token: token,
      refresh: true,
    });
  };

  return (
    <View
      style={{
        backgroundColor: '#f8fcff',
        minHeight: getViewportHeight(true),
        paddingBottom: 80,
      }}>
      {placeGalleries && placeGalleries.data.length === 0 ? (
        <View>
          <TouchableOpacity
            onPress={() => NavigationService.navigate('CreateMediaPost')}>
            <Card style={styles.uploadMediaCard}>
              <Card.Content
                style={{
                  flexDirection: 'row',
                  flex: 1,
                }}>
                <View style={{justifyContent: 'center'}}>
                  <View style={styles.videoIcon}>
                    <PlayVideoIcon />
                  </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                  <Text style={styles.uploadMediaText}>Upload Multimedia</Text>
                </View>
              </Card.Content>
            </Card>
          </TouchableOpacity>
          <View style={{marginTop: 150}}>
            <Text style={styles.addNewMediaText}>
              Add New Media to your{'\n'}
              {'\n'} Business here
            </Text>
          </View>
        </View>
      ) : (
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
                    isAdmin={true}
                    refreshList={() => {
                      handleRefreshList();
                    }}
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
      )}
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    placeGalleries: state.business.placeGalleries,
    place: state.business.place,
    listLoading: state.business.loading['place-galleries'] || false,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({getBusinessPlaceGalleries}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UploadMedia);
