import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {List, Chip, Portal, Dialog, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/personalInfo.style';
import theme from '../../styles/theme.style';
import Search from '../custom/search';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import {getViewportHeight} from '../../../utils/helper';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

const LanguagesUpdate = props => {
  const {
    profile,
    token,
    updateUserDetails,
    resetUserDetailsUpdatedFlag,
    userDetailsUpdated,
    languages,
    error,
    navigation,
  } = props;
  const [filterLanguagesList, setFilterLanguagesList] = useState([
    ...languages,
  ]);
  const [selectedLanguages, setSelectedLanguages] = useState([
    ...profile.languages,
  ]);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [bottomDrawerVisibility, setBottomDrawerVisibility] = useState(
    'expand',
  );
  const [searchText, setSearchText] = useState('');

  const refRBSheet = useRef();
  const runDone = navigation.getParam('runDone');
  useEffect(() => {
    if (runDone) {
      handleSubmit();
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  useEffect(() => {
    if (refRBSheet) {
      refRBSheet.current.open();
    }
  }, [refRBSheet]);

  useEffect(() => {
    if (isSearchEnabled && bottomDrawerVisibility === 'collapse') {
      handleDrawerVisibility('expand');
    }
  }, [isSearchEnabled]);

  const handleLanguagesSearch = searchPhrase => {
    setAutoFocus(false);
    setSearchText(searchPhrase);
    const tempSelectedValue = [...languages];
    if (searchPhrase.length > 2) {
      setIsSearchEnabled(true);
      const foundedValues = tempSelectedValue.filter(item => {
        const languageMatched =
          item.language.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0;
        return languageMatched;
      });

      if (foundedValues.length) {
        const foundedLanguages = foundedValues.map(item => {
          return item;
        });
        setFilterLanguagesList(foundedLanguages);
      } else {
        setFilterLanguagesList([]);
      }
    } else {
      setFilterLanguagesList([...languages]);
      setIsSearchEnabled(false);
    }
  };

  const handleLanguages = language => {
    if (language) {
      if (selectedLanguages.find(item => item.id === language.id)) {
        console.log('This language is already selected');
      } else {
        setSelectedLanguages([...selectedLanguages, language]);
      }
    }
  };

  const handleDelete = chipToDelete => {
    setSelectedLanguages(chips =>
      chips.filter(chip => chip.id !== chipToDelete.id),
    );
  };

  const handleSubmit = () => {
    const payload = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      languages: selectedLanguages.map(language => language.id),
    };
    updateUserDetails({...payload}, token, '', 'personal-info-language-update');
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('personal-info-language-update');
    NavigationService.goBack();
  };

  const handleOnCloseSheet = () => {
    setAutoFocus(false);
    setBottomDrawerVisibility('collapse');
    setSearchText('');
    setIsSearchEnabled(false);
    setFilterLanguagesList([...languages]);
  };

  const handleDrawerVisibility = value => {
    if (value === 'collapse') {
      refRBSheet.current.close();
      setAutoFocus(false);
    } else {
      setBottomDrawerVisibility(value);
      refRBSheet.current.open();
    }
  };

  const handleSearchFocus = value => {
    if (value === 'expand') {
      refRBSheet.current.open();
      setBottomDrawerVisibility(value);
      setAutoFocus(true);
    }
  };

  const renderLanguagesList = () => {
    return (
      <View style={styles.drawerContainer}>
        <View style={styles.drawerHandler}>
          <Icon
            name="menu"
            color={theme.SECONDARY_COLOR}
            size={32}
            onPress={() =>
              handleDrawerVisibility(
                bottomDrawerVisibility === 'expand' ? 'collapse' : 'expand',
              )
            }
          />
        </View>
        <View style={{margin: 10}}>
          <Search
            handleSearch={handleLanguagesSearch}
            pageName="personalInfoUpdate"
            placeholder="Search language"
            value={searchText}
            onFocus={() =>
              handleSearchFocus(
                bottomDrawerVisibility === 'expand' ? 'collapse' : 'expand',
              )
            }
            autoFocus={autoFocus}
          />
        </View>
        {isSearchEnabled && filterLanguagesList.length === 0 ? (
          <View>
            <Text
              variant="body1"
              style={styles.addLanguageText}
              style={{textAlign: 'center'}}>
              No result
            </Text>
          </View>
        ) : null}
        {/* {isSearchEnabled ? (
          <View>
            <Text style={styles.addLanguageText}>
              Can’t find your Language? Add here
            </Text>
          </View>) : null} */}
        <ScrollView>
          {filterLanguagesList.map(languages => (
            <List.Item
              title={languages.language}
              right={props => (
                <List.Icon
                  {...props}
                  icon={
                    selectedLanguages.find(item => item.id === languages.id)
                      ? 'check'
                      : 'plus-circle-outline'
                  }
                  color={theme.PRIMARY_COLOR}
                />
              )}
              onPress={() => handleLanguages(languages)}
              style={styles.personalInfoListItem}
            />
          ))}
        </ScrollView>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        minHeight: getViewportHeight(true),
      }}>
      <ScrollView>
        {error ? (
          <View style={{marginLeft: 30, marginRight: 30}}>
            <CustomAlert error={error} />
          </View>
        ) : null}
        <View style={styles.languagesContainer}>
          {selectedLanguages.length && selectedLanguages.length > 0
            ? selectedLanguages.map(item => {
                return (
                  <Chip
                    style={styles.selectedLanguageChip}
                    textStyle={styles.selectedLanguageChipText}
                    onClose={() => handleDelete(item)}>
                    {item.language}
                  </Chip>
                );
              })
            : null}
        </View>
      </ScrollView>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        onClose={handleOnCloseSheet}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: theme.SECONDARY_COLOR,
          },
          container: {
            height: 380,
            ...ifIphoneX(
              {
                marginBottom: getBottomSpace(),
              },
              {
                marginBottom: 0,
              },
            ),
          },
        }}>
        {renderLanguagesList()}
      </RBSheet>

      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>Languages Updated!</Text>

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
      {bottomDrawerVisibility === 'collapse' && (
        <View
          style={[
            styles.fakeSheetCt,
            {
              ...ifIphoneX(
                {
                  marginBottom: getBottomSpace(),
                },
                {
                  marginBottom: 0,
                },
              ),
            },
          ]}>
          {renderLanguagesList()}
        </View>
      )}
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
        'update-details-personal-info-language-update'
      ] || null,
    languages: state.app.languages,
    error:
      state.user.error['update-details-personal-info-language-update'] || null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updateUserDetails, resetUserDetailsUpdatedFlag},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(LanguagesUpdate);
