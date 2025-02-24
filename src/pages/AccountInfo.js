import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import styles from '../styles/accountInfo.style';
import * as NavigationService from '../navigators/NavigationService';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PageLayout from '../layout/PageLayout';

const AccountInfo = props => {
  const {profile} = props;

  return profile ? (
    <PageLayout>
      <View style={styles.nameSection}>
        <Text style={[styles.fieldHeadings, {width: 150}]}>First Name</Text>
        <View>
          <Text style={styles.fieldHeadings}>Last Name</Text>
        </View>
      </View>
      <View style={styles.nameSection}>
        <Text style={[styles.fieldValues, {width: 150}]}>
          {profile.first_name}
        </Text>
        <View style={{width: 150}}>
          <Text style={styles.fieldValues}>{profile.last_name}</Text>
        </View>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => NavigationService.navigate('UserNameUpdate')}>
          <Icon name="edit" size={20} style={{color: '#919191'}} />
        </TouchableOpacity>
      </View>

      <Text style={styles.fieldHeadings}>Email / Username </Text>
      {profile.email_verified ? (
        <View style={styles.verifiedIcon}>
          <Button
            icon="check-circle"
            color="#54b948"
            labelStyle={styles.verifiedText}>
            Verified
          </Button>
        </View>
      ) : null}
      <View style={styles.nameSection}>
        <Text style={[styles.fieldValues, {width: 300}]}>{profile.email}</Text>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => NavigationService.navigate('EmailUpdate')}>
          <Icon name="edit" size={20} style={{color: '#919191'}} />
        </TouchableOpacity>
      </View>

      <Text style={styles.fieldHeadings}>Password</Text>
      <View style={styles.nameSection}>
        <Text style={[styles.fieldValues, {width: 300}]}>********</Text>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => NavigationService.navigate('PasswordUpdate')}>
          <Icon name="edit" size={20} style={{color: '#919191'}} />
        </TouchableOpacity>
      </View>

      <Text style={styles.fieldHeadings}>Mobile</Text>
      {profile.contact_number_verified ? (
        <View style={styles.verifiedIcon}>
          <Button
            icon="check-circle"
            color="#54b948"
            labelStyle={styles.verifiedText}>
            Verified
          </Button>
        </View>
      ) : null}
      <View style={styles.nameSection}>
        <Text style={[styles.fieldValues, {width: 300}]}>
          {profile.contact_number}
        </Text>
        <TouchableOpacity
          style={styles.editIcon}
          onPress={() => NavigationService.navigate('MobileUpdate')}>
          <Icon name="edit" size={20} style={{color: '#919191'}} />
        </TouchableOpacity>
      </View>
    </PageLayout>
  ) : null;
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    userLoading: state.user.loading,
    profile: state.user.profile,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);
