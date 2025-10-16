import { useState, useEffect } from "react";

/**
 * Minimal stub of wagmi hooks and components used in the app.
 * This allows the project to compile without the real wagmi dependency.
 */

export function useAccount() {
  // In a real app, this would return the connected wallet address and status.
  // For the stub, we always return disconnected.
  return { address: null, isConnected: false };
}

export function useSignMessage() {
  // Returns a function that pretends to sign a message.
  const signMessageAsync = async ({ message }: { message: string }) => {
    // Return a dummy signature string.
    return `0x${Buffer.from(message).toString("hex")}`;
  };
  return { signMessageAsync };
}

export function ConnectButton() {
  // Simple button that does nothing in the stub.
  return (
    <button
      className="bg-[#0038A8] text-white py-2 px-4 rounded-full hover:scale-105 transition-transform"
      onClick={() => alert("Connect wallet functionality is not available in this stub.")}
    >
      Connect Wallet
    </button>
  );
}
