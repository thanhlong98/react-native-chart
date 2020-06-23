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
    width: width_chart,
    height: height_chart,
  });

  return (
    <Svg width={width} height={height} style={styles.svg}>
      <G x={PaddingSize} y={PaddingSize}>
        <Path d={lineGraph.path} stroke="#000" strokeWidth={2} />
        <G fill="none">
          <Line
            x1={0}
            y1={height_chart}
            x2={0}
            y2={0}
            stroke="#000"
            strokeWidth={1}
          />
          <Line
            x1={0}
            y1={height_chart}
            x2={width_chart}
            y2={height_chart}
            stroke="#000"
            strokeWidth={1}
          />
        </G>
      </G>
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: {
    backgroundColor: 'green',
  },
});
