import { parse } from 'csv-parse/browser/esm'; 
import { read, utils } from 'xlsx';
import { ProductData } from './dataTypes';

export async function parseData(file: File): Promise<ProductData[]> {
  return new Promise((resolve, reject) => {
    const MAX_FILE_SIZE_MB = 5; 
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024; 

    if (file.size > MAX_FILE_SIZE_BYTES) {
      reject(new Error(`File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`));
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      const reader = new FileReader();

      reader.onload = (event) => {
        let csvData = event.target?.result as string;

        const csvLines = csvData.split('\n');
        const filteredLines = csvLines.filter((line) => {
          const columns = line.split(',');
          return columns.some(column => column.trim() !== '');
        });

        const processedLines = filteredLines.map((line) => {
          const columns = line.split(',');
          if (columns.length > 1) {
            columns.splice(0, 1);
          }
          return columns.join(','); 
        });

        csvData = processedLines.join('\n'); 

        parse(csvData, {
          columns: true, 
          skip_empty_lines: true,
          trim: true, 
        }, (err, records: ProductData[]) => {
          if (err) {
            reject(err); 
          } else {
            resolve(records); 
          }
        });
      };

      reader.onerror = () => reject(new Error('Error reading CSV file.'));
      reader.readAsText(file);

    } else if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target!.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json<ProductData>(sheet);
        resolve(jsonData); 
      };
      reader.onerror = () => reject(new Error('Error reading XLSX file.'));
      reader.readAsArrayBuffer(file);
    } else {
      reject(new Error('Unsupported file type.'));
    }
  });
}
