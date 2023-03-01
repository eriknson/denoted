import "@rainbow-me/rainbowkit/styles.css";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { infuraProvider } from "wagmi/providers/infura";
import { publicProvider } from "wagmi/providers/public";
import { PropsWithChildren } from "react";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.rinkeby],
  [
    infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "denoted",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Web3Provider = ({ children }: PropsWithChildren<unknown>) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        appInfo={{
          appName: "denoted",
        }}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
