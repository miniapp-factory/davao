export function useAccount() {
  return { address: null, isConnected: false };
}

export function useSignMessage() {
  return { signMessageAsync: async () => "" };
}

export function ConnectButton() {
  return null;
}
