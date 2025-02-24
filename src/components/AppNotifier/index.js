import React, {useEffect, useState} from 'react';
import {View, Text, Dimensions, Image, TouchableOpacity} from 'react-native';
import {Button, Portal, Card, Avatar} from 'react-native-paper';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import themeStyle from '../../styles/theme.style';
import {
  clearNotificationQueue,
  removeNotificationFromQueue,
} from '../../../redux/app/actions';

const screenWidth = Math.round(Dimensions.get('window').width);

const AppNotifier = ({
  notificationsQueue,
  clearNotificationQueue,
  removeNotificationFromQueue,
}) => {
  const [visible, setVisible] = useState(false);
  const [showingList, setShowingList] = useState([]);

  useEffect(() => {
    const itemsToShow = _.cloneDeep(notificationsQueue).splice(
      Math.max(notificationsQueue.length - 3, 0),
    );
    setVisible(itemsToShow.length > 0);
    setShowingList(itemsToShow);
  }, [notificationsQueue]);

  const handleClearAll = () => {
    clearNotificationQueue();
  };

  const handleClearCard = (item) => {
    removeNotificationFromQueue(item.id);
  };

  const handleCardItem = (item) => {
    if (item.has_page) {
      //TODO: navigate to navigation -> sub page
    } else {
    }
  };

  const RightContent = (props, item) => (
    <TouchableOpacity
      onPress={() => {
        handleClearCard(item);
      }}>
      <Avatar.Icon {...props} icon="close" style={{marginRight: 10}} />
    </TouchableOpacity>
  );

  const renderTop3Notifications = () => {
    return showingList.map((item) => {
      return (
        <Card
          elevation={4}
          style={{
            margin: 15,
            marginTop: 7,
            marginBottom: 0,
          }}
          onPress={() => {
            handleCardItem(item);
          }}>
          <Card.Title
            title={item.title}
            subtitle={item.card_content}
            left={() => (
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 30,
                  height: 50,
                  width: 50,
                  borderColor: '#ededed',
                }}>
                <Image
                  source={require('../../assets/img/running.png')}
                  style={{
                    marginTop: 10,
                    marginLeft: 15,
                  }}
                />
              </View>
            )}
            right={(props) => {
              return RightContent(props, item);
            }}
            titleStyle={{
              fontSize: 12,
              fontWeight: themeStyle.FONT_WEIGHT_MEDIUM,
              minHeight: 14,
              lineHeight: 14,
            }}
            subtitleNumberOfLines={3}
          />
        </Card>
      );
    });
  };
  return visible ? (
    <Portal>
      <View
        style={{
          position: 'absolute',
          backgroundColor: 'transparent',
          top: 0,
          left: 0,
          right: 0,
          width: screenWidth,
          marginTop: 100,
          paddingTop: 10,
          paddingBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
          }}>
          {/* <Text>Clear All</Text> */}
          <TouchableOpacity onPress={handleClearAll}>
            <Avatar.Icon size={20} icon="close" style={{marginRight: 10}} />
          </TouchableOpacity>
        </View>
        {renderTop3Notifications()}
      </View>
    </Portal>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    notificationsQueue: state.app.notificationsQueue,
  };
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {clearNotificationQueue, removeNotificationFromQueue},
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(AppNotifier);
