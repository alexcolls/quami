import {
  Metaplex,
  CreateNftOutput,
  keypairIdentity,
  bundlrStorage,
  toMetaplexFile,
  toBigNumber
} from '@metaplex-foundation/js';
import { PublicKey } from '@solana/web3.js';
import { getDate, getTime, sleep } from '../../utils';
import { videoToGif } from '../videoToGif';
import { newNFT } from '../../controllers/nfts.controller';
import {
  SOLANA_CONNECTION,
  SOLANA_RPC_URL,
  MASTER_COLLECTION,
  MASTER_KEYPAIR,
  METAPLEX_BUNDLR_URI,
  MASTER_PUBLICKEY
} from '../../config';
import printNFT from './printNFT';

const METAPLEX = Metaplex.make(SOLANA_CONNECTION)
  .use(keypairIdentity(MASTER_KEYPAIR))
  .use(
    bundlrStorage({
      address: METAPLEX_BUNDLR_URI,
      providerUrl: SOLANA_RPC_URL,
      timeout: 360000
    })
  );

export async function uploadAsset (
  data: any,
  fileName: string,
  _tries: number = 10
): Promise<string> {
  console.log('Step 1 - Uploading Asset to Arweave...');
  let i = 0;
  while (i < _tries) {
    try {
      const assetBuffer = Buffer.from(data, 'utf8');
      const assetMetaplexFile = toMetaplexFile(assetBuffer, fileName);
      const assetUri = await METAPLEX.storage().upload(assetMetaplexFile);
      console.log('Asset url:', assetUri);
      if (assetUri === 'ERROR') {
        console.log('Uploading asset failed.');
        continue;
      }
      return assetUri;
    } catch (err) {
      if (String(err).includes('funds')) {
        console.log('Not enough funds in the master wallet!!!');
      }
      console.log(err);
      await sleep(3000);
      i++;
    }
  }
  return 'ERROR';
}

export async function uploadImage (
  data: any,
  fileName: string,
  _tries: number = 10
): Promise<string> {
  console.log('Step 1 - Uploading Image to Arweave...');
  let i = 0;
  while (i < _tries) {
    try {
      const imgBuffer = Buffer.from(data, 'utf8');
      const imgMetaplexFile = toMetaplexFile(imgBuffer, fileName);
      const imgUri = await METAPLEX.storage().upload(imgMetaplexFile);
      console.log('Image url:', imgUri);
      if (imgUri === 'ERROR') {
        console.log('❌ ERROR: Uploading image failed.');
        continue;
      }
      return imgUri;
    } catch (err) {
      if (String(err).includes('funds')) {
        console.log('Not enough funds in the master wallet!!!');
      }
      console.log(err);
      await sleep(3000);
      i++;
    }
  }
  return 'ERROR';
}

export async function uploadMetadata (
  imageUri: string,
  assetUri: string,
  assetType: string,
  symbol: string,
  nftName: string,
  description: string,
  attributes: { trait_type: string; value: string }[],
  _tries: number = 10
): Promise<string> {
  console.log('Step 2 - Uploading Metadata to Arweave...');
  let i = 0;
  while (i < _tries) {
    try {
      const { uri } = await METAPLEX.nfts().uploadMetadata({
        name: nftName,
        description,
        image: imageUri || assetType,
        symbol,
        attributes,
        properties: {
          files: [
            {
              type: assetType,
              uri: assetUri,
              cdn: true
            }
          ]
        }
      });
      console.log('Metadata url:', uri);
      if (uri === 'ERROR') {
        console.log('❌ ERROR: Uploading metadata failed.');
        continue;
      }
      return uri;
    } catch (err) {
      if (String(err).includes('funds')) {
        console.log('❌ ERROR: Not enough funds in the master wallet!!!');
      }
      console.log(err);
      await sleep(3000);
      i++;
    }
  }
  return 'ERROR';
}

export async function mintMaster (
  metadataUri: string,
  name: string,
  supply: number,
  sellerFee: number,
  symbol: string,
  creators: { address: PublicKey; share: number }[],
  _isMutable: boolean = true, // Optional, if True token can be burned
  _tries: number = 10, // Optional, number of async tries
  _errLogs: boolean = false // Optional, print error logs
): Promise<string> {
  console.log(`Step 3 - Minting ${name} in Solana...`);
  let nft: CreateNftOutput;
  let i = 0;
  while (i < _tries) {
    try {
      nft = await METAPLEX.nfts().create({
        uri: metadataUri,
        name,
        sellerFeeBasisPoints: sellerFee,
        symbol,
        creators,
        isMutable: _isMutable,
        maxSupply: toBigNumber(supply)
      });
      const token = nft.mintAddress.toBase58();
      console.log(`✅  Mint Success! Tries: ${i + 1}`);
      console.log(`    https://solscan.io/token/${token}`);
      return token;
    } catch (err) {
      if (String(err).includes('funds')) {
        console.log('❌ ERROR: Not enough funds in the master wallet!!!');
      }
      console.log(`❌ ERROR: Minting NFT failed!!! Tries: ${i + 1}`);
      if (_errLogs) {
        console.log('\nERROR\n', err);
      }
      await sleep(5000);
      i++;
    }
  }
  return 'ERROR';
}

export interface Token {
  token: string;
  imageUri: string;
  assetUri: string;
  metadataUri: string;
}
async function mintNFT (
  id: number,
  name: string,
  asset: Buffer,
  symbol: string,
  type: string,
  supply: number,
  floor: number,
  creator: string,
  username: string,
  description: string,
  city: string,
  latitude: number,
  longitude: number,
  visbility: string,
  maxLat: number,
  minLat: number,
  maxLon: number,
  minLon: number,
  _isMutable: boolean = true, // Optional, if True token can be burned
  _royalties: number = 1000, // Optional, 1000 = 10%
  _nftImage: Buffer | boolean = false, // Optional
  _mintCcy: string = 'SOL', // Optional
  _collection: PublicKey = MASTER_COLLECTION, // Optional
  _collectionAuthority: PublicKey = MASTER_PUBLICKEY, // Optional
  _collectionIsSized: boolean = false, // Optional
  _tries: number = 10, // Optional
  _errLogs: boolean = false // Optional
): Promise<boolean> {
  const date = getDate();
  const year = date.slice(0, 4);
  const time = getTime();
  const METADATA = {
    name,
    description,
    nftType: type,
    attributes: [
      { trait_type: 'CREATOR', value: creator },
      { trait_type: 'USERNAME', value: username },
      { trait_type: 'TYPE', value: type },
      { trait_type: 'SUPPLY', value: String(supply) },
      { trait_type: 'FLOOR', value: `${floor} ${_mintCcy}` },
      { trait_type: 'DATE', value: date },
      { trait_type: 'TIME UTC', value: time },
      { trait_type: 'CITY', value: city },
      { trait_type: 'LATITUDE', value: String(latitude) },
      { trait_type: 'LONGITUDE', value: String(longitude) },
      { trait_type: 'VISIBILITY', value: visbility },
      { trait_type: 'MAX LAT', value: String(maxLat) },
      { trait_type: 'MIN LAT', value: String(minLat) },
      { trait_type: 'MAX LON', value: String(maxLon) },
      { trait_type: 'MIN LON', value: String(minLon) }
    ],
    sellerFeeBasisPoints: _royalties, // 1000 bp = 10% royalties
    symbol,
    maxSupply: supply,
    isCollection: true,
    collection: _collection,
    collectionAuthority: _collectionAuthority,
    collectionIsSized: _collectionIsSized,
    isVerified: true,
    isMutabe: _isMutable,
    creators: [
      { address: new PublicKey(creator), share: 80 },
      { address: MASTER_PUBLICKEY, share: 20 }
    ],
    year: String(year)
  };
  if (asset) {
    // Step 1 - Upload media
    const assetUri = await uploadAsset(
      asset,
      `${METADATA.name}.${type.split('/')[1]}`,
      _tries
    );
    let imageUri = assetUri;
    if (type.split('/')[0] === 'video') {
      const gif = await videoToGif(asset, 3, 10);
      imageUri = await uploadImage(gif, METADATA.name + '.gif', _tries);
    } else if (type.split('/')[0] === 'audio') {
      imageUri = await uploadImage(_nftImage, METADATA.name + '.png', _tries);
    }
    if (assetUri && imageUri && assetUri !== 'ERROR' && imageUri !== 'ERROR') {
      // Step 2 - Upload metadata
      const metadataUri = await uploadMetadata(
        imageUri,
        assetUri,
        METADATA.nftType,
        METADATA.symbol,
        METADATA.name,
        METADATA.description,
        METADATA.attributes,
        _tries
      );
      if (metadataUri && metadataUri !== 'ERROR') {
        // Step 3 - Mint Master Edition
        const token: string = await mintMaster(
          metadataUri,
          METADATA.name,
          METADATA.maxSupply,
          METADATA.sellerFeeBasisPoints,
          METADATA.symbol,
          METADATA.creators,
          _isMutable, // NFT is mutable (can be burned)
          _tries,
          _errLogs
        );
        if (token != 'ERROR' && String(token).length > 22) {
          if (
            await newNFT(
              id,
              token,
              supply,
              floor,
              _mintCcy,
              creator,
              username,
              imageUri,
              assetUri,
              type,
              metadataUri,
              name,
              description,
              city,
              latitude,
              longitude,
              visbility,
              maxLat,
              minLat,
              maxLon,
              minLon,
              _tries, // Async tries
              false // Print error logs
            )
          ) {
            if (await printNFT(token, creator, _tries)) {
              return true;
            }
          }
        }
      }
    }
  }
  return false;
}

export default mintNFT;
