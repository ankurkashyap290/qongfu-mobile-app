import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {List, Avatar, Divider} from 'react-native-paper';
import styles from '../../styles/customDrawer.style';
import theme from '../../styles/theme.style';
import LifeStyleActive from '../../assets/img/drawer-lifestyle.svg';
import LifeStyleInactive from '../../assets/img/filter_lifestyles.svg';
import Authenticate from '../../assets/img/authenticatedWhiteBorder.svg';
import * as NavigationService from '../navigators/NavigationService';

class CustomDrawerContentComponent extends Component {
  render() {
    const {
      activeItemKey,
      screenProps: {profile},
      navigation,
    } = this.props;

    return (
      <>
        <View style={styles.sideDrawerContain}>
          <View style={styles.sideDrawerHead}>
            <View style={styles.sideDrawerAvatarContain}>
              <Avatar.Image
                size={64}
                source={require('../../assets/img/Profile_avatar_placeholder_large.png')}
                style={{backgroundColor: '#fff'}}
              />
              <View style={styles.shieldIcon}>
                <Authenticate />
              </View>
            </View>
            <View>
              <Text style={styles.userName}>
                {profile ? `${profile.display_name}` : ''}
              </Text>
              <Text style={styles.address}>
                {profile && profile.location ? profile.location : 'Place'}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('MyProfile')}>
                <Text style={styles.viewProfileBtnLabel}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.listItemSpace}>
          <List.Item
            title="Explore"
            left={props =>
              activeItemKey === 'Home' ? (
                <LifeStyleActive style={styles.lifestyleIcon} />
              ) : (
                <LifeStyleInactive style={styles.lifestyleIcon} />
              )
            }
            titleStyle={[
              styles.listItemLabel,
              {marginTop: 5},
              activeItemKey === 'Home' ? styles.listItemActive : '',
            ]}
            onPress={() => navigation.navigate('Home')}
          />

          <List.Item
            title="Maps"
            left={props => <List.Icon {...props} icon="map-outline" />}
            titleStyle={[
              styles.listItemLabel,
              activeItemKey === 'Maps' ? styles.listItemActive : '',
            ]}
            color={
              activeItemKey === 'Maps'
                ? theme.PRIMARY_COLOR
                : theme.SECONDARY_COLOR
            }
            onPress={() =>
              NavigationService.navigate('MapView', {
                resetFilter: true,
              })
            }
          />
        </View>
        <Divider />
        <View style={styles.listItemSpace}>
          <List.Item
            title="Notifications"
            left={props => (
              <List.Icon
                {...props}
                icon="bell-outline"
                color={
                  activeItemKey === 'Notifications'
                    ? theme.PRIMARY_COLOR
                    : theme.SECONDARY_COLOR
                }
              />
            )}
            titleStyle={[
              styles.listItemLabel,
              activeItemKey === 'Notifications' ? styles.listItemActive : '',
            ]}
            onPress={() => this.props.navigation.navigate('Notifications')}
          />
          <List.Item
            title="Settings"
            left={props => (
              <List.Icon
                {...props}
                icon="settings-outline"
                color={
                  activeItemKey === 'Settings'
                    ? theme.PRIMARY_COLOR
                    : theme.SECONDARY_COLOR
                }
              />
            )}
            titleStyle={[
              styles.listItemLabel,
              activeItemKey === 'Settings' ? styles.listItemActive : '',
            ]}
            onPress={() => navigation.navigate('Settings')}
          />
        </View>
        <Divider />
        <View style={styles.listItemSpace}>
          <List.Item
            title="Help Desk"
            left={props => (
              <List.Icon
                {...props}
                icon="headset"
                color={
                  activeItemKey === 'Help'
                    ? theme.PRIMARY_COLOR
                    : theme.SECONDARY_COLOR
                }
              />
            )}
            titleStyle={[
              styles.listItemLabel,
              activeItemKey === 'Help' ? styles.listItemActive : '',
            ]}
          />
        </View>
      </>
    );
  }
}

export default CustomDrawerContentComponent;
