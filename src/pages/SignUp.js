import React, {useState} from 'react';
import {View, Text} from 'react-native';
import AuthLayout from '../layout/AuthLayout';
import {Button, Checkbox} from 'react-native-paper';
import styles from '../styles';
import theme from '../styles/theme.style';
import TextField from '../components/custom/textField';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {userRegister} from '../../redux/user/actions';
import CustomAlert from '../components/custom/customAlert';

const SignUp = (props) => {
  const [isSecure, setIsSecure] = useState(true);
  const [confirmPasswordIsSecure, setConfirmPasswordIsSecure] = useState(true);
  const [acceptCondition, setAcceptCondition] = useState(false);

  const validationSchema = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required('Email is required')
        .email('Please enter valid format'),
      // fullName: Yup.string().required('Full name is required'),
      password: Yup.string()
        .required('Password is required')
        .min(
          8,
          'Minimum of 8 characters with a capital letter, a number, and a symbol.',
        )
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          'Minimum of 8 characters with a capital letter, a number, and a symbol.',
        ),
      confirmPassword: Yup.string()
        .required('Please Confirm your password')
        .oneOf([Yup.ref('password'), null], 'Password does not match.'),
    });
  };

  const _handleIsSecure = () => {
    setIsSecure(!isSecure);
  };

  const _handleConfirmPasswordIsSecure = () => {
    setConfirmPasswordIsSecure(!confirmPasswordIsSecure);
  };

  const handleSubmit = (values) => {
    const {userRegister} = props;
    userRegister(
      {
        email: values.email,
        password: values.password,
        fullname: '##FIRST## ##LAST##',
      },
      null,
    );
  };

  return (
    <AuthLayout {...props} page="sign-up" title="Join the Community!">
      <Formik
        initialValues={{email: '', password: '', confirmPassword: ''}}
        onSubmit={(values) => handleSubmit(values)}
        validationSchema={validationSchema}>
        {({handleChange, values, handleSubmit, errors, touched}) => (
          <View>
            {props.error ? <CustomAlert error={props.error} /> : null}
            <View>
              <Text style={styles.formFieldLabel}>EMAIL</Text>
              <TextField
                mode="outlined"
                name="email"
                value={values.email}
                placeholder="Your valid email"
                onChangeText={handleChange('email')}
                style={styles.textInputField}
                theme={{
                  roundness: 50,
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: theme.SECONDARY_COLOR,
                  },
                }}
                errorMessage={
                  errors.email && touched.email && <Text>{errors.email}</Text>
                }
                validFieldMessage={props.error ? '' : 'The email is valid.'}
              />
            </View>
            <View>
              <Text style={styles.formFieldLabel}>PASSWORD</Text>
              <TextField
                mode="outlined"
                name="password"
                secureTextEntry={isSecure}
                value={values.password}
                onChangeText={handleChange('password')}
                placeholder="********"
                style={styles.textInputField}
                icon={'eye'}
                iconActive={isSecure}
                theme={{
                  roundness: 50,
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: theme.SECONDARY_COLOR,
                  },
                }}
                onIconClick={_handleIsSecure}
                errorMessage={
                  errors.password &&
                  touched.password && <Text>{errors.password}</Text>
                }
                validFieldMessage="The password is valid."
              />
            </View>
            <View>
              <Text style={styles.formFieldLabel}>CONFIRM PASSWORD</Text>
              <TextField
                mode="outlined"
                name="confirmPassword"
                secureTextEntry={confirmPasswordIsSecure}
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                placeholder="********"
                style={styles.textInputField}
                icon={'eye'}
                // marginRight={60}
                iconActive={confirmPasswordIsSecure}
                theme={{
                  roundness: 50,
                  colors: {
                    primary: theme.SECONDARY_COLOR,
                    underlineColor: theme.SECONDARY_COLOR,
                  },
                }}
                onIconClick={_handleConfirmPasswordIsSecure}
                errorMessage={
                  errors.confirmPassword &&
                  touched.confirmPassword && (
                    <Text>{errors.confirmPassword}</Text>
                  )
                }
                validFieldMessage="The password matches."
              />
            </View>
            <View
              style={{
                // flex: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                margin: 20,
              }}>
              <View>
                <Checkbox.Android
                  status={acceptCondition ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setAcceptCondition(!acceptCondition);
                  }}
                  uncheckedColor="#f1f1f1"
                  color="#0fa016"
                />
              </View>
              <View>
                <Text style={styles.acceptConditionText}>
                  I have accepted both
                  <Text style={styles.acceptConditionSubText}>
                    {' '}
                    Terms of Services{' '}
                  </Text>
                  and
                  <Text style={styles.acceptConditionSubText}>
                    {' '}
                    Privacy Statement
                  </Text>{' '}
                  of Qongfu.
                </Text>
              </View>
            </View>
            <View style={styles.signUpBtnContainer}>
              <Button
                mode="contained"
                onPress={handleSubmit}
                style={
                  acceptCondition ? styles.signUpEnable : styles.signUpDisable
                }
                labelStyle={styles.signUpLabel}
                disabled={!acceptCondition}
                size="small">
                Sign up now
              </Button>
            </View>
          </View>
        )}
      </Formik>
    </AuthLayout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.user.loading,
    user: state.user.user,
    error: state.user.error['sign-up'] || null,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      userRegister,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
