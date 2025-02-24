import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Dialog} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import styles from '../../styles/helpDesk.style';
import theme from '../../styles/theme.style';
import TextField from '../custom/textField';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';

const HelpDesk = ({profile, visible, onClose}) => {
  const [helpdeskReview, setHelpdeskReview] = useState('');
  const [helpdeskSuccess, setHelpdeskSuccess] = useState(false);
  const [helpdeskError, setHelpdeskError] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  const handleHelpDeskModalClose = () => {
    setHelpdeskSuccess(false);
    onClose();
  };

  const handleHelpdeskReviewChange = (value) => {
    setHelpdeskReview(value);
    setHelpdeskError(false);
  };

  const handleSubmit = () => {
    if (helpdeskReview !== '') {
      setHelpdeskError(false);
      setSubmit(true);
      const payload = {
        text: `(id:${profile && profile.id}) ${
          profile && profile.fullname
        } - ${helpdeskReview}`,
      };
      axios
        .post(
          `https://hooks.slack.com/services/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`,
          {...payload},
          {
            headers: {
              'Content-type': 'application/json',
            },
          },
        )
        .then((response) => {
          setSubmit(false);
          setHelpdeskReview('');
          setHelpdeskSuccess(true);
        })
        .catch((error) => {
          console.log('error', error);
          setSubmit(false);
        });
    } else {
      setHelpdeskError(true);
    }
  };
  return (
    <Dialog
      visible={visible}
      onDismiss={handleHelpDeskModalClose}
      style={styles.helpDeskDialog}>
      {helpdeskSuccess ? (
        <View>
          <Text style={[styles.modalTitle, {marginTop: 40}]}>Success!</Text>
          <Icon
            name="checkcircle"
            size={90}
            color={theme.PRIMARY_COLOR}
            style={{textAlign: 'center', marginTop: 10}}
          />
          <Text style={styles.modalDescription}>
            Your query has been submitted.
          </Text>
          <Text style={styles.successModalDescription}>
            We will get back to you soon!
          </Text>
          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              style={styles.updateButton}
              labelStyle={styles.updateButtonLable}
              onPress={handleHelpDeskModalClose}>
              OK
            </Button>
          </View>
        </View>
      ) : (
        <View>
          <Icon
            name="close"
            color={theme.PRIMARY_COLOR}
            size={25}
            style={styles.closeIcon}
            onPress={() => handleHelpDeskModalClose()}
          />
          <GlobalOverlayLoading loading={isSubmit} textContent="" />
          <Text style={styles.modalTitle}>Help Desk</Text>
          <Text style={styles.label}>How can we help you?</Text>
          <View style={{marginLeft: 20, marginRight: 20}}>
            <TextField
              onChangeText={(value) => handleHelpdeskReviewChange(value)}
              value={helpdeskReview}
              placeholder="Write your query here"
              multiline={true}
              style={{minHeight: 70}}
              theme={{
                roundness: 10,
                colors: {
                  primary: theme.SECONDARY_COLOR,
                  underlineColor: theme.SECONDARY_COLOR,
                },
              }}
              errorMessage={
                helpdeskError ? 'Please write your query message.' : ''
              }
            />
          </View>
          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.updateButton}
              labelStyle={styles.updateButtonLable}>
              Submit
            </Button>
          </View>
        </View>
      )}
    </Dialog>
  );
};

export default HelpDesk;
