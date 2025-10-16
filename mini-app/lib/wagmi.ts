import { createConfig, http } from "wagmi";
import { base } from "wagmi/chains";
import { useAccount as wagmiUseAccount, useSignMessage as wagmiUseSignMessage, ConnectButton as WagmiConnectButton } from "wagmi";

export const wagmiConfig = createConfig({
  chains: [base],
  transports: {
    [base.id]: http("https://mainnet.base.org"),
  },
  connectors: [
    // Default connectors will automatically use WalletConnect and MetaMask
  ],
  ssr: false,
});

export function useAccount() {
  return wagmiUseAccount();
}

export function useSignMessage() {
  return wagmiUseSignMessage();
}

export function ConnectButton() {
  return <WagmiConnectButton />;
}
