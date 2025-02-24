import React, {useState, useEffect} from 'react';
import {View, Text, ScrollView, Dimensions, Image} from 'react-native';
import {
  Divider,
  List,
  Button,
  RadioButton,
  Portal,
  Dialog,
  TextInput,
  HelperText,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/deactivateBusinessAccount.style';
import theme from '../../styles/theme.style';
import {CountriesList, defaultCountry} from '../../../config';
import PageLayout from '../../layout/PageLayout';
import BusinessSetupIcon from '../../assets/img/business_setup.svg';
import TextField from '../custom/textField';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  deactivateBusinessAccount,
  resetBusinessUpdateStatus,
} from '../../../redux/business/actions';
import * as NavigationService from '../../navigators/NavigationService';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import CustomAlert from '../custom/customAlert';
const DeactivateBusinessAccount = ({
  accountType,
  loading,
  deActiveBusinessStatus,
  error,
  token,
  deactivateBusinessAccount,
  businessUpdateStatus,
  resetBusinessUpdateStatus,
  navigation,
}) => {
  const resetMe = navigation.getParam('reset') || false;
  const place = navigation.getParam('place') || null;
  const [deactivateReason, setDeactivateReason] = useState('');
  const [reason, setReason] = useState('');
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [reasonError, setReasonError] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  //   const [errorModal, setErrorModal] = useState(false);
  const [invalidPlaceError, setInvalidPlaceError] = useState('');

  useEffect(() => {
    if (resetMe) {
      deactivateReason && setDeactivateReason('');
      reason && setReason('');
      confirmationModal && setConfirmationModal(false);
      reasonError && setReasonError(false);
      successModal && setSuccessModal(false);
      invalidPlaceError && setInvalidPlaceError('');
      navigation.setParams({reset: false});
    }
  }, [resetMe]);

  useEffect(() => {
    if (businessUpdateStatus) {
      setSuccessModal(true);
    } else {
      setSuccessModal(false);
    }
  }, [businessUpdateStatus]);

  const handleSelectReason = (value) => {
    setDeactivateReason(value);
    setReasonError(false);
  };
  const handleChange = (value) => {
    if (value.length <= 255) {
      setReason(value);
    }
  };
  const handleConfirmationModal = () => {
    if (deactivateReason === 'other' && reason === '') {
      setReasonError(true);
    } else {
      setConfirmationModal(true);
    }
  };

  //   const handleModalClose = () => {
  //     setErrorModal(false);
  //   };

  const handleConfirmModalClose = () => {
    setConfirmationModal(false);
  };

  const handleSuccessModalClose = () => {
    // do nothing here
  };

  const handleSuccessDone = () => {
    //   navigate to settings
    resetBusinessUpdateStatus('deactivate-business');
    setSuccessModal(false);
    if (accountType === 2) {
      NavigationService.navigate('ManageBusiness');
    } else {
      NavigationService.navigate('Settings');
    }
  };

  const handleDeactivateAccount = () => {
    const payload = {
      account_type: accountType,
      reason:
        deactivateReason === 'business-closed'
          ? 'I have closed my business'
          : reason,
    };
    if (accountType === 2) {
      if (place) {
        payload.place_id = place.id;
      } else {
        setInvalidPlaceError('Invalid Place');
        return;
      }
    }
    deactivateBusinessAccount(payload, token);
  };
  //   const handleDeactivateAccountError = () => {
  //     setErrorModal(true);
  //   };

  const renderForm = () => {
    return (
      <React.Fragment>
        <View style={{flexDirection: 'column', margin: 30}}>
          <Text style={styles.deactivateAccountTitle}>
            Deactivate Business Account
          </Text>
          <Text style={styles.deactivateAccountContent}>
            If you wish to deactivate your business account back to a regular
            account, all your busniess data except media files will be preserved
            and hidden for a period of 12 months. If you decide to reactivate
            your business account within this period you will retain your
            business data. After the 12 month period your business data will be
            deleted. Deactivating business account will:
          </Text>
          <View style={{paddingLeft: 10}}>
            <List.Item
              title="Unpublish (hide) your business data causing it not to be visible
            to the public"
              titleStyle={styles.listTitle}
              style={styles.listStyle}
              titleNumberOfLines={2}
              left={(props) => (
                <Icon
                  {...props}
                  name="circle"
                  size={6}
                  color="#0065AB"
                  style={{marginTop: 17}}
                />
              )}
            />
            <List.Item
              title="Cause loss of all your business media gallery data (30 days from
            deactivation)"
              titleStyle={styles.listTitle}
              style={styles.listStyle}
              titleNumberOfLines={2}
              left={(props) => (
                <Icon
                  {...props}
                  name="circle"
                  size={6}
                  color="#0065AB"
                  style={{marginTop: 17}}
                />
              )}
            />
            <List.Item
              title="Cancel all your business-related subscriptions (end of your
            subscription)"
              titleStyle={styles.listTitle}
              style={styles.listStyle}
              titleNumberOfLines={2}
              left={(props) => (
                <Icon
                  {...props}
                  name="circle"
                  size={6}
                  color="#0065AB"
                  style={{marginTop: 17}}
                />
              )}
            />
          </View>
          <Text style={styles.deactivateAccountContent}>
            Please let us know the reason you've decided to deactivate your
            business account from below options:
          </Text>
          <RadioButton.Group
            onValueChange={(value) => handleSelectReason(value)}
            value={deactivateReason}>
            <View style={styles.radioContainer} key={deactivateReason}>
              <RadioButton.Android
                uncheckedColor="#f1f1f1"
                value={'business-closed'}
                color="#0065AB"
              />
              <View style={styles.radioButtonContainer}>
                <Text style={styles.radioButtonText}>
                  I've closed my business
                </Text>
              </View>
            </View>
            <View
              style={styles.radioContainer}
              // key={`${item.value}-${index}`}
            >
              <RadioButton.Android
                uncheckedColor="#f1f1f1"
                value={'other'}
                color="#0065AB"
              />
              <View style={styles.radioButtonContainer}>
                <Text style={styles.radioButtonText}>Other:</Text>
              </View>
            </View>
          </RadioButton.Group>
          <View style={{paddingLeft: 40}}>
            <TextInput
              style={styles.reasonField}
              editable={deactivateReason === 'other' ? true : false}
              placeholder="Type your message..."
              placeholderTextColor="#B5B5B5"
              value={reason}
              multiline
              numberOfLines={4}
              onChangeText={(value) => handleChange(value)}
              theme={{
                colors: {
                  primary: theme.SECONDARY_COLOR,
                  underlineColor: theme.SECONDARY_COLOR,
                },
              }}
            />
            <HelperText
              type="error"
              visible={reasonError}
              style={styles.dobErrorText}>
              * Please give reason to deactivate your business.
            </HelperText>
          </View>
          <Text style={styles.deactivateAccountItalicContent}>
            If you wish to continue this action the above will be done at your
            discretion
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flex: 1,
            marginBottom: 40,
          }}>
          <Button
            mode="outlined"
            onPress={() => handleConfirmationModal()}
            style={
              deactivateReason === ''
                ? styles.disableDeactivateButton
                : styles.deactivateButton
            }
            disabled={deactivateReason === ''}
            labelStyle={
              deactivateReason === ''
                ? styles.disableDeactivateButtonLabel
                : styles.deactivateButtonLabel
            }>
            Deactivate Business
          </Button>
        </View>
      </React.Fragment>
    );
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={loading} textContent="" />
      {accountType ? renderForm() : null}
      <Portal>
        <Dialog
          visible={confirmationModal}
          onDismiss={handleConfirmModalClose}
          style={styles.confirmationModal}>
          <Text style={styles.deactivateAccountModalTitle}>Are you sure?</Text>
          <Text style={styles.deactivateAccountModalContent}>
            Some data may be lost permanently by continuing this action.
          </Text>

          <View style={styles.updateButtonContainer}>
            {error || invalidPlaceError ? (
              <View>
                <CustomAlert error={error ? error : invalidPlaceError} />
              </View>
            ) : null}

            <Button
              mode="outlined"
              style={styles.deactivateButton}
              labelStyle={styles.deactivateButtonLabel}
              onPress={() => handleDeactivateAccount()}>
              Yes. Deactivate Now
            </Button>
            <Button
              mode="text"
              labelStyle={styles.deactivateAccountModalContent}
              onPress={() => handleConfirmModalClose()}
              style={{marginTop: 15}}>
              Cancel
            </Button>
          </View>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog
          visible={successModal}
          onDismiss={handleSuccessModalClose}
          style={styles.successModal}>
          <Text style={styles.deactivateAccountSuccessTitle}>Success</Text>
          <Text
            style={[styles.deactivateAccountContent, {textAlign: 'center'}]}>
            Your account was successfully{'\n'} deactivated. Your business
            account will{'\n'} not be viewable from the public and will{'\n'} be
            archived in our records.
          </Text>
          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              style={styles.deactivateSuccessButton}
              labelStyle={styles.deactivateSuccessButtonLabel}
              onPress={() => handleSuccessDone()}>
              Done
            </Button>
          </View>
        </Dialog>
      </Portal>
      {/* <Portal>
        <Dialog
          visible={errorModal}
          onDismiss={handleModalClose}
          style={styles.successModal}>
          <Text style={styles.deactivateAccountSuccessTitle}>We apologize</Text>
          <Text
            style={[styles.deactivateAccountContent, {textAlign: 'center'}]}>
            Your account cannot be deactivated due{'\n'} to bookings made with
            Qongfu users.
          </Text>
          <Text
            style={[styles.deactivateAccountContent, {textAlign: 'center'}]}>
            Your account cannot be deactivated due{'\n'} to bookings made with
            Qongfu users.
          </Text>
          <Text style={styles.email}>biz.support@qongfu.com</Text>
          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              style={styles.sendEmailButton}
              labelStyle={styles.deactivateSuccessButtonLabel}
              onPress={() => handleModalClose()}>
              Send Email
            </Button>
            <Button
              mode="outlined"
              style={styles.okayButton}
              labelStyle={styles.okayButtonLabel}
              onPress={() => handleModalClose()}>
              Okay
            </Button>
          </View>
        </Dialog>
      </Portal> */}
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    accountStatus: state.business.accountStatus,
    token: state.user.token,
    deActiveBusinessStatus: state.business.deActiveBusinessStatus,
    loading: state.business.loading['deActiveBusiness'] || false,
    error: state.business.error['deActiveBusiness'] || '',
    businessUpdateStatus:
      state.business.businessUpdateStatus['deactivate-business'] || false,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {deactivateBusinessAccount, resetBusinessUpdateStatus},
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeactivateBusinessAccount);
