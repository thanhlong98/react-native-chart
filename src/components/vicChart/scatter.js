import React from 'react';
import {VictoryScatter} from 'victory-native';

const Scatter = ({color, size, domain, data}) => {
  return (
    <VictoryScatter
      style={{data: {fill: color}}}
      size={size}
      domain={domain}
      data={data}
    />
  );
};

export default React.memo(Scatter);
