import React from 'react';
import { ResponsiveLine } from '@nivo/line';

export const LineChart = ({ data, category }) => {
  const lineData = data.map((entry) => ({ x: entry.Day, y: parseInt(entry[category], 10) }));
  const accumulatedData={};
  lineData.forEach(({ x, y }) => {
    if (accumulatedData[x]) {
      accumulatedData[x].y += y;
    } else {
      accumulatedData[x] = { x, y };
    }
  });
  const result = Object.values(accumulatedData);
  

  const line = [
    {
      id: category,
      color: 'blue',
      data: result,
    },
  ];

  return (
    <div style={{ height: '400px' }}>
      <ResponsiveLine
        data={line}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 45,
            legend: 'Date',
            legendOffset: 36,
            legendPosition: 'middle',
        
        }}
        axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: category,
            legendOffset: -40,
            legendPosition: 'middle',
        }}
      />
    </div>
  );
};
