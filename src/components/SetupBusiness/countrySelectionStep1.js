import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
import {Button, Card, List} from 'react-native-paper';
import styles from '../../styles/businessSetup.style';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Menu, {MenuItem} from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {userHasPlaces} from '../../../utils';
import Geocoder from 'react-native-geocoding';
import {updateCountryLocation} from '../../../redux/app/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const CountrySelectionStep1 = ({
  countries,
  profile,
  updateCountryLocation,
  navigation,
}) => {
  const [selectedCountry, setSelectedCountry] = useState({});
  const [isNextPressed, setNextPressed] = useState(false);
  const screenWidth = Math.round(Dimensions.get('window').width);

  let countryMenu = null;
  const fileteredCountries = countries.filter(
    (country) => country.approved === 1,
  );
  const setMenuRef = (ref) => {
    countryMenu = ref;
  };
  const handleOpenCountryList = () => {
    countryMenu.show();
  };
  const handleSelectCountry = (item) => {
    setSelectedCountry(item);
    countryMenu.hide();
  };

  const handleNext = () => {
    // grab the selectedCountry lat,lng
    if (!isNextPressed) {
      setNextPressed(true);
      Geocoder.from(
        `${selectedCountry.capital ? selectedCountry.capital + ',' : ''}${
          selectedCountry.country
        }`,
      )
        .then((json) => {
          setNextPressed(false);
          if (json.results.length) {
            const {location} = json.results[0].geometry;
            updateCountryLocation({country: selectedCountry.id, location});
            NavigationService.navigate('BusinessSetupStep2', {
              country: {...selectedCountry, location: {...location}},
            });
          }
        })
        .catch((ex) => {
          setNextPressed(false);
        });
    }
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={isNextPressed} textContent="" />
      <View
        style={{flexDirection: 'column', alignItems: 'center', marginTop: 30}}>
        <Text style={styles.setupHeadings}>Where is your business based?</Text>
        <TouchableOpacity
          onPress={() => {
            handleOpenCountryList();
          }}>
          <View style={[styles.dropdownButton, {width: screenWidth - 50}]}>
            <Text style={styles.dropdownButtonLabel}>
              {selectedCountry.country || 'Select Country'}
            </Text>
            <Icon
              name="chevron-down"
              size={16}
              color="#939393"
              style={{
                position: 'absolute',
                top: 14,
                right: 20,
              }}
            />
          </View>
        </TouchableOpacity>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: '100%',
          }}>
          <Menu ref={setMenuRef} style={{width: screenWidth - 50}}>
            {fileteredCountries.map((item) => (
              <MenuItem key={item.id} onPress={() => handleSelectCountry(item)}>
                {item.country}
              </MenuItem>
            ))}
          </Menu>
        </View>
        <Text style={styles.setupSubHeadings}>Select a Country</Text>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
        }}>
        <Button
          mode="contained"
          disabled={selectedCountry.country ? false : true}
          onPress={handleNext}
          style={styles.nextButton}
          labelStyle={styles.nextButtonLabel}>
          Next
        </Button>
        <Button
          mode="text"
          onPress={() => {
            if (userHasPlaces(profile)) {
              NavigationService.navigate('BusinessManage', {reset: true});
            } else {
              NavigationService.goBack();
            }
          }}
          style={styles.exitButton}
          labelStyle={styles.exitButtonLabel}>
          Exit
        </Button>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: state.app.countries,
    profile: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({updateCountryLocation}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountrySelectionStep1);
