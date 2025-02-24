import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {DatePickerDialog} from 'react-native-datepicker-dialog';
import moment from 'moment';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/businessSetup.style';
import theme from '../../styles/theme.style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import DocumentIcon from '../../assets/img/document.svg';
import {MaxImageSize, acceptedFilesForDocumentUplaod} from '../../../config';

const DocumentUploadCard = props => {
  const [photo, setPhoto] = useState(null);
  const [imageError, setImageError] = useState('');

  const dateDialog = useRef();

  const [date, setDate] = useState('');

  const handleCalendarOpen = () => {
    const tempDate = date ? date : new Date();
    if (dateDialog) {
      dateDialog.current.open({date: tempDate, minDate: new Date()});
    }
  };

  const onDatePicked = date => {
    setDate(date);
  };

  const handleUploadDocument = () => {
    const options = {
      storageOptions: {
        skipBackup: true,
      },
    };
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        // if (progressPercentage > 0) {
        //   setUploadProgressParam(0);
        // }
        let tempImageError = '';
        if (response.uri) {
          if (response.fileSize > MaxImageSize) {
            tempImageError = 'Image size must be lower then 512Kb';
          }
          const typeArr = response.type.split('/');
          if (!acceptedFilesForDocumentUplaod.includes(typeArr[1])) {
            tempImageError = `Supported formats are ${acceptedFilesForDocumentUplaod.toString()}`;
          }
          if (!tempImageError) {
            setPhoto(response);
          } else {
            setPhoto(null);
          }
          setImageError(tempImageError);
        }
      }
    });
  };

  return (
    <View>
      <Card style={styles.documentUploadCard}>
        <Card.Content style={{flexDirection: 'column'}}>
          <View style={{flexDirection: 'row'}}>
            <DocumentIcon />
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.registrationText}>
                Commercial Registration{' '}
                <Text style={{color: '#FF0000'}}>*</Text>
              </Text>
              <Text style={styles.registrationSubText}>
                Your business license scanned.{'\n'}
                Accepts pdf, jpg, jpeg or .doc.
              </Text>
            </View>
            <View style={styles.uploadButton}>
              <Button
                mode="text"
                onPress={() => handleUploadDocument()}
                labelStyle={styles.uploadButtonLabel}>
                Upload
              </Button>
            </View>
          </View>
          <View>
            <Text
              style={[
                styles.registrationText,
                {paddingTop: 15, marginLeft: 44},
              ]}>
              EXPIRATION:
            </Text>
          </View>
          <View style={{alignItems: 'flex-end'}}>
            <View style={{marginTop: 5, width: '87%'}}>
              <TouchableOpacity onPress={() => handleCalendarOpen()}>
                <TextInput
                  roundness={28}
                  style={styles.expirationField}
                  editable={false}
                  placeholder="Document Expiration"
                  value={date ? moment(date).format('MM/DD/YYYY') : ''}
                />
                <Icon
                  name="calendar"
                  color={theme.PRIMARY_COLOR}
                  size={24}
                  style={styles.calendarIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
        </Card.Content>
      </Card>
      <DatePickerDialog
        ref={dateDialog}
        onDatePicked={onDatePicked}
        date={date}
      />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    countries: state.app.countries,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(DocumentUploadCard);
