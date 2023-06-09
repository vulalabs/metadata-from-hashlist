Script to pull metadata from a given hashlist

1. Install packages:
npm install \
  @metaplex-foundation/js \
  @solana/web3.js \
  dotenv \
  fs

2. Create .env and add RPC endpoint

3. Upload hashlist.json to root

4. Run ```node find.js```

5. Metadata will be added to ```data.json```

###Other stuff that's included

```rarity.js```
Counts the number of times a trait occurs and groups it into categories

```check.js```
Check if any mint addresses were missed from the hashlist when creating data.json

```assign-rarity.js```
Assigns a rarity score to each NFT in data.json