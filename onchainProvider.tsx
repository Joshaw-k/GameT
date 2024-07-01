import { ReactNode } from "react";
import { OnchainKitProvider } from "@coinbase/onchainkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { baseSepolia } from "viem/chains";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "./wagmi";
import { ThirdwebProvider } from "thirdweb/react";

type Props = { children: ReactNode };

const queryClient = new QueryClient();

function OnchainProviders({ children }: Props) {
  return (
    <ThirdwebProvider>
      <QueryClientProvider client={queryClient}>
        <OnchainKitProvider apiKey={"M2-qbCbBZiBYcfRar6z3EyhPmqqte_xA"} chain={baseSepolia}>
          {children}
        </OnchainKitProvider>
      </QueryClientProvider>
    </ThirdwebProvider>
  );
}

export default OnchainProviders;
