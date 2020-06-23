import React, {useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import VicChartScatter from '../components/vicChart';
import useInterval from '../hooks/useInterval';

const listColors = ['#060faf', '#a83e3c', '#979797', '#363636'];

export default function VicChart({running}) {
  const [datas, setDatas] = useState([]);
  const [datas2, setDatas2] = useState([]);
  const currentIndex = useRef(0);
  const currentColor = useRef(0);
  const direction = useRef(1);
  const lastPoint = useRef(null);
  const [delay, setDelay] = useState(300);

  useInterval(
    () => {
      if (!lastPoint.current) {
        lastPoint.current = {x: 0, y: 0};
        setDatas([
          {
            color: listColors[currentColor.current],
            data: [lastPoint.current],
          },
        ]);

        setDatas2([
          {
            color: listColors[currentColor.current++],
            data: [lastPoint.current],
          },
        ]);
      } else {
        if (
          lastPoint.current.x !== 0 &&
          lastPoint.current.y <= 0 &&
          direction.current === -1
        ) {
          direction.current = 1;
          currentIndex.current++;
          lastPoint.current = {x: lastPoint.current.x + 0.1, y: 0};

          if (currentColor.current === listColors.length) {
            currentColor.current = 0;
          }

          setDatas(prev => [
            ...prev,
            {
              color: listColors[currentColor.current],
              data: [lastPoint.current],
            },
          ]);

          setDatas2(prev2 => [
            ...prev2,
            {
              color: listColors[currentColor.current++],
              data: [
                {
                  x: lastPoint.current.y,
                  y: lastPoint.current.y / lastPoint.current.x,
                },
              ],
            },
          ]);
        } else {
          if (lastPoint.current.y >= 2) {
            direction.current = -1;
          }

          lastPoint.current = {
            x: lastPoint.current.x + 0.07,
            y: lastPoint.current.y + 0.09 * direction.current,
          };

          setDatas(prev => {
            prev[currentIndex.current].data.push(lastPoint.current);
            return [...prev];
          });

          setDatas2(prev2 => {
            prev2[currentIndex.current].data.push({
              x: lastPoint.current.y,
              y: lastPoint.current.y / lastPoint.current.x,
            });
            return [...prev2];
          });
        }
      }
    },
    running ? delay : null,
  );

  return (
    <View>
      <VicChartScatter
        datas={datas2}
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

// const dataTemp = [
//   {
//     color: 'red',
//     data: [
//       {x: 0, y: 0},
//       {x: 0.3, y: 3},
//       {x: 0.6, y: 8},
//       {x: 0.9, y: 7.8},
//       {x: 1.2, y: 6},
//       {x: 1.5, y: 4},
//       {x: 1.8, y: 1},
//       {x: 1.7, y: -1},
//       {x: 1.5, y: -4},
//       {x: 1.2, y: -7},
//       {x: 0.9, y: -6},
//       {x: 0.6, y: -5},
//       {x: 0.3, y: -2},
//       {x: 0.1, y: -1},
//     ],
//   },
// ];
