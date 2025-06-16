const fs = require('fs');
const path = require('path');


const operationsFilePath = path.join(__dirname, '../data/operationsData.json');


const getOperationsData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(operationsFilePath, 'utf8', (err, data) => {
      if (err) reject('Failed to read operations data');
      resolve(JSON.parse(data));
    });
  });
};


const saveOperationsData = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(operationsFilePath, JSON.stringify(data, null, 2), (err) => {
      if (err) reject('Failed to write operations data');
      resolve('Data saved successfully');
    });
  });
};

module.exports = { getOperationsData, saveOperationsData };
