import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {VictoryChart, VictoryAxis, VictoryScatter} from 'victory-native';

const createArray = (from, to, range) => {
  const arr = [];
  for (let i = from; i <= to; i += range) {
    arr.push(Math.round(i * 100) / 100);
  }
  return arr;
};

export default function VicChart() {
  return (
    <View>
      <VictoryChart>
        <VictoryAxis
          label="Lít/giây"
          dependentAxis
          domain={[-18, 18]}
          tickValues={createArray(-16, 16, 4)}
          orientation="left"
          standalone={false}
          style={{
            grid: {
              stroke: '#ECEFF1',
            },
          }}
        />
        <VictoryAxis
          standalone={true}
          domain={[0, 7.8]}
          tickValues={createArray(0, 7.8, 0.6)}
          label="Lít"
          offsetY={50}
        />
        <VictoryScatter
          style={{data: {fill: '#c43a31'}}}
          size={2}
          domain={{x: [0, 7.2], y: [-15, 15]}}
          data={[
            {x: 0, y: 0},
            {x: 0.3, y: 3},
            {x: 0.6, y: 8},
            {x: 0.9, y: 7.8},
            {x: 1.2, y: 6},
            {x: 1.5, y: 4},
            {x: 1.8, y: 1},
            {x: 1.7, y: -1},
            {x: 1.5, y: -4},
            {x: 1.2, y: -7},
            {x: 0.9, y: -6},
            {x: 0.6, y: -5},
            {x: 0.3, y: -2},
            {x: 0.09, y: -1},
          ]}
        />
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({});
