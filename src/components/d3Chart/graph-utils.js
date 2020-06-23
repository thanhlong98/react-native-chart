import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
  scale,
  shape,
};

function createScaleX(minX, maxX, width) {
  return d3.scale
    .scaleLinear()
    .domain([minX, maxX])
    .range([0, width])
    .nice();
}

function createScaleY(minY, maxY, height) {
  return d3.scale
    .scaleLinear()
    .domain([minY, maxY])
    .range([height, 0])
    .nice();
}

export function createLineGraph({data, xAccessor, yAccessor, width, height}) {
  // Collect all y values.
  const allXValues = data.reduce((all, datum) => {
    all.push(xAccessor(datum));
    return all;
  }, []);

  // Get the min and max x value.
  const extentX = d3Array.extent(allXValues);
  const scaleX = createScaleX(extentX[0], extentX[1], width);

  // Collect all y values.
  const allYValues = data.reduce((all, datum) => {
    all.push(yAccessor(datum));
    return all;
  }, []);

  // Get the min and max y value.
  const extentY = d3Array.extent(allYValues);
  const scaleY = createScaleY(extentY[0], extentY[1], height);

  const lineShape = d3.shape
    .line()
    .x(d => scaleX(xAccessor(d)))
    .y(d => scaleY(yAccessor(d)));

  return {
    data,
    scale: {
      x: scaleX,
      y: scaleY,
    },
    path: lineShape(data),
  };
}

const getTickPoints = (range, extentX, extentY) => {
  let ticksX = [],
    ticksY = [];
  for (let i = extentX[0]; i <= extentX[1]; i += range.x) {
    ticksX.push(i);
  }

  for (let i = extentY[0]; i <= extentY[1]; i += range.x) {
    ticksY.push(i);
  }

  return {
    ticksX,
    ticksY,
  };
};
