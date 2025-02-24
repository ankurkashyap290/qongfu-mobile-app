import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {List, Button, Portal, Dialog, Text} from 'react-native-paper';
import styles from '../../styles/businessPlaceProfile.style';
import theme from '../../styles/theme.style';
import {
  updatePlace,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import {notification} from '../../../utils';
import CustomAlert from '../custom/customAlert';
import * as NavigationService from '../../navigators/NavigationService';
import PageLayout from '../../layout/PageLayout';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const ClientTypeUpdate = props => {
  const {
    token,
    loading,
    businessUpdateStatus,
    error,
    place,
    updatePlace,
    resetBusinessUpdateStatus,
    amenities,
    navigation,
  } = props;

  const [selectedClientType, setSelectedClientType] = useState(null);
  const runDone = navigation.getParam('runDone');
  const clientTypeAmenities = amenities.filter(
    item => item.label === 'Client type',
  );

  useEffect(() => {
    if (place && place.amenities) {
      const clientType = place.amenities.find(
        item => item.label === 'Client type',
      );
      setSelectedClientType(clientType);
    }
  }, [place]);

  useEffect(() => {
    if (runDone) {
      handleSubmit();
      navigation.setParams({runDone: false});
    }
  }, [runDone]);

  const handleSelectClientType = value => {
    setSelectedClientType(value);
  };

  const handleSubmit = () => {
    const placeAmenities = place.amenities.map(item => item.id);
    if (selectedClientType !== null) {
      updatePlace(
        {
          id: place.id,
          place_name: place.place_name,
          amenities: [...placeAmenities, selectedClientType.id],
          location_lat: place.location_lat,
          location_lng: place.location_lng,
          country_id: place.country_id,
          location_data: place.location_data,
        },
        token,
        'client-type',
      );
    } else {
      notification('Please select client type');
    }
  };

  const handleSuccessModalClose = () => {
    resetBusinessUpdateStatus('update-place-client-type');
    NavigationService.goBack();
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={loading} textContent="" />
      {error ? (
        <View style={{marginLeft: 30, marginRight: 30}}>
          <CustomAlert error={error} />
        </View>
      ) : null}
      <React.Fragment>
        <View style={{marginTop: 30}}>
          {clientTypeAmenities.map(item => (
            <List.Item
              title={
                <Text style={styles.clientTypeListTitle}>{item.info}</Text>
              }
              right={props => (
                <List.Icon
                  {...props}
                  icon={
                    selectedClientType && selectedClientType.id === item.id
                      ? 'check'
                      : ''
                  }
                  size={18}
                  color={theme.PRIMARY_COLOR}
                />
              )}
              titleStyle={styles.clientTypeListTitle}
              onPress={() => handleSelectClientType(item)}
              style={styles.clientTypeListItem}
            />
          ))}
        </View>
      </React.Fragment>
      <Portal>
        <Dialog
          visible={businessUpdateStatus}
          onDismiss={handleSuccessModalClose}>
          <Text style={styles.successDialogHeading}>Client Type Updated!</Text>

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
    place: state.business.place,
    token: state.user.token,
    loading: state.business.loading['update-place-client-type'] || false,
    error: state.business.error['update-place-client-type'] || '',
    businessUpdateStatus:
      state.business.businessUpdateStatus['update-place-client-type'] || false,
    amenities: state.app.amenities,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators({updatePlace, resetBusinessUpdateStatus}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ClientTypeUpdate);
