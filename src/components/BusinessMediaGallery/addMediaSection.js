import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import {
  Button,
  Surface,
  TextInput,
  Switch,
  Portal,
  Dialog,
  HelperText,
} from 'react-native-paper';
import styles from '../../styles/mediaGallery.style';
import theme from '../../styles/theme.style';
import LeftArrow from '../../assets/img/left_arrow_white.svg';
import RightArrow from '../../assets/img/right_arrow_white.svg';
import * as NavigationService from '../../navigators/NavigationService';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import {IMAGE_URL_PREFIX} from '../../../config';
import {
  savePlaceMedias,
  resetReportedPostFlag,
  getMediaPost,
  updatePlaceMedia,
  deletePlaceMedia,
} from '../../../redux/places/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import CustomAlert from '../custom/customAlert';
import {DragSortableView} from 'react-native-drag-sort';
import DraggableList from './draggableList';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const parentWidth = screenWidth - 50;
const childrenWidth = 48;
const childrenHeight = 48;
const marginChildrenTop = 7;
const marginChildrenBottom = 0;
const marginChildrenLeft = 0;
const marginChildrenRight = 7;
const deleteHeight = 60;

const AddMediaSection = ({
  savePlaceMedias,
  resetReportedPostFlag,
  mode,
  place,
  token,
  isMediaSaved,
  saveMediaLoading,
  saveMediaError,
  getMediaPost,
  postId,
  mediaPost,
  updatePlaceMedia,
  isMediaUpdated,
  updateMediaLoading,
  updateMediaError,
  deletePlaceMedia,
  deletePostLoading,
  deletePostError,
  isMediaDeleted,
}) => {
  const [caption, setCaption] = useState('');
  const [uploadImages, setUploadImages] = useState([]);
  const [savedImages, setSavedImages] = useState([]);
  const [selectedMedia, setSelectMedia] = useState(null);
  const [unpublished, setUnpublished] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [postError, setPostError] = useState('');
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [isEnterEdit, setIsEnterEdit] = useState(false);
  const [draggableList, setDraggableList] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(0);

  useEffect(() => {
    if (isMediaSaved || isMediaUpdated) {
      resetReportedPostFlag();
      NavigationService.navigate('BusinessUploadMedia');
    }
  }, [isMediaSaved, isMediaUpdated]);

  useEffect(() => {
    if (isMediaDeleted) {
      NavigationService.navigate('BusinessUploadMedia');
    }
  }, [isMediaDeleted]);

  useEffect(() => {
    if (mode === 'update' && postId) {
      getMediaPost(postId, token);
    }
  }, [postId, mode]);

  useEffect(() => {
    if (mode === 'update' && mediaPost) {
      setCaption(mediaPost.description);
      setUnpublished(mediaPost.status === 0 ? true : false);
      setSavedImages(mediaPost.attached_media);
      setSelectMedia(
        mediaPost &&
          mediaPost.attached_media &&
          mediaPost.attached_media.length > 0
          ? mediaPost.attached_media[0]
          : null,
      );
    }
  }, [mediaPost]);

  useEffect(() => {
    if (
      (savedImages && savedImages.length) ||
      (uploadImages && uploadImages.length)
    ) {
      setDraggableList([...savedImages, ...uploadImages]);
    }
  }, [uploadImages, savedImages]);

  const handleCaptionChange = (value) => {
    setCaption(value);
  };

  const handleChoosePhoto = () => {
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
        // if (progressPercentage > 0) {
        //   setUploadProgressParam(0);
        // }
        let tempImageError = '';
        if (response.uri) {
          //   if (response.fileSize > MaxImageSize) {
          //     tempImageError = 'Image size must be lower then 512Kb';
          //   }
          const typeArr = response.type.split('/');
          //   if (!acceptedFiles.includes(typeArr[1])) {
          //     tempImageError = `Supported formats are ${acceptedFiles.toString()}`;
          //   }
          if (!tempImageError) {
            const position = savedImages.length + uploadImages.length;
            setUploadImages([
              ...uploadImages,
              {...response, position: position + 1},
            ]);
            setSelectMedia({...response, position: position + 1});
          } else {
            setUploadImages([...uploadImages]);
          }
          // setImageError(tempImageError);
        }
      }
    });
  };
  const getImageObj = (image, index) => {
    let uri = '';
    if (Platform.OS === 'android') {
      uri = image.uri;
    } else {
      uri = image.uri.replace('file://', '');
    }
    return {
      uri: uri,
      type: image.type,
      name:
        encodeURIComponent(place.place_name.replace(/\s/g, '-')) +
        '-media-' +
        index +
        '.' +
        uri.split('.').pop(),
      position: image.position,
    };
  };

  const handleSelectMedia = (image) => {
    setSelectMedia(image);
  };

  // const handleRemoveImage = (type, image) => {
  //   const tempImage =
  //     type === 'saved-image' ? [...savedImages] : [...uploadImages];
  //   if (tempImage.includes(image)) {
  //     tempImage.splice(tempImage.indexOf(image), 1);
  //   }
  //   if (type === 'saved-image') {
  //     setSavedImages([...tempImage]);
  //   } else {
  //     setUploadImages([...tempImage]);
  //   }
  //   setSelectMedia(null);
  // };

  const handleSubmit = (status) => {
    if (caption === '') {
      setPostError('Caption is required.');
    } else if (uploadImages.length === 0) {
      setPostError('Please select atleast 1 media.');
    } else {
      const payload = {
        place_id: place.id,
        status,
        title: `${place.place_name} -   ${new Date().getTime()}`,
        privacy: 0,
        description: caption,
        media: uploadImages.map((image, index) => getImageObj(image, index)),
        publish_date: moment().format('YYYY-MM-DD hh:mm:ss'),
      };
      savePlaceMedias(payload, token);
    }
  };

  const handleUpdate = () => {
    const payload = {
      id: mediaPost.id,
      place_id: place.id,
      status: unpublished ? 0 : 2,
      title: `${place.place_name} -   ${new Date().getTime()}`,
      privacy: 0,
      description: caption,
      media: uploadImages.map((image, index) => getImageObj(image, index)),
      publish_date: moment().format('YYYY-MM-DD hh:mm:ss'),
      // position: savedImages ? savedImages.length : 0,
    };
    if (uploadImages.length === 0) {
      delete payload.media;
    }
    updatePlaceMedia(payload, token);
  };

  const handleSwitchChange = () => {
    setUnpublished(!unpublished);
  };

  const handlePostDelete = () => {
    deletePlaceMedia(postId, token);
  };

  const handleDeleteModalClose = () => {
    setDeleteModal(false);
  };

  const handleLeftArrowClick = () => {
    if (selectedMedia.position > 1) {
      const savedImage = savedImages.find(
        (item) => item.position === selectedMedia.position - 1,
      );
      const uploadImage = uploadImages.find(
        (item) => item.position === selectedMedia.position - 1,
      );
      setSelectMedia(savedImage || uploadImage);
    }
  };

  const handleRightArrowClick = () => {
    if (selectedMedia.position < uploadImages.length + savedImages.length) {
      const savedImage = savedImages.find(
        (item) => item.position === selectedMedia.position + 1,
      );
      const uploadImage = uploadImages.find(
        (item) => item.position === selectedMedia.position + 1,
      );
      setSelectMedia(savedImage || uploadImage);
    }
  };

  const renderItem = (image, index) => {
    const savedImage = savedImages.find((item) => item.id === image.id);
    const uploadImage = uploadImages.find(
      (item) => item.position === image.position,
    );
    if (savedImage) {
      return (
        <View
          style={[
            selectedMedia.id === image.id
              ? styles.selectedMediaImage
              : styles.mediaImage,
            {borderColor: '#0092dd', borderWidth: 1},
          ]}>
          <Image
            source={{
              uri: image.media_url
                ? `${IMAGE_URL_PREFIX}${image.media_url}`
                : `https://via.placeholder.com/728.png?text=post-media`,
            }}
            style={[styles.mediaImage]}
          />

          <Text
            style={{
              color: '#000',
              position: 'absolute',
            }}>
            {image.position}
          </Text>
        </View>
      );
    } else if (uploadImage) {
      return (
        <View>
          <Image
            source={{uri: getImageObj(image).uri}}
            style={
              // selectedMedia.position === image.position
              //   ? styles.selectedMediaImage
              //   :
              styles.mediaImage
            }
          />
          <Text style={{color: '#000'}}>{image.position}</Text>
        </View>
      );
    }
  };

  const handleMediaPosition = (startIndex, endIndex) => {
    console.log('*********', startIndex, endIndex);
    const list = draggableList.map((item) => {
      // if (item.position === startIndex + 1) {
      //   item.position = endIndex + 1;
      // }
      // if (item.position === endIndex + 1) {
      //   item.position = item.position + 1;
      // }
      return item;
    });
    if (deleteStatus === 2) {
      if (startIndex === endIndex) {
        const newData = [...draggableList];
        newData.splice(startIndex, 1);
        setDraggableList(newData);
        setDeleteStatus(0);
      } else {
        deleteIndex = endIndex;
        setDeleteStatus(0);
      }
    } else {
      setDeleteStatus(0);
    }
    setDraggableList([...list]);
  };

  const renderDeleteView = () => {
    if (deleteStatus === 1 || deleteStatus === 2) {
      return (
        <View style={styles.deleteContainer}>
          <Icon name="delete-outline" color="red" size={40} />
          <Text style={styles.deleteText}>Drag here to delete</Text>
        </View>
      );
    }
    return null;
  };

  const onDragging = (gestureState, left, top) => {
    console.log(
      '********del',
      gestureState.moveY + (StatusBar.currentHeight | 0) + deleteHeight,
      screenHeight,
    );
    // if (isBuffer) return;
    if (
      gestureState.moveY + (StatusBar.currentHeight | 0) + deleteHeight <=
      screenHeight
    ) {
      // isBuffer = true;
      setDeleteStatus(2);
    } else if (deleteStatus !== 1) {
      setDeleteStatus(1);
    }
  };

  return (
    <View>
      <GlobalOverlayLoading
        loading={saveMediaLoading || updateMediaLoading || deletePostLoading}
        textContent=""
      />
      <Surface
        style={[styles.imageContainer, {width: screenWidth, elevation: 1}]}>
        <ImageBackground
          source={{
            uri: selectedMedia
              ? selectedMedia.media_url
                ? `${IMAGE_URL_PREFIX}${selectedMedia.media_url}`
                : getImageObj(selectedMedia).uri
              : `https://via.placeholder.com/728.png?text=media`,
          }}
          style={styles.image}></ImageBackground>
      </Surface>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 20,
          marginLeft: 20,
        }}>
        <TouchableOpacity onPress={() => handleLeftArrowClick()}>
          <View style={styles.arrowButton}>
            <LeftArrow />
          </View>
        </TouchableOpacity>

        <ScrollView
          scrollEnabled={scrollEnabled}
          style={{flex: 1}}
          horizontal={true}>
          <View style={{flex: 1}}>
            <View>
              <DragSortableView
                isDragFreely={true}
                dataSource={draggableList}
                parentWidth={parentWidth}
                childrenWidth={childrenWidth}
                childrenHeight={childrenHeight}
                marginChildrenTop={marginChildrenTop}
                // marginChildrenBottom={marginChildrenBottom}
                marginChildrenLeft={marginChildrenLeft}
                marginChildrenRight={marginChildrenRight}
                onDragStart={(startIndex, endIndex) => {
                  if (isEnterEdit) {
                    setIsEnterEdit(true);
                    setScrollEnabled(false);
                  } else {
                    setScrollEnabled(false);
                  }
                  setDeleteStatus(1);
                }}
                onDragEnd={(startIndex, endIndex) => {
                  setScrollEnabled(true);
                  handleMediaPosition(startIndex, endIndex);
                }}
                onDragging={onDragging}
                onDataChange={(data, deleteIndex) => {
                  console.log('********del', deleteIndex);
                  if (deleteIndex != null) {
                    const deleteIndex = deleteIndex;
                    deleteIndex = null;
                    const newData = [...data];
                    newData.splice(deleteIndex, 1);
                    setDraggableList(data);
                  } else if (data.length != draggableList.length) {
                    setDraggableList(data);
                  }
                }}
                onClickItem={(data, item, index) => {
                  handleSelectMedia(item);
                }}
                keyExtractor={(item, index) => item.fileName} // FlatList作用一样，优化
                renderItem={(item, index) => {
                  return renderItem(item, index);
                }}
              />
              <View style={{alignItems: 'center', marginTop: 20}}>
                {renderDeleteView()}
              </View>
            </View>
          </View>
        </ScrollView>

        {/* <ScrollView horizontal={true}>
          {savedImages && savedImages.length > 0
            ? savedImages.map(image => {

                return (
                  <TouchableOpacity onPress={() => handleSelectMedia(image)}>
                    <View
                      style={
                        selectedMedia.id === image.id
                          ? styles.selectedMediaImage
                          : styles.mediaImage
                      }>
                      <Image
                        source={{
                          uri: image.media_url
                            ? `${IMAGE_URL_PREFIX}${image.media_url}`
                            : `https://via.placeholder.com/728.png?text=post-media`,
                        }}
                        style={styles.mediaImage}
                      />
                    </View>
                  </TouchableOpacity>
                );
              })
            : null}
          {uploadImages.length > 0 &&
            uploadImages.map(image => (
              <TouchableOpacity onPress={() => handleSelectMedia(image)}>
                <View>
                  <Image
                    source={{uri: getImageObj(image).uri}}
                    style={
                      selectedMedia.position === image.position
                        ? styles.selectedMediaImage
                        : styles.mediaImage
                    }
                  />
                </View>
              </TouchableOpacity>
            ))}

        </ScrollView> */}

        <TouchableOpacity
          onPress={() =>
            savedImages.length + uploadImages.length > 9
              ? null
              : handleChoosePhoto()
          }>
          <View style={styles.addImageContainer}>
            <Icon name="plus" color={theme.PRIMARY_COLOR} size={32} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleRightArrowClick()}>
          <View
            style={{
              alignItems: 'flex-end',
              marginRight: 20,
              flex: 1,
            }}>
            <View style={styles.arrowButton}>
              {/* <Icon name="chevron-right" color="#fff" size={32} /> */}
              <RightArrow
                style={{
                  transform: [
                    {rotate: '180deg'},
                  ] /* change the deg (degree of rotation) between 0deg, 360deg*/,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{marginLeft: 20, marginRight: 20}}>
        {saveMediaError ? <CustomAlert error={saveMediaError} /> : null}
        {updateMediaError ? <CustomAlert error={updateMediaError} /> : null}
        {deletePostError ? <CustomAlert error={deletePostError} /> : null}

        <Text style={styles.captionLabel}>CAPTION</Text>
        <TextInput
          name="caption"
          onChangeText={(value) => handleCaptionChange(value)}
          placeholder="Add a caption here..."
          value={caption}
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
        <HelperText
          type="error"
          visible={postError}
          style={styles.dobErrorText}>
          * {postError}
        </HelperText>
      </View>
      {mode === 'create' ? (
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
      ) : (
        <View style={{marginLeft: 20, marginTop: 20}}>
          <Text style={styles.captionLabel}>SETTINGS</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <Text style={styles.unpublishedText}>Unpublished</Text>

            <Switch
              value={unpublished}
              color={theme.PRIMARY_COLOR}
              onValueChange={() => handleSwitchChange()}
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
              onPress={() => setDeleteModal(true)}
              style={styles.addButton}
              labelStyle={[styles.addButtonLabel, {color: '#EF5E5E'}]}>
              Delete
            </Button>
          </View>
        </View>
      )}
      {/* <DraggableList data={savedImages} /> */}

      <Portal>
        <Dialog
          visible={deleteModal}
          onDismiss={handleDeleteModalClose}
          style={{padding: 16, borderRadius: 16}}>
          <Text style={styles.deleteHeading}>Delete this post</Text>
          <Text style={styles.deleteText}>
            This post will be permanently deleted from your media gallery
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 16,
              marginTop: 16,
            }}>
            <Button
              mode="contained"
              style={styles.deleteButton}
              labelStyle={styles.deleteButtonLabel}
              onPress={() => handlePostDelete()}>
              Delete
            </Button>
            <Button
              mode="contained"
              style={styles.cancelButton}
              labelStyle={styles.cancelButtonLabel}
              onPress={handleDeleteModalClose}>
              Cancel
            </Button>
          </View>
        </Dialog>
      </Portal>
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    token: state.user.token,
    place: state.business.place,
    isMediaSaved: state.places.isMediaSaved,
    isMediaUpdated: state.places.isMediaUpdated,
    saveMediaLoading: state.places.loading['saveMedia'] || false,
    saveMediaError: state.places.error['saveMedia'] || '',
    updateMediaLoading: state.places.loading['updateMedia'] || false,
    updateMediaError: state.places.error['updateMedia'] || '',
    mediaPost: state.places.mediaPost,
    isMediaDeleted: state.places.isMediaDeleted,
    deletePostLoading: state.places.loading['deletePost'] || false,
    deletePostError: state.places.error['deletePost'] || '',
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      savePlaceMedias,
      resetReportedPostFlag,
      getMediaPost,
      updatePlaceMedia,
      deletePlaceMedia,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddMediaSection);
