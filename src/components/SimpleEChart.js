import React from 'react';
import ReactECharts from 'echarts-for-react';

const SimpleEChart = ({ name = 'Default', data = [] }) => {
  const option = {
    title: {
      text: 'Carorepati ECharts',
    },
    tooltip: {},
    xAxis: {
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {},
    series: [
      {
        name: name,
        type: 'pie',
        data: data,
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default SimpleEChart;
