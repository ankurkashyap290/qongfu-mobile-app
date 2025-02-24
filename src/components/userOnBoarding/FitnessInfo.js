import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Button, HelperText} from 'react-native-paper';
import styles from '../../styles/userInfoStyle2.style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {
  createUserBioMetrics,
  resetUserDetailsUpdatedFlag,
} from '../../../redux/user/actions';
import LabelField from '../custom/LabelField';
import GlobalOverlayLoading from '../custom/globalOverlayLoading';
import CustomAlert from '../custom/customAlert';
import PageLayout from '../../layout/PageLayout';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ActionSheet from 'react-native-actionsheet';
import Menu, {MenuItem} from 'react-native-material-menu';

const FitnessInfo = ({
  createUserBioMetrics,
  token,
  loading,
  profile,
  error,
  userDetailsUpdated,
  resetUserDetailsUpdatedFlag,
}) => {
  const [heightUnit, setHeightUnit] = useState(
    profile.bio_metrics ? profile.bio_metrics.height.unit : 'cm',
  );
  const [weightUnit, setWeightUnit] = useState(
    profile.bio_metrics ? profile.bio_metrics.weight.unit : 'kg',
  );
  const [height, setHeight] = useState(
    profile.bio_metrics ? profile.bio_metrics.height.value : '',
  );
  const [weight, setWeight] = useState(
    profile.bio_metrics ? profile.bio_metrics.weight.value : '',
  );
  const [heightActionSheetRef, setHeightActionSheetRef] = useState(null);
  const [weightActionSheetRef, setWeightActionSheetRef] = useState(null);
  const [validationError, setValidationError] = useState(false);

  let heightUnitsMenu = null;
  let weightUnitsMenu = null;

  const showHeightActionSheet = () => {
    heightActionSheetRef.show();
  };

  const showWeightActionSheet = () => {
    weightActionSheetRef.show();
  };

  const setHeightMenuRef = ref => {
    heightUnitsMenu = ref;
  };

  const setWeightMenuRef = ref => {
    weightUnitsMenu = ref;
  };

  const handleHeightMenu = () => {
    heightUnitsMenu.show();
  };

  const handleWeightMenu = () => {
    weightUnitsMenu.show();
  };

  const handleHeightUnitSelect = value => {
    setHeightUnit(value);
    heightUnitsMenu.hide();
  };

  const handleWeightUnitSelect = value => {
    setWeightUnit(value);
    weightUnitsMenu.hide();
  };

  const handleHeightSelection = index => {
    const foundIndex = getHeightOptions()[index];
    setHeight(foundIndex);
  };

  const handleWeightSelection = index => {
    const foundIndex = getWeightOptions()[index];
    setWeight(foundIndex);
  };

  useEffect(() => {
    if (userDetailsUpdated) {
      resetUserDetailsUpdatedFlag('biometrics');
    }
  }, [userDetailsUpdated]);

  const handleSubmit = () => {
    if (height.cm && weight.kg) {
      setValidationError(false);

      let payload = {
        height: {
          data: [
            {
              type: height,
              value: height.cm,
              unit: heightUnit === 'cm' ? heightUnit : 'feet',
            },
          ],
        },
        weight: {
          data: [
            {
              type: weight,
              value: weightUnit === 'kg' ? weight.kg : weight.pounds,
              unit: weightUnit,
            },
          ],
        },
      };
      createUserBioMetrics(
        {
          ...payload,
        },
        token,
        'onboarding',
      );
    } else {
      setValidationError(true);
    }
  };

  const getHeightOptions = () => {
    const height = [];
    if (heightUnit === 'cm') {
      for (let i = 105; i <= 260; i++) {
        const realFeet = (i * 0.3937) / 12;
        const feet = Math.floor(realFeet);
        const inch = Math.round((realFeet - feet) * 12);
        height.push({cm: i, feet: feet, inches: inch});
      }
    } else {
      for (let i = 3; i <= 8; i++) {
        for (let j = i === 3 ? 5 : 0; j <= (i === 8 ? 5 : 11); j++) {
          const cm = Math.round(`${i}.${j}` / 0.032808);
          height.push({feet: i, inches: j, cm: cm});
        }
      }
    }
    return height;
  };

  const renderHeightOptions = () => {
    const height = getHeightOptions();
    return heightUnit === 'cm'
      ? height.map(item => item.cm)
      : height.map(item => `${item.feet}' - ${item.inches}"`);
  };

  const getWeightOptions = () => {
    const weight = [];
    if (weightUnit === 'kg') {
      for (let i = 10; i <= 300; i++) {
        const pound = Math.round(i * 2.2046);
        weight.push({kg: i, pounds: pound});
      }
    } else {
      for (let i = 22; i <= 661; i++) {
        const kg = Math.round(i / 2.2046);
        weight.push({kg: kg, pounds: i});
      }
    }
    return weight;
  };

  const renderWeightOptions = () => {
    const weight = getWeightOptions();
    return weightUnit === 'kg'
      ? weight.map(item => item.kg)
      : weight.map(item => item.pounds);
  };

  return (
    <PageLayout>
      <View style={styles.rootContainer}>
        <GlobalOverlayLoading loading={loading} textContent="" />
        <View>
          <Text style={styles.titleHeading}>
            Great! Let's get your height{'\n'} and weight
          </Text>
          <Text style={styles.subHeading}>
            We'll need this info to setup your fitness levels.
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'column',
            // alignItems: 'center',
            width: '100%',
            paddingLeft: 40,
            paddingRight: 40,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              // justifyContent: 'center',
              // alignItems: 'flex-start',
            }}>
            {error ? <CustomAlert error={error} /> : null}
            <View style={styles.userInfoInput}>
              <Text style={styles.fieldLabel}>
                HEIGHT <Text style={styles.asterisk}>*</Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{minWidth: 130}}>
                  <LabelField
                    roundness={28}
                    placeholder="Height"
                    value={
                      heightUnit === 'cm' && height.cm
                        ? height.cm
                        : heightUnit === 'ft - in' && height.feet
                        ? `${height.feet}' - ${height.inches}"`
                        : ''
                    }
                    onPress={showHeightActionSheet}
                    containerStyle={{
                      elevation: 0,
                      borderWidth: 1,
                      borderColor: '#DEDEDE',
                    }}
                    inputStyle={styles.basicInfoLabelField}
                  />
                </View>
                <View style={{minWidth: 130}}>
                  <LabelField
                    roundness={28}
                    placeholder="cm"
                    value={heightUnit}
                    onPress={handleHeightMenu}
                    containerStyle={{
                      elevation: 0,
                      borderWidth: 1,
                      borderColor: '#DEDEDE',
                    }}
                    icon={
                      <Icon name="chevron-down" color="#ACACAC" size={28} />
                    }
                    iconAlign="right"
                    inputStyle={styles.basicInfoLabelField}
                  />
                  <Menu ref={setHeightMenuRef} style={{width: 130}}>
                    <MenuItem
                      key="cm"
                      onPress={() => handleHeightUnitSelect('cm')}>
                      cm
                    </MenuItem>
                    <MenuItem
                      key="ft"
                      onPress={() => handleHeightUnitSelect('ft - in')}>
                      ft - in
                    </MenuItem>
                  </Menu>
                </View>
              </View>
              <HelperText
                type="error"
                visible={!height.cm && validationError}
                style={styles.errorText}>
                * Height is required
              </HelperText>
            </View>
            <View style={styles.userInfoInput}>
              <Text style={styles.fieldLabel}>
                WEIGHT <Text style={styles.asterisk}>*</Text>
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View style={{minWidth: 130}}>
                  <LabelField
                    roundness={28}
                    placeholder="Weight"
                    value={
                      weightUnit === 'kg' && weight.kg
                        ? weight.kg
                        : weightUnit === 'pound' && weight.pounds
                        ? weight.pounds
                        : ''
                    }
                    onPress={showWeightActionSheet}
                    containerStyle={{
                      elevation: 0,
                      borderWidth: 1,
                      borderColor: '#DEDEDE',
                    }}
                    inputStyle={styles.basicInfoLabelField}
                  />
                </View>
                <View style={{minWidth: 130}}>
                  <LabelField
                    roundness={28}
                    placeholder="kg"
                    value={weightUnit}
                    onPress={handleWeightMenu}
                    containerStyle={{
                      elevation: 0,
                      borderWidth: 1,
                      borderColor: '#DEDEDE',
                    }}
                    icon={
                      <Icon name="chevron-down" color="#ACACAC" size={28} />
                    }
                    iconAlign="right"
                    inputStyle={styles.basicInfoLabelField}
                  />
                  <Menu ref={setWeightMenuRef} style={{width: 130}}>
                    <MenuItem
                      key="kg"
                      onPress={() => handleWeightUnitSelect('kg')}>
                      kg
                    </MenuItem>
                    <MenuItem
                      key="pound"
                      onPress={() => handleWeightUnitSelect('pound')}>
                      pound
                    </MenuItem>
                  </Menu>
                </View>
              </View>
              <HelperText
                type="error"
                visible={!weight.kg && validationError}
                style={styles.errorText}>
                * Weight is required
              </HelperText>
            </View>
          </View>
          <View style={styles.successCheckIconContainer}>
            <Button
              mode="outlined"
              style={styles.nextButton}
              labelStyle={styles.nextButtonLabel}
              onPress={() => handleSubmit()}>
              Next
            </Button>
            <Button
              mode="text"
              labelStyle={styles.cancelButtonLabel}
              onPress={() => NavigationService.navigate('SignIn')}>
              Cancel
            </Button>
          </View>
        </View>
      </View>
      <ActionSheet
        ref={aSheet => {
          setHeightActionSheetRef(aSheet);
        }}
        // cancelButtonIndex={4}
        styles={{
          titleText: {
            fontSize: 14,
            color: '#000',
            textTransform: 'capitalize',
            lineHeight: 24,
            fontFamily: 'Roboto',
          },
          cancelButtonBox: {
            height: 50,
            marginTop: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          },
        }}
        title={'Select Height'}
        options={renderHeightOptions()}
        onPress={index => {
          handleHeightSelection(index);
        }}
      />
      <ActionSheet
        ref={aSheet => {
          setWeightActionSheetRef(aSheet);
        }}
        // cancelButtonIndex={4}
        styles={{
          titleText: {
            fontSize: 16,
            lineHeight: 40,
            color: '#000',
            textTransform: 'capitalize',
            fontFamily: 'Roboto',
          },
          titleBox: {
            height: 48,
          },
          cancelButtonBox: {
            height: 50,
            marginTop: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fff',
          },
          messageBox: {
            backgroundColor: 'red',
          },
          messageText: {
            color: 'red',
            fontSize: 20,
            lineHeight: 40,
          },
          buttonText: {
            color: 'red',
            fontSize: 20,
            lineHeight: 40,
          },
        }}
        title={'Select Weight'}
        options={renderWeightOptions()}
        onPress={index => {
          handleWeightSelection(index);
        }}
      />
    </PageLayout>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.user.loading,
    token: state.user.token,
    profile: state.user.profile,
    error: state.user.error['create-user-biometrics'] || null,
    userDetailsUpdated:
      state.user.userDetailsUpdated['update-details-biometrics'] || null,
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createUserBioMetrics,
      resetUserDetailsUpdatedFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(FitnessInfo);
