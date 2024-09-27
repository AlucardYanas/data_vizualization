import { parse } from 'csv-parse/browser/esm';
import { read, utils } from 'xlsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import { ProductData } from './dataTypes';

function detectDelimiters(data: string) {
  const lineDelimiters = ['\r\n', '\n', '\r'];
  const columnDelimiters = [',', ';', '\t', '|'];
  const lineDelimiter = lineDelimiters.find((d) => data.includes(d)) || '\n';
  const firstLine = data.split(lineDelimiter)[0];
  const columnDelimiter = columnDelimiters.find((d) => firstLine.includes(d)) || ',';
  return { lineDelimiter, columnDelimiter };
}

function isValidData<T extends object>(data: T[]): boolean {
  return Array.isArray(data) && data.length > 0 && Object.keys(data[0]).length > 0;
}

export async function parseData(file: File): Promise<ProductData[]> {
  return new Promise((resolve, reject) => {
    const MAX_FILE_SIZE_MB = 5;
    const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      const errorMessage = `File size exceeds ${MAX_FILE_SIZE_MB} MB limit.`;
      toast.error(errorMessage);
      reject(new Error(errorMessage));
      return;
    }

    const fileExtension = file.name.split('.').pop()?.toLowerCase();

    if (fileExtension === 'csv') {
      const reader = new FileReader();
      reader.onload = (event) => {
        let csvData = event.target?.result as string;
        const { lineDelimiter, columnDelimiter } = detectDelimiters(csvData);
        const csvLines = csvData.split(lineDelimiter);
        const filteredLines = csvLines.filter((line) => {
          const columns = line.split(columnDelimiter);
          return columns.some((column) => column.trim() !== '');
        });

        const processedLines = filteredLines.map((line) => {
          const columns = line.split(columnDelimiter);
          if (columns.length > 1) {
            columns.splice(0, 1);
          }
          return columns.join(columnDelimiter);
        });

        csvData = processedLines.join(lineDelimiter);

        parse(
          csvData,
          {
            columns: true,
            skip_empty_lines: true,
            trim: true,
            delimiter: columnDelimiter,
          },
          (err, records: ProductData[]) => {
            if (err) {
              toast.error('Error parsing CSV file.');
              reject(err);
            } else if (!isValidData(records)) {
              toast.error('Parsed CSV file is empty or contains no valid data.');
              reject(new Error('Parsed CSV file is empty or contains no valid data.'));
            } else {
              resolve(records);
            }
          }
        );
      };

      reader.onerror = () => {
        toast.error('Error reading CSV file.');
        reject(new Error('Error reading CSV file.'));
      };
      reader.readAsText(file);

    } else if (fileExtension === 'xlsx') {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = new Uint8Array(event.target!.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = utils.sheet_to_json<ProductData>(sheet);

        if (!isValidData(jsonData)) {
          toast.error('Parsed XLSX file is empty or contains no valid data.');
          reject(new Error('Parsed XLSX file is empty or contains no valid data.'));
        } else {
          resolve(jsonData);
        }
      };
      reader.onerror = () => {
        toast.error('Error reading XLSX file.');
        reject(new Error('Error reading XLSX file.'));
      };
      reader.readAsArrayBuffer(file);
    } else {
      const errorMessage = 'Unsupported file type.';
      toast.error(errorMessage);
      reject(new Error(errorMessage));
    }
  });
}
