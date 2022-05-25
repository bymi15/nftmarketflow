import * as fcl from '@onflow/fcl';
import { loadFCLConfig } from './fclConfig';
import GetTotalSupplyCadence from 'cadence/scripts/GetTotalSupply.cdc';

export const getTotalSupply = async (contractName = 'TopShot') => {
  return null;
  // loadFCLConfig('mainnet');
  // const cadenceCode = await (await fetch(GetTotalSupplyCadence)).text();
  // const res = await fcl.query({
  //   cadence: cadenceCode,
  //   args: (arg, t) => [arg(contractName, t.String)],
  // });

  // loadFCLConfig();
  // return res;
};

export const getPurchasedEvents = async (
  contractAddress = 'c1e4f4f4c4257510',
  contractName = 'TopShotMarketV3',
  eventName = 'MomentPurchased'
) => {
  return null;
  // loadFCLConfig('mainnet');
  // const latestBlock = await fcl.decode(await fcl.send([fcl.getBlock(true)]));
  // let allEvents = [];
  // var startTime = performance.now();
  // for (let i = latestBlock.height; i >= latestBlock.height - 1000; i -= 49) {
  //   console.log('from ' + i + ' to ' + (i + 49));
  //   const response = await fcl.send([
  //     fcl.getEventsAtBlockHeightRange(
  //       `A.${contractAddress}.${contractName}.${eventName}`,
  //       i - 49,
  //       i
  //     ),
  //   ]);
  //   allEvents.push(...response.events);
  // }
  // var endTime = performance.now();
  // console.log(allEvents);
  // console.log(`Call to doSomething took ${endTime - startTime} milliseconds`);
  // // Processing events from 1000 blocks takes 7228 ms
  // // 138 blocks / second

  // // total of 30040487 blocks would take:
  // // 217684 seconds
  // // 3628 minutes
  // // 60 hours

  // loadFCLConfig();
  // return res;
};
