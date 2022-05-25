import * as fcl from '@onflow/fcl';

export const loadFCLConfig = (env = 'testnet') => {
  switch (env) {
    case 'testnet':
      fcl
        .config()
        .put('env', env)
        .put('app.detail.title', 'NFTMarketFlow')
        .put('app.detail.icon', 'https://placekitten.com/g/200/200')
        .put('accessNode.api', 'https://rest-testnet.onflow.org')
        .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn')
        .put('0xFungibleToken', '0x9a0766d93b6608b7')
        .put('0xNonFungibleToken', '0x631e88ae7f1d7c20')
        .put('0xFlowToken', '0x7e60df042a9c0868')
        .put('0xNFTStore', '0x3acc4fa9e74dfa02')
        .put('0xNFTMarketplace', '0x3acc4fa9e74dfa02');
    // case 'mainnet':
    //   fcl
    //     .config()
    //     .put('env', env)
    //     .put('app.detail.title', 'NFTMarketFlow')
    //     .put('app.detail.icon', 'https://placekitten.com/g/200/200')
    //     .put('accessNode.api', 'https://rest-mainnet.onflow.org')
    //     .put('discovery.wallet', 'https://fcl-discovery.onflow.org/api/authn')
    //     .put('discovery.authn.include', '0xe5cd26afebe62781')
    //     .put('0xFungibleToken', '0x9a0766d93b6608b7')
    //     .put('0xNonFungibleToken', '0x631e88ae7f1d7c20')
    //     .put('0xFlowToken', '0x7e60df042a9c0868')
    //     .put('0xNFTStore', '0x3acc4fa9e74dfa02')
    //     .put('0xNFTMarketplace', '0x3acc4fa9e74dfa02');
  }
};
