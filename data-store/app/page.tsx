'use client';
import { useState } from 'react';
import FileUpload from './components/FileUploadProps';
import EditableTable from './components/EditableTable';
import Stats from './components/Stats';
import { parseData } from './utils/dataParcer';
import { useDataStore } from './store/dataStore';

import StatusChart from './components/StatusChart';
import FulfillmentCenterChart from './components/FulfilmentCenterChart';

export default function Home() {
  const { setData, data } = useDataStore();
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    parseData(file)
      .then(parsedData => {
        setData(parsedData);
        setFileError(null);
      })
      .catch(err => {
        setFileError('Error parsing the file');
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Fulfillment Center Inventory</h1>
      <FileUpload onFileUpload={handleFileUpload} />
      {fileError && <p className="text-red-500">{fileError}</p>}
      {data && <EditableTable data={data} />}
      {data && <Stats data={data} />}
      <StatusChart data={data}/>
      <FulfillmentCenterChart data={data}/>
    </div>
  );
}
