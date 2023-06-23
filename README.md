#🖲 CSV to JSON Converter

This TypeScript code snippet provides a CSV to JSON conversion functionality. It reads CSV files from a specified folder, processes each file, and generates corresponding JSON files. The code utilizes the Node.js `fs` and `path` modules for file operations.

## Usage

1. Place the CSV files that you want to convert into the "csv" folder.
2. Run the code.
3. The CSV files will be processed, and JSON files will be generated in the "json" folder.

## Development

To run the code in development mode, make sure you have the following technologies installed:

- Node.js
- TypeScript

## Functions

The code includes the following functions to handle the CSV to JSON conversion process:

```typescript
1- processFiles(): void 
2- processFile(file: string): void
3- convertCsvToJson(csvFile: string): string
4- splitCsvRows(csvFile: string): string[]
5- extractColumnNames(csvRow: string): string[]
6- createJsonObject(columnNames: string[], rowData: string[]): object
7- writeJsonFile(jsonFilePath: string, jsonData: string, jsonFileName: string): void
8- handleError(message: string, error: NodeJS.ErrnoException): void
```

####Explanation

1-  This function reads the CSV files from the specified folder and processes each file by calling the processFile() function.

2- This function processes an individual CSV file. It reads the CSV file, converts its content to JSON format, and writes the JSON data to a corresponding JSON file.

3- This function takes a CSV file content as a string and converts it to JSON format. It splits the CSV file into rows, extracts the column names, and creates a JSON object for each row.

4- This function splits the CSV file content into an array of rows by splitting on the new line (\r\n) characters.

5- This function takes a CSV row as a string and splits it into an array of column names by splitting on the comma (,) character.

6- This function creates a JSON object by mapping each column name to its corresponding row data value.

7- This function writes the JSON data to a JSON file.

8- This function handles and logs any errors that occur during the file processing.


##🤝 Contributors
We want to thank the following people who contributed to this project:

Diogo-gallina: https://github.com/Diogo-gallina