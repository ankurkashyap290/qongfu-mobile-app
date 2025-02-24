import React, {useState, useEffect} from 'react';
import {
  View,
  RefreshControl,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {
  Surface,
  List,
  Avatar,
  Divider,
  Button,
  Portal,
} from 'react-native-paper';
import Contacts from 'react-native-contacts';
import * as RNLocalize from 'react-native-localize';
import {getViewportHeight} from '../../../utils/helper';
import styles from '../../styles/phoneContacts.style';
import cloneDeep from 'lodash/cloneDeep';
import McIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import themeStyle from '../../styles/theme.style';

const PhoneContacts = ({
  listDataLoading,
  listData,
  fetchDataAction,
  actionButton,
  actionStatuses,
  multiSelectActionButton,
  navigation,
  countries,
}) => {
  const selectMode = navigation.getParam('selectMode');
  const [contactsPermission, setPermission] = useState('pending');
  const [localContacts, setLocalContacts] = useState([]);
  const [mergedContacts, setMergedContacts] = useState([]);
  const [selectedContacts, updateSelectedContact] = useState([]);
  const [deviceCountry, setDeviceCountry] = useState(null);
  const [isAllSelected, toggleAllSelection] = useState(false);
  const [isAskPermission, toggleAskPermission] = useState(false);

  const getCountryByCode = (countryCode) => {
    const found = countries.find(
      (country) =>
        country.country_code.toLowerCase() === countryCode.toLocaleLowerCase(),
    );
    return found ? found : null;
  };

  useEffect(() => {
    if (!selectMode) {
      toggleAllSelection(false);
      updateSelectedContact([]);
    }
  }, [selectMode]);

  useEffect(() => {
    setDeviceCountry(getCountryByCode(RNLocalize.getCountry()));
    toggleAskPermission(false);
    Contacts.checkPermission((err, permission) => {
      if (err) {
        console.log('error while check contacts permission', err);
        setPermission('error');
      } else {
        setPermission(permission);
      }
    });
  }, []);

  useEffect(() => {
    // Contacts.PERMISSION_AUTHORIZED || Contacts.PERMISSION_UNDEFINED || Contacts.PERMISSION_DENIED
    if (contactsPermission === 'undefined') {
      Contacts.requestPermission((err, permission) => {
        if (err) {
          console.log('error while request contacts permission', err);
          setPermission('error');
        } else {
          setPermission(permission);
        }
      });
    } else if (contactsPermission === 'authorized') {
      loadContacts();
    } else if (contactsPermission === 'denied') {
      toggleAskPermission(true);
    } else if (contactsPermission === 'error') {
      Alert.alert(
        'Error',
        'Error while fetching contacts permission. Please check contacts permission from app->settings',
      );
    }
  }, [contactsPermission]);

  useEffect(() => {
    // update actionStatuses here
    if (listData.length) {
      setMergedContacts(
        cloneDeep(localContacts).map((contact) => {
          // find status of given contact
          const found = listData.find(
            (item) => item.contact_number === contact.contactNumber,
          );
          if (found) {
            const qongfuStatus = actionStatuses.find(
              (status) => status.status === found.status,
            );
            if (qongfuStatus) {
              contact.qongfuStatus = {...qongfuStatus};
            } else {
              contact.qongfuStatus = {status: 0, label: 'pending'};
            }
          } else {
            // show pending
            contact.qongfuStatus = {status: 0, label: 'pending'};
          }
          return contact;
        }),
      );
    } else {
      setMergedContacts([]);
    }
  }, [listData]);

  useEffect(() => {
    if (localContacts.length) {
      fetchDataAction(cloneDeep(localContacts));
    }
  }, [localContacts]);

  const loadContacts = () => {
    Contacts.getAll((err, contacts) => {
      contacts.sort(
        (a, b) => a.givenName.toLowerCase() > b.givenName.toLowerCase(),
      );
      if (err === 'denied') {
        console.warn('error get all contacts was denied', err);
        setPermission('error');
      } else {
        setLocalContacts(
          contacts
            .map((item) => {
              item.contactNumber = getPrimaryPhoneNumber(item);
              return item;
            })
            .filter((item) => item.contactNumber),
        );
      }
    });
  };

  const handleRefreshList = () => {
    setLocalContacts([]);
    loadContacts();
  };

  const handleContactClick = () => {};

  const renderActionButtons = (props, item) => {
    switch (item.qongfuStatus.status) {
      case 0:
        return (
          <View {...props} style={{justifyContent: 'center'}}>
            <Button
              mode={'contained'}
              onPress={() => {
                actionButton.onAction(item);
              }}
              style={actionButton.style}
              labelStyle={actionButton.labelStyle}
              size="small">
              {actionButton.label}
            </Button>
          </View>
        );
        break;
      case 1:
      case 2:
        return (
          <View
            {...props}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={item.qongfuStatus.style ? item.qongfuStatus.style : {}}>
              {item.qongfuStatus.label}
            </Text>
          </View>
        );
        break;
      default:
        return <View />;
        break;
    }
  };

  const getNameLetters = (item) => {
    const firstLetter = item.givenName ? item.givenName.slice(0, 1) : '';
    const secondLetter = item.familyName ? item.familyName.slice(0, 1) : '';
    return firstLetter + secondLetter;
  };

  const normalizePhoneNumber = (number) => {
    // remove first zero if found
    let newNumber = `${number}`;
    if (newNumber.substr(0, 1) === '+' || newNumber.substr(0, 2) === '00') {
      return newNumber;
    } else {
      newNumber =
        `${number}`.substr(0, 1) === '0' ? `${number}`.substr(1) : `${number}`;
      if (deviceCountry) {
        newNumber = `+${deviceCountry.dial_code}${newNumber}`;
      }
    }
    return newNumber.replace(/\s/g, '').replace(/\-/g, '');
  };

  const getPrimaryPhoneNumber = (item) => {
    //  if no number found then return empty
    if (item.phoneNumbers.length === 0) {
      return '';
    }

    // first find mobile labeled number
    let found = item.phoneNumbers.find(
      (number) => number.label.toLowerCase() === 'mobile',
    );

    // if not found then search for home labeled number
    if (!found) {
      found = item.phoneNumbers.find(
        (number) => number.label.toLowerCase() === 'home',
      );
    }

    // if not found then pick first number from phone
    if (!found) {
      found = item.phoneNumbers[0];
    }
    return found.number ? normalizePhoneNumber(found.number) : '';
  };

  const getPhoneNumberOrMemberTitle = (item) => {
    return item.contactNumber;
    // if (item.qongfuStatus.status === 0 || item.qongfuStatus.status === 2) {
    //   return item.contactNumber;
    // } else {
    //   return item.qongfuStatus.label;
    // }
  };

  const handleSelectContact = (item) => {
    if (selectedContacts.includes(item.contactNumber)) {
      updateSelectedContact(
        selectedContacts.filter((contact) => contact !== item.contactNumber),
      );
    } else {
      updateSelectedContact([...selectedContacts, item.contactNumber]);
    }
  };

  const renderSelectItemOption = (item) => {
    return selectMode ? (
      <View style={{marginLeft: 20, marginRight: 20}}>
        <TouchableOpacity
          onPress={() => {
            item.qongfuStatus.status === 0 && handleSelectContact(item);
          }}>
          <McIcon
            name="circle"
            size={20}
            color={
              item.qongfuStatus.status === 0
                ? selectedContacts.includes(item.contactNumber)
                  ? themeStyle.PRIMARY_COLOR
                  : themeStyle.SECONDARY_COLOR
                : '#fff'
            }
          />
        </TouchableOpacity>
      </View>
    ) : null;
  };

  const _renderContactCard = (item) => {
    return (
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {renderSelectItemOption(item)}
        <View style={{flex: 1}}>
          <List.Item
            title={`${item.givenName} ${item.familyName}`}
            description={getPhoneNumberOrMemberTitle(item)}
            left={(props) => (
              <View
                {...props}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Surface
                  style={{
                    elevation: 2,
                    borderRadius: 30,
                    borderColor: '#fff',
                    borderWidth: 2,
                    height: 60,
                    width: 60,
                  }}>
                  <Avatar.Image
                    size={56}
                    source={{
                      uri: item.hasThumbnail
                        ? item.thumbnailPath
                        : `https://via.placeholder.com/728.png/C2E5F7/FFFFFF?text=${getNameLetters(
                            item,
                          )}`,
                    }}
                  />
                </Surface>
              </View>
            )}
            right={(props) =>
              selectMode ? null : renderActionButtons(props, item)
            }
            titleStyle={styles.contactName}
            descriptionStyle={styles.contactJobTitle}
            // onPress={() => handleContactClick(item)}
          />
          <Divider
            style={{
              width: '70%',
              alignSelf: 'flex-end',
              marginRight: 16,
              color: '#dedede',
            }}
          />
        </View>
      </View>
    );
  };

  const renderMultiSelectPanel = () => {
    return selectMode ? (
      <Portal>
        <Surface style={styles.contactButtonContainer}>
          <Button
            mode="contained"
            disabled={selectedContacts.length === 0}
            onPress={() => {
              multiSelectActionButton.onAction(
                selectedContacts.map((contact) => ({contactNumber: contact})),
              );
            }}
            style={
              selectedContacts.length === 0
                ? styles.multiSelectDisableButton
                : styles.multiSelectButton
            }
            labelStyle={styles.multiSelectButtonLabel}
            size="small">
            {multiSelectActionButton.label}
          </Button>
        </Surface>
      </Portal>
    ) : null;
  };

  const renderSelectAll = () => {
    return selectMode ? (
      <View style={{justifyContent: 'flex-start', marginTop: 10}}>
        <Button
          mode="text"
          onPress={() => {
            if (!isAllSelected) {
              updateSelectedContact(
                mergedContacts.map((contact) => contact.contactNumber),
              );
            } else {
              updateSelectedContact([]);
            }
            toggleAllSelection(!isAllSelected);
          }}
          style={{width: 150}}
          labelStyle={{textTransform: 'capitalize'}}
          size="small">
          {!isAllSelected ? 'Select All' : 'Clear Selection'}
        </Button>
      </View>
    ) : null;
  };
  const renderAskPermission = () => {
    return isAskPermission ? (
      <View
        style={{justifyContent: 'center', margin: 30, alignItems: 'center'}}>
        <Text style={{color: 'red'}}>
          *Required contacts permission to load contacts.
        </Text>
        <Text>Please enable/allow contacts permission</Text>
        <View style={{marginTop: 50}}>
          <Button
            mode="outlined"
            onPress={() => {
              Linking.openSettings().catch((ext) => {
                console.log('error while opening settings');
              });
            }}>
            Click to enable
          </Button>
        </View>
      </View>
    ) : null;
  };

  return (
    <View
      style={{
        backgroundColor: '#f8fcff',
        minHeight: getViewportHeight(true),
        paddingBottom: 80,
      }}>
      {renderAskPermission()}
      {renderSelectAll()}
      <View style={{marginTop: 10, marginBottom: 10}}>
        <FlatList
          style={{minHeight: getViewportHeight(true)}}
          data={mergedContacts}
          renderItem={({item}) => {
            return _renderContactCard(item);
          }}
          // onEndReached={() => {}}
          // onEndReachedThreshold={0.01}
          // initialNumToRender={10}
          refreshControl={
            <RefreshControl
              colors={['#9Bd35A', '#689F38']}
              refreshing={
                mergedContacts.length === 0 && contactsPermission !== 'error'
              }
              onRefresh={handleRefreshList}
            />
          }
          keyExtractor={(item) => item.contact_number}
          extraData={listData}
        />
      </View>
      {renderMultiSelectPanel()}
    </View>
  );
};

export default PhoneContacts;
