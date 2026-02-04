import { http, createConfig } from 'wagmi'
import { mainnet, sepolia } from 'wagmi/chains'

// This is the configuration for wagmi, which provides React hooks for Ethereum.
// It sets up the chains we support and the transport layer (e.g., Infura, Alchemy, or public RPC).
export const wagmiConfig = createConfig({
  chains: [mainnet, sepolia], // Supporting mainnet and the Sepolia testnet
  transports: {
    [mainnet.id]: http(), // Using public RPC for mainnet
    [sepolia.id]: http(), // Using public RPC for Sepolia
  },
})