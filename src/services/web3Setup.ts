import "@rainbow-me/rainbowkit/styles.css";
import { createConfig } from "wagmi";
import {
  bsc,
  bscTestnet,
  mainnet,
  polygon,
  polygonAmoy,
  sepolia,
} from "wagmi/chains";
import { injected, walletConnect } from "wagmi/connectors";

export const PROJECT_ID = import.meta.env.VITE_PROJECT_ID || "";

export const chains_wc = [
  mainnet,
  bsc,
  polygon,
  sepolia,
  bscTestnet,
  polygonAmoy,
] as const;

export const metadata = {
  name: "Morpheuslabs",
  description: "Morpheuslabs",
  url: "https://web3modal.com",
  icons: [
    "https://serverxyw3og1e-nodestack-dev-machine-server-9080.morpheuslabs.io/static/media/logo-menu.4aedcd17ddc9d70de433f7ee9e014fcd.svg",
  ],
};

export const connectorMetamask = injected();

export const connectorWalletConnect = walletConnect({
  projectId: PROJECT_ID,
  metadata,
});

export const wagmiConfig = createConfig({
  chains: chains_wc,
  connectors: [injected(), walletConnect({ projectId: PROJECT_ID, metadata })],
} as any);
