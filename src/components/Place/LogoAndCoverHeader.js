import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Surface} from 'react-native-paper';
import {AirbnbRating} from 'react-native-ratings';
import ImagePicker from 'react-native-image-picker';
import {numberFormatter} from '../../../utils';
import {IMAGE_URL_PREFIX, MaxImageSize, acceptedFiles} from '../../../config';
import styles from '../../styles/logoAndCoverHeader.style';
import FaIcon from 'react-native-vector-icons/FontAwesome5';

const screenWidth = Math.round(Dimensions.get('window').width);

const LogoAndCoverHeader = ({isAdmin, place, totalReviews, onCoverUpdate}) => {
  const [photo, setPhoto] = useState(null);
  const [imageError, setImageError] = useState('');
  const [isMediaSelected, toggleMediaSelection] = useState(false);

  useEffect(() => {
    if (isMediaSelected) {
      toggleMediaSelection(false);
      onCoverUpdate('cover', {
        id: place.id,
        place_name: place.place_name,
        cover: getImageObj(),
        location_lat: place.location_lat,
        location_lng: place.location_lng,
        country_id: place.country_id,
        location_data: place.location_data,
      });
    }
  }, [isMediaSelected]);

  const handleCoverCameraClick = () => {
    const options = {
      quality: 1.0,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        let tempImageError = '';
        if (response.uri) {
          if (response.fileSize > MaxImageSize) {
            tempImageError = 'Image size must be lower then 512Kb';
          }
          const typeArr = response.type.split('/');
          if (!acceptedFiles.includes(typeArr[1])) {
            tempImageError = `Supported formats are ${acceptedFiles.toString()}`;
          }
          if (!tempImageError) {
            setPhoto(response);
            toggleMediaSelection(true);
          } else {
            setPhoto(null);
          }
          setImageError(tempImageError);
        }
      }
    });
  };

  const getImageObj = () => {
    let uri = '';
    if (Platform.OS === 'android') {
      uri = photo ? photo.uri : '';
    } else {
      uri = photo.uri.replace('file://', '');
    }
    return {
      uri: uri,
      type: photo ? photo.type : '',
      name: encodeURIComponent(place.slug) + '-cover.' + uri.split('.').pop(),
    };
  };

  return (
    <Surface
      style={[styles.imageContainerStyle, {width: screenWidth, elevation: 1}]}>
      <ImageBackground
        source={{
          uri: place.place_cover_url
            ? `${IMAGE_URL_PREFIX}${place.place_cover_url}`
            : `https://via.placeholder.com/728.png?text=${place.place_name}`,
        }}
        style={styles.image}>
        {isAdmin ? (
          <TouchableOpacity
            style={styles.cameraCoverIcon}
            onPress={handleCoverCameraClick}>
            <View style={styles.cameraIcon}>
              <FaIcon name="camera" size={20} style={{color: '#fff'}} />
            </View>
          </TouchableOpacity>
        ) : null}
        <View style={styles.ratingContainer}>
          <AirbnbRating
            showRating={false}
            count={5}
            reviews={[]}
            defaultRating={place.stars || 0}
            isDisabled
            size={20}
            selectedColor="#0092dd"
            starContainerStyle={styles.starRatingContain}
            starStyle={{margin: 1}}
          />
          <Text style={styles.ratingsStyle2}>
            {numberFormatter(totalReviews)}
          </Text>
        </View>
      </ImageBackground>
    </Surface>
  );
};

export default LogoAndCoverHeader;
