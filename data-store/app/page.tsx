'use client';

import { useState } from 'react';
import Navbar from './components/NavBar';
import TableCard from './components/TableCard';
import ChartsCard from './components/ChartsCard';
import { useDataStore } from './store/dataStore';
import Stats from './components/Stats';

const HomePage: React.FC = () => {
  const { data, setData } = useDataStore();
  const [loading, setLoading] = useState(false);

  // Функция для обработки распарсенных данных
  const handleFileUpload = (parsedData: any[]) => {
    setLoading(true);
    try {
      setData(parsedData); // Обновляем состояние с распарсенными данными
    } catch (error) {
      console.error('Error setting data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Панель навигации с загрузкой файла */}
      <Navbar onFileUpload={handleFileUpload} />
      <Stats  data={data} />

      <div className="container mx-auto px-4">
        {/* Показать индикатор загрузки */}
        {loading && <p>Loading...</p>}

        {/* Таблица с данными */}
        {data.length > 0 && <TableCard />}

        {/* Графики */}
        {data.length > 0 && <ChartsCard />}
      </div>
    </div>
  );
};

export default HomePage;
