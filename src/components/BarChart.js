import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

export const BarChart = ({ data,onBarClick }) => {

  const features = Object.keys(data[0]).filter(key => key !== 'Day' && key !== 'Age' && key!=='Date' && key !=='Gender');
  const totals = features.map(feature => data.reduce((acc, entry) => acc + Number(entry[feature]), 0));

  
  
  const chartData = features.map((feature, index) => ({
    feature,
    'Total Time Spent': totals[index],
  }));
  const customColors = ['#ef4444', '#33FF57', '#5733FF', '#FFFF33', '#33FFFF', '#FF33FF'];


  return (
    <div style={{ height: '400px' }}>
      <ResponsiveBar
        data={chartData}
        keys={['Total Time Spent']}
        indexBy="feature"
        layout='horizontal'
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        padding={0.3}
        colors={customColors}
        axisBottom={{
          tickRotation: -45,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
        }}
        enableGridX={false}
        enableGridY={true}
        onClick={(bar,event)=>onBarClick(bar,event)}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'top-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
          },
        ]}
      />
    </div>
  );
};

