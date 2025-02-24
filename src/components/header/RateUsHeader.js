import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import theme from '../../styles/theme.style';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {resetPlaceRatingSuccessFlag} from '../../../redux/app/actions';
import * as NavigationService from '../../navigators/NavigationService';

const PlaceDetailHeader = (props) => {
  const {resetPlaceRatingSuccessFlag} = props;
  const handleGoBack = () => {
    resetPlaceRatingSuccessFlag();
    NavigationService.goBack();
  };
  return (
    <View>
      <Icon
        name="chevron-left"
        size={36}
        color={theme.PRIMARY_COLOR}
        onPress={() => handleGoBack()}
      />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      resetPlaceRatingSuccessFlag,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(PlaceDetailHeader);
