import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Portal, Dialog, Button} from 'react-native-paper';
import styles from '../../styles/personalInfo.style';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import {getViewportHeight} from '../../../utils/helper';
import SearchLocation from '../UserLocation/searchLocation';
import {notification} from '../../../utils';
import * as NavigationService from '../../navigators/NavigationService';

const HomeTownUpdate = props => {
  const {
    profile,
    token,
    updateUserDetails,
    resetUserDetailsUpdatedFlag,
    userDetailsUpdated,
    error,
    navigation,
  } = props;
  const [selectedHometown, setSelectedHometown] = useState({
    hometown: profile.hometown,
    hometown_lat: profile.hometown_lat,
    hometown_lng: profile.hometown_lng,
  });
  const runDone = navigation.getParam('runDone');

  useEffect(() => {
    if (runDone) {
      handleSubmit();
      navigation.setParams({runDone: false});
    }
  });
  useEffect(() => {
    if (error) {
      notification(error);
    }
  }, [error]);

  const handleSelectHometown = hometown => {
    setSelectedHometown(hometown);
  };

  const handleSubmit = () => {
    const payload = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      hometown: selectedHometown.hometown,
      hometown_lat: selectedHometown.hometown_lat,
      hometown_lng: selectedHometown.hometown_lng,
    };
    updateUserDetails({...payload}, token, '', 'personal-info-hometown-update');
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('personal-info-hometown-update');
    NavigationService.goBack();
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        minHeight: getViewportHeight(true),
      }}>
      <SearchLocation
        onSelect={handleSelectHometown}
        placeholder="Search Hometown"
      />
      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>Home Town Updated!</Text>

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
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    token: state.user.token,
    userDetailsUpdated:
      state.user.userDetailsUpdated[
        'update-details-personal-info-hometown-update'
      ] || null,
    error:
      state.user.error['update-details-personal-info-hometown-update'] || null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updateUserDetails, resetUserDetailsUpdatedFlag},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeTownUpdate);
