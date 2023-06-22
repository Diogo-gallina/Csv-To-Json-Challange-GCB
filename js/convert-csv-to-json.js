const fs = require('fs');
const path = require('path');

const csvFolder = path.join(__dirname, '..', 'csv');
const jsonFolder = path.join(__dirname, '..', 'json');

const processFiles = () => {
  fs.readdir(csvFolder, (err, files) => {
    if (err) {
      handleError('Error reading CSV folder:', err);
      return;
    }

    files.forEach(processFile);
  });
}


const processFile = (file) => {
  const csvFilePath = path.join(csvFolder, file);
  const jsonFileName = file.replace('.csv', '.json');
  const jsonFilePath = path.join(jsonFolder, jsonFileName);

  fs.readFile(csvFilePath, 'utf8', (err, data) => {
    if (err) {
      handleError(`Error reading CSV file ${file}:`, err);
      return;
    }

    const jsonData = convertCsvToJson(data);

    writeJsonFile(jsonFilePath, jsonData, jsonFileName);
  });
}

const convertCsvToJson = (csvFile) => {
  const rows = splitCsvRows(csvFile);
  const columnName = extractColumnNames(rows[0]);
  const jsonFile = [];

  for (let currentRow = 1; currentRow < rows.length; currentRow++) {
    const row = rows[currentRow].split(',');
    const objJson = createJsonObject(columnName, row);

    jsonFile.push(objJson);
  }

  return JSON.stringify(jsonFile, null, 2);
}

const splitCsvRows = (csvFile) => {
  return csvFile.split('\r\n');
}

const extractColumnNames = (csvRow) => {
  return csvRow.split(',');
}

const createJsonObject = (columnNames, rowData) => {
  const objJson = {};

  for (let currentData = 0; currentData < rowData.length; currentData++) {
    objJson[columnNames[currentData]] = rowData[currentData];
  }

  return objJson;
}

const writeJsonFile = (jsonFilePath, jsonData, jsonFileName) => {
  fs.writeFile(jsonFilePath, jsonData, 'utf8', (err) => {
    if (err) {
      handleError(`Error reading Json file ${jsonFileName}:`, err);
      return;
    }

    console.log(`Json file ${jsonFileName} successfully saved!`);
  });
}

const handleError = (message, error) => {
  console.log(message, error);
}

processFiles();