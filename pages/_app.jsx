import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit"; // Import components and functions from RainbowKit
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets"; // Import wallet types from RainbowKit
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains"; // Import BSC Testnet from wagmi chains
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ChatAppProvider } from "../context/ChatAppContext"; // Import ChatAppProvider from context
import NavBar from "@/components/NavBar";

// Configure chains, providers, and clients using wagmi
const { chains, provider, publicClient, webSocketPublicClient } =
  configureChains(
    [bscTestnet],
    [
      jsonRpcProvider({
        rpc: () => ({
          http: process.env.NEXT_PUBLIC_RPC_URL, // Set the HTTP RPC URL from environment variables
        }),
      }),
      publicProvider(),
    ]
  );

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID; // Get the WalletConnect project ID from environment variables

// Get default wallets using RainbowKit
const { wallets } = getDefaultWallets({
  appName: "Chat Dapp",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Chat Dapp",
};

// Create connectors for wallets using RainbowKit
const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

// Create Wagmi configuration
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  provider,
  publicClient,
  webSocketPublicClient,
});

// Main App component
export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      {/* Provide Wagmi configuration */}
      <RainbowKitProvider
        appInfo={demoAppInfo}
        chains={chains}
        theme={darkTheme()} // Set the dark theme
      >
        <ChatAppProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            theme="dark" // Use dark theme for react-toastify
          />
          <NavBar />
          <Component {...pageProps} />
        </ChatAppProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
