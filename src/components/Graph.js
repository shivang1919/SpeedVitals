import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import './Graph.css';

function Graph({ data, metric, device }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const chart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: `${metric.toUpperCase()} for ${device}`,
        textStyle: {
          fontSize: 16,
          fontWeight: 'normal',
          color: '#333'
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: '#ddd',
        borderWidth: 1,
        textStyle: {
          color: '#333'
        },
        formatter: function(params) {
          return `Time: ${params[0].name}<br/>Value: ${params[0].value}`;
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: data.map((item) => item.timeseries),
        name: 'Time',
        nameLocation: 'middle',
        nameGap: 30,
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          color: '#666'
        }
      },
      yAxis: {
        type: 'value',
        name: 'Value',
        nameTextStyle: {
          color: '#666'
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          color: '#666'
        },
        splitLine: {
          lineStyle: {
            color: '#f5f5f5'
          }
        }
      },
      series: [
        {
          name: metric.toUpperCase(),
          type: 'line',
          data: data.map((item) => item.value),
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: {
            color: '#4A90E2',
            width: 2
          },
          itemStyle: {
            color: '#4A90E2',
            borderWidth: 2,
            borderColor: '#fff'
          }
        }
      ]
    };

    chart.setOption(option);

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      chart.dispose();
      window.removeEventListener('resize', handleResize);
    };
  }, [data, metric, device]);

  if (data.length === 0) {
    return <div className="graph no-data">No data available</div>;
  }

  return <div className="graph-container">
    <div ref={chartRef} className="graph" />
  </div>;
}

export default Graph;

