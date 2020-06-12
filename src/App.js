/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import VicChart from './screens/VictoryChart';
import D3Chart from './screens/D3Chart';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <D3Chart />
      </SafeAreaView>
    </>
  );
};

export default App;
