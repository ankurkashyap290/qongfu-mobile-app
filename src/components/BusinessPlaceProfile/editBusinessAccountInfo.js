import React from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../../styles/businessPlaceProfile.style';
import PageLayout from '../../layout/PageLayout';
import TextField from '../custom/textField';

const EditBusinessAccountInfo = (props) => {
  return (
    <PageLayout>
      <View style={{margin: 30}}>
        <Text style={styles.editAccountInfoText}>
          Please note that your company's info will only be updated and
          published after we approve the required documents.
        </Text>
        <View>
          <Text style={styles.formFieldLabel}>
            New Business Legal Name (optional)
          </Text>
          <TextField
            mode="outlined"
            name="email"
            value=""
            placeholder="Type here"
            icon="info-circle"
            theme={{
              roundness: 50,
            }}
          />
        </View>

        <View>
          <Text style={styles.formFieldLabel}>
            Upload New Commercial registration
          </Text>
        </View>
      </View>
      <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
        <Button
          mode="contained"
          // onPress={handleSubmit}
          style={styles.deactivateButton}
          labelStyle={styles.submitButtonLabel}>
          Submit
        </Button>
      </View>
    </PageLayout>
  );
};

export default EditBusinessAccountInfo;
