import React, {useState, useEffect, useRef} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {List, Chip, Portal, Dialog, Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/businessPlaceProfile.style';
import theme from '../../styles/theme.style';
import Search from '../custom/search';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import {resetFeedbackFlag} from '../../../redux/user/actions';
import {getViewportHeight} from '../../../utils/helper';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';
import Suggestion from './suggestion';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const MoreInfoList = props => {
  const {
    place,
    token,
    dataList,
    selectedDataList,
    runDone,
    pageName,
    label,
    dataLabel,
    addNewLine,
    suggestionDescription,
    resetFeedbackFlag,
    feedbackSubmitted,
    updatePlace,
    languageLoading,
    languageError,
    languageBusinessUpdateStatus,
    amenitiesLoading,
    amenitiesError,
    amenitiesBusinessUpdateStatus,
    resetBusinessUpdateStatus,
  } = props;
  const [filterDataList, setFilterDataList] = useState([...dataList]);
  const [selectedData, setSelectedData] = useState([...selectedDataList]);
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [bottomDrawerVisibility, setBottomDrawerVisibility] = useState(
    'expand',
  );
  const [searchText, setSearchText] = useState('');
  const [addNewData, setAddNewData] = useState(false);

  const refRBSheet = useRef();

  useEffect(() => {
    if (runDone) {
      handleSubmit();
    }
  }, [runDone]);

  const handleSubmit = () => {
    let payload = {};
    if (pageName === 'language') {
      payload = {languages: selectedData.map(language => language.id)};
    } else if (pageName === 'amenity') {
      const tempAmenities = [...selectedData.map(item => item.id)];
      const clientTypeAmenity = place.amenities.find(
        item => item.label === 'Client type',
      );
      if (clientTypeAmenity) {
        tempAmenities.push(clientTypeAmenity.id);
      }

      payload = {
        amenities: tempAmenities,
      };
    }
    updatePlace(
      {
        id: place.id,
        place_name: place.place_name,
        location_lat: place.location_lat,
        location_lng: place.location_lng,
        country_id: place.country_id,
        ...payload,
        location_data: place.location_data,
      },
      token,
      pageName,
    );
  };

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

  const handleAddNewData = () => {
    refRBSheet.current.close();
    setAutoFocus(false);
    setAddNewData(true);
  };

  const handleSearch = searchPhrase => {
    setAutoFocus(false);
    setSearchText(searchPhrase);
    const tempSelectedValue = [...dataList];
    if (searchPhrase.length > 2) {
      setIsSearchEnabled(true);
      const foundedValues = tempSelectedValue.filter(item => {
        const dataMatched =
          item[dataLabel].toLowerCase().indexOf(searchPhrase.toLowerCase()) >=
          0;
        return dataMatched;
      });

      if (foundedValues.length) {
        const foundedLanguages = foundedValues.map(item => {
          return item;
        });
        setFilterDataList(foundedLanguages);
      } else {
        setFilterDataList([]);
      }
    } else {
      setFilterDataList([...dataList]);
      setIsSearchEnabled(false);
    }
  };

  const handleSelectData = item => {
    if (item) {
      if (selectedData.find(elem => elem.id === item.id)) {
        console.log('This item is already selected');
      } else {
        setSelectedData([...selectedData, item]);
      }
    }
  };

  const handleDelete = chipToDelete => {
    setSelectedData(chips => chips.filter(chip => chip.id !== chipToDelete.id));
  };

  const handleSuccessModalClose = () => {
    resetBusinessUpdateStatus(`update-place-${pageName}`);
    NavigationService.goBack();
  };

  const handleOnCloseSheet = () => {
    setAutoFocus(false);
    setBottomDrawerVisibility('collapse');
    setSearchText('');
    setIsSearchEnabled(false);
    setFilterDataList([...dataList]);
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

  const handleModalClose = () => {
    setAddNewData(false);
  };

  const handleResetFeedbackFlag = () => {
    resetFeedbackFlag();
    NavigationService.goBack();
  };

  const renderDataList = () => {
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
        {selectedData.length > 0 ? (
          <View
            style={{
              margin: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.addNewDataText}>Selected Items</Text>
            <Text
              style={[
                styles.addNewDataText,
                {color: theme.PRIMARY_COLOR, marginRight: 8},
              ]}>
              {selectedData.length}
            </Text>
          </View>
        ) : (
          <View
            style={{
              margin: 10,
              // alignItems: 'center',
            }}>
            <Text style={styles.addNewDataText}>No selections yet</Text>
          </View>
        )}

        <View style={{margin: 10}}>
          <Search
            handleSearch={handleSearch}
            pageName="personalInfoUpdate"
            placeholder={`Search ${pageName}`}
            value={searchText}
            onFocus={() =>
              handleSearchFocus(
                bottomDrawerVisibility === 'expand' ? 'collapse' : 'expand',
              )
            }
            autoFocus={autoFocus}
          />
        </View>
        {isSearchEnabled && filterDataList.length === 0 ? (
          <View>
            <Text
              variant="body1"
              style={styles.addLanguageText}
              style={{textAlign: 'center'}}>
              No result
            </Text>
          </View>
        ) : null}

        <ScrollView>
          {filterDataList.map(data => (
            <List.Item
              title={
                pageName === 'language'
                  ? data[dataLabel]
                  : `${data['label']} - ${data[dataLabel]}`
              }
              right={props => (
                <List.Icon
                  {...props}
                  icon={
                    selectedData.find(item => item.id === data.id)
                      ? 'check'
                      : 'plus-circle-outline'
                  }
                  color={theme.PRIMARY_COLOR}
                />
              )}
              onPress={() => handleSelectData(data)}
              style={styles.personalInfoListItem}
            />
          ))}
        </ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 10,
          }}>
          <Text style={styles.addNewDataText}>{addNewLine}</Text>
          <TouchableOpacity onPress={() => handleAddNewData()}>
            <Text style={{color: theme.PRIMARY_COLOR, marginLeft: 5}}>
              Add here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  return (
    <View
      style={{
        backgroundColor: '#fff',
        minHeight: getViewportHeight(true),
      }}>
      <GlobalOverlayLoading
        loading={languageLoading || amenitiesLoading}
        textContent=""
      />
      <ScrollView>
        {languageError || amenitiesError ? (
          <View style={{marginLeft: 30, marginRight: 30}}>
            <CustomAlert error={languageError || amenitiesError} />
          </View>
        ) : null}
        <View style={styles.languagesContainer}>
          {selectedData.length && selectedData.length > 0
            ? selectedData.map(item => {
                return (
                  <Chip
                    style={styles.selectedLanguageChip}
                    textStyle={styles.selectedLanguageChipText}
                    onClose={() => handleDelete(item)}>
                    {pageName === 'language'
                      ? item[dataLabel]
                      : `${item['label']} - ${item[dataLabel]}`}
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
        {renderDataList()}
      </RBSheet>

      <Portal>
        <Dialog
          visible={
            languageBusinessUpdateStatus || amenitiesBusinessUpdateStatus
          }
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>
            {pageName === 'language' ? 'Languages' : 'Amenities'} Updated!
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
          {renderDataList()}
        </View>
      )}
      <Portal>
        <Dialog visible={addNewData} onDismiss={handleModalClose}>
          <View>
            <Icon
              name="close"
              color={theme.PRIMARY_COLOR}
              size={32}
              style={styles.closeIcon}
              onPress={() => handleModalClose()}
            />
            <Suggestion
              pageName={pageName}
              label={label}
              description={suggestionDescription}
            />
          </View>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={feedbackSubmitted}
          onDismiss={handleResetFeedbackFlag}
          style={{borderRadius: 10}}>
          <Text style={styles.successAddDialogHeading}>
            New {label} Submitted!
          </Text>
          <Text style={styles.successAddDialogText}>
            Our support team will review your request and process it as soon as
            possible. You will receive a notification once the process has been
            completed.
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
    </View>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    place: state.business.place,
    token: state.user.token,
    languageLoading: state.business.loading['update-place-language'] || false,
    languageError: state.business.error['update-place-language'] || '',
    languageBusinessUpdateStatus:
      state.business.businessUpdateStatus['update-place-language'] || false,
    amenitiesLoading: state.business.loading['update-place-amenity'] || false,
    amenitiesError: state.business.error['update-place-amenity'] || '',
    amenitiesBusinessUpdateStatus:
      state.business.businessUpdateStatus['update-place-amenity'] || false,
    feedbackSubmitted: state.user.feedbackSubmitted,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updatePlace, resetBusinessUpdateStatus, resetFeedbackFlag},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(MoreInfoList);
