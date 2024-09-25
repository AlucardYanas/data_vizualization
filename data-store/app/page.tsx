'use client';

import { useState } from 'react';
import Navbar from './components/NavBar';
import TableCard from './components/TableCard';
import ChartsCard from './components/ChartsCard';
import { useDataStore } from './store/dataStore';
import { ProductData } from './types/dataTypes';
import StatsCard from './components/StatsCard';

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
      {/* Панель навигации */}
      <Navbar onFileUpload={handleFileUpload} />

      <div className="container mx-auto px-4 py-6 flex flex-col">
        {/* Карточка для статистики */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-6">
          <StatsCard />
        </div>

        {/* Карточка для таблицы */}
        <div className="bg-white shadow-md rounded-lg p-7 mb-5 pr-10">
          {loading ? (
            <p>Loading...</p>
          ) : (
            data.length > 0 && <TableCard />
          )}
        </div>

        {/* Карточка для графиков */}
        <div className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-0 ">
          {data.length > 0 && <ChartsCard />}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
