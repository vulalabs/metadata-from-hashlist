//get metadata from hashlist
const fs = require('fs');
require('dotenv').config();
const { Connection, PublicKey, Keypair } = require("@solana/web3.js");
const { Metaplex, keypairIdentity } = require("@metaplex-foundation/js");

const RPC = process.env.RPC;
const connection = new Connection(RPC);
const keypair = Keypair.generate();

const metaplex = new Metaplex(connection);
metaplex.use(keypairIdentity(keypair));

// Assuming hashlist.json contains an array of mint addresses
const hashList = require('./hashlist.json');

async function fetchNFTData() {
  const nftData = {};

  for (let i = 0; i < hashList.length; i++) {
    const mintAddress = new PublicKey(hashList[i]);

    // Check if mintAddress already exists in nftData
    if (nftData[hashList[i]]) {
      console.log(`Skipping mint address ${hashList[i]} as it already exists in nftData.`);
      continue; // Skip to the next iteration
    }

    try {
      const nft = await metaplex.nfts().findByMint({ mintAddress });
      const modifiedNFT = {
        [i]: {
          mintAddress: hashList[i],
          ...nft.json,
        },
      };
      nftData[i] = modifiedNFT[i];
      console.log(modifiedNFT);

      // Write the data to data.json
      fs.writeFileSync('./data.json', JSON.stringify(nftData, null, 2));
      console.log('Data saved to data.json');

    } catch (error) {
      console.error(`Error fetching NFT data for mint address ${hashList[i]}:`, error);
      continue; // Skip to the next iteration
    }
  }

}

fetchNFTData();

