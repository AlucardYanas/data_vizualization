import { parse } from 'csv-parse/browser/esm';
import { read, utils } from 'xlsx';
import { ProductData } from './dataTypes';

// Функция для определения разделителей строк и колонок
function detectDelimiters(data: string) {
  const lineDelimiters = ['\r\n', '\n', '\r']; // Возможные разделители строк
  const columnDelimiters = [',', ';', '\t', '|']; // Возможные разделители колонок

  // Определяем наиболее часто используемый разделитель строк
  const lineDelimiter = lineDelimiters.find((d) => data.includes(d)) || '\n';

  // Используем первую строку для определения разделителя колонок
  const firstLine = data.split(lineDelimiter)[0];
  const columnDelimiter = columnDelimiters.find((d) => firstLine.includes(d)) || ',';

  return { lineDelimiter, columnDelimiter };
}

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

        // 1. Определяем разделители строк и колонок
        const { lineDelimiter, columnDelimiter } = detectDelimiters(csvData);

        // 2. Разделяем на строки и очищаем пустые строки
        const csvLines = csvData.split(lineDelimiter); // Разделение по определенному разделителю строк
        const filteredLines = csvLines.filter((line) => {
          const columns = line.split(columnDelimiter); // Разделяем строку на колонки
          return columns.some((column) => column.trim() !== ''); // Оставляем только непустые строки
        });

        // 3. Обрабатываем строки: удаление первой колонки и сохранение текущего функционала
        const processedLines = filteredLines.map((line) => {
          const columns = line.split(columnDelimiter);
          if (columns.length > 1) {
            columns.splice(0, 1); // Удаляем первую колонку
          }
          return columns.join(columnDelimiter); // Собираем строку обратно с исходным разделителем колонок
        });

        // 4. Применяем заголовок как первую строку и собираем данные обратно в CSV формат
        csvData = processedLines.join(lineDelimiter); // Собираем все строки обратно в одну строку CSV

        // 5. Парсинг CSV данных с использованием определенных разделителей
        parse(
          csvData,
          {
            columns: true, // Используем первую строку как заголовки
            skip_empty_lines: true, // Пропускаем пустые строки
            trim: true, // Убираем лишние пробелы
            delimiter: columnDelimiter, // Устанавливаем найденный разделитель колонок
          },
          (err, records: ProductData[]) => {
            if (err) {
              reject(err); // Ошибка парсинга
            } else {
              resolve(records); // Успешный результат парсинга
            }
          }
        );
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
