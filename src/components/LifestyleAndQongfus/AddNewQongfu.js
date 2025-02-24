import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/lifestylesAndQongfu.style';
import TextField from '../custom/textField';
import theme from '../../styles/theme.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {addMissingEntity} from '../../../redux/user/actions';
import QongfuInfo from './QongfuInfo';

const AddNewQongfu = (props) => {
  const {
    profile,
    addMissingEntity,
    displayMode,
    setQongfuModalDisplayMode,
  } = props;

  const validationSchema = () => {
    return Yup.object().shape({
      content: Yup.string().required('Qongfu Name is required'),
    });
  };

  const handleSubmit = (values) => {
    const payload = {
      type: 'Qongfu',
      content: values.content,
      flags: ['Suggestion'],
      user_id: profile.id,
    };
    addMissingEntity(payload);
  };

  return (
    <ScrollView>
      {displayMode === 'addNewQongfu' ? (
        <Formik
          initialValues={{content: ''}}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={validationSchema}>
          {({handleChange, handleSubmit, errors, touched}) => (
            <View style={styles.addQongfuContainer}>
              <Text style={styles.addQongfuHeadText}>
                Welcome to the Qongfu Community Database!
              </Text>

              <Text style={styles.addQongfuSubtext}>
                If you weren’t able to find your Qongfu practice you’ve come to
                the right place!
              </Text>
              <View style={{margin: 20}}>
                <TextField
                  // style={styles.textInputField}
                  placeholder="Add Qongfu here"
                  theme={{
                    roundness: 28,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  name="content"
                  onChangeText={handleChange('content')}
                  errorMessage={
                    errors.content &&
                    touched.content && <Text>{errors.content}</Text>
                  }
                />
              </View>
              <Text style={styles.helpText}>
                <Icon name="info-circle" />
                &nbsp; Help:
              </Text>
              <TouchableOpacity
                onPress={() => setQongfuModalDisplayMode('qongfuInfo')}>
                <Text style={styles.helpLinks}>What’s a Qongfu?</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setQongfuModalDisplayMode('qongfuInfo')}>
                <Text style={styles.helpLinks}>
                  What qualifies for a Qongfu?
                </Text>
              </TouchableOpacity>
              <View style={[styles.updateButtonContainer, {marginTop: 150}]}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.successAddButton}
                  labelStyle={styles.successAddButtonLable}>
                  Submit
                </Button>
              </View>
            </View>
          )}
        </Formik>
      ) : (
        <QongfuInfo />
      )}
    </ScrollView>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({addMissingEntity}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AddNewQongfu);
