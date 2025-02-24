import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Platform} from 'react-native';
import {Button, Avatar} from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/businessSetup.style';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import ShopIcon from '../../assets/img/shop__1_.svg';
import {MaxImageSize, acceptedFiles} from '../../../config';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import CustomAlert from '../custom/customAlert';

const LogoSelectionStep3 = ({
  updateLogoError,
  updateLogoLoading,
  businessUpdateStatus,
  updatePlace,
  resetBusinessUpdateStatus,
  token,
  navigation,
}) => {
  const country = navigation.getParam('country');
  const businessName = navigation.getParam('businessName');
  const [photo, setPhoto] = useState(null);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (businessUpdateStatus) {
      resetBusinessUpdateStatus('update-place-logo');
      NavigationService.navigate('BusinessSetupStep4');
    }
  }, [businessUpdateStatus]);

  const handleChoosePhoto = () => {
    const options = {
      quality: 1.0,
      maxWidth: 300,
      maxHeight: 300,
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
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
      uri = photo.uri;
    } else {
      uri = photo.uri.replace('file://', '');
    }
    return {
      uri: uri,
      type: photo.type,
      name:
        encodeURIComponent(businessName.replace(/\s/g, '-')) +
        '-logo.' +
        uri.split('.').pop(),
    };
  };

  const handleNextPress = () => {
    // updatePlace(
    //   {
    //     id: newlyCreatedPlace.id,
    //     place_name: newlyCreatedPlace.place_name,
    //     logo: getImageObj(),
    //   },
    //   token,
    //   'logo',
    // );
    NavigationService.navigate('BusinessSetupStep4', {
      country,
      businessName,
      logo: getImageObj(),
      mode: 'create',
    });
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={updateLogoLoading} textContent="" />
      {updateLogoError || imageError ? (
        <View style={{marginLeft: 30, marginRight: 30}}>
          <CustomAlert error={updateLogoError ? updateLogoError : imageError} />
        </View>
      ) : null}
      <View
        style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.setupHeadings}>Add a logo to your Business</Text>
        <TouchableOpacity onPress={() => handleChoosePhoto()}>
          {photo ? (
            <Avatar.Image
              size={160}
              source={{uri: getImageObj().uri}}
              style={{marginTop: 30, marginBottom: 30}}
            />
          ) : (
            <View style={styles.shopIconContainer}>
              <ShopIcon />
            </View>
          )}
        </TouchableOpacity>
        <Text style={styles.addImageText}>Add an image</Text>

        <Text style={styles.setupSubHeadings}>
          Adding a logo to your business account{'\n'} helps Qongfu members
          identify you.
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
        }}>
        <Button
          mode="contained"
          onPress={handleNextPress}
          style={styles.nextButton}
          disabled={!(photo && !imageError) ? true : false}
          labelStyle={styles.nextButtonLabel}>
          Next
        </Button>
        <Button
          mode="text"
          onPress={() => {
            NavigationService.navigate('BusinessManage', {reset: true});
          }}
          style={styles.exitButton}
          labelStyle={styles.exitButtonLabel}>
          Exit
        </Button>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    token: state.user.token,
    profile: state.user.profile,
    updateLogoLoading: state.business.loading['update-place-logo'] || false,
    updateLogoError: state.business.error['update-place-logo'] || '',
    businessUpdateStatus:
      state.business.businessUpdateStatus['update-place-logo'] || false,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({updatePlace, resetBusinessUpdateStatus}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(LogoSelectionStep3);
