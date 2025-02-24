import React from 'react';
import {View, Text, Share} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu from 'react-native-material-menu';
import {Appbar, List, Divider} from 'react-native-paper';
import theme from '../../styles/theme.style';
import styles from '../../styles/placeDetails.style';

const TopBar = ({place}) => {
  let menu = null;
  const setMenuRef = (ref) => {
    menu = ref;
  };

  const handleShareMenuOpen = () => {
    menu.show();
  };

  const handleShareLink = async () => {
    try {
      const result = await Share.share({
        message: `https://staging.qongfu.com/places/${place.slug}`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log('share', result.activityType);
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      {/* <Icon
        name="dots-horizontal"
        size={32}
        color={theme.PRIMARY_COLOR}
        onPress={() => handleShareMenuOpen()}
        style={{marginLeft: 60}}
      />
      <Menu ref={setMenuRef} style={styles.shareMenu}>
        <List.Item
          title="Share"
          titleStyle={styles.shareMenuListItem}
          onPress={() => handleShareLink()}
        />
        <Divider />
        <List.Item title="Action Link" titleStyle={styles.shareMenuListItem} />
      </Menu> */}
    </View>
  );
};

export default TopBar;
