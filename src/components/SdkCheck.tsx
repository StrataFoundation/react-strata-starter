import React from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useStrataSdks } from "@strata-foundation/react";

export const SdkCheck = () => {
  const { publicKey } = useWallet();
  const { tokenBondingSdk } = useStrataSdks();

  console.log("tokenBondingSdk", tokenBondingSdk);
  return <div>{publicKey && `Using wallet: ${publicKey.toBase58()}`}</div>;
};
