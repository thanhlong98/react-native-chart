import React, {useEffect, useRef, useState} from 'react';
import {Button, StyleSheet, View, Alert} from 'react-native';
import VicChartScatter from '../components/vicChart';

const listColors = ['#060faf', '#a83e3c', '#979797', '#363636'];

export default function VicChart({running}) {
  const [datas, setDatas] = useState([]);
  const currentIndex = useRef(0);
  const currentColor = useRef(0);
  const direction = useRef(1);
  const interval = useRef(null);
  const staticData = useRef(null);

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setDatas(prev => {
          if (prev.length === 0) {
            return [
              {color: listColors[currentColor.current], data: [{x: 0, y: 0}]},
            ];
          }

          let lastPoint = prev[currentIndex.current].data.slice(-1)[0];

          if (lastPoint.y >= 2) {
            direction.current = -1;
          }

          if (lastPoint.x !== 0 && lastPoint.y < 0) {
            currentIndex.current++;
            direction.current = 1;

            if (currentColor.current === listColors.length - 1) {
              currentColor.current = 0;
            } else {
              currentColor.current++;
            }

            return [
              ...prev,
              {
                color: listColors[currentColor.current],
                data: [{x: Math.round((lastPoint.x + 0.3) * 100) / 100, y: 0}],
              },
            ];
          }

          prev[currentIndex.current].data.push({
            x: Math.round((lastPoint.x + 0.03) * 100) / 100,
            y: Math.round((lastPoint.y + 0.1 * direction.current) * 100) / 100,
          });

          return [...prev];
        });
      }, 300);
    } else {
      clearInterval(interval.current);
    }
  }, [running]);

  useEffect(() => {
    let datasTemp = [];
    let currentColorTemp = 0;
    let currentIndexTemp = 0;
    let directionTemp = 1;

    while (datasTemp.length <= 4) {
      if (datasTemp.length === 0) {
        datasTemp = [
          {color: listColors[currentColor.current], data: [{x: 0, y: 0}]},
        ];
        continue;
      }

      let lastPoint = datasTemp[currentIndexTemp].data.slice(-1)[0];

      if (lastPoint.y >= 2) {
        directionTemp = -1;
      }

      if (lastPoint.x !== 0 && lastPoint.y < 0) {
        currentIndexTemp++;
        directionTemp = 1;

        if (currentColorTemp === listColors.length - 1) {
          currentColorTemp = 0;
        } else {
          currentColorTemp++;
        }

        datasTemp = [
          ...datasTemp,
          {
            color: listColors[currentColorTemp],
            data: [{x: Math.round((lastPoint.x + 0.3) * 100) / 100, y: 0}],
          },
        ];
        continue;
      }

      datasTemp[currentIndexTemp].data.push({
        x: Math.round((lastPoint.x + 0.03) * 100) / 100,
        y: Math.round((lastPoint.y + 0.1 * directionTemp) * 100) / 100,
      });
    }

    datasTemp.pop();
    staticData.current = datasTemp;
  }, []);

  return (
    <View>
      <VicChartScatter
        datas={[]}
        label={{x: 'Lít', y: 'Lít/giây'}}
        domain={{x: [0, 7.8], y: [-16, 16]}}
        padding={{y: 2}}
        tickValue={{stepX: 0.6, stepY: 4}}
      />
      <VicChartScatter
        datas={datas}
        label={{x: 'Giây', y: 'Lít'}}
        domain={{x: [0, 14], y: [-3.2, 3.2]}}
        padding={{y: 0.8}}
        tickValue={{stepX: 2, stepY: 0.8}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
