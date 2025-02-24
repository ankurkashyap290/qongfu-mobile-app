import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  Button,
  Surface,
  TextInput,
  Switch,
  Portal,
  Dialog,
  HelperText,
} from 'react-native-paper';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/mediaGallery.style';
import theme from '../../styles/theme.style';
import LeftArrow from '../../assets/img/left_arrow_white.svg';
import RightArrow from '../../assets/img/right_arrow_white.svg';
import * as NavigationService from '../../navigators/NavigationService';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomAlert from '../custom/customAlert';
import {IMAGE_URL_PREFIX} from '../../../config';
import ImagePicker from 'react-native-image-picker';
import ImagesThumbView from './ImagesThumbView';
import MediaCard from '../Place/MediaCard';
import {
  savePlaceMedias,
  updatePlaceMedia,
  resetUpdatedStatusFlag,
} from '../../../redux/places/actions';
import {setParentScrollView} from '../../../redux/app/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import {sortMediaByPosition} from '../../../utils';
import DeletePost from '../Place/DeletePost';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const MediaPost = ({
  mode,
  mediaPost,
  place,
  savePlaceMedias,
  updatePlaceMedia,
  resetUpdatedStatusFlag,
  postCreateLoading,
  postCreateError,
  postUpdateLoading,
  postUpdateError,
  progressPercentage,
  token,
  postCreateStatus,
  postUpdateStatus,
  setParentScrollView,
}) => {
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(-1);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [loadedMedia, setLoadedMedia] = useState([]);
  const [postError, setPostError] = useState({});
  const [postCaption, setCaption] = useState('');
  const [deleteModal, toggleDeleteModal] = useState(false);
  const [publishedStatus, togglePublishStatus] = useState(false);
  const [deletedMedia, updateDeletedMedia] = useState([]);

  const isVideo = (mediaType) => {
    if (mediaType.indexOf('image/') < 0) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (mode === 'update') {
      const availableMedias = mediaPost.attached_media.map((media) => {
        return {
          id: media.id,
          uri: `${IMAGE_URL_PREFIX}${media.media_url}`,
          thumb_uri: `${IMAGE_URL_PREFIX}${media.media_thumb}`,
          position: media.position,
          type: media.media_type,
          isVideo: isVideo(media.media_type),
        };
      });
      setLoadedMedia(sortMediaByPosition(availableMedias));
      setCaption(mediaPost.description);
      togglePublishStatus(mediaPost.status === 2);
    } else {
      setSelectedMediaIndex(0);
    }
  }, []);

  useEffect(() => {
    if (loadedMedia.length) {
      let indexToSelect = loadedMedia.length - 1;
      if (
        mode === 'update' &&
        loadedMedia.length === mediaPost.attached_media.length
      ) {
        indexToSelect = 0;
      }
      setSelectedMediaIndex(indexToSelect);
    } else {
      setSelectedMediaIndex(-1);
    }
  }, [loadedMedia]);

  useEffect(() => {
    setSelectedMedia(loadedMedia[selectedMediaIndex] || null);
  }, [selectedMediaIndex]);

  useEffect(() => {
    if (postCreateStatus) {
      resetUpdatedStatusFlag('saveMedia');
      NavigationService.navigate('BusinessUploadMedia', {refresh: true});
    }
  }, [postCreateStatus]);

  useEffect(() => {
    if (postUpdateStatus) {
      resetUpdatedStatusFlag('updateMedia');
      NavigationService.navigate('BusinessUploadMedia', {refresh: true});
    }
  }, [postUpdateStatus]);

  const hasPrevMedia = () => {
    if (selectedMediaIndex > 0) {
      return true;
    } else {
      return false;
    }
  };

  const hasNextMedia = () => {
    if (selectedMediaIndex < loadedMedia.length - 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleSelectMedia = (mode) => {
    if (mode === 'prev' && hasPrevMedia()) {
      setSelectedMediaIndex(selectedMediaIndex - 1);
    } else if (mode === 'next' && hasNextMedia()) {
      setSelectedMediaIndex(selectedMediaIndex + 1);
    }
  };

  const handleAddMedia = () => {
    if (loadedMedia.length < 10) {
      handleChooseMedia();
    }
  };

  const handleChooseMedia = () => {
    const options = {
      title: 'Select Media',
      storageOptions: {
        skipBackup: true,
      },
      mediaType: 'mixed',
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        if (response.uri) {
          addLoadedMedia(response);
        }
      }
    });
  };

  const addLoadedMedia = (response) => {
    const newPosition = loadedMedia.length
      ? loadedMedia[loadedMedia.length - 1].position
      : 0;
    const newMedia = getImageObj(response, newPosition + 1);
    setLoadedMedia([...loadedMedia, {...newMedia}]);
    setPostError({...postError, media: false});
  };

  const handleMediaChange = (mode, position, position2) => {
    const foundedIndex = loadedMedia.findIndex(
      (media) => media.position === position,
    );
    if (mode === 'delete') {
      // include deleted media when it is already saved
      if (foundedIndex >= 0 && loadedMedia[foundedIndex].id) {
        updateDeletedMedia([...deletedMedia, loadedMedia[foundedIndex].id]);
      }
      setLoadedMedia(
        loadedMedia
          .filter((media) => media.position !== position)
          .map((media, index) => {
            return {...media, position: index + 1};
          }),
      );
    } else if (mode === 'position') {
      const newPositionedMedia = [...loadedMedia];
      const newFoundedIndex = loadedMedia.findIndex(
        (media) => media.position === position2,
      );
      if (foundedIndex >= 0) {
        newPositionedMedia[foundedIndex].position = position2;
      }
      if (newFoundedIndex >= 0) {
        newPositionedMedia[newFoundedIndex].position = position;
      }
      setSelectedMediaIndex(-1);
      setLoadedMedia(sortMediaByPosition(newPositionedMedia));
    }
  };

  const handleMediaClick = (item, index) => {
    setSelectedMediaIndex(index);
  };

  const getImageObj = (image, position) => {
    let uri = '';
    if (Platform.OS === 'android') {
      uri = image.uri;
    } else {
      uri = image.uri.replace('file://', '');
    }
    return {
      uri: uri,
      thumb_uri: uri,
      type: image.type,
      name:
        encodeURIComponent(place.place_name.replace(/\s/g, '-')) +
        '-media-' +
        position +
        '.' +
        uri.split('.').pop(),
      position: position,
      isVideo: isVideo(image.type),
    };
  };

  const isValidForm = () => {
    let isCaptionValid = true;
    let isMediaValid = true;
    if (postCaption === '') {
      isCaptionValid = false;
    }
    if (loadedMedia.length === 0) {
      isMediaValid = false;
    }
    setPostError({media: !isMediaValid, caption: !isCaptionValid});
    return isCaptionValid && isMediaValid;
  };

  const handleSubmit = (status) => {
    if (isValidForm()) {
      setPostError({});
      const payload = {
        place_id: place.id,
        status,
        title: `${place.place_name} -   ${+new Date()}`,
        privacy: 0,
        description: postCaption,
        media: loadedMedia.map((image) => {
          return {
            uri: image.uri,
            type: image.type,
            name: image.name,
            position: image.position,
          };
        }),
        publish_date: moment().utc().format('YYYY-MM-DD hh:mm:ss'),
      };
      savePlaceMedias(payload, token);
    }
  };

  const handleUpdate = () => {
    if (isValidForm()) {
      // grab all older ones for position change
      const olderMedia = loadedMedia.filter((media) =>
        media.id ? true : false,
      );
      // check position change
      const positionsChanged = [];
      olderMedia.map((media) => {
        const foundedMedia = mediaPost.attached_media.find(
          (orgMedia) => orgMedia.id === media.id,
        );
        if (foundedMedia) {
          if (media.position !== foundedMedia.position) {
            positionsChanged.push({
              media_id: media.id,
              position: media.position,
            });
          }
        }
        return media;
      });

      const payload = {
        place_id: place.id,
        status: publishedStatus ? 2 : 0,
        title: mediaPost.title,
        privacy: 0,
        description: postCaption,
        media: loadedMedia
          .filter((media) => (!media.id ? true : false))
          .map((image) => {
            return {
              uri: image.uri,
              type: image.type,
              name: image.name,
              position: image.position,
            };
          }),
        positionedMedia: positionsChanged,
        deletedMedia: [...deletedMedia],
      };
      if (publishedStatus) {
        payload.publish_date = moment().utc().format('YYYY-MM-DD hh:mm:ss');
      }

      updatePlaceMedia(mediaPost.id, payload, token);
    }
  };

  const renderFields = () => {
    return (
      <View style={{marginLeft: 20, marginRight: 20}}>
        {postError.media ? (
          <CustomAlert error="* Required at least one media" />
        ) : null}
        {postCreateError ? <CustomAlert error={postCreateError} /> : null}
        {postUpdateError ? <CustomAlert error={postUpdateError} /> : null}
        {/* {updateMediaError ? <CustomAlert error={updateMediaError} /> : null}
        {deletePostError ? <CustomAlert error={deletePostError} /> : null}  */}
        <Text style={styles.captionLabel}>CAPTION</Text>
        <TextInput
          name="caption"
          onChangeText={(value) => setCaption(value)}
          placeholder="Add a caption here..."
          value={postCaption}
          style={{height: 100}}
          multiline={true}
          numberOfLines={4}
          theme={{
            roundness: 8,
            colors: {
              primary: '#fff',
              underlineColor: '#fff',
            },
          }}
          style={{
            backgroundColor: '#fff',
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#DEDEDE',
          }}
        />
        <HelperText type="error" visible={postError.caption || false}>
          * Post description is required
        </HelperText>
      </View>
    );
  };
  const renderCreateButtons = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Button
          mode="contained"
          onPress={() => handleSubmit(2)}
          style={styles.postButton}
          labelStyle={styles.postButtonLabel}>
          Add & Post
        </Button>
        <Button
          mode="outlined"
          onPress={() => handleSubmit(0)}
          style={styles.addButton}
          labelStyle={styles.addButtonLabel}>
          Add Only
        </Button>
      </View>
    );
  };

  const getPublishedText = () => {
    return mediaPost.status === 2
      ? `Published - ${moment(mediaPost.publish_date).fromNow(true)} ago`
      : 'Publish on update';
  };
  const renderUpdateButtons = () => {
    return (
      <View
        style={{
          marginLeft: 20,
          marginTop: 20,
          marginRight: 20,
        }}>
        <Text style={styles.captionLabel}>SETTINGS</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Text style={styles.unpublishedText}>
            {publishedStatus ? getPublishedText() : 'Unpublished'}
          </Text>
          <Switch
            value={publishedStatus}
            color={theme.PRIMARY_COLOR}
            onValueChange={() => {
              togglePublishStatus(!publishedStatus);
            }}
            style={{marginRight: 20}}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 20}}>
          <Button
            mode="contained"
            onPress={() => handleUpdate()}
            style={styles.postButton}
            labelStyle={styles.postButtonLabel}>
            Update
          </Button>
          <Button
            mode="text"
            onPress={() => toggleDeleteModal(true)}
            style={styles.addButton}
            labelStyle={[styles.addButtonLabel, {color: '#EF5E5E'}]}>
            Delete
          </Button>
        </View>
        <DeletePost
          post={mediaPost}
          visible={deleteModal}
          toggleDeleteModal={(flag) => {
            toggleDeleteModal(flag);
            NavigationService.navigate('BusinessUploadMedia', {refresh: true});
          }}
        />
      </View>
    );
  };

  const getLoadingText = () => {
    return postCreateLoading || postUpdateLoading
      ? `${progressPercentage}%`
      : '';
  };

  return (
    <View>
      <GlobalOverlayLoading
        loading={postCreateLoading || postUpdateLoading}
        textContent={getLoadingText()}
      />
      <Surface
        style={[styles.imageContainer, {width: screenWidth, elevation: 1}]}>
        <MediaCard media={selectedMedia} imageStyle={styles.image} />
      </Surface>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            handleSelectMedia('prev');
          }}>
          <View
            style={[
              styles.arrowButton,
              hasPrevMedia() ? {backgroundColor: `${theme.PRIMARY_COLOR}`} : {},
            ]}>
            <LeftArrow />
          </View>
        </TouchableOpacity>
        <ImagesThumbView
          images={loadedMedia}
          onMediaChange={handleMediaChange}
          onMediaClick={handleMediaClick}
          selectedMedia={selectedMedia}
          setParentScroll={setParentScrollView}
        />
        <TouchableOpacity onPress={handleAddMedia}>
          <View style={styles.addImageContainer}>
            <McIcon name="plus" color={theme.PRIMARY_COLOR} size={32} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleSelectMedia('next');
          }}>
          <View
            style={[
              styles.arrowButton,
              hasNextMedia() ? {backgroundColor: `${theme.PRIMARY_COLOR}`} : {},
            ]}>
            <RightArrow
              style={{
                transform: [
                  {rotate: '180deg'},
                ] /* change the deg (degree of rotation) between 0deg, 360deg*/,
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
      {renderFields()}
      {mode === 'create' ? renderCreateButtons() : renderUpdateButtons()}
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    token: state.user.token,
    mediaPost: state.places.mediaPost,
    place: state.business.place,
    postCreateLoading: state.places.loading['saveMedia'] || false,
    postCreateError: state.places.error['saveMedia'] || false,
    postUpdateLoading: state.places.loading['updateMedia'] || false,
    postUpdateError: state.places.error['updateMedia'] || false,
    progressPercentage: state.business.progressPercentage || 0,
    postCreateStatus: state.places.updatedStatus['saveMedia'] || false,
    postUpdateStatus: state.places.updatedStatus['updateMedia'] || false,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      savePlaceMedias,
      updatePlaceMedia,
      resetUpdatedStatusFlag,
      setParentScrollView,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MediaPost);
