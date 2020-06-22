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
        <VicChart running={running} />
        <View style={styles.btnContainer}>
          <Button title="Bắt đầu lại di" onPress={handleStart} />
          <Button title="Kết thúc" onPress={handleEnd} />
        </View>
        {/* <LineChartScreen /> */}
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
});

export default App;
