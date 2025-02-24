import React, {useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import {List, Divider, Switch, Card} from 'react-native-paper';
import styles from '../styles/accountSettings.style';
import theme from '../styles/theme.style';
import * as NavigationService from '../navigators/NavigationService';
import PageLayout from '../layout/PageLayout';

const AccountSettings = props => {
  const [messagingEnable, setMessagingEnable] = useState(true);

  return (
    <PageLayout>
      <Text style={styles.listHeadings}>Account Settings</Text>

      <Card style={styles.list}>
        <List.Item
          title="Account Info"
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => NavigationService.navigate('AccountInfo')}
          style={styles.listItem}
        />
      </Card>
      <Text style={styles.listHeadings}>Personal Settings</Text>

      <Card style={styles.list}>
        <List.Item
          title="Personal Info"
          onPress={() => NavigationService.navigate('ProfileInfo')}
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={[styles.listItem, {marginTop: 2}]}
        />
        <Divider />
        <List.Item
          title="Location Setup"
          right={props => <List.Icon {...props} icon="chevron-right" />}
          onPress={() => NavigationService.navigate('LocationSetup')}
          style={styles.listItem}
        />
        <Divider />
        <List.Item
          title="Lifestyles and Qongfu"
          onPress={() =>
            NavigationService.navigate('LifestylesAndQongfuUpdate', {
              buttonText: 'Confirm',
              pageName: 'accountSettings',
            })
          }
          right={props => <List.Icon {...props} icon="chevron-right" />}
          style={[styles.listItem, {marginTop: 2}]}
        />
      </Card>
      <View>
        <View>
          <Text style={styles.listHeadings}>Actions Settings</Text>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: 15,
          }}>
          <Text style={styles.actionSettings}>Messaging Enabled</Text>
          <View style={styles.messagingEnableSwitch}>
            <Switch
              value={messagingEnable}
              color={theme.PRIMARY_COLOR}
              onValueChange={() => setMessagingEnable(!messagingEnable)}
            />
          </View>
        </View>
      </View>
    </PageLayout>
  );
};

export default AccountSettings;
