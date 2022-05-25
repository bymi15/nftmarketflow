import * as fcl from '@onflow/fcl';

const transformPayloadToObject = (payload) => {
  const fields = payload?.value?.fields || [];
  let obj = {};
  for (let f of fields) {
    if (f.value?.type === 'UInt64') {
      obj[f.name] = parseInt(f.value?.value);
    } else if (f.value?.type === 'UFix64') {
      obj[f.name] = parseFloat(f.value?.value);
    } else {
      obj[f.name] = f.value?.value;
    }
  }
  return obj;
};

const getEvent = async ({ contractAddress, contractName, eventName }) => {
  const latestBlock = await fcl.send([fcl.getBlock(true)]);
  const latestBlockDecoded = await fcl.decode(latestBlock);
  const end = latestBlockDecoded.height;
  const start = end - 5;

  const response = await fcl.send([
    fcl.getEventsAtBlockHeightRange(
      `A.${contractAddress}.${contractName}.${eventName}`,
      start,
      end
    ),
  ]);
  return response.events && response.events.length > 0
    ? transformPayloadToObject(response.events[0].payload)
    : null;
};

export const getNFTCreatedEvent = async () => {
  return await getEvent({
    contractName: 'NFTStore',
    contractAddress: '3acc4fa9e74dfa02', // address without 0x prefix
    eventName: 'NFTCreated',
  });
};

export const getSaleItemListedEvent = async () => {
  return await getEvent({
    contractName: 'NFTMarketplace',
    contractAddress: '3acc4fa9e74dfa02', // address without 0x prefix
    eventName: 'SaleItemListed',
  });
};

export const getSaleItemRemovedEvent = async () => {
  return await getEvent({
    contractName: 'NFTMarketplace',
    contractAddress: '3acc4fa9e74dfa02',
    eventName: 'SaleItemRemoved',
  });
};

export const getSaleItemPurchasedEvent = async () => {
  return await getEvent({
    contractName: 'NFTMarketplace',
    contractAddress: '3acc4fa9e74dfa02',
    eventName: 'SaleItemPurchased',
  });
};
