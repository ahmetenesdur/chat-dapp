import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { bscTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { ChatAppProvider } from "../context/ChatAppContext";
import NavBar from "@/components/NavBar";

const { chains, provider, publicClient, webSocketPublicClient } =
  configureChains(
    [bscTestnet],
    [
      jsonRpcProvider({
        rpc: () => ({
          http: "https://bsc.getblock.io/2f45bdc2-6f28-4869-be42-f99337844c56/testnet",
        }),
      }),
      publicProvider(),
    ]
  );

const projectId = process.env.NEXT_PUBLIC_WALLET_CONNECT_ID;

const { wallets } = getDefaultWallets({
  appName: "Chat Dapp",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Chat Dapp",
};

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

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  provider,
  publicClient,
  webSocketPublicClient,
});

export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        appInfo={demoAppInfo}
        chains={chains}
        theme={darkTheme()}
      >
        <ChatAppProvider>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            theme="dark"
          />
          <NavBar />
          <Component {...pageProps} />
        </ChatAppProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
