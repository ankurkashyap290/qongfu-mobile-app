import React, {useEffect, useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {Button, Checkbox, Dialog, Portal} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import styles from '../../styles/businessAccount.style';
import PageLayout from '../../layout/PageLayout';
import theme from '../../styles/theme.style';
import * as NavigationService from '../../navigators/NavigationService';
import DocumentField from '../custom/DocumentField';
import CustomAlert from '../custom/customAlert';
import {
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import {getDocumentFieldFileName} from '../../../utils';

const BusinessUserVerify = ({
  accountStatus,
  globalConfig,
  userDetailsUpdated,
  updateUserDetails,
  resetUserDetailsUpdatedFlag,
  userLoading,
  userUpdateError,
  profile,
  token,
  navigation,
}) => {
  const resetScreen = navigation.getParam('reset') || false;
  const documentsRequired = navigation.getParam('documentsRequired') || false;
  const [ekycFormConfig, setFormConfig] = useState(null);
  const [level1EKYC, setLevel1Config] = useState(null);
  const [acceptCondition, setAcceptCondition] = useState(false);
  const [documents, saveDocuments] = useState([]);
  const [documentsMode, saveDocumentsMode] = useState([]);
  const [openSuccessModal, setSuccessModal] = useState(false);

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
        formConfig = tmpData.data.find((item) => item.type === 'level1');
      } catch (ex) {
        console.log('Error while parsing configuration');
      }
      setLevel1Config(formConfig);
    } else {
      setLevel1Config(null);
    }
  }, [ekycFormConfig]);

  useEffect(() => {
    if (userDetailsUpdated) {
      setSuccessModal(true);
      saveDocuments([]);
      saveDocumentsMode([]);
    } else {
      setSuccessModal(false);
    }
  }, [userDetailsUpdated]);

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
          fieldData={field}
          submittedDocuments={documentsRequired ? profile.documents : []}
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
            title: fileDoc.title,
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
      first_name: profile.first_name,
      last_name: profile.last_name,
      documents: uploadDocuments,
      updateTitleRequiredDocuments,
    };
    updateUserDetails(payload, token, 'secondStep', 'business-user-documents');
  };

  const handleSuccessModalClose = () => {
    resetUserDetailsUpdatedFlag('update-details-business-user-documents');
  };

  const handleSuccessOk = () => {
    handleSuccessModalClose();
    setSuccessModal(false);
    NavigationService.navigate('SettingsDashboard');
  };

  const isFieldApproved = (field) => {
    const submittedDocuments = profile.documents || [];
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

  return (
    <PageLayout>
      <GlobalOverlayLoading loading={userLoading} textContent="" />
      {userUpdateError ? (
        <View style={{marginLeft: 30, marginRight: 30}}>
          <CustomAlert error={userUpdateError} />
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
        <Text style={styles.accountStatusTitle}>
          {documentsRequired ? 'Upload Documents' : 'Get Qongfu Verified'}
        </Text>
        <View>
          <Text style={styles.uploadText}>
            Please upload the following documents:
          </Text>

          {renderFormFields()}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
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
          <View>
            <Text style={styles.documentConfirmText}>
              I confirm that I am the owner of the identity{'\n'}above and
              hereby agree to{' '}
              <Text
                style={styles.documentConfirmLinkText}
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
          style={[
            styles.nextButton,
            !isFormValid() ? styles.nextDisableButton : null,
          ]}
          disabled={!isFormValid()}
          labelStyle={[
            styles.nextButtonLabel,
            !isFormValid() ? styles.nextDisableButton : null,
          ]}>
          {documentsRequired
            ? !isFormValid()
              ? 'Awaiting Documents'
              : 'Submit Docs'
            : 'Submit and Proceed'}
        </Button>
      </View>
      <Portal>
        <Dialog
          visible={openSuccessModal}
          onDismiss={handleSuccessModalClose}
          style={{padding: 20}}>
          <Text style={styles.successModalHeading}>
            Your business account{'\n'} is being processed!
          </Text>
          <Text style={styles.successModalText}>
            Please{' '}
            <Text style={{color: theme.PRIMARY_COLOR}}>
              allow 2 to 3 business days
            </Text>{' '}
            for our{'\n'} team{' '}
            <Text style={{color: theme.PRIMARY_COLOR}}>to verify</Text> your{' '}
            <Text style={{color: theme.PRIMARY_COLOR}}>credentials.</Text>
            {'\n'} Your profile will be eligible to setup a{'\n'} business after
            receiving confirmation from our team.
          </Text>
          <View style={[styles.updateButtonContainer, {marginTop: 30}]}>
            <Button
              mode="contained"
              style={styles.nextButton}
              labelStyle={styles.nextButtonLabel}
              onPress={handleSuccessOk}>
              Ok
            </Button>
          </View>
        </Dialog>
      </Portal>
    </PageLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    accountStatus: state.business.accountStatus,
    globalConfig: state.app.globalConfig,
    // progressPercentage: state.user.progressPercentage,
    userDetailsUpdated:
      state.user.userDetailsUpdated['update-details-business-user-documents'] ||
      null,
    userUpdateError:
      state.user.error['update-details-business-user-documents'] || null,
    userLoading: state.user.loading,
    profile: state.user.profile,
    token: state.user.token,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {updateUserDetails, resetUserDetailsUpdatedFlag},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(BusinessUserVerify);
