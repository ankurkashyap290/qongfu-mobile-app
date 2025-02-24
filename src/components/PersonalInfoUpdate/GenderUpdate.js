import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List, Button, Portal, Dialog, Text} from 'react-native-paper';
import styles from '../../styles/personalInfo.style';
import theme from '../../styles/theme.style';
import {GenderList} from '../../../config';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import {notification} from '../../../utils';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';

const GenderUpdate = props => {
  const {
    profile,
    token,
    updateUserDetails,
    resetUserDetailsUpdatedFlag,
    userDetailsUpdated,
    error,
  } = props;

  const [selectedGender, setSelectedGender] = useState(profile.gender);
  const runDone = props.navigation.getParam('runDone');

  useEffect(() => {
    if (runDone) {
      handleSubmit();
      props.navigation.setParams({runDone: false});
    }
  }, [runDone]);
  const handleSelectGender = gender => {
    setSelectedGender(gender);
  };

  const handleSubmit = () => {
    if (selectedGender !== null) {
      const payload = {
        first_name: profile.first_name,
        last_name: profile.last_name,
        gender: selectedGender,
      };

      updateUserDetails({...payload}, token, '', 'personal-info-gender-update');
    } else {
      notification('Please select gender');
    }
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('personal-info-gender-update');
    NavigationService.goBack();
  };

  return (
    <PageLayout>
      {error ? (
        <View style={{marginLeft: 30, marginRight: 30}}>
          <CustomAlert error={error} />
        </View>
      ) : null}
      <React.Fragment>
        <View>
          {Object.keys(GenderList).map(item => (
            <List.Item
              title={GenderList[item]}
              right={props => (
                <List.Icon
                  {...props}
                  icon={selectedGender === item ? 'check' : ''}
                  color={theme.PRIMARY_COLOR}
                />
              )}
              onPress={() => handleSelectGender(item)}
              style={[styles.listItem, {marginTop: 10, marginBottom: 10}]}
            />
          ))}
        </View>
      </React.Fragment>
      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>Gender Updated!</Text>

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
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    token: state.user.token,
    userDetailsUpdated:
      state.user.userDetailsUpdated[
        'update-details-personal-info-gender-update'
      ] || null,
    error:
      state.user.error['update-details-personal-info-gender-update'] || null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updateUserDetails, resetUserDetailsUpdatedFlag},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(GenderUpdate);
