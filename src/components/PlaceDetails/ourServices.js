import React, {useState, useEffect, useRef} from 'react';
import {View, Text, Image, ScrollView, Dimensions} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Button, Card, Surface} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from '../../styles/ourServices.style';
import theme from '../../styles/theme.style';
import {getViewportHeight} from '../../../utils/helper';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';

const screenHeight = Math.round(Dimensions.get('window').height);

const OurServices = (props) => {
  const [bottomDrawerVisibility, setBottomDrawerVisibility] = useState(
    'collapse',
  );

  const refRBSheet = useRef();

  useEffect(() => {
    if (refRBSheet) {
      refRBSheet.current.close();
    }
  }, [refRBSheet]);

  const handleOnCloseSheet = () => {
    setBottomDrawerVisibility('collapse');
  };

  const handleDrawerVisibility = (value) => {
    if (value === 'collapse') {
      refRBSheet.current.close();
    } else {
      setBottomDrawerVisibility(value);
      refRBSheet.current.open();
    }
  };

  const renderServicesList = () => {
    const cardLoop = [1, 2, 3];
    return (
      <ScrollView>
        <View style={styles.drawerHandler}>
          <Button
            mode="outlined"
            onPress={() =>
              handleDrawerVisibility(
                bottomDrawerVisibility === 'expand' ? 'collapse' : 'expand',
              )
            }
            style={styles.avaiableServicesButton}
            labelStyle={styles.avaiableServicesButtonLabel}
            // disabled={!acceptCondition}
            size="small">
            Available Private Bookings
          </Button>
        </View>
        {cardLoop.map((item) => (
          <Card
            style={styles.servicesCardContainer}
            // onPress={() => navigateToScreen(data.slug)}
          >
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View>
                <Image
                  style={styles.serviceCardCover}
                  source={{
                    uri: `https://via.placeholder.com/728.png?text=a`,
                  }}
                />
              </View>
              <View style={{marginLeft: 16}}>
                <Text style={styles.serviceCardTitle}>Jet Ski Ride</Text>
                <Text style={styles.serviceCardContent}>Starts at BHD 50</Text>
              </View>
              <View style={{marginLeft: 60}}>
                <Button
                  mode="outlined"
                  style={styles.cardViewButton}
                  labelStyle={styles.cardViewButtonLabel}
                  // onPress={handleSuccessModalClose}
                >
                  View
                </Button>
              </View>
            </View>
          </Card>
        ))}
      </ScrollView>
    );
  };
  return (
    <React.Fragment>
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        closeOnPressMask={true}
        onClose={handleOnCloseSheet}
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: theme.SECONDARY_COLOR,
          },
          container: {
            height: screenHeight - 120,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          },
        }}>
        {renderServicesList()}
      </RBSheet>

      {bottomDrawerVisibility === 'collapse' && (
        <Surface style={[styles.fakeSheetCt]}>
          <Button
            mode="contained"
            onPress={() =>
              handleDrawerVisibility(
                bottomDrawerVisibility === 'expand' ? 'collapse' : 'expand',
              )
            }
            style={styles.ourServicesButton}
            labelStyle={styles.ourServicesButtonLabel}
            // disabled={!acceptCondition}
            size="small">
            Our Services
          </Button>
        </Surface>
      )}
    </React.Fragment>
  );
};

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
  return {
    profile: state.user.profile,
    token: state.user.token,
  };
};

// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(OurServices);
