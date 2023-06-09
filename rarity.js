//counts how many times a trait occurs
//groups by category
const fs = require('fs');

function saveAttributesCountsToFile(counts, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(counts, null, 2));
  console.log(`Attributes counts saved to ${filePath}`);
}

function getAttributesCountsFromFile(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const dataObject = JSON.parse(fileContent);
  const attributesCounts = {};

  for (const obj of Object.values(dataObject)) {
    const attributes = obj.attributes;

    for (const attribute of attributes) {
      const { trait_type, value } = attribute;

      if (!attributesCounts[trait_type]) {
        attributesCounts[trait_type] = {};
      }

      if (!attributesCounts[trait_type][value]) {
        attributesCounts[trait_type][value] = 0;
      }

      attributesCounts[trait_type][value]++;
    }
  }

  return attributesCounts;
}

const filePath = './data.json';
const attributesCounts = getAttributesCountsFromFile(filePath);

const rarityFilePath = './rarity.json';
saveAttributesCountsToFile(attributesCounts, rarityFilePath);
