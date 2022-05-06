import React from "react";
import logo from "./logo.svg";
import "./App.css";

import {
  WalletModalProvider,
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";
import { Wallet, SdkCheck } from "./components";
import { StrataProviders } from "@strata-foundation/react";

function App() {
  return (
    <Wallet>
      <WalletModalProvider>
        <StrataProviders>
          <div className="App">
            <header className="App-header">
              <img src={logo} className="App-logo" alt="logo" />
              <SdkCheck />
              <p>
                Edit <code>src/App.tsx</code> and save to reload.
              </p>
              <WalletMultiButton />
              <WalletDisconnectButton />
            </header>
          </div>
        </StrataProviders>
      </WalletModalProvider>
    </Wallet>
  );
}

export default App;
