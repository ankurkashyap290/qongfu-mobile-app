import React from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import {Button} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Formik} from 'formik';
import * as Yup from 'yup';
import styles from '../../styles/businessPlaceProfile.style';
import TextField from '../custom/textField';
import theme from '../../styles/theme.style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {addMissingEntity} from '../../../redux/user/actions';

const Suggestion = (props) => {
  const {profile, addMissingEntity, pageName, label, description} = props;

  const validationSchema = () => {
    return Yup.object().shape({
      content: Yup.string().required(`${label} Name is required`),
    });
  };

  const handleSubmit = (values) => {
    const payload = {
      type: label,
      content: values.content,
      flags: ['Suggestion'],
      user_id: profile.id,
    };
    addMissingEntity(payload);
  };

  return (
    <View>
      <Formik
        initialValues={{content: ''}}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}>
        {({handleChange, handleSubmit, errors, touched}) => (
          <View style={{paddingLeft: 20, paddingRight: 20}}>
            <Text style={styles.addNewDataHeading}>
              Welcome to the Qongfu Community Database!
            </Text>
            <Text style={styles.addNewDataDesc}>{description}</Text>
            <View style={{margin: 20}}>
              <TextField
                placeholder={`Add ${label} here`}
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

            <View style={{alignItems: 'center', marginBottom: 40}}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={styles.submitButton}
                labelStyle={styles.successButtonLabel}>
                Submit
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({addMissingEntity}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Suggestion);
