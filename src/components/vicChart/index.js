import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  VictoryZoomContainer,
  VictoryChart,
  VictoryAxis,
  VictoryScatter,
  VictoryLine,
} from 'victory-native';
import scatter from './scatter';

const createArray = (from, to, range) => {
  const arr = [];
  for (let i = from; i <= to; i += range) {
    arr.push(Math.round(i * 100) / 100);
  }
  return arr;
};

export default function VicChartScatter(props) {
  const {datas, label, domain, padding, tickValue} = props;
  return (
    <View>
      <VictoryChart
        containerComponent={
          <VictoryZoomContainer
            zoomDimension="x"
            // zoomDomain={{x: [0, 7.8]}}
            // minimumZoom={{x: 0.6}}
          />
        }>
        <VictoryAxis
          label={label.y}
          dependentAxis
          domain={
            padding.y
              ? [domain.y[0] - padding.y, domain.y[1] + padding.y]
              : domain.y
          }
          tickValues={createArray(domain.y[0], domain.y[1], tickValue.stepY)}
          orientation="left"
          style={{
            grid: {
              stroke: '#ECEFF1',
            },
          }}
        />

        <VictoryAxis
          label={label.x}
          domain={
            padding.x
              ? [domain.x[0] - padding.x, domain.x[1] + padding.x]
              : domain.x
          }
          tickValues={createArray(domain.x[0], domain.x[1], tickValue.stepX)}
          offsetY={50}
        />

        {datas.map((d, i) => (
          <VictoryScatter
            key={i}
            style={{data: {fill: d.color}}}
            size={2}
            domain={domain}
            data={d.data}
          />
        ))}
      </VictoryChart>
    </View>
  );
}

const styles = StyleSheet.create({});
