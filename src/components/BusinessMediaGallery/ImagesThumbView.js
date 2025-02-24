import React, {useState, useEffect, useRef} from 'react';
import {View, Image, ScrollView, Dimensions, Text} from 'react-native';

import {DragSortableView} from 'react-native-drag-sort';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Portal, Surface} from 'react-native-paper';
import {getViewportHeight} from '../../../utils/helper';
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const parentWidth = screenWidth - 64;
const childrenWidth = 64;
const childrenHeight = 48;
const deleteHeight = 60;
const childrenMargin = 16;

const ImagesThumbView = ({
  images,
  selectedMedia,
  onMediaChange,
  onMediaClick,
  setParentScroll,
}) => {
  const [localImages, setLocalImages] = useState([]);
  const [deleteStatus, setDeleteStatus] = useState(0);
  const [changeStatus, setChangeStatus] = useState(null);
  const sortViewRef = useRef(null);

  useEffect(() => {
    setLocalImages([...images]);
  }, [images]);

  //   useEffect(() => {
  //     if (localImages.length) {
  //       sortViewRef.current.reComplexDataSource(false, {
  //         dataSource: [...localImages],
  //         parentWidth: parentWidth,
  //       });
  //     }
  //   }, [localImages]);

  const _renderImage = (image) => {
    return (
      <View style={[{width: childrenWidth, height: childrenHeight}]}>
        <Image
          source={{
            uri: !image.isVideo
              ? image.thumb_uri
              : 'https://via.placeholder.com/50.png?text=video',
          }}
          style={[
            {
              height: childrenHeight,
              width: childrenWidth - childrenMargin,
              borderRadius: 8,
              marginLeft: childrenMargin,
            },
            selectedMedia && selectedMedia.uri === image.uri
              ? {borderWidth: 2, borderColor: '#0099DD'}
              : {borderWidth: 2, borderColor: '#B5B5B5'},
          ]}
        />
      </View>
    );
  };

  onDragStart = () => {
    setParentScroll(true);
    setDeleteStatus(1);
    setChangeStatus(null);
  };

  onDragEnd = (startIndex, endIndex) => {
    setParentScroll(false);
    if (deleteStatus === 2) {
      if (startIndex === endIndex) {
        setDeleteStatus(0);
        // setChangeStatus({mode: 'delete', deleteIndex: startIndex});
        onMediaChange('delete', localImages[startIndex].position);
      } else {
        setDeleteStatus(0);
        onMediaChange('delete', localImages[endIndex].position);
        // setChangeStatus({mode: 'delete', deleteIndex: endIndex});
      }
    } else {
      setDeleteStatus(0);
      if (startIndex !== endIndex) {
        // setChangeStatus({mode: 'position', from: startIndex, to: endIndex});
        onMediaChange(
          'position',
          localImages[startIndex].position,
          localImages[endIndex].position,
        );
      }
    }
  };
  onItemClick = (data, item, index) => {
    onMediaClick(item, index);
  };

  onDragging = (gestureState, left, top) => {
    if (gestureState.moveY + 30 + deleteHeight >= screenHeight) {
      setDeleteStatus(2);
    } else if (deleteStatus !== 1) {
      setDeleteStatus(1);
    }
  };

  renderDeleteView = () => {
    if (deleteStatus === 1 || deleteStatus === 2) {
      return (
        <View
          style={{
            width: screenWidth - 20,
            height: deleteHeight,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#F7F7F7',
            zIndex: 1,
            borderColor: '#FF0000',
            borderStyle: 'dashed',
            borderWidth: 1,
            borderRadius: 8,
            padding: 10,
            position: 'absolute',
            bottom: 30,
            left: 10,
          }}>
          <McIcon name="delete-outline" color="red" size={40} />
          <Text
            style={{
              color: '#FF0000',
              textTransform: 'uppercase',
              fontSize: 14,
              fontFamily: 'Roboto',
              lineHeight: 19,
              textAlign: 'center',
            }}>
            {deleteStatus === 2
              ? 'Release your hand to delete'
              : 'Drag here to delete'}
          </Text>
        </View>
      );
    }
    return null;
  };

  return (
    <React.Fragment>
      <ScrollView horizontal={true} scrollEnabled={deleteStatus <= 0}>
        <View
          style={{
            height: deleteStatus > 0 ? getViewportHeight(true) - 232 : 50,
            flexDirection: 'row',
          }}>
          <DragSortableView
            ref={sortViewRef}
            dataSource={localImages}
            parentWidth={parentWidth}
            isDragFreely={true}
            childrenWidth={childrenWidth}
            childrenHeight={childrenHeight}
            onDragging={onDragging}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClickItem={onItemClick}
            onDataChange={(data) => {
              // if (changeStatus) {
              //   if (changeStatus.mode === 'delete') {
              //     onMediaChange(changeStatus.mode, changeStatus.deleteIndex);
              //   } else {
              //     onMediaChange(
              //       changeStatus.mode,
              //       changeStatus.from + 1,
              //       changeStatus.to + 1,
              //     );
              //   }
              // }
            }}
            keyExtractor={(item, index) => item.id}
            renderItem={_renderImage}
          />
        </View>
      </ScrollView>
      <Portal>{renderDeleteView()}</Portal>
    </React.Fragment>
  );
};

export default ImagesThumbView;
