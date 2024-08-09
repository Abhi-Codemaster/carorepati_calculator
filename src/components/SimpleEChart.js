import React from 'react';
import ReactECharts from 'echarts-for-react';

const SimpleEChart = (props) => {
  console.log(props);
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
        name: props.name,
        type: 'pie',
        data: props.data,
      },
    ],
  };

  return <ReactECharts option={option} />;
};

export default SimpleEChart;
