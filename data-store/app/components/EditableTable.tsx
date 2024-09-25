import React from 'react';
import { useDataStore } from '../store/dataStore';

interface EditableTableProps {
  data: any[];
}

const EditableTable: React.FC<EditableTableProps> = () => {
  const { data, setData } = useDataStore();

  // Обработчик изменения значения в ячейке
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, key: string) => {
    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [key]: event.target.value,
    };
    setData(newData); // Обновляем данные в состоянии
  };

  if (!data.length) return null;

  const headers = Object.keys(data[0]);

  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} className="px-4 py-2">{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {headers.map((header) => (
              <td key={header} className="border px-4 py-2">
                <input
                  type="text"
                  value={row[header]}
                  onChange={(e) => handleInputChange(e, rowIndex, header)}
                  className="w-full"
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EditableTable;
