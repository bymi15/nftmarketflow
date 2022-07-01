import NonFungibleToken from 0x631e88ae7f1d7c20

pub contract NFTStore: NonFungibleToken {
    pub var totalSupply: UInt64

    pub event ContractInitialized()
    pub event Withdraw(id: UInt64, from: Address?)
    pub event Deposit(id: UInt64, to: Address?)

    pub event NFTCreated(id: UInt64)

    pub resource NFT: NonFungibleToken.INFT {
        pub let id: UInt64
        pub let ipfsHash: String
        pub var metadata: {String: String}

        init(ipfsHash: String,  metadata: {String: String}) {
            NFTStore.totalSupply = NFTStore.totalSupply + 1
            self.id = NFTStore.totalSupply
            self.ipfsHash = ipfsHash
            self.metadata = metadata

            emit NFTCreated(id: self.id)
        }
    }

    pub resource interface CollectionPublic {
        pub fun borrowEntireNFT(id: UInt64): &NFTStore.NFT
    }

    pub resource Collection: NonFungibleToken.Receiver, NonFungibleToken.Provider, NonFungibleToken.CollectionPublic, CollectionPublic {
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init() {
            self.ownedNFTs <- {}
        }

        destroy() {
            destroy self.ownedNFTs
        }

        pub fun deposit(token: @NonFungibleToken.NFT) {
            let t <- token as! @NFTStore.NFT
            emit Deposit(id: t.id, to: self.owner?.address)
            self.ownedNFTs[t.id] <-! t
        }

        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("The NFT does not exist")
            emit Withdraw(id: token.id, from: self.owner?.address)
            return <- token
        }

        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }

        pub fun borrowEntireNFT(id: UInt64): &NFTStore.NFT {
            let ref = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            return ref as! &NFTStore.NFT
        }
    }

    pub fun createEmptyCollection(): @Collection {
        return <- create Collection()
    }

    pub fun mintToken(ipfsHash: String, metadata: {String: String}): @NFTStore.NFT {
        return <- create NFT(ipfsHash: ipfsHash, metadata: metadata)
    }
    
    init() {
        self.totalSupply = 0
    }
}