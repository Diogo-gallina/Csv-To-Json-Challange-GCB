"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const csvFolder = path_1.default.join(__dirname, '..', 'csv');
const jsonFolder = path_1.default.join(__dirname, '..', 'json');
const processFiles = () => {
    fs_1.default.readdir(csvFolder, (err, files) => {
        if (err) {
            handleError('Error reading CSV folder:', err);
            return;
        }
        files.forEach(processFile);
    });
};
const processFile = (file) => {
    const csvFilePath = path_1.default.join(csvFolder, file);
    const jsonFileName = file.replace('.csv', '.json');
    const jsonFilePath = path_1.default.join(jsonFolder, jsonFileName);
    fs_1.default.readFile(csvFilePath, 'utf8', (err, data) => {
        if (err) {
            handleError(`Error reading CSV file ${file}:`, err);
            return;
        }
        const jsonData = convertCsvToJson(data);
        writeJsonFile(jsonFilePath, jsonData, jsonFileName);
    });
};
const convertCsvToJson = (csvFile) => {
    const rows = splitCsvRows(csvFile);
    const columnNames = extractColumnNames(rows[0]);
    const jsonFile = rows.slice(1).reduce((acc, currentRow) => {
        const row = currentRow.split(',');
        const objJson = createJsonObject(columnNames, row);
        return [...acc, objJson];
    }, []);
    return JSON.stringify(jsonFile, null, 2);
};
const splitCsvRows = (csvFile) => csvFile.split('\r\n');
const extractColumnNames = (csvRow) => csvRow.split(',');
const createJsonObject = (columnNames, rowData) => {
    const objJson = {};
    for (let currentData = 0; currentData < rowData.length; currentData++) {
        objJson[columnNames[currentData]] = rowData[currentData];
    }
    return objJson;
};
const writeJsonFile = (jsonFilePath, jsonData, jsonFileName) => {
    fs_1.default.writeFile(jsonFilePath, jsonData, 'utf8', (err) => {
        if (err) {
            handleError(`Error reading Json file ${jsonFileName}:`, err);
            return;
        }
        console.log(`Json file ${jsonFileName} successfully saved!`);
    });
};
const handleError = (message, error) => console.log(message, error);
processFiles();
