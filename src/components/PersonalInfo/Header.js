import React from 'react';
import {View, Text, Platform, Alert, TouchableOpacity} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {MaxImageSize, acceptedFiles, IMAGE_URL_PREFIX} from '../../../config';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Avatar, Surface} from 'react-native-paper';
import styles from '../../styles/personalInfo.style';

const Header = ({profile, onUploadAvatar, pageType}) => {
  const handleAvatarCameraClick = () => {
    const options = {
      quality: 1.0,
      maxWidth: 200,
      maxHeight: 200,
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
            const payload = {
              avatar: getImageObj(response),
              first_name: profile.first_name,
              last_name: profile.last_name,
            };
            onUploadAvatar(payload);
          } else {
            Alert.alert('error', tempImageError);
          }
        }
      }
    });
  };

  const getImageObj = (photo) => {
    let uri = '';
    if (Platform.OS === 'android') {
      uri = photo.uri;
    } else {
      uri = photo.uri.replace('file://', '');
    }
    return {
      uri: uri,
      type: photo.type,
      name:
        encodeURIComponent(
          profile.display_name ? profile.display_name : profile.first_name,
        ) +
        '-avatar.' +
        uri.split('.').pop(),
    };
  };

  const imageUrl = profile.avatar_url
    ? `${IMAGE_URL_PREFIX}${profile.avatar_url}`
    : `https://via.placeholder.com/728.png?text=${profile.first_name}`;

  return (
    <View style={[styles.headerContainer]}>
      <View
        style={[
          styles.headerAvatar,
          // pageType === 'personal-info' ? {top: -57} : {},
        ]}>
        <Surface
          style={[
            {
              elevation: 1,
              borderRadius: 80,
              borderColor: '#fff',
              borderWidth: 2,
            },
          ]}>
          <Avatar.Image
            size={120}
            source={{uri: imageUrl}}
            style={styles.headerLogo}
          />
        </Surface>
      </View>
      <View style={[styles.cameraIconContainer, {}]}>
        <TouchableOpacity onPress={() => handleAvatarCameraClick()}>
          <View style={styles.cameraIcon}>
            <Icon name="camera" size={16} style={{color: '#bab7b7'}} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
