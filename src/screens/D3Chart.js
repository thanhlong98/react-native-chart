import React, {useState} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import * as d3 from 'd3';
import Svg, {G} from 'react-native-svg';

const {width, height} = Dimensions.get('window');

export default function D3Chart() {
  const padding = 20;
  const HEIGHT_SVG = height / 3;
  const WIDTH_SVG = width;
  const HEIGH_CHART = HEIGHT_SVG;
  const WIDTH_CHART = WIDTH_SVG - padding;

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

  const y = d3
    .scaleLinear()
    .domain([-15, 15])
    .range([0, HEIGH_CHART]);

  const x = d3
    .scaleLinear()
    .domain([0, 7.8])
    .range([0, WIDTH_CHART]);

  const line = d3
    .line()
    .x(d => x(d.x))
    .y(d => y(d.y));

  console.log(line(data));

  return (
    <View>
      <Svg>
        <G />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({});
