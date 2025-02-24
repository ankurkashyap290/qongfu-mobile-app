/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

export async function firebaseBackgroundMessage(message) {
  console.log(console.log('backgroundMEssage', message));
  return Promise.resolve();
}

AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  firebaseBackgroundMessage,
);

function HeadlessCheck({isHeadless}) {
  if (isHeadless) {
    // App has been launched in the background by iOS, ignore
    return null;
  }

  return <App />;
}

AppRegistry.registerComponent(appName, () => HeadlessCheck);
