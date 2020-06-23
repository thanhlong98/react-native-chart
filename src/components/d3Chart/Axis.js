import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {G, Line} from 'react-native-svg';

const Axis = props => {
  const {width, x, y, tickPoints, vertical} = props;
  const TICK_SIZE = 3;

  let endX = vertical ? x : x + width;
  // let endY = vertical ?
  return (
    <G>
      <Line stroke="#000" strokeWidth="3" x1={x1} x2={x2} y1={y1} y2={y2} />
      {tickPoints.map(pos => (
        <Line key={pos} stroke="#000" strokeWidth="3" />
      ))}
    </G>
  );
};

export default Axis;

const styles = StyleSheet.create({});
