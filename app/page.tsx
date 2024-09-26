'use client';

import { useState } from 'react';
import Navbar from './components/NavBar';
import TableCard from './components/table/TableCard';
import ChartsCard from './components/charts/ChartsCard';
import { useDataStore } from './dataStore';
import { ProductData } from './dataTypes';
import StatsCard from './components/stats/Card';

const HomePage: React.FC = () => {
  const { data, setData } = useDataStore();
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (parsedData: ProductData[]) => {
    setLoading(true);
    try {
      setData(parsedData);
    } catch (error) {
      console.error('Error setting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onFileUpload={handleFileUpload} />

      <div className="container mx-auto px-4 py-6 flex flex-col">
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          {data.length === 0 && !loading ? (
            <p className="text-gray-500">No data available for statistics.</p>
          ) : (
            <StatsCard />
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-7 mb-5 pr-10">
          {loading ? (
            <p>Loading...</p>
          ) : data.length === 0 ? (
            <p className="text-gray-500">No data available for table.</p>
          ) : (
            <TableCard />
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-0">
          {data.length === 0 && !loading ? (
            <p className="text-gray-500">No data available for charts.</p>
          ) : (
            <ChartsCard />
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
