import Papa from 'papaparse';
import { read, utils } from 'xlsx';

export async function parseData(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const fileExtension = file.name.split('.').pop();

    if (fileExtension === 'csv') {
      Papa.parse(file, {
        header: true,
        complete: (result) => {
          const cleanedData = result.data.map((row) => {
            const cleanedRow: any = {};
            for (const key in row) {
              if (Object.prototype.hasOwnProperty.call(row, key)) {
                const cleanKey = key.trim(); // Очищаем заголовки колонок от лишних пробелов
                const value = row[key];
                cleanedRow[cleanKey] = 
                  typeof value === 'string' ? value.trim() : value; // Очищаем строковые значения от пробелов
              }
            }
            return cleanedRow;
          });
          resolve(cleanedData);
          console.log(cleanedData);
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
        const jsonData = utils.sheet_to_json(sheet);
        resolve(jsonData);
      };
      reader.onerror = (err) => reject(err);
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Unsupported file type'));
    }
  });
}
