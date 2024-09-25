import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ProductData } from '../types/dataTypes';
import { memo } from 'react';

interface EditableTableProps {
  data: ProductData[];
  setData: (data: ProductData[]) => void; // Добавляем setData для обновления данных
}

const EditableTable: React.FC<EditableTableProps> = ({ data, setData }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>, rowIndex: number, key: keyof ProductData) => {
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

export default memo(EditableTable);
