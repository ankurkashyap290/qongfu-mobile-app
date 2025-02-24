import React, {useState, useEffect} from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import {List, Divider, Switch, Card} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import ActionSheet from 'react-native-actionsheet';
import styles from '../../styles/businessPlaceProfile.style';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import CustomAlert from '../custom/customAlert';

const aSheetRefs = [];

const EditMenu = ({
  navigation,
  globalConfig,
  token,
  updatePlace,
  resetBusinessUpdateStatus,
  updateSettingsLoading,
  updateSettingsStatus,
  updateSettingsError,
  businessPlace,
}) => {
  const [localPlace, setLocalPlace] = useState();
  const [businessFormConfig, setFormConfig] = useState(null);
  const [navigationCardsData, setNavigationCardsData] = useState(null);

  useEffect(() => {
    setLocalPlace({...businessPlace});
  }, [businessPlace]);

  useEffect(() => {
    if (globalConfig) {
      setFormConfig(
        globalConfig.data.find((item) => item.name === 'business-edit-form'),
      );
    } else {
      setFormConfig(null);
    }
  }, [globalConfig]);

  useEffect(() => {
    if (businessFormConfig) {
      let formConfig = null;
      try {
        const tmpData = JSON.parse(businessFormConfig.configuration);
        formConfig = tmpData.data.find(
          (item) => item.type === 'navigation-cards',
        );
      } catch (ex) {
        console.log('Error while parsing configuration');
      }
      setNavigationCardsData(formConfig);
    } else {
      setNavigationCardsData(null);
    }
  }, [businessFormConfig]);

  const handleNavItemClick = (route) => {
    switch (route) {
      case 'media-gallery':
        NavigationService.navigate('BusinessUploadMedia');
        break;
      case 'account-info':
        NavigationService.navigate('BusinessAccountInfo', {
          place: {...localPlace},
        });
        break;
      case 'account-admin':
        NavigationService.navigate('BusinessAccountAdmin');
        break;
      case 'subscriptions':
        NavigationService.navigate('BusinessAccountSubscriptions');
        break;
      case 'profile-general-info':
        NavigationService.navigate('BusinessProfileInfo');
        break;
      case 'profile-more-info':
        NavigationService.navigate('BusinessAmentitiesUpdate');
        break;
      case 'profile-location':
        NavigationService.navigate('BusinessLocationUpdate', {
          place: localPlace,
          mode: 'update',
        });
        break;
      case 'profile-business-hours':
        NavigationService.navigate('BusinessHours');
        break;
      case 'profile-lifestyles-qongfus':
        NavigationService.navigate('BusinessLifestylesAndQongfuUpdate');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (updateSettingsStatus) {
      // setLocalPlace({...businessPlace});
      resetBusinessUpdateStatus('update-place-settings');
    }
  }, [updateSettingsStatus]);

  const handleUpdatePlaceSettings = (fieldName, fieldValue) => {
    const payload = {
      id: localPlace.id,
      place_name: localPlace.place_name,
      location_lat: localPlace.location_lat,
      location_lng: localPlace.location_lng,
      country_id: localPlace.country_id,
      location_data: localPlace.location_data,
      settings: {},
    };
    // update settings field here
    payload.settings[fieldName] = fieldValue;
    updatePlace(payload, token, 'settings');
  };

  const getSettings = () => {
    if (localPlace && localPlace.settings && localPlace.settings.length) {
      return localPlace.settings[0].general_settings;
    }
    return {};
  };

  const getSettingsItemValue = (item) => {
    const settings = getSettings();
    let flagValue = false;
    let fieldName = '';
    switch (item.route) {
      case 'settings-calls':
        flagValue = settings.calls_enabled || false;
        fieldName = 'calls_enabled';
        break;
      case 'settings-chat':
        flagValue = settings.messaging_enabled || false;
        fieldName = 'messaging_enabled';
        break;
      case 'settings-hide-place':
        flagValue = settings.show_profile || false;
        fieldName = 'show_profile';
        break;
      case 'settings-mute-notification':
        flagValue = settings.mute_notifications_for || 0;
        fieldName = 'mute_notifications_for';
        break;
      default:
        flagValue = false;
        break;
    }
    return {fieldName, fieldValue: flagValue};
  };
  const getSelectedSubActionSheetOption = (subItem) => {
    const foundedIndex = getSelectedSubActionSheetOptionIndex(subItem);
    if (foundedIndex >= 0) {
      return `Muted for ${subItem.options[foundedIndex].label}`;
    }
    return 'Not muted';
  };
  const getSelectedSubActionSheetOptionIndex = (subItem) => {
    const {fieldValue} = getSettingsItemValue(subItem);
    return subItem.options.findIndex(
      (option) => `${option.value}` === `${fieldValue}`,
    );
  };

  const updateSubItemActionSheetRef = (aSheetRef, subItem) => {
    const founded = aSheetRefs.findIndex((item) => item.itemId === subItem.id);
    if (founded >= 0) {
      aSheetRefs[founded].aSheetRef = aSheetRef;
    } else {
      aSheetRefs.push({itemId: subItem.id, aSheetRef: aSheetRef});
    }
  };

  const handleSubItemOptionSelection = (index, subItem) => {
    const {fieldName} = getSettingsItemValue(subItem);
    const selectedOption = subItem.options[index] || null;
    if (selectedOption) {
      handleUpdatePlaceSettings(fieldName, selectedOption.value);
    }
  };

  const handleShowSubActionSheet = (subItem) => {
    const founded = aSheetRefs.find((item) => item.itemId === subItem.id);
    if (founded && founded.aSheetRef) {
      founded.aSheetRef.show();
      return;
    }
    console.log('SubItem sheet not found', subItem.name);
  };

  const renderSubItems = (item) => {
    if (item.navigations.length) {
      return item.navigations
        .filter((item) => item.active)
        .map((subItem) => {
          if (subItem.action_icon === 'next') {
            return renderNextSubItem(subItem);
          } else if (subItem.action_icon === 'switch') {
            return renderSubSwitchListItem(subItem);
          } else if (subItem.action_icon === 'expand') {
            return renderSubExpandItem(subItem);
          }
        });
    } else {
      return null;
    }
  };

  const hasSubItemExpandOptions = (subItem) => {
    return subItem.action_icon === 'expand' && subItem.options.length;
  };

  const renderSubExpandItem = (subItem) => {
    return hasSubItemExpandOptions(subItem)
      ? renderSubActionSheet(subItem)
      : renderNextSubItem(subItem);
  };

  const renderSubActionSheet = (subItem) => {
    return (
      <React.Fragment>
        {renderNextSubItem(subItem)}
        <ActionSheet
          ref={(aSheet) => {
            updateSubItemActionSheetRef(aSheet, subItem);
          }}
          cancelButtonIndex={4}
          destructiveButtonIndex={getSelectedSubActionSheetOptionIndex(subItem)}
          styles={{
            titleText: {
              fontSize: 14,
              color: theme.PRIMARY_COLOR,
              textTransform: 'capitalize',
              lineHeight: 24,
              fontFamily: 'Roboto',
            },
            cancelButtonBox: {
              height: 50,
              marginTop: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#fff',
            },
          }}
          title={''}
          options={[...subItem.options.map((option) => option.label), 'Cancel']}
          cancelButtonIndex={subItem.options.length}
          onPress={(index) => {
            handleSubItemOptionSelection(index, subItem);
          }}
        />
      </React.Fragment>
    );
  };

  const renderNextSubItem = (subItem) => {
    return (
      <View>
        <Divider />
        <List.Item
          key={`submitem_${subItem.route}`}
          title={subItem.name}
          description={
            hasSubItemExpandOptions(subItem)
              ? getSelectedSubActionSheetOption(subItem)
              : subItem.description || ''
          }
          titleStyle={styles.editMenuItemTitle}
          descriptionStyle={styles.editMenuDescription}
          onPress={() => {
            if (hasSubItemExpandOptions(subItem)) {
              handleShowSubActionSheet(subItem);
            } else {
              handleNavItemClick(subItem.route);
            }
          }}
          left={(props) => (
            <View {...props}>
              <Text> </Text>
            </View>
          )}
          right={(props) => (
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Icon {...props} name="chevron-right" size={34} color="#474747" />
            </View>
          )}
        />
      </View>
    );
  };

  const renderCardItem = (item) => {
    return (
      <Card
        style={styles.editMenuCards}
        key={`navmain-${item.name.replace(/\s/, '-')}`}>
        {item.action_icon === 'expand'
          ? renderExpandListItem(item)
          : renderNextListItem(item)}
      </Card>
    );
  };

  const renderExpandListItem = (item) => {
    return (
      <List.Accordion
        title={item.name}
        description={item.description}
        titleStyle={styles.editMenuTitle}
        descriptionStyle={styles.editMenuDescription}
        onPress={() => {
          // if (item.name === 'Media Gallery') {
          //   NavigationService.navigate('BusinessUploadMedia');
          // }
        }}
        left={(props) => (
          <Image
            {...props}
            source={{
              uri: 'https://via.placeholder.com/728.png?text=icon',
            }}
            style={styles.editMenuIcon}
          />
        )}>
        {renderSubItems(item)}
      </List.Accordion>
    );
  };

  const renderNextListItem = (item) => {
    return (
      <List.Item
        title={item.name}
        description={item.description}
        titleStyle={styles.editMenuTitle}
        descriptionStyle={styles.editMenuDescription}
        onPress={() => {
          handleNavItemClick(
            item.link ? item.link : item.route ? item.route : '',
          );
        }}
        left={(props) => (
          <Image
            {...props}
            source={{
              uri: 'https://via.placeholder.com/728.png?text=icon',
            }}
            style={styles.editMenuIcon}
          />
        )}
        right={(props) => (
          <View
            style={{
              justifyContent: 'center',
            }}>
            <Icon {...props} name="chevron-right" size={24} color="#474747" />
          </View>
        )}
      />
    );
  };

  const renderSubSwitchListItem = (item) => {
    const {fieldName, fieldValue} = getSettingsItemValue(item);
    return (
      <List.Item
        title={item.name}
        description={item.description}
        titleStyle={styles.editMenuTitle}
        descriptionStyle={styles.editMenuDescription}
        onPress={() => {}}
        right={(props) => (
          <View style={styles.messagingEnableSwitch}>
            <Switch
              value={fieldValue}
              color={theme.PRIMARY_COLOR}
              onValueChange={() => {
                handleUpdatePlaceSettings(fieldName, !fieldValue);
              }}
            />
          </View>
        )}
      />
    );
  };

  const renderNormalList = (item) => {
    return (
      <View style={{marginTop: 15}}>
        <View>
          <Text style={styles.editMenuTitle}>{item.name}</Text>
          <Text style={styles.editMenuDescription}>{item.description}</Text>
        </View>
        <Divider style={{marginTop: 10, marginLeft: 15}} />
        <View>{renderSubItems(item)}</View>
      </View>
    );
  };

  const renderNavigationCards = () => {
    if (
      navigationCardsData &&
      navigationCardsData['form-configuration'] &&
      navigationCardsData['form-configuration'].length
    ) {
      return navigationCardsData['form-configuration']
        .filter((item) => item.active)
        .map((item) => {
          if (item.component_type === 'card') {
            return renderCardItem(item);
          } else {
            return renderNormalList(item);
          }
        });
    } else {
      return null;
    }
  };

  return (
    <PageLayout bgColor="#fff">
      <GlobalOverlayLoading loading={updateSettingsLoading} textContent="" />
      <View style={[styles.settingsContainer]}>
        {updateSettingsError ? (
          <CustomAlert error={updateSettingsError} />
        ) : null}
        {renderNavigationCards()}
      </View>
    </PageLayout>
  );
};
const mapStateToProps = (state) => {
  return {
    globalConfig: state.app.globalConfig,
    token: state.user.token,
    updateSettingsStatus:
      state.business.businessUpdateStatus['update-place-settings'] || false,
    updateSettingsLoading:
      state.business.loading['update-place-settings'] || false,
    updateSettingsError: state.business.error['update-place-settings'] || '',
    businessPlace: state.business.place,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({updatePlace, resetBusinessUpdateStatus}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(EditMenu);
