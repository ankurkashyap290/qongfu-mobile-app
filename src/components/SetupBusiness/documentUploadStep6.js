import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button, Checkbox} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PageLayout from '../../layout/PageLayout';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import DocumentField from '../custom/DocumentField';
import CustomAlert from '../custom/customAlert';
import {
  resetBusinessUpdateStatus,
  createClaim,
  updateClaim,
} from '../../../redux/business/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import styles2 from '../../styles/businessSetup.style';
import styles3 from '../../styles/businessPlaceProfile.style';
import AuthenticationIcon from '../../assets/img/shield_95x104.svg';
import {getDocumentFieldFileName} from '../../../utils';
import TextField from '../custom/textField';

const DocumentUploadStep6 = ({
  mode,
  globalConfig,
  businessUpdateStatus,
  createClaim,
  updateClaim,
  resetBusinessUpdateStatus,
  updateLoading,
  updateError,
  profile,
  token,
  navigation,
}) => {
  const resetScreen = navigation.getParam('reset') || false;
  const documentsRequired = navigation.getParam('documentsRequired') || false;
  const place = navigation.getParam('place') || null;
  const claim = navigation.getParam('claim');
  const ownershipType = navigation.getParam('ownershipType');
  const [ekycFormConfig, setFormConfig] = useState(null);
  const [level1EKYC, setLevel1Config] = useState(null);
  const [acceptCondition, setAcceptCondition] = useState(false);
  const [documents, saveDocuments] = useState([]);
  const [documentsMode, saveDocumentsMode] = useState([]);
  const [newBusinessName, setNewBusinessName] = useState('');

  useEffect(() => {
    if (resetScreen) {
      navigation.setParams({reset: false, configLoaded: false});
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
        formConfig = tmpData.data.find(
          (item) =>
            item.type ===
            (ownershipType === 0 ? 'claim-owner' : 'claim-authorized'),
        );
      } catch (ex) {
        console.log('Error while parsing configuration');
      }
      setLevel1Config(formConfig);
    } else {
      setLevel1Config(null);
    }
  }, [ekycFormConfig]);

  useEffect(() => {
    if (businessUpdateStatus) {
      saveDocuments([]);
      saveDocumentsMode([]);
      resetBusinessUpdateStatus('update-business-documents');
      if (mode === 'edit-business') {
        NavigationService.navigate('BusinessManage', {reset: true});
      } else {
        NavigationService.navigate('BusinessSetupSuccess');
      }
    }
  }, [businessUpdateStatus]);

  const handleDocumentFieldChange = (field, value) => {
    const filteredDocuments = documents.filter(
      (document) => document.id !== field.id,
    );
    filteredDocuments.push({id: field.id, value});
    saveDocuments(filteredDocuments);
    handleDocumentFieldEditMode(field, false);
  };

  const handleDocumentFieldEditMode = (field, mode) => {
    const filteredDocuments = documentsMode.filter(
      (document) => document.id !== field.id,
    );
    filteredDocuments.push({id: field.id, mode});
    saveDocumentsMode(filteredDocuments);
  };

  const getSelectedFieldDocuments = (field) => {
    const found = documents.find((document) => document.id === field.id);
    if (found) {
      return found.value;
    }
    return null;
  };

  const renderFormFields = () => {
    if (level1EKYC) {
      return level1EKYC['form-configuration'].map((field) => (
        <DocumentField
          fieldType="business"
          fieldData={field}
          submittedDocuments={documentsRequired ? getSubmittedDocuments() : []}
          selectedDocuments={getSelectedFieldDocuments(field)}
          onChange={(value) => {
            handleDocumentFieldChange(field, value);
          }}
          onEditMode={(mode) => {
            handleDocumentFieldEditMode(field, mode);
          }}
        />
      ));
    } else {
      return null;
    }
  };

  const handlePoliciesLink = () => {
    Alert.alert('error', 'Not Implemented Yet');
  };

  const getUploadedDocuments = () => {
    // loop documents to generate payload
    const uploadDocuments = [];
    const updateTitleRequiredDocuments = [];
    documents.map((document) => {
      document.value.map((fileDoc) => {
        const uploadDocument = {
          title: fileDoc.title,
          file: fileDoc.file,
        };
        if (fileDoc.expiration) {
          uploadDocument['expiration'] = fileDoc.expiration;
        }
        uploadDocuments.push(uploadDocument);
        if (fileDoc.updateRequiredId) {
          updateTitleRequiredDocuments.push({
            id: fileDoc.updateRequiredId,
            label: fileDoc.title,
          });
        }
        return fileDoc;
      });
      return document;
    });
    return {uploadDocuments, updateTitleRequiredDocuments};
  };
  const handleSubmit = () => {
    const {
      uploadDocuments,
      updateTitleRequiredDocuments,
    } = getUploadedDocuments();
    const payload = {
      place_id: place.id,
      ownership_type: ownershipType,
      documents: uploadDocuments,
      updateTitleRequiredDocuments,
    };
    if (documentsRequired || mode == 'edit-business') {
      // in case edit-business and filled new business legal name
      if (mode == 'edit-business' && newBusinessName) {
        payload.proposed_business_legal_name = newBusinessName;
      }
      updateClaim(claim.id, payload, token, 'update-business-documents');
    } else {
      createClaim(payload, token, 'update-business-documents');
    }
  };

  const getSubmittedDocuments = () => {
    return claim.claim_applications.documents.map((item) => {
      return {...item, title: item.label};
    });
  };

  const isFieldApproved = (field) => {
    const submittedDocuments = getSubmittedDocuments();
    const foundApproved = field.document_types.find((document) => {
      const found = submittedDocuments.filter(
        (item) =>
          item.title === getDocumentFieldFileName(document, 'front') ||
          item.title === getDocumentFieldFileName(document, 'back'),
      );
      if (found.length) {
        return found[0].status === 1; //APPROVED
      } else {
        return false;
      }
    });
    if (foundApproved) {
      return true;
    } else {
      return false;
    }
  };

  const isFormValid = () => {
    if (!acceptCondition) {
      return false;
    }
    if (level1EKYC) {
      return (
        level1EKYC['form-configuration']
          .map((field) => {
            const found = documents.find((item) => item.id === field.id);
            if (found) {
              // then check if it is not in edit mode
              const foundEditMode = documentsMode.find(
                (item) => item.id === field.id,
              );
              if (foundEditMode && foundEditMode.mode) {
                return false; //cause field is in edit mode so form is invalid
              }
              return true;
            } else if (documentsRequired) {
              return isFieldApproved(field);
            }
            return false;
          })
          .filter((result) => result === false).length === 0
      );
    } else {
      return false;
    }
  };

  const handleWillDoLater = () => {
    if (!documentsRequired) {
      const payload = {
        place_id: place.id,
        ownership_type: ownershipType,
        documents: [],
        updateTitleRequiredDocuments: [],
      };
      createClaim(payload, token, 'update-business-documents');
    } else {
      NavigationService.navigate('BusinessManage', {reset: true});
    }
  };

  const renderAddHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: 10,
        }}>
        <AuthenticationIcon />
        <Text style={[styles2.setupHeadings, {marginTop: 10}]}>
          Let's get you verified!
        </Text>
      </View>
    );
  };
  const renderEditHeader = () => {
    return (
      <View>
        <Text style={styles3.editAccountInfoText}>
          Please note that your company's info will only be updated and
          published after we approve the required documents.
        </Text>
        <View>
          <Text style={styles3.formFieldLabel}>
            New Business Legal Name (optional)
          </Text>
          <TextField
            mode="outlined"
            name="business_legal_name"
            value={newBusinessName}
            placeholder="Type here"
            icon="info-circle"
            theme={{
              roundness: 50,
            }}
            onChangeText={setNewBusinessName}
          />
        </View>
        <View>
          <Text style={styles3.formFieldLabel}>
            Upload New Commercial registration
          </Text>
        </View>
      </View>
    );
  };

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={updateLoading} textContent="" />
      {updateError ? (
        <View style={{marginLeft: 30, marginRight: 30}}>
          <CustomAlert error={updateError} />
        </View>
      ) : null}

      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          marginLeft: 30,
          marginRight: 30,
        }}>
        {mode === 'add-business' ? renderAddHeader() : renderEditHeader()}
        <View>{renderFormFields()}</View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginBottom: 10,
          }}>
          <View>
            <Checkbox.Android
              status={acceptCondition ? 'checked' : 'unchecked'}
              onPress={() => {
                setAcceptCondition(!acceptCondition);
              }}
              uncheckedColor="#B5B5B5"
              color="#0fa016"
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
            <Text style={styles2.plusTextStep6}>
              I confirm that I am the owner of the identity{'\n'}above and
              hereby agree to{' '}
              <Text
                style={styles2.linkText}
                onPress={() => handlePoliciesLink()}>
                Qongfu's Terms of{'\n'}Use and Privacy Policies.
              </Text>
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}>
        <Button
          mode="contained"
          onPress={handleSubmit}
          disabled={!isFormValid()}
          style={
            !isFormValid()
              ? styles2.verificationButtonDisabled
              : styles2.verificationButton
          }
          labelStyle={styles2.verificationButtonLabel}>
          Submit
        </Button>
        {mode !== 'edit-business' && place.user_id === profile.id ? (
          <Button
            mode="text"
            onPress={handleWillDoLater}
            style={[styles2.exitButton, {marginTop: 5}]}
            labelStyle={styles2.exitButtonLabel}>
            I'll do this later
          </Button>
        ) : null}
      </View>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    globalConfig: state.app.globalConfig,
    // progressPercentage: state.user.progressPercentage,
    updateLoading: state.business.loading['update-business-documents'] || false,
    updateError: state.business.error['update-business-documents'] || '',
    businessUpdateStatus:
      state.business.businessUpdateStatus['update-business-documents'] || false,
    profile: state.user.profile,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {createClaim, updateClaim, resetBusinessUpdateStatus},
    dispatch,
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DocumentUploadStep6);
