//check for missing mint address in data.json
//means it was burnt
const fs = require('fs');

function getMintAddressesFromFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const dataObject = JSON.parse(fileContent);
  const mintAddresses = Object.values(dataObject).map(item => item.mintAddress);
  return mintAddresses;
}

const dataFilePath = './data.json';
const hashListFilePath = './hashlist.json';

const mintAddressesInData = getMintAddressesFromFile(dataFilePath);
const mintAddressesInHashList = require(hashListFilePath);

const missingMintAddresses = mintAddressesInHashList.filter(mintAddress => {
  return !Object.values(mintAddressesInData).includes(mintAddress);
});

console.log('Missing mint addresses:');
console.log(missingMintAddresses);
