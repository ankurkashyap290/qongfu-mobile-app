import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Share,
  Alert,
} from 'react-native';
import {Card, Portal, Dialog, Button} from 'react-native-paper';
import moment from 'moment';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/postCard.style';
import TextReadMore from '../custom/TextReadMore';
import ActionSheet from 'react-native-actionsheet';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import ReportPost from '../BusinessPlaceProfile/reportPost';
import MediaCard from './MediaCard';
import {sortMediaByPosition} from '../../../utils';
import DeletePost from './DeletePost';
import ReportDialog from './ReportDialog';

const screenWidth = Dimensions.get('window').width;

const postAdminActions = ['Edit', 'Share', 'Delete'];
const postNonAdminActions = ['Report'];

const MediaCarousal = ({data}) => {
  const SLIDER_WIDTH = screenWidth - 40 - 32;
  const ITEM_WIDTH = SLIDER_WIDTH;
  const [activeSlide, setActiveSlide] = useState(0);
  const [carouselRef, setCarousalRef] = useState(null);

  const getPagination = () => {
    return data.length > 1 ? (
      <Pagination
        carouselRef={carouselRef}
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        tappableDots={true}
        containerStyle={{
          marginTop: 25,
          paddingVertical: 2,
        }}
        dotContainerStyle={styles.dotContainer}
        inactiveDotElement={<View style={styles.inactiveSliderDot}></View>}
        dotElement={<View style={styles.sliderDot}></View>}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    ) : (
      <View style={[styles.dotContainer, {alignItems: 'center'}]}>
        <View
          style={[styles.sliderDot, {marginTop: 10, marginBottom: 10}]}></View>
      </View>
    );
  };

  const _renderItem = (item) => {
    return <MediaCard media={item.item} imageStyle={styles.mediaCardCover} />;
  };

  return (
    <View>
      {data.length > 0 ? (
        <View>
          <Carousel
            ref={(ref) => {
              setCarousalRef(carouselRef);
            }}
            layout={'default'}
            data={data}
            renderItem={_renderItem}
            sliderWidth={SLIDER_WIDTH}
            itemWidth={ITEM_WIDTH}
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          {getPagination()}
        </View>
      ) : (
        <Image
          source={{
            uri: `https://via.placeholder.com/728.png?text=post`,
          }}
          style={styles.mediaCardCover}></Image>
      )}
    </View>
  );
};

const PostCard = ({isAdmin, post, refreshList, isAlreadyReported}) => {
  const medias = post.attached_media || [];

  const [actionSheet, setActionSheet] = useState(null);
  const [deleteVisible, toggleDeleteModal] = useState(false);
  const [reportVisible, toggleReportModal] = useState(false);

  const renderDescription = () => {
    return post.description ? (
      <View>
        <TextReadMore
          textStyle={{...styles.mediaCarouselContent}}
          numberOfLines={4}
          contentLength={post.description.length}>
          <Text>{post.description}</Text>
        </TextReadMore>
      </View>
    ) : isAdmin ? (
      <View style={{flexDirection: 'column', justifyContent: 'flex-end'}}>
        <Text style={styles.emptySection}>- Add Your First Post -</Text>
      </View>
    ) : null;
  };

  const renderAdminActions = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          actionSheet.show();
        }}>
        <McIcon name="dots-horizontal" color="#B5B5B5" size={40} />
      </TouchableOpacity>
    );
  };

  const renderNonAdminActions = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (isAlreadyReported) {
            Alert.alert('Information', 'You have already reported this post');
          } else {
            handleReportAction();
          }
        }}>
        <McIcon
          name="flag-outline"
          color={isAlreadyReported ? '#FF0000' : '#919191'}
          size={24}
        />
      </TouchableOpacity>
    );
  };

  const renderActionsRow = () => {
    return medias.length ? (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {post.status === 2 ? (
          <Text style={styles.mediaCarouselTime}>
            {moment(post.publish_date).fromNow(true)} ago
          </Text>
        ) : (
          <Text style={styles.mediaCarouselUnpublishedTime}>Unpublished</Text>
        )}
        {isAdmin ? renderAdminActions() : renderNonAdminActions()}
      </View>
    ) : null;
  };

  const handleSelectPostAdminAction = (index) => {
    const action = postAdminActions[index] || '';
    switch (action) {
      case 'Edit':
        handleEditAction();
        break;
      case 'Share':
        handleShareAction();
        break;
      case 'Delete':
        handleDeleteAction();
        break;
      default:
        break;
    }
  };
  const handleSelectPostNonAdminAction = (index) => {
    const action = postNonAdminActions[index] || '';
    switch (action) {
      case 'Report':
        handleReportAction();
        break;
      default:
        break;
    }
  };

  const handleEditAction = () => {
    NavigationService.navigate('UpdateMediaPost', {postId: post.id});
  };

  const handleShareAction = async () => {
    try {
      const result = await Share.share({
        message: `https://staging.qongfu.com/`,
      });
      console.log('result share', result);
      // if (result.action === Share.sharedAction) {
      //   if (result.activityType) {
      //     console.log('share', result.activityType);
      //     // shared with activity type of result.activityType
      //   } else {
      //     // shared
      //   }
      // } else if (result.action === Share.dismissedAction) {
      //   // dismissed
      // }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleDeleteAction = () => {
    toggleDeleteModal(true);
  };

  const handleReportAction = () => {
    toggleReportModal(true);
  };

  return (
    <React.Fragment>
      <Card
        style={[
          styles.mediaCarouselCardCollapse,
          {width: screenWidth - 40, marginRight: 20},
        ]}>
        <Card.Content>
          <MediaCarousal data={sortMediaByPosition(medias)} />
          {renderDescription()}
          {renderActionsRow()}
        </Card.Content>
      </Card>
      <ActionSheet
        ref={(actionSheetRef) => {
          setActionSheet(actionSheetRef);
        }}
        title={'Select Action'}
        options={[
          ...(isAdmin ? postAdminActions : postNonAdminActions),
          'Cancel',
        ]}
        cancelButtonIndex={
          isAdmin ? postAdminActions.length : postNonAdminActions.length
        }
        // destructiveButtonIndex={}
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
        onPress={
          isAdmin ? handleSelectPostAdminAction : handleSelectPostNonAdminAction
        }
      />
      {isAdmin ? (
        <DeletePost
          post={post}
          visible={deleteVisible}
          toggleDeleteModal={(flag, refresh) => {
            toggleDeleteModal(flag);
            refresh && refreshList && refreshList();
          }}
        />
      ) : (
        <ReportDialog
          data={post}
          type="post"
          visible={reportVisible}
          toggleReportModal={(flag, refresh) => {
            toggleReportModal(flag);
            refresh && refreshList && refreshList();
          }}
        />
      )}
    </React.Fragment>
  );
};

export default PostCard;
