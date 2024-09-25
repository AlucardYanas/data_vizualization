'use client';

import { useState } from 'react';
import Navbar from './components/NavBar';
import TableCard from './components/TableCard';
import ChartsCard from './components/ChartsCard';
import { useDataStore } from './store/dataStore';
import Stats from './components/Stats';
import { ProductData } from './types/dataTypes';

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
      <Stats  data={data} />

      <div className="container mx-auto px-4">

        {loading && <p>Loading...</p>}

        {data.length > 0 && <TableCard />}

        {data.length > 0 && <ChartsCard />}
      </div>
    </div>
  );
};

export default HomePage;
