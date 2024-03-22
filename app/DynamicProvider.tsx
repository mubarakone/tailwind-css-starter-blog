'use client'
import React, { PropsWithChildren } from 'react'
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";

import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

export const DynamicProvider = (props: PropsWithChildren) => {

    const cssOverrides = `
    .dynamic-shadow-dom-content {
        --dynamic-font-family-primary: "Roboto", sans-serif;
        --dynamic-font-family-primary: 'Space Grotesk', sans-serif;
        --dynamic-widget__container {
          display: flex;
          justify-content: center; /* Center horizontally */
          align-items: center; /* Center vertically */
          height: 100vh; /* Full height of the viewport */
        } 
      }
    `

    return (
        <DynamicContextProvider
            settings={{
                // Find your environment id at https://app.dynamic.xyz/dashboard/developer
                environmentId: process.env.DYNAMIC_ENVIRONMENT_ID as string,
                walletConnectors: [EthereumWalletConnectors, ZeroDevSmartWalletConnectors],
                cssOverrides,
            }}
        >
            <DynamicWagmiConnector>
                {props.children}
            </DynamicWagmiConnector>
        </DynamicContextProvider>
    );
};
