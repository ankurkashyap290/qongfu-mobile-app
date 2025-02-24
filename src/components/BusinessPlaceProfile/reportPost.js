import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, RadioButton, TextInput, HelperText} from 'react-native-paper';
import styles from '../../styles/mediaCarousal.style';
import theme from '../../styles/theme.style';
import AlertIcon from '../../assets/img/alert.svg';
import CustomAlert from '../custom/customAlert';

const ReportPost = ({
  handleReportModalClose,
  handleReportNowClick,
  data,
  title,
  error,
}) => {
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

  const handleValueChange = value => {
    setReportType(value);
  };

  const handleReportChange = value => {
    setReportText(value);
  };

  const handleReportNow = () => {
    if (reportText === '' && reportType === 'others') {
      setReportTextError(true);
    } else {
      if (title === 'review') {
        handleReportNowClick({
          id: data.id,
          type: 1,
          notes:
            reportType === 1
              ? 'spam'
              : reportType === 2
              ? 'offensive'
              : reportText,
        });
      } else {
        handleReportNowClick({
          gallery_id: data.id,
          flag:
            reportType === 1
              ? 'Spam'
              : reportType === 2
              ? 'Offensive'
              : reportText,
        });
      }
    }
  };
  return (
    <View>
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
        onValueChange={value => handleValueChange(value)}
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
              onChangeText={value => handleReportChange(value)}
              placeholder="Type your report here..."
              //   value={reportText}
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
          onPress={handleReportModalClose}>
          Cancel
        </Button>
      </View>
    </View>
  );
};

export default ReportPost;
