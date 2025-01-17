import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dropdown from './components/Dropdown';
import Graph from './components/Graph';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedMetric, setSelectedMetric] = useState('lcp');
  const [selectedDevice, setSelectedDevice] = useState('mobile');
  const [graphData, setGraphData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://example-metrics.speedvitals.workers.dev/?metric=${selectedMetric}&device=${selectedDevice}`);
        if (response.data && response.data.timeseries && response.data.values) {
          const formattedData = response.data.timeseries.map((time, index) => ({
            timeseries: time,
            value: response.data.values[index]
          }));
          setGraphData(formattedData);
        } else {
          console.error('Unexpected data format:', response.data);
          setGraphData([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setGraphData([]);
      }
    };

    fetchData();
  }, [selectedMetric, selectedDevice]);

  return (
    <div className="app">
      <Navbar />
      <main>
        <div className="content-container">
          <h1 className="page-title">Performance Report</h1>
          <div className="dropdowns">
            <Dropdown
              label="Metric"
              options={[
                { value: 'lcp', label: 'LCP' },
                { value: 'cls', label: 'CLS' },
              ]}
              value={selectedMetric}
              onChange={setSelectedMetric}
            />
            <Dropdown
              label="Device Type"
              options={[
                { value: 'mobile', label: 'Mobile' },
                { value: 'desktop', label: 'Desktop' },
              ]}
              value={selectedDevice}
              onChange={setSelectedDevice}
            />
          </div>
          <Graph data={graphData} metric={selectedMetric} device={selectedDevice} />
        </div>
      </main>
    </div>
  );
}

export default App;

