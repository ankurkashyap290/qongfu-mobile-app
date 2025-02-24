import React, {useEffect, useState} from 'react';
import Video from 'react-native-video';
import {Image} from 'react-native';
import {IMAGE_URL_PREFIX} from '../../../config';

const MediaCard = ({media, imageStyle}) => {
  const [localMedia, setLocalMedia] = useState(null);
  useEffect(() => {
    if (media) {
      if (!media.uri) {
        setLocalMedia({
          uri: media.media_url
            ? `${IMAGE_URL_PREFIX}${media.media_url}`
            : `https://via.placeholder.com/728.png?text=post-media`,
          isVideo: media.media_type.indexOf('image/') < 0,
        });
      } else {
        setLocalMedia(media);
      }
    } else {
      setLocalMedia({
        uri: 'https://via.placeholder.com/728.png?text=empty media',
        isVideo: false,
      });
    }
  }, [media]);
  if (localMedia) {
    if (!localMedia.isVideo) {
      return (
        <Image
          style={imageStyle}
          source={{
            uri: localMedia.uri,
          }}
        />
      );
    } else {
      return (
        <Video
          source={{
            uri: localMedia.uri,
          }} // Can be a URL or a local file.
          // ref={ref => {
          //   this.player = ref;
          // }} // Store reference
          // onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={() => {
            console.log('Error Loading Video');
          }} // Callback when video cannot be loaded
          style={imageStyle}
          controls={true}
        />
      );
    }
  } else {
    return null;
  }
};
export default MediaCard;
