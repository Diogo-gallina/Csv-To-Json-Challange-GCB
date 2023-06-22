import fs from 'fs';
import path from 'path';

const csvFolder = path.join(__dirname, '..', 'csv');
const jsonFolder = path.join(__dirname, '..', 'json');

const processFiles = (): void => {
  fs.readdir(csvFolder, (err: NodeJS.ErrnoException | null, files: string[]) => {
    if (err) {
      handleError('Error reading CSV folder:', err);
      return;
    }

    files.forEach(processFile);
  });
};

const processFile = (file: string): void => {
  const csvFilePath = path.join(csvFolder, file);
  const jsonFileName = file.replace('.csv', '.json');
  const jsonFilePath = path.join(jsonFolder, jsonFileName);

  fs.readFile(csvFilePath, 'utf8', (err: NodeJS.ErrnoException | null, data: string) => {
    if (err) {
      handleError(`Error reading CSV file ${file}:`, err);
      return;
    }

    const jsonData = convertCsvToJson(data);

    writeJsonFile(jsonFilePath, jsonData, jsonFileName);
  });
};

const convertCsvToJson = (csvFile: string): string => {
  const rows = splitCsvRows(csvFile);
  const columnNames = extractColumnNames(rows[0]);

  const jsonFile = rows.slice(1).reduce((acc: object[], currentRow: string) => {
    const row = currentRow.split(',');
    const objJson = createJsonObject(columnNames, row);

    return [...acc, objJson];
  }, []);

  return JSON.stringify(jsonFile, null, 2);
};

const splitCsvRows = (csvFile: string): string[] => csvFile.split('\r\n');

const extractColumnNames = (csvRow: string): string[] => csvRow.split(',');

const createJsonObject = (columnNames: string[], rowData: string[]): object => {
  const objJson: { [key: string]: string } = {};

  for (let currentData = 0; currentData < rowData.length; currentData++) {
    objJson[columnNames[currentData]] = rowData[currentData];
  }

  return objJson;
};

const writeJsonFile = (jsonFilePath: string, jsonData: string, jsonFileName: string): void => {
  fs.writeFile(jsonFilePath, jsonData, 'utf8', (err: NodeJS.ErrnoException | null) => {
    if (err) {
      handleError(`Error reading Json file ${jsonFileName}:`, err);
      return;
    }

    console.log(`Json file ${jsonFileName} successfully saved!`);
  });
};

const handleError = (message: string, error: NodeJS.ErrnoException): void => console.log(message, error);

processFiles();
