import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Linking} from 'react-native';
import {
  Surface,
  Avatar,
  Dialog,
  Portal,
  Button,
  Divider,
} from 'react-native-paper';
import FaIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import PhoneIcon from '../../assets/img/phone_1.svg';
import StarIcon from '../../assets/img/star_1.svg';
import {IMAGE_URL_PREFIX, MaxImageSize, acceptedFiles} from '../../../config';
import styles from '../../styles/headerLogoRow.style';
import * as NavigationService from '../../navigators/NavigationService';

const HeaderLogoRow = ({isAdmin, place, onLogoUpdate}) => {
  const [callVisible, toggleCallVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [isMediaSelected, toggleMediaSelection] = useState(false);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (isMediaSelected) {
      toggleMediaSelection(false);
      onLogoUpdate('logo', {
        id: place.id,
        place_name: place.place_name,
        logo: getImageObj(),
        location_lat: place.location_lat,
        location_lng: place.location_lng,
        country_id: place.country_id,
        location_data: place.location_data,
      });
    }
  }, [isMediaSelected]);

  const handleChoosePhoto = () => {
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
      name: encodeURIComponent(place.slug) + '-logo.' + uri.split('.').pop(),
    };
  };

  const getImageUrl = () => {
    return place.place_logo_url
      ? `${IMAGE_URL_PREFIX}${place.place_logo_url}`
      : `https://via.placeholder.com/728.png?text=${place.place_name}`;
  };

  const handleMakeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`).catch((err) =>
      console.error('An error occurred', err),
    );
  };

  const navigateToScreen = () => {
    NavigationService.navigate('RateUs', {
      data: {...place},
    });
  };

  const renderUserActions = () => {
    return !isAdmin ? (
      <React.Fragment>
        <TouchableOpacity
          onPress={() => {
            toggleCallVisible(true);
          }}
          style={{
            width: 30,
            paddingLeft: 3,
            marginRight: 16,
            backgroundColor: '#fff',
          }}>
          <PhoneIcon style={styles.headerPhoneIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigateToScreen()}
          style={{width: 30, paddingLeft: 3, backgroundColor: '#fff'}}>
          <StarIcon style={styles.headerStartIcon} />
        </TouchableOpacity>
      </React.Fragment>
    ) : (
      <View style={{width: 60, height: 25}} />
    );
  };

  const renderNonAdminDialog = () => {
    return (
      <React.Fragment>
        <Dialog visible={callVisible} style={{borderRadius: 20}}>
          <Dialog.Title style={styles.callDialogTitle}>
            {place.contact_number}
          </Dialog.Title>
          <Divider />
          <View style={styles.callDialogAction}>
            <Button
              onPress={() => {
                toggleCallVisible(false);
              }}
              labelStyle={styles.callDialogBtnLabel}>
              Cancel
            </Button>
            <Button
              onPress={() => handleMakeCall(place.contact_number)}
              labelStyle={styles.callDialogBtnLabel}>
              Call
            </Button>
          </View>
        </Dialog>
      </React.Fragment>
    );
  };

  const renderAdminDialog = () => {
    return null;
  };

  const renderUploadLogo = () => {
    return isAdmin ? (
      <View style={[styles.cameraLogoContainer]}>
        <TouchableOpacity onPress={handleChoosePhoto}>
          <View style={styles.cameraIcon}>
            <FaIcon name="camera" size={16} style={{color: '#bab7b7'}} />
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  };

  return (
    <View style={[styles.headerLogoTab]}>
      <View style={styles.headerLogoContain}>
        <Surface
          style={[
            {
              elevation: 1,
              borderRadius: 80,
              borderColor: '#fff',
              borderWidth: 1,
            },
          ]}>
          <Avatar.Image
            size={120}
            source={{uri: getImageUrl()}}
            style={styles.headerLogo}
          />
        </Surface>
      </View>
      {renderUploadLogo()}
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: 22,
          marginTop: 16,
        }}>
        {renderUserActions()}
      </View>
      <Portal>{!isAdmin ? renderNonAdminDialog() : renderAdminDialog()}</Portal>
    </View>
  );
};

export default HeaderLogoRow;
