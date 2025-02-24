import React, {useState} from 'react';
import {View, Text, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Button, Portal, Dialog} from 'react-native-paper';
import styles from '../../styles/placeDetails.style';
import theme from '../../styles/theme.style';
import {addMissingEntity, resetFeedbackFlag} from '../../../redux/user/actions';
import TextField from '../custom/textField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/AntDesign';

const AddNewPlace = props => {
  const {
    profile,
    feedbackSubmitted,
    addMissingEntity,
    handleModalClose,
    resetFeedbackFlag,
  } = props;
  const [cityOrAreaError, setCityOrAreaError] = useState(false);

  const validationSchema = () => {
    return Yup.object().shape({
      place: Yup.string().required('Place is required'),
      country: Yup.string().required('Country is required'),
    });
  };

  const validate = getValidationSchema => {
    return values => {
      const validationSchema = getValidationSchema(values);
      try {
        validationSchema.validateSync(values, {abortEarly: false});
        return {};
      } catch (error) {
        validateExtras(values);
        return getErrorsFromValidationError(error);
      }
    };
  };

  const validateExtras = values => {
    let update = true;
    if (values.area === '' && values.city === '') {
      setCityOrAreaError(true);
      update = false;
    }

    return update;
  };

  const getErrorsFromValidationError = validationError => {
    const FIRST_ERROR = 0;
    return validationError.inner.reduce((errors, error) => {
      return {
        ...errors,
        [error.path]: error.errors[FIRST_ERROR],
      };
    }, {});
  };

  const initialValues = {
    place: '',
    area: '',
    city: '',
    country: '',
  };

  const handleSubmit = values => {
    if (validateExtras(values)) {
      let content = '';
      if (values.area === '') {
        content = `${values.place}, ${values.city}, ${values.country}`;
      } else if (values.city === '') {
        content = `${values.place}, ${values.area}, ${values.country}`;
      } else {
        content = `${values.place}, ${values.area}, ${values.city}, ${values.country}`;
      }
      let payload = {
        type: 'Place',
        content,
        flags: ['Suggestions'],
      };
      if (profile && profile.id) {
        payload.user_id = profile && profile.id;
      }
      addMissingEntity(payload);
    }
  };

  const handleFeedbackModalClose = () => {
    resetFeedbackFlag();
    handleModalClose();
  };

  return (
    <ScrollView>
      <Text style={styles.qongfuHeading}>
        Welcome to the Qongfu Community Database!
      </Text>

      <Text style={styles.qongfuDescription}>
        If you weren’t able to find the place you were connected with don’t
        sweat it! Let’s add it here!
      </Text>
      <Formik
        initialValues={initialValues}
        validate={validate(validationSchema)}
        onSubmit={values => handleSubmit(values)}>
        {({handleChange, values, handleSubmit, errors, touched}) => {
          return (
            <View style={{backgroundColor: '#fff'}}>
              <Text style={styles.textFieldLabels}>Place</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  name="place"
                  onChangeText={handleChange('place')}
                  value={values.place}
                  placeholder="Place Name"
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    errors.place && touched.place && <Text>{errors.place}</Text>
                  }
                />
              </View>
              <Text style={styles.textFieldLabels}>Area</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  name="area"
                  onChangeText={handleChange('area')}
                  value={values.area}
                  placeholder="Area"
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    cityOrAreaError &&
                    touched.city &&
                    touched.area &&
                    values.city === '' &&
                    values.area === '' && (
                      <Text> Either area or city is required</Text>
                    )
                  }
                />
              </View>
              <Text style={styles.textFieldLabels}>City</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  name="city"
                  onChangeText={handleChange('city')}
                  value={values.city}
                  placeholder="City"
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    cityOrAreaError &&
                    touched.city &&
                    touched.area &&
                    values.city === '' &&
                    values.area === '' && (
                      <Text> Either area or city is required</Text>
                    )
                  }
                />
              </View>

              <Text style={styles.textFieldLabels}>Country</Text>
              <View style={{marginLeft: 20, marginRight: 20}}>
                <TextField
                  name="country"
                  onChangeText={handleChange('country')}
                  value={values.country}
                  placeholder="Country"
                  theme={{
                    roundness: 10,
                    colors: {
                      primary: theme.SECONDARY_COLOR,
                      underlineColor: theme.SECONDARY_COLOR,
                    },
                  }}
                  errorMessage={
                    errors.country &&
                    touched.country && <Text>{errors.country}</Text>
                  }
                />
              </View>

              <View style={styles.updateButtonContainer}>
                <Button
                  mode="contained"
                  onPress={handleSubmit}
                  style={styles.updateButton}
                  labelStyle={styles.updateButtonLable}>
                  Submit
                </Button>
              </View>
              <Text style={styles.qongfuDescription}>
                The more information you share the easier it will be for our
                team to locate the place and have them join the Qongfu
                Community.
              </Text>
            </View>
          );
        }}
      </Formik>
      <Portal>
        <Dialog
          visible={feedbackSubmitted}
          onDismiss={handleFeedbackModalClose}>
          <Text style={styles.successDialogHeading}>Great job!</Text>
          {/* <Success style={{fontSize: '160px', margin: '25px'}} /> */}
          <Icon
            name="checkcircle"
            size={180}
            color={theme.PRIMARY_COLOR}
            style={{textAlign: 'center'}}
          />
          <Text style={styles.qongfuHeading}>Your request has been sent!</Text>

          <Text style={styles.qongfuDescription}>
            Our support team will review your request and process it as soon as
            possible. You will receive a notification once the process has been
            completed.
          </Text>

          <View style={styles.updateButtonContainer}>
            <Button
              mode="contained"
              style={styles.updateButton}
              labelStyle={styles.updateButtonLable}
              onPress={handleFeedbackModalClose}>
              OK
            </Button>
          </View>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = state => {
  return {
    feedbackSubmitted: state.user.feedbackSubmitted,
    profile: state.user.profile,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      addMissingEntity,
      resetFeedbackFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AddNewPlace);
