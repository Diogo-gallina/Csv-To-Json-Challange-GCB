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
  };
  
  const splitCsvRows = (csvFile) => {
    return csvFile.split('\r\n');
  };

  const extractColumnNames = (csvRow) => {
    return csvRow.split(',');
  };