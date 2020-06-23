/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {SafeAreaView, StatusBar, View, Button, StyleSheet} from 'react-native';
import VicChart from './screens/VictoryChart';
import LineChartScreen from './screens/ChartWrapper';
import D3Chart from './screens/D3Chart';

const App = () => {
  const [running, setRunning] = useState(false);

  const handleStart = () => {
    setRunning(true);
  };

  const handleEnd = () => {
    setRunning(false);
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        {/* <VicChart running={running} />
        <View style={styles.btnContainer}>
          <Button
            style={styles.btn}
            title="Bắt đầu lại di"
            onPress={handleStart}
          />
          <Button style={styles.btn} title="Kết thúc" onPress={handleEnd} />
        </View> */}
        {/* <LineChartScreen /> */}
        <D3Chart />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  btn: {
    backgroundColor: 'red',
  },
});

export default App;
