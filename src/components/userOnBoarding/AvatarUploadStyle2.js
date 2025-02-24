import React, {useState, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import {Avatar, Button, Card, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ImagePicker from 'react-native-image-picker';
import styles from '../../styles/userInfoStyle2.style';
import theme from '../../styles/theme.style';
import {MaxImageSize, acceptedFiles, IMAGE_URL_PREFIX} from '../../../config';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
  setUploadProgressParam,
} from '../../../redux/user/actions';
import * as NavigationService from '../../navigators/NavigationService';
import CustomAlert from '../custom/customAlert';
import PageLayout from '../../layout/PageLayout';

const AvatarUpload = ({
  progressPercentage,
  profile,
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
  token,
  error,
  loading,
  userDetailsUpdated,
  setUploadProgressParam,
}) => {
  const [photo, setPhoto] = useState(null);
  const [imageError, setImageError] = useState('');

  useEffect(() => {
    if (userDetailsUpdated) {
      setPhoto(null);
      resetUserDetailsUpdatedFlag('user-onboarding-avatar-update');
    }
  }, [userDetailsUpdated]);

  const handleChoosePhoto = () => {
    const options = {
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
        if (progressPercentage > 0) {
          setUploadProgressParam(0);
        }
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
        encodeURIComponent(
          profile.display_name ? profile.display_name : profile.first_name,
        ) +
        '.' +
        uri.split('.').pop(),
    };
  };

  const handleImageUpload = () => {
    if (!imageError && photo) {
      const payload = {
        avatar: getImageObj(),
        first_name: profile.first_name,
        last_name: profile.last_name,
      };

      updateUserDetails(
        payload,
        token,
        'secondStep',
        'user-onboarding-avatar-update',
      );
    } else if (!photo) {
      setImageError('Please select image');
    }
  };

  return (
    <PageLayout>
      <View style={styles.rootContainer}>
        <View style={{marginTop: 20}}>
          <Text style={styles.titleHeading}>
            Awesome! Now let’s{'\n'} make an Avatar
          </Text>

          <Text style={styles.subHeading}>
            It’s your latest picture or an image that{'\n'} represents you.
          </Text>
          {error || imageError ? (
            <View style={{marginLeft: 30, marginRight: 30}}>
              <CustomAlert error={imageError ? imageError : error} />
            </View>
          ) : null}
          <Card
            style={styles.imageContainer}
            onPress={() => handleChoosePhoto()}>
            <Surface
              style={{
                borderRadius: 100,
                borderColor: '#40404019',
                borderWidth: 4,
              }}>
              <Avatar.Image
                size={160}
                source={
                  photo
                    ? {uri: getImageObj().uri}
                    : profile.avatar_url
                    ? {uri: `${IMAGE_URL_PREFIX}${profile.avatar_url}`}
                    : require('../../assets/img/avatar-placeholder.png')
                }
              />
            </Surface>
          </Card>
          <View style={styles.imageUploadInfo}>
            <Text style={styles.avatarImage}>Avatar image</Text>
            <View style={styles.imageUploadSelectBtn}>
              <Text
                style={[styles.imageUploadSelectBtnLabel]}
                onPress={handleChoosePhoto}>
                {photo
                  ? photo.fileName
                  : profile && profile.avatar_url
                  ? 'Change Avatar'
                  : 'Select'}
              </Text>
              <Icon
                name="chevron-down"
                size={16}
                color={theme.PRIMARY_COLOR}
                style={{marginTop: 5}}
              />
            </View>
          </View>
        </View>
        <View style={styles.imageUploadBtnContainer}>
          {profile.avatar_url && !photo ? (
            <Button
              mode="outlined"
              style={styles.nextButton}
              labelStyle={styles.nextButtonLabel}
              onPress={() =>
                NavigationService.navigate('Step4', {
                  buttonText: 'Complete Signup',
                  pageName: 'onboarding',
                })
              }>
              Next
            </Button>
          ) : (
            <Button
              mode="outlined"
              style={photo ? styles.nextButton : styles.imageUploadBtnInActive}
              labelStyle={
                photo
                  ? styles.nextButtonLabel
                  : styles.imageUploadBtnLabelInActive
              }
              onPress={handleImageUpload}>
              Upload my avatar
            </Button>
          )}
          <Button
            mode="text"
            labelStyle={styles.cancelButtonLabel}
            onPress={() => NavigationService.navigate('SignIn')}>
            Cancel
          </Button>
        </View>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    user: state.user.user,
    token: state.user.token,
    profile: state.user.profile,
    progressPercentage: state.user.progressPercentage,
    userDetailsUpdated:
      state.user.userDetailsUpdated[
        'update-details-user-onboarding-avatar-update'
      ] || null,
    error:
      state.user.error['update-details-user-onboarding-avatar-update'] || null,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserDetails,
      resetUserDetailsUpdatedFlag,
      setUploadProgressParam,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AvatarUpload);
