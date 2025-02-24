import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, RadioButton, TextInput, HelperText} from 'react-native-paper';
import styles from '../../styles/mediaCarousal.style';
import theme from '../../styles/theme.style';
import AlertIcon from '../../assets/img/alert.svg';
import CustomAlert from '../custom/customAlert';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const ReportForm = ({title, error, onSubmit, onCancel}) => {
  const [reportType, setReportType] = useState(1);
  const [reportText, setReportText] = useState('');
  const [reportTextError, setReportTextError] = useState('');

  const reportData = [
    {
      title: 'Spam',
      content: `This ${title} is not connected to the services of the lore-isum dolor`,
      key: 'spam',
      id: 1,
    },
    {
      title: 'Offensive',
      content: `This ${title} is offensive and should not be in Qongfu`,
      key: 'offensive',
      id: 2,
    },
  ];

  const isValidForm = () => {
    const isValid = reportType === 3 ? !(reportText === '') : true;
    setReportTextError(!isValid);
    return isValid;
  };

  const handleReportNow = () => {
    if (isValidForm()) {
      onSubmit({
        reportType,
        reportText,
      });
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={{alignItems: 'center'}}>
        <AlertIcon />
      </View>
      <Text style={styles.reportHeading}>{`Report this ${title}`}</Text>
      {error ? (
        <View>
          <CustomAlert error={error} />
        </View>
      ) : null}
      <RadioButton.Group
        onValueChange={(value) => setReportType(value)}
        value={reportType}>
        {reportData.map((item, index) => {
          return (
            <View key={item.key} style={{marginBottom: 10}}>
              <View style={{flexDirection: 'row'}}>
                <RadioButton.Android
                  uncheckedColor="#f1f1f1"
                  value={item.id}
                  color={theme.PRIMARY_COLOR}
                />
                <Text style={styles.reportTitle}>{item.title}</Text>
              </View>
              <Text style={styles.reportContent}>{item.content}</Text>
            </View>
          );
        })}
        <View>
          <View style={{flexDirection: 'row'}}>
            <RadioButton.Android
              uncheckedColor="#f1f1f1"
              value={3}
              color={theme.PRIMARY_COLOR}
            />
            <Text style={styles.reportTitle}>Others</Text>
          </View>
          <View style={{width: '86%', marginLeft: 35}}>
            <TextInput
              name="report"
              onChangeText={(value) => setReportText(value)}
              placeholder="Type your report here..."
              value={reportText}
              disabled={reportType !== 3}
              multiline={true}
              numberOfLines={4}
              theme={{
                roundness: 8,
                colors: {
                  primary: '#fff',
                  underlineColor: '#fff',
                },
              }}
              style={{
                backgroundColor: '#F7F7F7',
                borderRadius: 8,
                borderWidth: 1,
                borderColor: '#b5b5b5',
              }}
            />
            <HelperText
              type="error"
              visible={reportTextError}
              style={styles.errorText}>
              * Please type your report.
            </HelperText>
          </View>
        </View>
      </RadioButton.Group>
      <View
        style={{
          alignItems: 'center',
          marginBottom: 16,
          marginTop: 16,
        }}>
        <Button
          mode="contained"
          style={styles.reportButton}
          labelStyle={styles.reportButtonLabel}
          onPress={() => handleReportNow()}>
          Report Now
        </Button>
        <Button
          mode="text"
          labelStyle={styles.reportCancelButton}
          onPress={onCancel}>
          Cancel
        </Button>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default ReportForm;
