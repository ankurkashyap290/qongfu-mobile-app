import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import moment from 'moment';
import styles from '../../styles/businessPlaceProfile.style';
import PageLayout from '../../layout/PageLayout';
import DocumentList from './documentList';
import * as NavigationService from '../../navigators/NavigationService';
import {isUserLoggedIn} from '../../../utils';

const BusinessAccountInfo = ({profile, navigation, globalConfig}) => {
  const resetScreen = navigation.getParam('reset') || false;
  const place = navigation.getParam('place');
  const runDone = navigation.getParam('runDone');
  const [documents, setDocuments] = useState([]);
  const [creationInfo, setCreatedInfo] = useState([]);

  const [ekycFormConfig, setFormConfig] = useState(null);
  const [level1EKYC, setLevel1Config] = useState(null);

  useEffect(() => {
    if (resetScreen) {
      navigation.setParams({reset: false});
    }
  }, [resetScreen]);

  useEffect(() => {
    if (globalConfig) {
      setFormConfig(
        globalConfig.data.find((item) => item.name === 'ekyc-forms'),
      );
    } else {
      setFormConfig(null);
    }
  }, [globalConfig]);

  useEffect(() => {
    if (ekycFormConfig) {
      let formConfig = null;
      try {
        const tmpData = JSON.parse(ekycFormConfig.configuration);
        formConfig = tmpData.data.filter((item) =>
          ['claim-owner', 'claim-authorized'].includes(item.type),
        );
      } catch (ex) {
        console.log('Error while parsing configuration');
      }
      setLevel1Config(formConfig);
    } else {
      setLevel1Config(null);
    }
  }, [ekycFormConfig]);

  const getBusinessClaim = () => {
    return profile.claims.find((claim) => claim.place_id === place.id);
  };

  const updateCreatedInfo = (claim) => {
    const tableData = [];
    tableData.push({
      label: 'Creation Date',
      value: moment(claim.created_at ? claim.created_at : undefined).format(
        'h:mm a MMMM DD, YYYY',
      ),
    });
    tableData.push({
      label: 'Created By',
      value: profile.fullname,
    });
    tableData.push({
      label: 'Last Edited',
      value: moment(claim.updated_at ? claim.updated_at : undefined).format(
        'h:mm a MMMM DD, YYYY',
      ),
    });
    tableData.push({
      label: 'Last Edited By',
      value: profile.fullname,
    });
    setCreatedInfo(tableData);
  };

  const updateDocuments = (claim) => {
    const claimDocuments = claim.media.map((media) => {
      return {
        type: 'documents',
        label: media.name,
        document: media.file_name,
      };
    });
    setDocuments([
      {
        type: 'businessName',
        label: 'Business Legal Name',
        document: place.place_name,
      },
      ...claimDocuments,
    ]);
  };

  useEffect(() => {
    if (isUserLoggedIn(profile)) {
      const claim = getBusinessClaim();
      updateCreatedInfo(claim);
      updateDocuments(claim);
    }
  }, [profile]);

  useEffect(() => {
    if (runDone) {
      navigation.setParams({runDone: false});
      const claim = getBusinessClaim();
      NavigationService.navigate('EditBusinessAccountInfo', {
        reset: true,
        place: {...place},
        claim: {...claim},
        ownershipType: claim.ownership_type,
        documentsRequired: false,
      });
    }
  }, [runDone]);

  const handleDeactivateAccount = () => {
    NavigationService.navigate('BusinessDeactivate', {
      reset: true,
      place: {...place},
    });
  };

  return (
    <PageLayout>
      <DocumentList documents={documents} />
      <View
        style={{
          borderTopColor: '#dedede',
          borderTopWidth: 1,
          marginLeft: 30,
          marginRight: 30,
          marginTop: 30,
        }}>
        {creationInfo.map((data) => (
          <View style={styles.tableContainer}>
            <View style={styles.tableLabelContainer}>
              <Text style={styles.tableLabel}>{data.label}</Text>
            </View>
            <View style={{borderLeftColor: '#DEDEDE', borderLeftWidth: 1}} />
            <View>
              <Text style={styles.tableValue}>{data.value}</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={{alignItems: 'center', justifyContent: 'flex-end'}}>
        <Button
          mode="outlined"
          onPress={handleDeactivateAccount}
          style={styles.deactivateButton}
          labelStyle={styles.deactivateButtonLabel}>
          Deactivate account
        </Button>
        <Text style={[styles.legalText, styles.businessAccountInfoContainer]}>
          For legal purposes, Business Accounts cannot be deleted. By
          deactivating your account, it will be unviewable by all users and
          archived in Qongfu's records.
        </Text>
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.user.token,
    profile: state.user.profile,
    globalConfig: state.app.globalConfig,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BusinessAccountInfo);
