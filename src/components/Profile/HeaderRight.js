import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Menu from 'react-native-material-menu';
import {Appbar, List} from 'react-native-paper';
import theme from '../../styles/theme.style';
import styles from '../../styles/myProfile.style';
import * as NavigationService from '../../navigators/NavigationService';

const HeaderRight = () => {
  let menu = null;
  const setMenuRef = (ref) => {
    menu = ref;
  };

  const handleShareMenuOpen = () => {
    menu.show();
  };

  const handleMenuItem = (route) => {
    menu.hide();
    NavigationService.navigate(route);
  };

  return (
    <View>
      <Icon
        name="dots-horizontal"
        size={32}
        color={theme.PRIMARY_COLOR}
        onPress={() => handleShareMenuOpen()}
        style={{marginLeft: 60}}
      />
      <Menu ref={setMenuRef} style={styles.shareMenu}>
        <List.Item
          title="Edit profile"
          titleStyle={styles.shareMenuListItem}
          onPress={() => handleMenuItem('EditProfile')}
          right={(props) => <List.Icon {...props} icon="account-edit" />}
        />
      </Menu>
    </View>
  );
};

export default HeaderRight;
