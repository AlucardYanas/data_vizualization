import React from 'react';
import { useDataStore } from '../store/dataStore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface EditableTableProps {
  data: any[];
}

const EditableTable: React.FC<EditableTableProps> = () => {
  const { data, setData } = useDataStore();

  console.log(data)

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
                  value={row[header]}
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
