import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
  ScrollView,
  TextInput,
} from 'react-native';
import {
  Button,
  Card,
  List,
  Divider,
  Portal,
  Surface,
  Avatar,
} from 'react-native-paper';
import styles from '../../styles/businessSetup.style';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userHasPlaces} from '../../../utils';
import {searchUnClaimed} from '../../../redux/business/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import {IMAGE_URL_PREFIX} from '../../../config';
import {getViewportHeight} from '../../../utils/helper';
// import CustomAlert from '../custom/customAlert';

const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);

const BusinessNameSelectionStep2 = ({
  unclaimedPlaces,
  loading,
  profile,
  navigation,
  searchUnClaimed,
}) => {
  const country = navigation.getParam('country');
  const [openSearchList, setSearchList] = useState(false);
  const [businessName, setBusinessName] = useState('');

  const handleSearchFocus = () => {
    setSearchList(true);
  };
  const handleSearchBlur = () => {
    setSearchList(false);
  };
  const handleSearchBusiness = (searchPhrase) => {
    setBusinessName(searchPhrase);
    if (searchPhrase.length > 2) {
      searchUnClaimed({search: searchPhrase, country_id: country.id});
    }
  };

  const getLogoUrl = (place) => {
    return place.place_logo_url
      ? `${IMAGE_URL_PREFIX}${place.place_logo_url}`
      : `https://via.placeholder.com/728.png?text=${place.place_name}`;
  };

  const handleClaimNow = (item) => {
    NavigationService.navigate('BusinessSetupStep5', {
      place: {...item},
    });
  };

  const renderSearchBox = () => {
    return (
      <View>
        <View>
          <TextInput
            mode="outlined"
            value={businessName}
            placeholder="Business Name"
            onChangeText={(text) => handleSearchBusiness(text)}
            onFocus={handleSearchFocus}
            // onBlur={handleSearchBlur}
            style={styles.businessNameSearchField}
            theme={{
              roundness: 50,
              width: '80%',
              colors: {
                primary: theme.PRIMARY_COLOR,
                underlineColor: theme.PRIMARY_COLOR,
              },
              borderColor: theme.PRIMARY_COLOR,
              color: theme.PRIMARY_COLOR,
              fonts: {
                regular: 'Poppins',
              },
            }}
            // marginLeft={20}
          />
        </View>
        <View>
          {openSearchList && (
            <React.Fragment>
              <TouchableWithoutFeedback onPress={handleSearchBlur}>
                <View
                  style={[
                    styles.searchOverlay,
                    {height: getViewportHeight(true), width: screenWidth + 60},
                  ]}
                />
              </TouchableWithoutFeedback>
              <Surface style={[styles.searchListView]}>
                <ScrollView keyboardShouldPersistTaps="always">
                  {loading ? (
                    <List.Item title="Loading..." />
                  ) : businessName === '' ? (
                    <List.Section>
                      <Text style={styles.businessNameSubheader}>
                        Type the business name or tap "claim" if the business
                        already exists on the list below.
                      </Text>
                    </List.Section>
                  ) : unclaimedPlaces.length === 0 ? (
                    <List.Item title="Not Found" />
                  ) : (
                    <List.Section>
                      <Text style={styles.businessNameSubheader}>
                        Type the business name or tap "claim" if the business
                        already exists on the list below.
                      </Text>

                      {unclaimedPlaces.map((item, index) => {
                        return (
                          <View>
                            <Divider style={styles.businessNameDivider} />

                            <List.Item
                              key={index}
                              left={(props) => (
                                <View style={{justifyContent: 'center'}}>
                                  <Surface
                                    style={[
                                      {
                                        elevation: 0,
                                        borderRadius: 80,
                                        borderColor: '#fff',
                                        borderWidth: 1,
                                      },
                                    ]}>
                                    <Avatar.Image
                                      size={26}
                                      source={{uri: getLogoUrl(item)}}
                                      style={{backgroundColor: '#fff'}}
                                    />
                                  </Surface>
                                </View>
                              )}
                              right={(props) => (
                                <View style={{justifyContent: 'center'}}>
                                  <Button
                                    {...props}
                                    mode="text"
                                    color={theme.PRIMARY_COLOR}
                                    labelStyle={styles.claimButtonLabel}
                                    onPress={() => {
                                      handleClaimNow(item);
                                    }}>
                                    Claim
                                  </Button>
                                </View>
                              )}
                              title={item.place_name}
                              description={`(${item.location})`}
                              titleStyle={styles.businessNameListTitle}
                              descriptionStyle={styles.businessNameListDesc}
                              // onPress={() => handleListItemClick(item)}
                            />
                          </View>
                        );
                      })}
                    </List.Section>
                  )}
                </ScrollView>
              </Surface>
            </React.Fragment>
          )}
        </View>
      </View>
    );
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={loading} textContent="" />
      <View style={{marginTop: 30}}>
        <Text style={styles.setupHeadings}>What's your business's name?</Text>
        <View style={styles.businessNameField}>{renderSearchBox()}</View>
        {openSearchList ? null : (
          <Text style={styles.setupSubHeadings}>
            Let's help you setup your business!
          </Text>
        )}
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
          disabled={!country && businessName.length > 2}
          onPress={() => {
            NavigationService.navigate('BusinessSetupStep3', {
              country: country,
              businessName: businessName,
            });
          }}
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
              NavigationService.pop(2);
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
    token: state.user.token,
    unclaimedPlaces: state.business.unclaimedPlaces,
    loading: state.business.loading['unclaimed-search'] || false,
    error: state.business.error['unclaimed-search'] || false,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({searchUnClaimed}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessNameSelectionStep2);
