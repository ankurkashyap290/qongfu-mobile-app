import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';
import {Divider, Portal, Dialog, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../styles/myProfile.style';
import Header from '../components/Profile/Header';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../redux/user/actions';
import GlobalOverlayLoading from '../components/custom/globalOverlayLoading';
import MoreInfo from '../components/Profile/MoreInfo';
import LifestyleAndQongfus from '../components/LifestyleAndQongfus/LifestylesAndQongfus';
import {
  GenderList,
  MaxImageSize,
  acceptedFiles,
  IMAGE_URL_PREFIX,
} from '../../config';
import ImagePicker from 'react-native-image-picker';
import PageLayout from '../layout/PageLayout';

const screenWidth = Math.round(Dimensions.get('window').width);

const MyProfile = ({
  navigation,
  profile,
  userLoading,
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
  token,
  userDetailsUpdated,
}) => {
  const getMoreInfo = () => {
    const moreInfo = [
      {
        label: 'Lifestyle',
        value:
          profile.lifestyles.length > 0
            ? profile.lifestyles.map((item, index) => {
                if (index === profile.lifestyles.length - 1) {
                  return `${item.lifestyle}`;
                } else {
                  return `${item.lifestyle}, `;
                }
              })
            : null,
        icon: 'lifestyle',
      },
      {
        label: 'Birth Date',
        value: profile.date_of_birth ? profile.date_of_birth : null,
        icon: 'birthdate',
      },
      {
        label: 'Gender',
        value: GenderList[profile.gender] || null,
        icon: 'gender',
      },
      {
        label: 'Home Town',
        value: profile.hometown ? profile.hometown : null,
        icon: 'hometown',
      },
      {
        label: 'Nationality',
        value: profile.country ? profile.country.nationality : null,
        icon: 'nationality',
      },
      {
        label: 'Languages',
        value:
          profile.languages.length > 0
            ? profile.languages.map((item, index) => {
                if (index === profile.languages.length - 1) {
                  return `${item.language}`;
                } else {
                  return `${item.language}, `;
                }
              })
            : null,

        icon: 'languages',
      },
    ];

    return moreInfo.filter(info => info.value != null);
  };
  const handleUploadUpdate = payload => {
    updateUserDetails(payload, token, 'secondStep', 'my-profile-avatar-update');
  };

  const handleCoverCameraClick = () => {
    const options = {
      quality: 1.0,
      maxWidth: 500,
      maxHeight: 500,
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
            const payload = {
              cover: getImageObj(response),
              first_name: profile.first_name,
              last_name: profile.last_name,
            };
            handleUploadUpdate(payload);
          } else {
            Alert.alert('error', tempImageError);
          }
        }
      }
    });
  };

  const getImageObj = photo => {
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
        '-cover.' +
        uri.split('.').pop(),
    };
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('my-profile-avatar-update');
  };

  return profile ? (
    <PageLayout>
      <GlobalOverlayLoading loading={userLoading} textContent="" />
      <View style={[styles.imageContainer, {width: screenWidth}]}>
        <ImageBackground
          source={{
            uri: profile.cover_url
              ? `${IMAGE_URL_PREFIX}${profile.cover_url}`
              : `https://via.placeholder.com/728.png?text=${profile.display_name}`,
          }}
          style={styles.image}>
          <TouchableOpacity
            style={styles.cameraCoverIcon}
            onPress={() => handleCoverCameraClick()}>
            <View style={styles.cameraIcon}>
              <Icon name="camera" size={20} style={{color: '#bab7b7'}} />
            </View>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <Header
        profile={profile}
        navigation={navigation}
        onUploadAvatar={handleUploadUpdate}
      />
      <View style={styles.margin}>
        <Text style={styles.profileHeadings}>Bio</Text>
        {profile.bio ? (
          <Text style={styles.userBio}>{profile.bio}</Text>
        ) : (
          <Text style={styles.emptySection}>-SECTION EMPTY-</Text>
        )}
      </View>
      {profile.bio &&
      profile.lifestyles.length > 0 &&
      getMoreInfo().length > 0 ? (
        <Divider style={styles.divider} />
      ) : null}
      {getMoreInfo().length === 0 ? null : (
        <MoreInfo amenities={getMoreInfo()} />
      )}
      {profile.bio &&
      profile.lifestyles.length > 0 &&
      getMoreInfo().length > 0 ? (
        <Divider style={styles.divider} />
      ) : null}
      <View>
        <Text style={[styles.profileHeadings, {marginTop: 15}]}>
          Lifestyles & Qongfu
        </Text>
        {profile.lifestyles.length > 0 ? (
          <View style={{marginLeft: 30}}>
            <LifestyleAndQongfus
              lifestyles={profile.lifestyles}
              qongfus={profile.qongfus}
              qongfuMax={5}
            />
          </View>
        ) : (
          <Text style={styles.emptySection}>-SECTION EMPTY-</Text>
        )}
      </View>

      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>
            Uploaded successfully!
          </Text>
          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              style={styles.successButton}
              labelStyle={styles.successButtonLable}
              onPress={handleSuccessModalClose}>
              OK
            </Button>
          </View>
        </Dialog>
      </Portal>
    </PageLayout>
  ) : (
    <GlobalOverlayLoading loading={userLoading} textContent="" />
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    userLoading: state.user.loading,
    profile: state.user.profile,
    token: state.user.token,
    // progressPercentage: state.user.progressPercentage,
    userDetailsUpdated:
      state.user.userDetailsUpdated[
        'update-details-my-profile-avatar-update'
      ] || null,
    // error: state.user.error['update-details-my-profile-avatar-update'] || null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserDetails,
      resetUserDetailsUpdatedFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MyProfile);
