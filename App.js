import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SafeAreaView from 'react-native-safe-area-view';
import {enableScreens} from 'react-native-screens';
import {
  ifIphoneX,
  getStatusBarHeight,
  getBottomSpace,
  isIphoneX,
} from 'react-native-iphone-x-helper';
import store from './redux/store';
import theme from './src/styles/theme.style';
import AppNavigator from './src/navigators';
import AppNotifier from './src/components/AppNotifier';

// eslint-disable-next-line
console.ignoredYellowBox = [
  'Remote debugger',
  'Deprecated',
  'Warning: isMounted',
  'TabBarTop',
  'createTab',
  'You should',
  'Method',
  'Warning: Require cycle:',
  'Warning: Functions',
];
console.disableYellowBox = true;

enableScreens();

const App = () => (
  <Provider store={store}>
    <SafeAreaProvider>
      <PaperProvider theme={theme.DEFAULT_THEME}>
        <SafeAreaView
          forceInset={{top: 'never', bottom: 'never'}}
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            ...ifIphoneX(
              {
                paddingTop: 0, //getStatusBarHeight(),
                paddingBottom: 0, // getBottomSpace(),
              },
              {
                paddingTop: 0,
                paddingBottom: 0,
              },
            ),
          }}>
          <AppNavigator />
          <AppNotifier />
        </SafeAreaView>
      </PaperProvider>
    </SafeAreaProvider>
  </Provider>
);

export default App;
