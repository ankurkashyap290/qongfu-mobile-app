import React, {useState, useRef, useEffect} from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {View, Text, TouchableOpacity, Platform, StatusBar} from 'react-native';
import {Divider, Button, Surface, List} from 'react-native-paper';
import ActionSheet from 'react-native-actionsheet';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import TextField from '../custom/textField';
import DocumentIcon from '../../assets/img/document.svg';
import DocumentId from '../../assets/img/document_id.svg';
import DocumentSelfie from '../../assets/img/document_selfie.svg';
import styles from '../../styles/documentField.style';
import theme from '../../styles/theme.style';
import DocumentUpload from './DocumentUpload';
import {getDocumentFieldFileName} from '../../../utils';
import Popover, {
  PopoverMode,
  PopoverPlacement,
} from 'react-native-popover-view';
import MatIcon from 'react-native-vector-icons/MaterialIcons';

const DOCUMENT_PENDING = 0;
const DOCUMENT_APPROVED = 1;
const DOCUMENT_REJECTED = 2;

const DocumentField = ({
  fieldType,
  fieldData,
  submittedDocuments,
  selectedDocuments,
  onChange,
  onEditMode,
}) => {
  const hasMultiple = fieldData.document_types.length > 1;

  const documentsList = fieldData.document_types.map(
    (document) => document.name,
  );

  const [selectedDocumentIndex, setSelectedDocumentIndex] = useState(0);
  const [actionSheetRef, setActionSheetRef] = useState(null);
  const [isEditMode, setEditMode] = useState(false);
  const [frontDocument, setFrontDocument] = useState(null);
  const [backDocument, setBackDocument] = useState(null);
  const [expirationDate, setExpirationDate] = useState('');
  const [savedDocument, setSavedDocument] = useState([]); //only in case of document revision and savedDocument meaning already submitted for this field
  const dateDialog = useRef(null);
  const [showTooltip, toggleTooltip] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    if (submittedDocuments.length) {
      // find the already submitted document
      const foundIndex = fieldData.document_types.findIndex((document) => {
        const found = submittedDocuments.filter(
          (item) =>
            item.title === getDocumentFieldFileName(document, 'front') ||
            item.title === getDocumentFieldFileName(document, 'back'),
        );
        if (found.length) {
          setSavedDocument(found);
          return true;
        } else {
          return false;
        }
      });
      setSelectedDocumentIndex(foundIndex);
    }
  }, [submittedDocuments]);

  useEffect(() => {
    let fieldFilled = 0;
    let requiredFieldCount = 0;
    if (hasDocument('front_required')) {
      requiredFieldCount += 1;
      if (frontDocument) {
        fieldFilled += 1;
      }
    }
    if (hasDocument('back_required')) {
      requiredFieldCount += 1;
      if (backDocument) {
        fieldFilled += 1;
      }
    }
    if (hasDocument('has_expiration')) {
      requiredFieldCount += 1;
      if (expirationDate) {
        fieldFilled += 1;
      }
    }
    if (fieldFilled === requiredFieldCount) {
      // field state filled fire onChange
      const selectedDocument = getSelectedDocument();
      const titleUpdateRequired = !isSavedDocumentEqualsSelected(
        selectedDocument,
      );
      const documents = [];
      if (frontDocument) {
        const front = {
          name: 'front',
          title: getDocumentFieldFileName(selectedDocument, 'front'),
          file: frontDocument,
        };
        if (expirationDate) {
          front['expiration'] = moment(expirationDate).format('YYYY-MM-DD');
        }
        if (titleUpdateRequired) {
          front.updateRequiredId = getAlreadySavedId('front');
        }
        documents.push(front);
      }
      if (backDocument) {
        const back = {
          name: 'back',
          title: getDocumentFieldFileName(selectedDocument, 'back'),
          file: backDocument,
        };
        if (expirationDate) {
          back['expiration'] = moment(expirationDate).format('YYYY-MM-DD');
        }
        if (titleUpdateRequired) {
          back.updateRequiredId = getAlreadySavedId('back');
        }
        documents.push(back);
      }
      //   fire field on change
      onChange(documents);
      setEditMode(false);
    }
  }, [frontDocument, backDocument, expirationDate]);

  const getAlreadySavedId = (key) => {
    const found = savedDocument.find(
      (item) => item.title === getDocumentFieldFileName(selectedDocument, key),
    );
    if (found) {
      return found.id;
    }
    return null;
  };

  const getSelectedDocument = () => {
    return fieldData.document_types[selectedDocumentIndex];
  };
  const hasDocument = (key) => {
    const selectedDocument = getSelectedDocument();
    return selectedDocument[key] || false;
  };

  const handleCalendarOpen = (document) => {
    const todayDay = new Date();
    if (dateDialog) {
      dateDialog.current.open({
        date: expirationDate ? expirationDate : todayDay,
        minDate: todayDay,
      });
    }
  };
  const handleSelectDocuments = () => {
    actionSheetRef.show();
  };

  const isFilledState = () => {
    return !isEditMode && selectedDocuments && selectedDocuments.length > 0;
  };

  const isSavedDocumentEqualsSelected = (selectedDocument) => {
    if (savedDocument.length === 0) {
      return true; // no saved documents first time
    }
    return savedDocument.find(
      (item) =>
        item.title === getDocumentFieldFileName(selectedDocument, 'front'),
    )
      ? true
      : false;
  };

  const isDocumentApproved = (selectedDocument) => {
    return (
      savedDocument.length &&
      isSavedDocumentEqualsSelected(selectedDocument) &&
      savedDocument[0].status === DOCUMENT_APPROVED
    );
  };

  const showInlineUpload = () => {
    const selectedDocument = getSelectedDocument();
    return (
      isFilledState() ||
      (!hasMultiple &&
        selectedDocument.front_required &&
        !selectedDocument.front_label &&
        !selectedDocument.back_required)
    );
  };

  const handleSelectUploadFile = (file, document, fieldKey) => {
    if (fieldKey === 'front') {
      setFrontDocument(file);
    } else if (fieldKey === 'back') {
      setBackDocument(file);
    }
  };

  const resetMe = () => {
    frontDocument && setFrontDocument(null);
    backDocument && setBackDocument(null);
    expirationDate && setExpirationDate('');
  };

  const handleDateSelect = (date) => {
    setExpirationDate(date);
  };

  const handleChangeField = () => {
    setEditMode(true);
    onEditMode(true);
  };

  const getUploadLabel = (fieldKey) => {
    if (fieldKey === 'front') {
      return frontDocument ? 'Change' : 'Upload';
    } else if (fieldKey === 'back') {
      return backDocument ? 'Change' : 'Upload';
    }
  };

  const getFieldInfo = () => {
    return getSelectedDocument().information;
  };

  const renderFieldLabel = (document, fieldKey) => {
    const hasFieldLabel = document[`${fieldKey}_label`] || null;
    return hasFieldLabel ? (
      <View
        style={[
          {
            borderLeftWidth: 2,
            borderLeftColor: '#DEDEDE',
            paddingLeft: 7,
            marginTop: 16,
          },
        ]}>
        <Text style={[styles.documentSubFieldLabel]}>
          {document[`${fieldKey}_label`]}
        </Text>
      </View>
    ) : null;
  };

  const renderUploadField = (document, fieldKey) => {
    const hasKeyField = document[`${fieldKey}_required`] || false;
    return hasKeyField ? (
      <View
        style={[
          {
            marginTop: showInlineUpload() ? 0 : 16,
          },
        ]}>
        <DocumentUpload
          buttonLabel={getUploadLabel(fieldKey)}
          name={getDocumentFieldFileName(document, fieldKey)}
          onSelect={(file) => handleSelectUploadFile(file, document, fieldKey)}
        />
      </View>
    ) : null;
  };

  const renderFieldRow = (document, key) => {
    const hasFieldLabel = document[`${key}_label`] || null;
    return hasFieldLabel && !showInlineUpload() ? (
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{width: 40, alignItems: 'center', marginTop: 10}}>
          <Text></Text>
        </View>
        <View style={{flexDirection: 'column', flex: 1, minWidth: 160}}>
          {renderFieldLabel(document, key)}
        </View>
        <View
          style={{
            alignItems: 'center',
            borderLeftWidth: 1,
            borderLeftColor: '#DEDEDE',
          }}>
          {renderUploadField(document, key)}
        </View>
      </View>
    ) : null;
  };

  const renderExpiration = (document) => {
    return document.has_expiration && !isFilledState() ? (
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{width: 40, alignItems: 'center', marginTop: 10}}>
          <Text></Text>
        </View>
        <View style={{flexDirection: 'column', flex: 1, minWidth: 160}}>
          <View style={{flexDirection: 'column'}}>
            <Text
              style={[
                styles.documentSubFieldLabel,
                {
                  marginTop: 16,
                  fontWeight: theme.FONT_WEIGHT_MEDIUM,
                  marginBottom: 5,
                },
              ]}>
              EXPIRATION:
            </Text>
            <TouchableOpacity
              onPress={() => {
                handleCalendarOpen(document);
              }}>
              <TextField
                editable={false}
                mode="outlined"
                name="expiration"
                value={
                  expirationDate
                    ? moment(expirationDate).format('MM/DD/YYYY')
                    : ''
                }
                placeholder="Document Expiration"
                icon={'calendar'}
                style={{margin: 7}}
                theme={{
                  roundness: 28,
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: theme.SECONDARY_COLOR,
                  },
                }}
                //   errorMessage={
                //     errors.password &&
                //     touched.password && <Text>{errors.password}</Text>
                //   }
                //   validFieldMessage="The password is valid."
              />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text> </Text>
        </View>
      </View>
    ) : null;
  };

  const renderDocumentListMenuIcon = () => {
    return hasMultiple && !isFilledState() ? (
      <View>
        <TouchableOpacity onPress={handleSelectDocuments}>
          <Icon name="chevron-down" size={24} color={theme.PRIMARY_COLOR} />
        </TouchableOpacity>
      </View>
    ) : null;
  };

  const renderDoneButton = () => {
    return (
      <View
        style={{
          borderLeftWidth: 1,
          borderLeftColor: '#DEDEDE',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 48,
        }}>
        <Button
          mode="text"
          labelStyle={[styles.documentUploadButtonLabel, {color: '#54B948'}]}>
          Done
        </Button>
      </View>
    );
  };
  const renderDocumentUpload = (selectedDocument) => {
    if (isFilledState()) {
      return (
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: '#DEDEDE',
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: 48,
          }}>
          <Button
            mode="text"
            // compact
            onPress={handleChangeField}
            labelStyle={styles.documentUploadButtonLabel}>
            Change
          </Button>
        </View>
      );
    } else if (showInlineUpload()) {
      return (
        <View
          style={{
            borderLeftWidth: 1,
            borderLeftColor: '#DEDEDE',
            alignItems: 'flex-start',
            justifyContent: 'center',
            height: 48,
          }}>
          {renderUploadField(selectedDocument, 'front')}
        </View>
      );
    } else {
      return null;
    }
  };

  const renderField = () => {
    const selectedDocument = getSelectedDocument();
    const isApproved = isDocumentApproved(selectedDocument);
    return (
      <Surface
        style={[
          styles.documentUploadCard,
          {
            marginTop: 16,
            padding: 16,
            width: '100%',
          },
        ]}>
        <View style={{flexDirection: 'row', width: '100%'}}>
          <View style={{width: 40, alignItems: 'center', marginTop: 10}}>
            {isApproved || isFilledState() ? (
              <Icon name="check" size={30} color="#54B948" />
            ) : hasMultiple ? (
              fieldType === 'business' ? (
                <DocumentIcon />
              ) : (
                <DocumentId />
              )
            ) : fieldType === 'business' ? (
              <DocumentIcon />
            ) : (
              <DocumentSelfie />
            )}
          </View>
          <View style={{flexDirection: 'column', flex: 1, minWidth: 160}}>
            {/* FIELD label row */}
            <View>
              <TouchableOpacity
                ref={tooltipRef}
                onPress={() => toggleTooltip(true)}>
                <Text style={styles.documentFieldLabel}>
                  {selectedDocument.name}
                  <Text style={{color: '#FF0000'}}> *</Text>
                </Text>
              </TouchableOpacity>
            </View>

            {/* Divider description row */}
            <View>
              {!isApproved && !showInlineUpload() && (
                <Divider
                  style={{
                    height: 1,
                  }}
                />
              )}
              <Text
                style={[
                  styles.documentFieldDescription,
                  isApproved ? {color: '#54B948'} : null,
                ]}>
                {isApproved
                  ? 'Approved'
                  : isFilledState() && hasMultiple
                  ? 'Document is uploaded'
                  : selectedDocument.description}
              </Text>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              // marginTop: 10,
            }}>
            {!isApproved && renderDocumentListMenuIcon()}
            {!isApproved && renderDocumentUpload(selectedDocument)}
            {isApproved ? renderDoneButton() : null}
          </View>
        </View>
        {!isApproved && renderFieldRow(selectedDocument, 'front')}
        {!isApproved && renderFieldRow(selectedDocument, 'back')}
        {!isApproved && renderExpiration(selectedDocument)}
      </Surface>
    );
  };

  return (
    <React.Fragment>
      {renderField()}
      <DatePickerDialog
        ref={dateDialog}
        onDatePicked={handleDateSelect}
        date={expirationDate}
      />
      <ActionSheet
        ref={(aSheet) => {
          setActionSheetRef(aSheet);
        }}
        title={'SELECT'}
        options={[...documentsList, 'Cancel']}
        cancelButtonIndex={documentsList.length}
        destructiveButtonIndex={selectedDocumentIndex || 0}
        onPress={(index) => {
          if (index < documentsList.length) {
            resetMe();
            setSelectedDocumentIndex(index);
          }
        }}
      />
      <Popover
        mode={PopoverMode.TOOLTIP}
        placement={PopoverPlacement.TOP}
        isVisible={showTooltip}
        from={tooltipRef}
        verticalOffset={
          Platform.OS === 'android' ? -StatusBar.currentHeight : 0
        }
        popoverStyle={{
          backgroundColor: '#0092DD',
          borderWidth: 1,
          borderColor: '#0065AB',
          borderRadius: 5,
          width: '100%',
        }}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <List.Item
            title={getFieldInfo()}
            description=""
            left={(props) => (
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <MatIcon name="info-outline" color="#fff" size={16} />
              </View>
            )}
            right={(props) => (
              <TouchableOpacity
                {...props}
                onPress={() => {
                  toggleTooltip(false);
                }}>
                <MatIcon name="close" color="#fff" size={12} />
              </TouchableOpacity>
            )}
            titleStyle={{
              fontFamily: 'Roboto',
              color: '#fff',
              fontSize: 12,
            }}
          />
        </View>
      </Popover>
    </React.Fragment>
  );
};

export default DocumentField;
