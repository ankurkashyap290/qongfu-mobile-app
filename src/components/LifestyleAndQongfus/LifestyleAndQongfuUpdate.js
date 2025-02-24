import React, {useState, useEffect, useRef} from 'react';
import _ from 'lodash';
import {View, Text, ScrollView, Keyboard, TouchableOpacity} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import theme from '../../styles/theme.style';
import {Chip, Button, Portal, Dialog, Divider} from 'react-native-paper';
import styles from '../../styles/lifestylesAndQongfu.style';
import Search from '../../components/custom/search';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
  resetFeedbackFlag,
  getUserDetails
} from '../../../redux/user/actions';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import {getViewportHeight} from '../../../utils/helper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AddNewQongfu from './AddNewQongfu';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const LifestylesAndQongfu = props => {
  const {
    profile,
    place,
    lifestyles,
    updateUserDetails,
    token,
    resetUserDetailsUpdatedFlag,
    feedbackSubmitted,
    resetFeedbackFlag,
    qongfus,
    runDone,
    buttonText,
    pageName,
    selectedLifestylesData,
    selectedQongfusData,
    error,
    updateStatus,
    updatePlace,
    resetBusinessUpdateStatus,
    loading,
    getUserDetails
  } = props;
  const [filterQongfusList, setFilterQongfusList] = useState([]);
  const [filterLifestylesList, setFilterLifestylesList] = useState([]);
  const [searchQongfusList, setSearchQongfusList] = useState([]);
  const [searchLifestylesList, setSearchLifestylesList] = useState([]);
  const [selectedQongfus, setSelectedQongfus] = useState([]);
  const [selectedSuggestions, setSelectedSuggestions] = useState([]);
  const [selectedLifestyles, setSelectedLifestyles] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [bottomDrawerVisibility, setBottomDrawerVisibility] = useState(
    'expand',
  );
  const [rbSheetHeight, setRbSheetHeight] = useState(380);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [addNewQongfu, setAddNewQongfu] = useState(false);
  const [qongfuModaldisplayMode, setQongfuModalDisplayMode] = useState(
    'addNewQongfu',
  );
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);

  const refRBSheet = useRef();
  useEffect(() => {
    if (runDone) {
      handleSubmit();
      // navigation.setParams({runDone: false});
    }
  }, [runDone]);

  useEffect(() => {
    if (updateStatus && pageName === 'onboarding') {
      getUserDetails({token});
      resetUserDetailsUpdatedFlag('lifestyles-qongfus-update');
    }
  }, [updateStatus, pageName]);

  useEffect(() => {
    if (refRBSheet) {
      refRBSheet.current.open();
    }
  }, [refRBSheet]);

  useEffect(() => {
    if (
      addNewQongfu ||
      feedbackSubmitted ||
      (updateStatus &&
        (pageName === 'accountSettings' || pageName === 'businessPlace'))
    ) {
      if (feedbackSubmitted) {
        handleQongfuModalClose();
      }
      refRBSheet.current.close();
    } else {
      refRBSheet.current.open();
    }
  }, [addNewQongfu, feedbackSubmitted, updateStatus]);

  useEffect(() => {
    if (isSearchEnabled && bottomDrawerVisibility === 'collapse') {
      handleDrawerVisibility('expand');
    }
  }, [isSearchEnabled]);

  // IF PROFILE LOADED THEN SET SELECTED
  useEffect(() => {
    if (selectedQongfusData) {
      setSelectedQongfus(selectedQongfusData || []);
    }
    if (selectedLifestylesData) {
      setSelectedLifestyles(selectedLifestylesData || []);
    }
  }, [selectedQongfusData, selectedLifestylesData]);

  useEffect(() => {
    if (lifestyles && lifestyles.length) {
      let tempQongfus = [];
      const topFiveQongfus = [];
      lifestyles.map((item, index) => {
        if (topFiveQongfus.length < 5 && item.qongfus.length) {
          topFiveQongfus.push(item.qongfus[0]);
        }
        if (item.qongfus.length) {
          tempQongfus = tempQongfus.concat([], item.qongfus);
        }
        return item;
      });
      setSelectedSuggestions(topFiveQongfus);
    }
  }, [lifestyles]);

  useEffect(() => {
    updateFilteredData();
  }, [selectedQongfus, selectedLifestyles, qongfus, lifestyles]);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const _keyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  const updateFilteredData = () => {
    let newQongfus = _.cloneDeep(qongfus);
    if (selectedQongfus.length) {
      newQongfus = newQongfus.filter(
        item => !selectedQongfus.map(qongfu => qongfu.id).includes(item.id),
      );
    }

    setFilterQongfusList(newQongfus);

    let newLifestyles = _.cloneDeep(lifestyles);
    if (selectedLifestyles.length) {
      newLifestyles = newLifestyles.filter(
        item =>
          !selectedLifestyles.map(lifestyle => lifestyle.id).includes(item.id),
      );
    }
    setFilterLifestylesList(newLifestyles);
    if (isSearchEnabled) {
      updateSearchList(searchText, newLifestyles, newQongfus);
    }
  };

  const handleSuggestionItemClick = qongfu => {
    const newSelectedQongfus = _.cloneDeep(selectedQongfus);
    newSelectedQongfus.push(_.cloneDeep(qongfu));
    setSelectedQongfus(newSelectedQongfus);

    const foundLifestyle = lifestyles.find(
      lifestyle => lifestyle.id === qongfu.lifestyle_id,
    );

    if (
      foundLifestyle &&
      !selectedLifestyles.find(lifestyle => lifestyle.id === foundLifestyle.id)
    ) {
      const newSelectedLifestyles = _.cloneDeep(selectedLifestyles);
      newSelectedLifestyles.push(foundLifestyle);
      setSelectedLifestyles(newSelectedLifestyles);
    }

    // remove selected qongfu from suggestion
    const foundSuggestion = selectedSuggestions.findIndex(
      suggestion => suggestion.id === qongfu.id,
    );
    if (foundSuggestion >= 0) {
      const newSuggestions = _.cloneDeep(selectedSuggestions);
      newSuggestions.splice(foundSuggestion, 1);
      setSelectedSuggestions(newSuggestions);
    }
  };

  const handleSelectLifestyle = lifestyle => {
    const newSelectedLifestyles = _.cloneDeep(selectedLifestyles);
    newSelectedLifestyles.push(_.cloneDeep(lifestyle));
    setSelectedLifestyles(newSelectedLifestyles);
  };

  const handleDeleteLifestyle = id => {
    setSelectedLifestyles(
      _.cloneDeep(selectedLifestyles).filter(lifestyle => lifestyle.id !== id),
    );
    // found all selected qongfus of this lifestyle
    setSelectedQongfus(
      _.cloneDeep(selectedQongfus).filter(qongfu => qongfu.lifestyle_id !== id),
    );
    // update topFiveSuggestions again
    if (selectedSuggestions.length < 5) {
      const newSuggestions = _.cloneDeep(selectedSuggestions);
      newSuggestions.push(
        //@ts-ignore
        _.cloneDeep(qongfus.find(item => item.lifestyle_id === id)),
      );
      setSelectedSuggestions(newSuggestions);
    }
  };

  const handleDeleteQongfu = id => {
    // found all selected qongfus of this lifestyle
    const newSelectedQongfus = _.cloneDeep(selectedQongfus).filter(
      qongfu => qongfu.id !== id,
    );
    setSelectedQongfus(newSelectedQongfus);
    if (selectedSuggestions.length < 5) {
      const newSuggestions = _.cloneDeep(selectedSuggestions);
      newSuggestions.push(
        //@ts-ignore
        _.cloneDeep(qongfus.find(item => item.id === id)),
      );
      setSelectedSuggestions(newSuggestions);
    }
  };

  const handleQongfuSearch = searchPhrase => {
    setAutoFocus(false);
    setSearchText(searchPhrase);
    if (searchPhrase.length > 2) {
      setIsSearchEnabled(true);
      updateSearchList(searchPhrase, filterLifestylesList, filterQongfusList);
    } else {
      setIsSearchEnabled(false);
    }
  };

  const updateSearchList = (searchPhrase, lifestylesList, qongfusList) => {
    setSearchLifestylesList(
      _.cloneDeep(lifestylesList).filter(
        item =>
          item.lifestyle.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0,
      ),
    );
    setSearchQongfusList(
      _.cloneDeep(qongfusList).filter(
        item =>
          item.qongfu.toLowerCase().indexOf(searchPhrase.toLowerCase()) >= 0,
      ),
    );
  };

  const lifestyleBackgroundColor = item => {
    let lifestyleColor = '';
    const tempLifestyle = selectedLifestyles.find(
      lifestyle => lifestyle.id === item,
    );
    if (tempLifestyle) {
      lifestyleColor = `#${tempLifestyle.lifestyle_color}`;
    }
    return lifestyleColor;
  };

  const handleDrawerVisibility = value => {
    if (value === 'collapse') {
      refRBSheet.current.close();
      setAutoFocus(false);
    } else {
      setBottomDrawerVisibility(value);
      refRBSheet.current.open();
      setRbSheetHeight(380);
    }
  };

  const handleSubmit = () => {
    if (pageName === 'businessPlace') {
      updatePlace(
        {
          id: place.id,
          place_name: place.place_name,
          qongfus: selectedQongfus.map(qongfus => qongfus.id),
          lifestyles: selectedLifestyles.map(lifestyle => lifestyle.id),
          location_lat: place.location_lat,
          location_lng: place.location_lng,
          country_id: place.country_id,
          location_data: place.location_data,
        },
        token,
        'lifestyles-and-qongfus',
      );
    } else {
      updateUserDetails(
        {
          qongfus: selectedQongfus.map(qongfus => qongfus.id),
          lifestyles: selectedLifestyles.map(lifestyle => lifestyle.id),
          first_name: profile.first_name,
          last_name: profile.last_name,
        },
        token,
        pageName === 'onboarding' ? 'thirdStep' : '',
        'lifestyles-qongfus-update',
      );
    }
  };

  const handleSuccessModalClose = () => {
    if (pageName === 'businessPlace') {
      resetBusinessUpdateStatus('update-place-lifestyles-and-qongfus');
    } else {
      resetUserDetailsUpdatedFlag('lifestyles-qongfus-update');
    }
    NavigationService.goBack();
    // refRBSheet.current.open();
  };

  const handleAddNewQongfu = () => {
    // refRBSheet.current.close();
    setAddNewQongfu(true);
  };

  const handleQongfuInfoLink = () => {
    if (qongfuModaldisplayMode === 'qongfuInfo') {
      setQongfuModalDisplayMode('addNewQongfu');
    } else {
      setAddNewQongfu(false);
      // refRBSheet.current.open();
    }
  };

  const handleQongfuModalClose = () => {
    // refRBSheet.current.open();
    setAddNewQongfu(false);
  };
  const handleResetFeedbackFlag = () => {
    resetFeedbackFlag();
    // refRBSheet.current.open();
  };

  const handleOnCloseSheet = () => {
    setAutoFocus(false);
    setBottomDrawerVisibility('collapse');
    setSearchLifestylesList([]);
    setSearchQongfusList([]);
    setSearchText('');
    setIsSearchEnabled(false);
    // setRbSheetHeight(120);
    // if (!addNewQongfu) {
    //   refRBSheet.current.open();
    // }
  };

  const handleSearchFocus = value => {
    if (value === 'expand') {
      refRBSheet.current.open();
      setBottomDrawerVisibility(value);
      setAutoFocus(true);
    }
  };

  const renderContent = () => {
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
{
  pageName==='businessPlace' || pageName==='onboarding'?
  <View
          style={{
            margin: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={styles.addNewDataText}>
            {selectedLifestyles.length > 0 || selectedQongfus.length > 0
              ? 'Selected Items'
              : 'No selections yet'}
          </Text>
          <Text
            style={[
              styles.addNewDataText,
              {color: theme.PRIMARY_COLOR, marginRight: 8},
            ]}>
            {selectedLifestyles.length + selectedQongfus.length}
          </Text>
        </View>:null
}


        <View style={{margin: 10}}>
          <Search
            value={searchText}
            handleSearch={handleQongfuSearch}
            pageName="personalInfoUpdate"
            placeholder={
              pageName === 'onboarding' || pageName === 'businessPlace'
                ? 'Search here'
                : 'i.e. Boxing, Pilates or Horse Riding'
            }
            onFocus={() =>
              handleSearchFocus(
                bottomDrawerVisibility === 'expand' ? 'collapse' : 'expand',
              )
            }
            autoFocus={autoFocus}
          />
        </View>
        <ScrollView>
          <View>
            {!isSearchEnabled ? null : (
              <View
                style={[
                  styles.lifestyleContainer,
                  {paddingBottom: 20, paddingLeft: 20, paddingRight: 20},
                ]}>
                {searchLifestylesList.map((item, index) => (
                  <Chip
                    size="medium"
                    style={styles.suggestionChip}
                    textStyle={styles.suggestionChipText}
                    key={`${item.lifestyle}-${index}`}
                    onPress={() => handleSelectLifestyle(item)}>
                    {item.lifestyle}
                  </Chip>
                ))}
                {searchQongfusList.map((item, index) => (
                  <Chip
                    size="medium"
                    style={styles.suggestionChip}
                    textStyle={styles.suggestionChipText}
                    key={`${item.qongfu}-${index}`}
                    onPress={() => handleSuggestionItemClick(item)}>
                    {item.qongfu}
                  </Chip>
                ))}
              </View>
            )}
            {isSearchEnabled ||
            selectedLifestyles.length ||
            selectedQongfus.length ||
            bottomDrawerVisibility === 'collapse' ? null : (
              <View>
                <Text variant="body2" style={styles.suggestionText}>
                  Suggestions:
                </Text>
                <View
                  style={[
                    styles.lifestyleContainer,
                    {paddingBottom: 20, paddingLeft: 20, paddingRight: 20},
                  ]}>
                  {selectedSuggestions.map((item, index) => (
                    <Chip
                      style={styles.suggestionChip}
                      textStyle={styles.suggestionChipText}
                      key={index}
                      onPress={() => handleSuggestionItemClick(item)}>
                      {item.qongfu}
                    </Chip>
                  ))}
                </View>
              </View>
            )}
            {isSearchEnabled ? (
              <View>
                {searchLifestylesList.length === 0 &&
                searchQongfusList.length === 0 ? (
                  <View>
                    <Text
                      variant="body1"
                      style={styles.suggestionText}
                      style={{textAlign: 'center'}}>
                      No result
                    </Text>
                  </View>
                ) : null}
              </View>
            ) : null}
          </View>
        </ScrollView>
       { pageName==='businessPlace' || pageName==='onboarding'?
       <View>
        <Divider />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
            marginTop: 10,
          }}>
          <Text style={styles.addNewDataText}>Can’t find your Qongfu?</Text>
          <TouchableOpacity onPress={() => handleAddNewQongfu()}>
            <Text style={{color: theme.PRIMARY_COLOR, marginLeft: 5}}>
              Add here
            </Text>
          </TouchableOpacity>
        </View>
        </View>:isSearchEnabled?
         <View style={{marginBottom: 20}}>
            <Text style={styles.suggestionText}>Can’t find your Qongfu?</Text>

            <Text
              onPress={() => handleAddNewQongfu()}
              style={styles.addQongfuText}>
              Add here
            </Text>
          </View> :null}

        {pageName === 'onboarding' ? (
          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              disabled={
                pageName === 'onboarding'
                  ? false
                  : selectedLifestyles.length === 0 &&
                    selectedQongfus.length === 0
              }
              style={styles.updateButtonOnboarding}
              labelStyle={styles.updateButtonLable}>
              {buttonText}
            </Button>
          </View>
        ) : null}
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: pageName === 'onboarding' ? '#f8fcff' : '#fff',
        minHeight: getViewportHeight(true),
      }}>
      <GlobalOverlayLoading loading={loading} textContent="" />
      <ScrollView>
        {pageName === 'onboarding' && !isKeyboardOpen ? (
          <View>
            <Text style={styles.imageUploadHeading}>
              You’re on Fire!{'\n'}
              Let’s add some interests
            </Text>
            <Text style={[styles.addLifestyleSubHeading, {marginTop: 8}]}>
              Sharing your interests can help enhance{'\n'} your overall Qongfu
              experience.
            </Text>
          </View>
        ) : null}
        {error ? (
          <View style={{marginLeft: 30, marginRight: 30}}>
            <CustomAlert error={error} />
          </View>
        ) : null}
        <View
          style={[
            styles.lifestyleContainer,
            {paddingLeft: 20, paddingRight: 20},
          ]}>
          {selectedLifestyles.length > 0
            ? selectedLifestyles.map((lifestyle, index) => {
                return (
                  <Chip
                    style={[
                      {
                        backgroundColor: lifestyle.lifestyle_color
                          ? `#${lifestyle.lifestyle_color}`
                          : null,
                      },
                      styles.lifestyleChip,
                    ]}
                    textStyle={styles.lifestyleChipText}
                    key={`${lifestyle.slug}-${index}`}
                    onClose={() => handleDeleteLifestyle(lifestyle.id)}>
                    {lifestyle.lifestyle}
                  </Chip>
                );
              })
            : null}
        </View>
        <View
          style={[
            styles.lifestyleContainer,
            {paddingLeft: 20, paddingRight: 20},
          ]}>
          {selectedQongfus.length > 0
            ? selectedQongfus.map(qongfu => (
                <Chip
                  style={[
                    {
                      backgroundColor: qongfu.qongfu_color
                        ? `#${qongfu.qongfu_color}`
                        : lifestyleBackgroundColor(qongfu.lifestyle_id),
                    },
                    styles.qongfuChip,
                  ]}
                  textStyle={styles.qongfuChipText}
                  onClose={() => handleDeleteQongfu(qongfu.id)}>
                  {qongfu.qongfu}
                </Chip>
              ))
            : null}
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={false}
          closeOnPressMask={true}
          onClose={handleOnCloseSheet}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(255,255,255,.1)',
            },
            draggableIcon: {
              backgroundColor: theme.SECONDARY_COLOR,
              elevation: 1,
            },
            container: {
              height: rbSheetHeight,
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
          {renderContent()}
        </RBSheet>

        <Portal>
          <Dialog visible={addNewQongfu} onDismiss={handleQongfuModalClose}>
            <Icon
              name="close"
              color={theme.PRIMARY_COLOR}
              size={32}
              style={styles.closeIcon}
              onPress={() => handleQongfuInfoLink()}
            />
            <AddNewQongfu
              onClose={handleQongfuModalClose}
              displayMode={qongfuModaldisplayMode}
              setQongfuModalDisplayMode={setQongfuModalDisplayMode}
            />
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={
              updateStatus &&
              (pageName === 'accountSettings' || pageName === 'businessPlace')
            }
            onDismiss={handleSuccessModalClose}>
            <Text style={styles.successDialogHeading}>
              Lifestyles & Qongfu Updated!
            </Text>

            <View style={styles.successButtonContainer}>
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
        <Portal>
          <Dialog
            visible={feedbackSubmitted}
            onDismiss={handleResetFeedbackFlag}
            style={{borderRadius: 10}}>
            <Text style={styles.successAddDialogHeading}>
              New Qongfu Submitted!
            </Text>
            <Text style={styles.successAddDialogText}>
              Our support team will review your request and process it as soon
              as possible. You will receive a notification once the process has
              been completed.
            </Text>
            <View style={styles.updateButtonContainer}>
              <Button
                mode="contained"
                style={styles.successAddButton}
                labelStyle={styles.successAddButtonLable}
                onPress={handleResetFeedbackFlag}>
                OK
              </Button>
            </View>
          </Dialog>
        </Portal>
      </ScrollView>
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
          {renderContent()}
        </View>
      )}
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    profile: state.user.profile,
    place: state.business.place,
    token: state.user.token,
    lifestyles: state.app.lifestyles,
    qongfus: state.app.qongfus,
    feedbackSubmitted: state.user.feedbackSubmitted,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUserDetails,
      resetUserDetailsUpdatedFlag,
      resetFeedbackFlag,
      updatePlace,
      resetBusinessUpdateStatus,
      getUserDetails
    },
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LifestylesAndQongfu);
