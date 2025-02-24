import React from 'react';
import {View} from 'react-native';
import Places from './Places';
import {getPageKeyByRoute} from '../../utils';
import {getViewportHeight} from '../../utils/helper';

const ExplorerSearch = ({navigation}) => {
  const pageKey = getPageKeyByRoute(navigation.state.routeName);
  return (
    <View style={{backgroundColor: '#fff', minHeight: getViewportHeight(true)}}>
      <Places pageKey={pageKey} navigation={navigation} />
    </View>
  );
};

export default ExplorerSearch;
