import React from 'react';
import {StyleSheet} from 'react-native';
import Svg, {G, Path, Line} from 'react-native-svg';
import {createLineGraph} from './graph-utils';

const PaddingSize = 20;

export default function D3Graph(props) {
  const {data, width, height, xAccessor, yAccessor} = props;

  const fullPaddingSize = PaddingSize * 2;
  const height_chart = height - fullPaddingSize;
  const width_chart = width - fullPaddingSize;

  const lineGraph = createLineGraph({
    data,
    xAccessor,
    yAccessor,
    startX: fullPaddingSize,
    startY: fullPaddingSize,
    width: width_chart,
    height: height_chart,
  });
  console.log(lineGraph.path);
  return (
    <Svg width={width} height={height} style={{backgroundColor: 'red'}}>
      <G x={PaddingSize} y={5}>
        <Path d={lineGraph.path} stroke="#000" strokeWidth={1} />
        <Line
          x1={PaddingSize}
          y1={height + PaddingSize}
          x2={width + PaddingSize}
          y2={height + PaddingSize}
          stroke={'#fff'}
          strokeWidth="1"
        />
      </G>
    </Svg>
  );
}

const styles = StyleSheet.create({});
