import NonFungibleToken from 0x631e88ae7f1d7c20
import NFTStore from 0x3acc4fa9e74dfa02
import FungibleToken from 0x9a0766d93b6608b7
import FlowToken from 0x7e60df042a9c0868

pub contract NFTMarketplace {
    pub struct SaleItem {
        pub let price: UFix64
        pub let nftRef: &NFTStore.NFT
        
        init(price: UFix64, nftRef: &NFTStore.NFT) {
            self.price = price
            self.nftRef = nftRef
        }
    }

    pub resource interface SaleCollectionPublic {
        pub fun purchaseNFT(id: UInt64, recipientCollection: &NFTStore.Collection{NonFungibleToken.CollectionPublic}, payment: @FlowToken.Vault)
        pub fun getPrice(id: UInt64): UFix64
        pub fun getIDs(): [UInt64]
    }

    // Event that is emitted when a sale item is listed
    pub event SaleItemListed(id: UInt64, price: UFix64)

    // Event that is emitted when a sale item is removed
    pub event SaleItemRemoved(id: UInt64)

    pub resource SaleCollection: SaleCollectionPublic {
        pub var nfts: {UInt64: UFix64}
        pub let NFTCollection: Capability<&NFTStore.Collection>
        pub let FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>

        pub fun listNFT(id: UInt64, price: UFix64) {
            pre {
                price >= 0.0: "Price cannot be negative"
                self.NFTCollection.borrow()!.getIDs().contains(id): "Does not own this NFT"
            }
            self.nfts[id] = price
            emit SaleItemListed(id: id, price: price)
        }

        pub fun unlistNFT(id: UInt64) {
            self.nfts.remove(key: id)
            emit SaleItemRemoved(id: id)
        }

        pub fun purchaseNFT(id: UInt64, recipientCollection: &NFTStore.Collection{NonFungibleToken.CollectionPublic}, payment: @FlowToken.Vault) {
            pre {
                payment.balance == self.nfts[id]: "Payment is not equal to the price of NFT"
            }
            recipientCollection.deposit(token: <- self.NFTCollection.borrow()!.withdraw(withdrawID: id))
            self.FlowTokenVault.borrow()!.deposit(from: <- payment)
        }

        pub fun getPrice(id: UInt64): UFix64 {
            return self.nfts[id]!
        }

        pub fun getIDs(): [UInt64] {
            return self.nfts.keys
        }

        init(NFTCollection: Capability<&NFTStore.Collection>, FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>) {
            self.nfts = {}
            self.NFTCollection = NFTCollection
            self.FlowTokenVault = FlowTokenVault
        }
    }

    pub fun createSaleCollection(NFTCollection: Capability<&NFTStore.Collection>, FlowTokenVault: Capability<&FlowToken.Vault{FungibleToken.Receiver}>): @SaleCollection {
        return <- create SaleCollection(NFTCollection: NFTCollection, FlowTokenVault: FlowTokenVault)
    }

    init() {}
}