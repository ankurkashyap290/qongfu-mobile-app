import React, {useRef, useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  Button,
  Avatar,
  Divider,
  Surface,
  Portal,
  Dialog,
  Badge,
  List,
} from 'react-native-paper';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  isUserLoggedIn,
  userHasPlaces,
  isBusinessAdmin,
  getUserRoleLabel,
} from '../../../utils';
import {
  IMAGE_URL_PREFIX,
  ROLE_TYPE_BUSINESS_OWNER,
  ROLE_TYPE_BUSINESS_AUTHORIZED,
} from '../../../config';
import * as NavigationService from '../../navigators/NavigationService';
import theme from '../../styles/theme.style';
import styles from '../../styles/accountDrawer.style';
import {toggleAccountDrawer} from '../../../redux/user/actions';
import BusinessSetupIntro from '../../components/SetupBusiness/introduction';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import SettingsIcon from '../../assets/img/settings.svg';
import ClaimedList from '../ManageBusiness/ClaimedList';
import HelpDesk from './HelpDesk';
import {getUserPlace} from '../../../redux/business/actions';

const AccountDrawer = ({
  profile,
  selectedBusiness,
  isAccountDrawerOpen,
  toggleAccountDrawer,
  getUserPlace,
  token,
}) => {
  const [businessSetupModalVisible, setBusinessSetupModal] = useState(false);
  const [isFirstTime, setProfileFirstTime] = useState(false);
  const [isHelpDeskVisible, setHelpDeskVisible] = useState(false);
  const refRBSheet = useRef(null);

  useEffect(() => {
    if (profile) {
      setProfileFirstTime(!userHasPlaces(profile));
    }
  }, [profile]);

  useEffect(() => {
    if (refRBSheet && refRBSheet.current) {
      if (isAccountDrawerOpen) {
        refRBSheet.current.open();
      } else {
        refRBSheet.current.close();
      }
    }
  }, [isAccountDrawerOpen]);

  useEffect(() => {
    if (selectedBusiness) {
      NavigationService.navigate('BusinessHomeTab');
    } else {
      NavigationService.navigate('HomeTab');
    }
  }, [selectedBusiness]);

  const handleHelDesk = () => {
    toggleAccountDrawer(false);
    setHelpDeskVisible(true);
  };
  const handleHelpModalClose = () => {
    setHelpDeskVisible(false);
  };

  const handleOnCloseSheet = () => {
    toggleAccountDrawer(false);
  };
  const handleBusinessSetupModalClose = () => {
    setBusinessSetupModal(false);
  };

  const handleManagePressed = (mode) => {
    toggleAccountDrawer(false);
    if (mode === 'place') {
      getUserPlace({
        placeId: selectedBusiness.id,
        token,
        ratings_page: 1,
        gallery_page: 1,
      });
      NavigationService.navigate('EditMenu', {}, 'BusinessManage');
    } else if (mode === 'user') {
      NavigationService.navigate('ViewProfile');
    }
  };

  const renderHeaderRow = () => {
    let mode = 'user';
    let title = profile.display_name;
    let desc = getUserRoleLabel(profile);
    let logoUrl =
      isUserLoggedIn(profile) && profile.avatar_url
        ? `${IMAGE_URL_PREFIX}${profile.avatar_url}`
        : `https://via.placeholder.com/728.png?text=${profile.display_name}`;
    if (selectedBusiness) {
      mode = 'place';
      title = selectedBusiness.place_name;
      desc = selectedBusiness.location;
      logoUrl = selectedBusiness.place_logo_url
        ? `${IMAGE_URL_PREFIX}${selectedBusiness.place_logo_url}`
        : `https://via.placeholder.com/728.png?text=${selectedBusiness.place_name}`;
    }
    return (
      <View style={[styles.avatarSection]}>
        <List.Item
          elevation={4}
          title={title}
          description={desc}
          left={(props) => (
            <View style={{justifyContent: 'center'}}>
              <Surface
                style={{
                  elevation: 1,
                  borderRadius: 30,
                  borderColor: '#fff',
                  borderWidth: 2,
                  height: 60,
                  width: 60,
                }}>
                <Avatar.Image {...props} size={56} source={{uri: logoUrl}} />
              </Surface>
            </View>
          )}
          titleStyle={{
            fontFamily: 'Roboto',
            lineHeight: 24,
            color: '#4f4f4f',
            fontSize: 14,
            marginLeft: 10,
          }}
          descriptionStyle={{
            fontFamily: 'Roboto',
            lineHeight: 24,
            color: '#858585',
            fontSize: 12,
            marginLeft: 10,
          }}
          right={(props) => (
            <TouchableOpacity
              {...props}
              style={{
                justifyContent: 'center',
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}
              onPress={() => {
                handleManagePressed(mode);
              }}>
              <SettingsIcon />
              <Text style={styles.manageButtonText}>Manage</Text>
            </TouchableOpacity>
          )}
          descriptionEllipsizeMode="tail"
          descriptionNumberOfLines={1}
        />
      </View>
    );
  };

  const renderBusinessSettings = () => {
    return (
      <View style={styles.drawerContainer}>
        {renderHeaderRow()}
        <Divider style={styles.divider} />
        {isBusinessAdmin(profile) ? (
          <React.Fragment>
            {!isFirstTime ? (
              <React.Fragment>
                <ClaimedList />
                <Divider style={styles.divider} />
              </React.Fragment>
            ) : null}
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'space-evenly',

                marginLeft: 10,
                marginRight: 10,

                marginBottom: 10,
              }}>
              <Button
                mode="outlined"
                onPress={() => {
                  handleOnCloseSheet();
                  if (isFirstTime) {
                    //meaning first time after approval
                    setBusinessSetupModal(true);
                  } else {
                    NavigationService.navigate('BusinessManage', {reset: true});
                  }
                }}
                style={styles.manageBusinessButton}
                labelStyle={styles.manageBusinessButtonLabel}>
                Manage Business
              </Button>
              {isFirstTime ? (
                <Badge
                  visible={true}
                  style={{
                    position: 'absolute',
                    backgroundColor: '#54B948',
                    right: 10,
                    bottom: 2,
                    color: '#fff',
                    fontFamily: 'Roboto',
                    fontSize: 12,
                  }}>
                  NEW
                </Badge>
              ) : null}
            </View>
          </React.Fragment>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 20,
          }}>
          <Button
            mode="outlined"
            onPress={() => {
              toggleAccountDrawer(false);
              NavigationService.navigate('Settings');
            }}
            style={styles.manageBusinessButton}
            width="42%"
            labelStyle={styles.manageBusinessButtonLabel}>
            Settings
          </Button>
          <Button
            mode="outlined"
            width="42%"
            onPress={handleHelDesk}
            style={styles.manageBusinessButton}
            labelStyle={styles.manageBusinessButtonLabel}>
            Help Desk
          </Button>
        </View>
      </View>
    );
  };
  return profile ? (
    <React.Fragment>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        animationType="slide"
        onClose={handleOnCloseSheet}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.24)',
          },
          draggableIcon: {
            backgroundColor: theme.SECONDARY_COLOR,
          },
          container: {
            height: isFirstTime ? 221 : '60%',
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
            borderWidth: 1,
            borderColor: '#ccc',
          },
        }}>
        {renderBusinessSettings()}
      </RBSheet>
      <Portal>
        <Dialog
          visible={businessSetupModalVisible}
          onDismiss={handleBusinessSetupModalClose}>
          <MCIcon
            name="close"
            color={theme.PRIMARY_COLOR}
            size={16}
            style={styles.closeIcon}
            onPress={() => handleBusinessSetupModalClose()}
          />
          <BusinessSetupIntro
            toggleModalClose={(flag) => {
              setBusinessSetupModal(flag);
            }}
          />
        </Dialog>
        <HelpDesk
          profile={profile}
          visible={isHelpDeskVisible}
          onClose={handleHelpModalClose}
        />
      </Portal>
    </React.Fragment>
  ) : (
    <View />
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    isAccountDrawerOpen: state.user.isAccountDrawerOpen,
    selectedBusiness: state.business.selectedBusiness,
    token: state.user.token,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      toggleAccountDrawer,
      getUserPlace,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AccountDrawer);
