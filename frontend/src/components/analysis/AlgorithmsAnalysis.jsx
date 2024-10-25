import React, { useState, useEffect } from 'react';
import { getAlgorithms, getParticularAnalysis, analysis } from '../../apis/analysis';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AlgorithmsAnalysis = () => {
  const [algorithms, setAlgorithms] = useState([]);
  const [selectedAlgorithms, setSelectedAlgorithms] = useState([]);
  const [analysisData, setAnalysisData] = useState([]);
  const [view, setView] = useState('table');
  const [lowestEncapAlgorithm, setLowestEncapAlgorithm] = useState(null);
  const [lowestDecapAlgorithm, setLowestDecapAlgorithm] = useState(null);
  const [lowestKeyGenAlgorithm, setLowestKeyGenAlgorithm] = useState(null);
  const [lowestCycleAlgorithm, setLowestCycleAlgorithm] = useState(null);
  const [selectedBarData, setSelectedBarData] = useState(null);
  const [selectedMetric, setSelectedMetric] = useState('encapsulationTime'); // Track selected metric for click events

  const fetchAlgorithms = async () => {
    await getAlgorithms().then((res) => {
      setAlgorithms(res.data);
    });
  };

  const fetchAllAnalysis = async () => {
    await analysis().then((res) => {
      setAnalysisData(res.data);
    });
  };

  const fetchSelectedAnalysis = async (selected) => {
    const promises = selected.map((algorithm) =>
      getParticularAnalysis(algorithm).then((res) => res.data)
    );
    const results = await Promise.all(promises);
    setAnalysisData(results.flat());
  };

  const handleAlgorithmChange = (e) => {
    const value = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedAlgorithms(value);
    if (value.length > 0) {
      fetchSelectedAnalysis(value);
    } else {
      fetchAllAnalysis();
    }
  };

  const toggleView = () => {
    setView(view === 'table' ? 'charts' : 'table');
  };

  useEffect(() => {
    fetchAlgorithms();
    fetchAllAnalysis();
  }, []);

  const getAverageTimes = () => {
    const algorithmGroups = analysisData.reduce((acc, item) => {
      if (!acc[item.algorithm]) {
        acc[item.algorithm] = [];
      }
      acc[item.algorithm].push(item);
      return acc;
    }, {});

    const averages = Object.keys(algorithmGroups).map((algorithm) => {
      const times = algorithmGroups[algorithm];
      const encapsulationTime =
        times.reduce((sum, item) => sum + item.encapsulationTime, 0) / times.length;
      const decapsulationTime =
        times.reduce((sum, item) => sum + item.decapsulationTime, 0) / times.length;
      const keyGenerationTime =
        times.reduce((sum, item) => sum + item.clientKeyPairGenerationTime, 0) / times.length;
      const cycleTime =
        times.reduce((sum, item) => sum + item.encapDecapCycleTime, 0) / times.length;

      const generalInfo = analysisData.find((item) => item.algorithm === algorithm);
      return {
        algorithm,
        encapsulationTime,
        decapsulationTime,
        keyGenerationTime,
        cycleTime,
        ...generalInfo,
      };
    });

    return averages;
  };

  const getLowestAverageTimes = () => {
    const averages = getAverageTimes();
    const lowestEncapAlgorithm = averages.reduce(
      (min, current) => (current.encapsulationTime < min.encapsulationTime ? current : min),
      averages[0]
    );
    const lowestDecapAlgorithm = averages.reduce(
      (min, current) => (current.decapsulationTime < min.decapsulationTime ? current : min),
      averages[0]
    );
    const lowestKeyGenAlgorithm = averages.reduce(
      (min, current) => (current.keyGenerationTime < min.keyGenerationTime ? current : min),
      averages[0]
    );
    const lowestCycleAlgorithm = averages.reduce(
      (min, current) => (current.cycleTime < min.cycleTime ? current : min),
      averages[0]
    );

    setLowestEncapAlgorithm(lowestEncapAlgorithm);
    setLowestDecapAlgorithm(lowestDecapAlgorithm);
    setLowestKeyGenAlgorithm(lowestKeyGenAlgorithm);
    setLowestCycleAlgorithm(lowestCycleAlgorithm);
  };

  useEffect(() => {
    if (view === 'charts') {
      getLowestAverageTimes();
    }
  }, [view, analysisData]);

  const handleBarClick = (elems, metric) => {
    if (elems.length > 0) {
      const clickedIndex = elems[0].index;
      const averages = getAverageTimes();
      const clickedAlgorithm = averages[clickedIndex];
      setSelectedBarData(clickedAlgorithm);
      setSelectedMetric(metric);
    }
  };

  const getChartData = (metric) => {
    const averages = getAverageTimes();
    return {
      labels: averages.map((item) => item.algorithm),
      datasets: [
        {
          label: `Average ${metric} Time (µs)`,
          data: averages.map((item) => item[metric]),
          backgroundColor: 'rgba(75, 192, 192, 0.6)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = (metric) => ({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Average ${metric} Time (µs) by Algorithm`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    onClick: (event, elems) => handleBarClick(elems, metric),
  });

  return (
    <div>
      <div className="analysis-bar mb-4">
        <label>Select Algorithms:</label>
        <select
          multiple
          className="dropdown p-2 border border-gray-300 rounded"
          onChange={handleAlgorithmChange}
        >
          {algorithms.map((algorithm) => (
            <option key={algorithm} value={algorithm}>
              {algorithm}
            </option>
          ))}
        </select>

        <button
          onClick={toggleView}
          className="ml-4 p-2 bg-blue-500 text-white rounded"
        >
          {view === 'table' ? 'Switch to Charts' : 'Switch to Table'}
        </button>
      </div>

      {view === 'table' && (
        <div className="analysis-results mb-8">
          {analysisData.length > 0 ? (
            <table className="table-auto border-collapse border border-gray-400 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Algorithm</th>
                  <th className="border border-gray-300 px-4 py-2">Public Key Length</th>
                  <th className="border border-gray-300 px-4 py-2">Secret Key Length</th>
                  <th className="border border-gray-300 px-4 py-2">Encapsulation Time (µs)</th>
                  <th className="border border-gray-300 px-4 py-2">Decapsulation Time (µs)</th>
                  <th className="border border-gray-300 px-4 py-2">Key Generation Time (µs)</th>
                  <th className="border border-gray-300 px-4 py-2">Cycle Time (µs)</th>
                  <th className="border border-gray-300 px-4 py-2">NIST Level</th>
                </tr>
              </thead>
              <tbody>
                {analysisData.map((item, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">{item.algorithm}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.publicKeyLength}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.secretKeyLength}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.encapsulationTime}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.decapsulationTime}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.clientKeyPairGenerationTime}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.encapDecapCycleTime}</td>
                    <td className="border border-gray-300 px-4 py-2">{item.nistLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No analysis data available</p>
          )}
        </div>
      )}

      {view === 'charts' && (
        <div>
          <div>
            <div>
              <Bar
                data={getChartData('encapsulationTime')}
                options={chartOptions('Encapsulation')}
              />
            </div>
            <div>
              <Bar
                data={getChartData('decapsulationTime')}
                options={chartOptions('Decapsulation')}
              />
            </div>
            <div>
              <Bar
                data={getChartData('keyGenerationTime')}
                options={chartOptions('Key Generation')}
              />
            </div>
            <div>
              <Bar data={getChartData('cycleTime')} options={chartOptions('Cycle')} />
            </div>
          </div>

          {/* Lowest Average Encapsulation Time */}
          {lowestEncapAlgorithm && (
            <div className="lowest-algorithm mt-4 p-4 bg-green-50 border border-green-300 rounded">
              <h3 className="font-bold text-lg">Algorithm with Lowest Average Encapsulation Time</h3>
              <p><strong>Algorithm:</strong> {lowestEncapAlgorithm.algorithm}</p>
              <p><strong>NIST Level:</strong> {lowestEncapAlgorithm.nistLevel}</p>
              <p><strong>Public Key Length:</strong> {lowestEncapAlgorithm.publicKeyLength}</p>
              <p><strong>Secret Key Length:</strong> {lowestEncapAlgorithm.secretKeyLength}</p>
              <p><strong>Average Encapsulation Time:</strong> {lowestEncapAlgorithm.encapsulationTime.toFixed(2)} µs</p>
            </div>
          )}

          {/* Lowest Average Decapsulation Time */}
          {lowestDecapAlgorithm && (
            <div className="lowest-algorithm mt-4 p-4 bg-yellow-50 border border-yellow-300 rounded">
              <h3 className="font-bold text-lg">Algorithm with Lowest Average Decapsulation Time</h3>
              <p><strong>Algorithm:</strong> {lowestDecapAlgorithm.algorithm}</p>
              <p><strong>NIST Level:</strong> {lowestDecapAlgorithm.nistLevel}</p>
              <p><strong>Public Key Length:</strong> {lowestDecapAlgorithm.publicKeyLength}</p>
              <p><strong>Secret Key Length:</strong> {lowestDecapAlgorithm.secretKeyLength}</p>
              <p><strong>Average Decapsulation Time:</strong> {lowestDecapAlgorithm.decapsulationTime.toFixed(2)} µs</p>
            </div>
          )}

          {/* Lowest Average Key Generation Time */}
          {lowestKeyGenAlgorithm && (
            <div className="lowest-algorithm mt-4 p-4 bg-blue-50 border border-blue-300 rounded">
              <h3 className="font-bold text-lg">Algorithm with Lowest Average Key Generation Time</h3>
              <p><strong>Algorithm:</strong> {lowestKeyGenAlgorithm.algorithm}</p>
              <p><strong>NIST Level:</strong> {lowestKeyGenAlgorithm.nistLevel}</p>
              <p><strong>Public Key Length:</strong> {lowestKeyGenAlgorithm.publicKeyLength}</p>
              <p><strong>Secret Key Length:</strong> {lowestKeyGenAlgorithm.secretKeyLength}</p>
              <p><strong>Average Key Generation Time:</strong> {lowestKeyGenAlgorithm.keyGenerationTime.toFixed(2)} µs</p>
            </div>
          )}

          {/* Lowest Average Cycle Time */}
          {lowestCycleAlgorithm && (
            <div className="lowest-algorithm mt-4 p-4 bg-purple-50 border border-purple-300 rounded">
              <h3 className="font-bold text-lg">Algorithm with Lowest Average Cycle Time</h3>
              <p><strong>Algorithm:</strong> {lowestCycleAlgorithm.algorithm}</p>
              <p><strong>NIST Level:</strong> {lowestCycleAlgorithm.nistLevel}</p>
              <p><strong>Public Key Length:</strong> {lowestCycleAlgorithm.publicKeyLength}</p>
              <p><strong>Secret Key Length:</strong> {lowestCycleAlgorithm.secretKeyLength}</p>
              <p><strong>Average Cycle Time:</strong> {lowestCycleAlgorithm.cycleTime.toFixed(2)} µs</p>
            </div>
          )}

          {/* Information for the clicked bar */}
          {selectedBarData && (
            <div className="clicked-algorithm mt-4 p-4 bg-blue-50 border border-blue-300 rounded">
              <h3 className="font-bold text-lg">Information for Selected Algorithm</h3>
              <p><strong>Algorithm:</strong> {selectedBarData.algorithm}</p>
              <p><strong>NIST Level:</strong> {selectedBarData.nistLevel}</p>
              <p><strong>Public Key Length:</strong> {selectedBarData.publicKeyLength}</p>
              <p><strong>Secret Key Length:</strong> {selectedBarData.secretKeyLength}</p>
              <p><strong>Average {selectedMetric} Time:</strong> {selectedBarData[selectedMetric].toFixed(2)} µs</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AlgorithmsAnalysis;
