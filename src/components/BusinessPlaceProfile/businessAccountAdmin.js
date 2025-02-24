import React from 'react';
import {View, Text} from 'react-native';
import styles from '../../styles/businessPlaceProfile.style';
import PageLayout from '../../layout/PageLayout';
import TextField from '../custom/textField';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const BusinessAccountAdmin = ({profile}) => {
  return (
    <PageLayout>
      <View style={{margin: 30}}>
        <View style={{marginTop: 20}}>
          <Text style={styles.formFieldLabel}>Admin's email</Text>
          <TextField
            mode="outlined"
            name="email"
            value={profile.email}
            editable={false}
            icon="lock"
            style={styles.textInputField}
            theme={{
              roundness: 50,
            }}
          />
        </View>
        <View>
          <Text style={styles.formFieldLabel}>Admin's Password</Text>
          <TextField
            mode="outlined"
            name="email"
            value="********"
            editable={false}
            icon="lock"
            style={styles.textInputField}
            theme={{
              roundness: 50,
            }}
          />
        </View>
        <View>
          <Text style={styles.formFieldLabel}>Admin's Mobile</Text>
          <TextField
            mode="outlined"
            name="email"
            value={profile.contact_number}
            editable={false}
            icon="lock"
            theme={{
              roundness: 50,
            }}
          />
        </View>
        <View style={{marginTop: 70}}>
          <Text style={styles.accountManagementText}>
            This account is being managed by
          </Text>
          <Text style={styles.accountManagementName}>{profile.fullname}</Text>
          <Text style={styles.accountManagementText}>
            Any changes to the information above may be made through your
            personal account
          </Text>
        </View>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessAccountAdmin);
