import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import VicChartScatter from '../components/vicChart';

const listColors = ['#060faf', '#a83e3c', '#979797', '#363636'];

export default function VicChart({running}) {
  const [datas, setDatas] = useState([]);
  const [datas2, setDatas2] = useState([]);
  const currentIndex = useRef(0);
  const currentColor = useRef(0);
  const direction = useRef(1);
  const interval = useRef(null);

  useEffect(() => {
    if (running) {
      interval.current = setInterval(() => {
        setDatas(prev => {
          if (prev.length === 0) {
            setDatas2([
              {color: listColors[currentColor.current], data: [{x: 0, y: 0}]},
            ]);
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
            let d1x = Math.round((lastPoint.x + 0.3) * 100) / 100;
            let d1y = 0;

            setDatas2(prev2 => {
              return [
                ...prev2,
                {
                  color: listColors[currentColor.current],
                  data: [
                    {
                      x: d1y,
                      y: d1y / d1x,
                    },
                  ],
                },
              ];
            });

            return [
              ...prev,
              {
                color: listColors[currentColor.current],
                data: [{x: d1x, y: d1y}],
              },
            ];
          }

          const d1x = Math.round((lastPoint.x + 0.03) * 100) / 100;
          const d1y =
            Math.round((lastPoint.y + 0.1 * direction.current) * 100) / 100;

          prev[currentIndex.current].data.push({
            x: d1x,
            y: d1y,
          });

          setDatas2(prev2 => {
            prev2[currentIndex.current].data.push({
              x: d1y,
              y: d1y / d1x,
            });

            return [...prev2];
          });

          return [...prev];
        });
      }, 300);
    } else {
      clearInterval(interval.current);
    }

    return () => {
      clearInterval(interval.current);
    };
  }, [running]);

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

// {x: 0, y: 0},
// {x: 0.3, y: 3},
// {x: 0.6, y: 8},
// {x: 0.9, y: 7.8},
// {x: 1.2, y: 6},
// {x: 1.5, y: 4},
// {x: 1.8, y: 1},
// {x: 1.7, y: -1},
// {x: 1.5, y: -4},
// {x: 1.2, y: -7},
// {x: 0.9, y: -6},
// {x: 0.6, y: -5},
// {x: 0.3, y: -2},
// {x: 0.1, y: -1},
