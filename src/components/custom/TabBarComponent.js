import React from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {BottomTabBar} from 'react-navigation-tabs';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const businessRoutes = [
  'BusinessClientsTab',
  'BusinessHomeTab',
  'BusinessChatsTab',
];
const userRoutes = [
  'ExploreTab',
  'ChatsTab',
  'HomeTab',
  'BookingsTab',
  'WalletTab',
];

const HiddenView = () => <View style={{display: 'none'}} />;
const TouchableWithoutFeedbackWrapper = ({
  onPress,
  onLongPress,
  testID,
  accessibilityLabel,
  ...props
}) => (
  <TouchableWithoutFeedback
    onPress={onPress}
    onLongPress={onLongPress}
    testID={testID}
    hitSlop={{
      left: 15,
      right: 15,
      top: 5,
      bottom: 5,
    }}
    accessibilityLabel={accessibilityLabel}>
    <View {...props} />
  </TouchableWithoutFeedback>
);

const TabBarComponent = ({selectedBusiness, ...props}) => {
  return (
    <BottomTabBar
      {...props}
      style={{
        borderTopColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
      }}
      getButtonComponent={({route}) => {
        if (selectedBusiness) {
          if (businessRoutes.includes(route.key)) {
            return TouchableWithoutFeedbackWrapper;
          } else {
            return HiddenView;
          }
        } else {
          if (userRoutes.includes(route.key)) {
            return TouchableWithoutFeedbackWrapper;
          } else {
            return HiddenView;
          }
        }
      }}
    />
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    selectedBusiness: state.business.selectedBusiness,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TabBarComponent);
