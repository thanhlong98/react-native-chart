import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as d3Array from 'd3-array';

const d3 = {
  scale,
  shape,
};

function createScaleX(minX, maxX, startX, width) {
  return d3.scale
    .scaleLinear()
    .domain([minX, maxX])
    .range([0, width])
    .nice();
}

function createScaleY(minY, maxY, startY, height) {
  return d3.scale
    .scaleLinear()
    .domain([minY, maxY])
    .range([height, 0])
    .nice();
}

export function createLineGraph({
  data,
  xAccessor,
  yAccessor,
  startX,
  startY,
  width,
  height,
}) {
  // Collect all y values.
  const allXValues = data.reduce((all, datum) => {
    all.push(xAccessor(datum));
    return all;
  }, []);

  // Get the min and max x value.
  const extentX = d3Array.extent(allXValues);
  const scaleX = createScaleX(extentX[0], extentX[1], startX, width);

  // Collect all y values.
  const allYValues = data.reduce((all, datum) => {
    all.push(yAccessor(datum));
    return all;
  }, []);

  // Get the min and max y value.
  const extentY = d3Array.extent(allYValues);
  const scaleY = createScaleY(extentY[0], extentY[1], startY, height);

  const lineShape = d3.shape
    .line()
    .x(d => scaleX(xAccessor(d)))
    .y(d => scaleY(yAccessor(d)));

  console.log(createScaleX(extentX[0], extentX[1], startX, width)(1));

  return {
    data,
    scale: {
      x: scaleX,
      y: scaleY,
    },
    path: lineShape(data),
  };
}
