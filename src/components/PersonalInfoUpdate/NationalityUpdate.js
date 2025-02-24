import React, {useState, useEffect} from 'react';
import {View, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List, Portal, Dialog, Button, Text} from 'react-native-paper';
import styles from '../../styles/personalInfo.style';
import Search from '../custom/search';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import {getViewportHeight} from '../../../utils/helper';
import {notification} from '../../../utils';
import * as NavigationService from '../../navigators/NavigationService';

const NationalityUpdate = props => {
  const {
    profile,
    token,
    updateUserDetails,
    resetUserDetailsUpdatedFlag,
    userDetailsUpdated,
    countries,
    error,
    navigation,
  } = props;
  const [filterNationalityList, setFilterNationalityList] = useState([
    ...countries,
  ]);
  const [selectedNationality, setSelectedNationality] = useState(
    profile.country ? profile.country : {},
  );
  const [isSearchEnabled, setIsSearchEnabled] = useState(false);
  const runDone = navigation.getParam('runDone');

  useEffect(() => {
    if (runDone) {
      handleSubmit();
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  useEffect(() => {
    if (error) {
      notification(error);
    }
  }, [error]);

  const handleNationalitySearch = searchText => {
    const tempSelectedValue = [...countries];
    if (searchText.length > 2) {
      setIsSearchEnabled(true);
      const foundedValues = tempSelectedValue.filter(item => {
        const nationalityMatched = item.nationality.indexOf(searchText) >= 0;
        const countryMatched = item.country.indexOf(searchText) >= 0;
        return nationalityMatched || countryMatched;
      });

      if (foundedValues.length) {
        const foundedNationality = foundedValues.map(item => {
          return item;
        });
        setFilterNationalityList(foundedNationality);
      } else {
        setFilterNationalityList([]);
      }
    } else {
      setFilterNationalityList([...countries]);
      setIsSearchEnabled(false);
    }
  };

  const handleSelectNationality = nationality => {
    setSelectedNationality(nationality);
  };

  const handleSubmit = () => {
    const payload = {
      first_name: profile.first_name,
      last_name: profile.last_name,
      nationality_id: selectedNationality.id,
    };
    updateUserDetails(
      {...payload},
      token,
      '',
      'personal-info-nationality-update',
    );
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('personal-info-nationality-update');
    NavigationService.goBack();
  };

  return (
    <View
      style={{
        backgroundColor: '#fff',
        height: getViewportHeight(true),
      }}>
      <View style={{margin: 10}}>
        <Search
          handleSearch={handleNationalitySearch}
          pageName="personalInfoUpdate"
          placeholder="Search nationality"
        />
      </View>

      {isSearchEnabled && filterNationalityList.length === 0 ? (
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
        <View style={{marginBottom: 20}}>
          {filterNationalityList.map(country => (
            <List.Item
              title={country.nationality}
              right={props => (
                <List.Icon
                  {...props}
                  style={
                    selectedNationality.nationality === country.nationality
                      ? styles.selectedCircleIcon
                      : styles.circleIcon
                  }
                />
              )}
              onPress={() => handleSelectNationality(country)}
              style={[styles.personalInfoListItem]}
            />
          ))}
        </View>
      </ScrollView>
      <Portal>
        <Dialog
          visible={userDetailsUpdated}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>Nationality Updated!</Text>

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
        'update-details-personal-info-nationality-update'
      ] || null,
    countries: state.app.countries,
    error:
      state.user.error['update-details-personal-info-nationality-update'] ||
      null,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {updateUserDetails, resetUserDetailsUpdatedFlag},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(NationalityUpdate);
