import React from 'react';
import {mapping} from '@eva-design/eva';
import {theme} from './src/themes';
import {StatusBar} from 'react-native';
import {
  ApplicationProvider,
  IconRegistry,
  Layout,
  Text,
} from 'react-native-ui-kitten';

import {EvaIconsPack} from '@ui-kitten/eva-icons';

import {Router} from './src/core/navigation/routes';

const onNavigationStateChange = console.log;

const App = () => (
  <>
    <IconRegistry icons={EvaIconsPack} />
    <StatusBar  translucent={true} backgroundColor="rgba(0, 0, 0, 0)" barStyle="light-content" />
    <ApplicationProvider mapping={mapping} theme={theme}>
      <Router onNavigationStateChange={onNavigationStateChange} />
    </ApplicationProvider>
  </>
);

export default App;
