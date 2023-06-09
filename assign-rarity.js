//assign rarity score to each nft in data.json
const fs = require('fs');
const data = require('./data.json');
const rarityScores = require('./rarity.json');

function calculateRarity(traitCategory, traitValue) {
  const traitRarity = rarityScores[traitCategory][traitValue];
  const totalOccurrences = Object.values(rarityScores[traitCategory]).reduce((sum, rarity) => sum + rarity, 0);
  const rarityPercentage = traitRarity / totalOccurrences;
  return rarityPercentage.toFixed(4);
}

function assignRarityValues() {
  const assignedData = [];

  Object.entries(data).forEach(([id, nft]) => {
    const assignedNFT = {
      name: nft.name,
      id: `#${id}`,
      rank: 0,
      total_rarity: 0,
      image: nft.image,
      attributes: [],
    };

    nft.attributes.forEach((attribute) => {
      const { trait_type, value } = attribute;
      const rarity = calculateRarity(trait_type, value);

      assignedNFT.attributes.push({
        trait_category: trait_type,
        trait_info: {
          trait: value,
          occurrences: rarityScores[trait_type][value],
          rarity: Number(rarity),
        },
      });

      assignedNFT.total_rarity += Number(rarity);
    });

    assignedNFT.total_rarity = assignedNFT.total_rarity.toFixed(4);
    assignedData.push(assignedNFT);
  });

  // Sort the assignedData array based on total_rarity in ascending order
  assignedData.sort((a, b) => a.total_rarity - b.total_rarity);

  // Assign ranks based on the sorted order
  assignedData.forEach((nft, index) => {
    nft.rank = index + 1;
  });

  return assignedData;
}

const assignedData = assignRarityValues();
console.log(assignedData);

const updatedData = JSON.stringify(assignedData, null, 2);
fs.writeFileSync('./data.json', updatedData);
console.log('Rarity values have been written to data.json');
