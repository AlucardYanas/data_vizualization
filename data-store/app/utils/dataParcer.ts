import Papa from 'papaparse';
import { read, utils } from 'xlsx';
import { ProductData } from '../types/dataTypes';

export async function parseData(file: File): Promise<ProductData[]> {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split('.').pop();

    if (fileExtension === 'csv') {
      Papa.parse<Record<string, unknown>>(file, {
        header: true,
        complete: (result) => {
          const cleanedData = result.data.map((row) => {
            const cleanedRow: Partial<ProductData> = {}; // Частично типизированный объект

            for (const key in row) {
              if (Object.prototype.hasOwnProperty.call(row, key)) {
                const cleanKey = key.trim() as keyof ProductData; // Приводим ключ к типу ProductData
                let value = row[key];

                // Приводим значение к допустимым типам для ProductData
                if (typeof value === 'string') {
                  value = value.trim(); // Убираем пробелы в строках
                } else if (typeof value === 'number') {
                  value = Number(value); // Обрабатываем числа
                } else {
                  value = undefined; // Если значение не string и не number, делаем его undefined
                }

                if (value !== undefined) {
                  cleanedRow[cleanKey] = value as ProductData[keyof ProductData] ?? undefined;
                }
              }
            }

            return cleanedRow as ProductData; // Приводим к полному типу ProductData
          });
          resolve(cleanedData);
        },
        error: (err) => reject(err),
      });
    } else if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target!.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json<ProductData>(sheet); // Приводим результат к ProductData
        resolve(jsonData);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Unsupported file type'));
    }
  });
}
