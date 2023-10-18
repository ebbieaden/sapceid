"use client";

import { WagmiConfig, configureChains, createConfig } from "wagmi";
import {
    darkTheme,
    getDefaultWallets,
    RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { arbitrumGoerli, bscTestnet, goerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";

const { chains, publicClient } =configureChains(
    [bscTestnet, arbitrumGoerli],
    [publicProvider()]
);

const { connectors } = getDefaultWallets({
    appName: "spaceId",
    projectId: `${process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID}`,
    chains,
});

const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
})

export default function Providers({ children}: { children: React.ReactNode }) {
    return (
        <WagmiConfig config={wagmiConfig}>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
                {children}
            </RainbowKitProvider>
        </WagmiConfig>
    );
}