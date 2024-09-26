import React from 'react';
import { useDataStore } from '../../dataStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table';
import { ProductData } from '../../dataTypes';

const EditableTable: React.FC = () => {
  const { data, setData } = useDataStore();
  console.log(data);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    rowIndex: number,
    key: keyof ProductData,
  ) => {
    const newData = [...data];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [key]: event.target.value,
    };
    setData(newData);
  };

  if (!data.length) return null;

  const headers = Object.keys(data[0]) as (keyof ProductData)[];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headers.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            {headers.map((header) => (
              <TableCell key={header}>
                <input
                  type="text"
                  value={row[header] as string | number}
                  onChange={(e) => handleInputChange(e, rowIndex, header)}
                  className="w-full border p-2"
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default EditableTable;
