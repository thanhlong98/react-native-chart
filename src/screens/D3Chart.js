import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import D3Graph from '../components/d3Chart/d3Graph';

const {width, height} = Dimensions.get('window');

export default function D3Chart() {
  const [data, setData] = useState([
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
  ]);

  const graphProps = {};
  graphProps.width = width;
  graphProps.height = height / 3;
  graphProps.data = data;
  graphProps.xAccessor = d => d.x;
  graphProps.yAccessor = d => d.y;

  return (
    <View style={styles.container}>
      <D3Graph {...graphProps} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
