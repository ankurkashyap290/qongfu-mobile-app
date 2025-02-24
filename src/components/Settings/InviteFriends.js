import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View} from 'react-native';
import {Button, Text, Portal, Dialog} from 'react-native-paper';
import theme from '../../styles/theme.style';
import styles from '../../styles/inviteFriends.style';
import {
  fetchContactStatus,
  sendInvitation,
  resetInvitationFlag,
} from '../../../redux/friends/actions';
import InvitationSentIcon from '../../assets/img/invitation-sent-icon.svg';
import PhoneContacts from '../Contacts/PhoneContacts';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import CustomAlert from '../custom/customAlert';

const InviteFriends = ({
  navigation,
  token,
  fetchContactStatus,
  contactsStatusList,
  contactsStatusLoading,
  sendInvitation,
  isInvitationSent,
  invitationLoading,
  invitationError,
  resetInvitationFlag,
  countries,
}) => {
  const [successModal, toggleInviteSuccess] = useState(false);

  useEffect(() => {
    if (isInvitationSent) {
      toggleInviteSuccess(true);
    } else {
      toggleInviteSuccess(false);
    }
  }, [isInvitationSent]);

  const handleInviteContact = (contact) => {
    handleInviteSelected([contact]);
  };

  const handleInviteSelected = (contacts) => {
    sendInvitation(
      {
        contacts: contacts.map((contact) => ({
          contact_number: contact.contactNumber,
        })),
      },
      token,
    );
  };
  const handleSuccessModalClose = () => {
    toggleInviteSuccess(false);
    resetInvitationFlag();
  };

  return (
    <View>
      <GlobalOverlayLoading
        loading={contactsStatusLoading || invitationLoading}
        textContent=""
      />
      {invitationError ? <CustomAlert error={invitationError} /> : null}
      <PhoneContacts
        navigation={navigation}
        listData={contactsStatusList}
        fetchDataAction={(contacts) => {
          fetchContactStatus(
            contacts.map((contact) => ({
              contact_number: contact.contactNumber,
            })),
            token,
          );
        }}
        actionButton={{
          label: 'Invite',
          onAction: handleInviteContact,
          style: {borderRadius: 20, borderColor: theme.PRIMARY_COLOR},
          labelStyle: {
            fontSize: 14,
            fontWeight: theme.FONT_WEIGHT_MEDIUM,
            textTransform: 'capitalize',
            marginVertical: 7,
          },
        }}
        actionStatuses={[
          {status: 0, label: 'Not Member'},
          {
            status: 1,
            label: 'Member',
            style: {
              lineHeight: 19,
              fontSize: 14,
              fontFamily: 'Roboto',
              color: theme.PRIMARY_COLOR,
              textTransform: 'capitalize',
            },
          },
          {
            status: 2,
            label: 'Invited',
            style: {
              lineHeight: 19,
              fontSize: 14,
              fontFamily: 'Roboto',
              color: '#B5B5B5',
              fontStyle: 'italic',
              textTransform: 'capitalize',
            },
          },
        ]}
        multiSelectActionButton={{
          label: 'Invite Selected Contacts',
          onAction: handleInviteSelected,
        }}
        countries={countries}
      />
      <Portal>
        <Dialog
          visible={successModal}
          onDismiss={handleSuccessModalClose}
          style={{alignItems: 'center', padding: 20, borderRadius: 8}}>
          <InvitationSentIcon />
          <Text style={styles.successDialogHeading}>Invitation Sent!</Text>
          <Text style={styles.successDialogText}>
            You have successfully invited your{'\n'}contacts to Qongfu.
          </Text>
          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              style={styles.successButton}
              labelStyle={styles.successButtonLabel}
              onPress={() => {
                handleSuccessModalClose();
                fetchContactStatus(
                  contactsStatusList.map((contact) => ({
                    contact_number: contact.contact_number,
                  })),
                  token,
                );
              }}>
              Done
            </Button>
          </View>
        </Dialog>
      </Portal>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    contactsStatusList: state.friends.contacts,
    contactsStatusLoading:
      state.friends.loading['fetch-contact-status'] || false,
    countries: state.app.countries,
    isInvitationSent: state.friends.isInvitationSent,
    invitationLoading: state.friends.loading['send-invitation'] || false,
    invitationError: state.friends.error['send-error'] || false,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchContactStatus,
      sendInvitation,
      resetInvitationFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(InviteFriends);
