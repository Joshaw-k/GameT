"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { ContractAddress, FactoryAddress } from "../utils/constants";
import { abi } from "../utils/abi";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { getContract } from "thirdweb";
import { client } from "../client";
import { baseSepolia } from "thirdweb/chains";
import { smartWallet } from "thirdweb/wallets";

interface IGametContext {
    connectedUser: any;
    setconnectedUser: any;
    setconnectedUserDetails;
    connectedUserDetails: any;
    connectedUserHasAccount: boolean;
    setconnectedUserHasAccount: any;
    readPlayerDataMap: any;
    connectedAccount: any;
    contractObj: any;
}

const GametContext = createContext<IGametContext>({
    connectedUser: null,
    setconnectedUser: null,
    connectedUserDetails: null,
    setconnectedUserDetails: null,
    connectedUserHasAccount: false,
    setconnectedUserHasAccount: null,
    readPlayerDataMap: null,
    connectedAccount: null,
    contractObj: null,
});

const wallet = smartWallet({
    chain: baseSepolia,
    gasless: true,
    factoryAddress: FactoryAddress
});

export interface GametProviderProps {
    children: React.ReactNode | React.ReactNode[] | null;
}
const GametProvider: React.FC<GametProviderProps> = ({
    children,
}: GametProviderProps) => {
    const connectedAccount = useActiveAccount();
    const [connectedUser, setconnectedUser] = useState<any>()
    const [connectedUserDetails, setconnectedUserDetails] = useState<any>()
    const [connectedUserHasAccount, setconnectedUserHasAccount] = useState<boolean>(false)
    const contractObj = getContract({
        client,
        chain: baseSepolia,
        address: ContractAddress,
        abi
    })
    const { data: readPlayerDataMap, isLoading } = useReadContract({
        contract: contractObj,
        method: "PlayerDataMap",
        params: [connectedAccount?.address]
    });
    // const { data: readPlayerDataMap } = useReadContract({
    //     abi,
    //     address: ContractAddress,
    //     functionName: "PlayerDataMap",
    //     args: [connectedAccount?.address],
    // });


    const account = (async () => {
        const t = await wallet.connect({
            client,
            personalAccount: connectedAccount!,
        })
    })();


    return (
        <GametContext.Provider
            value={{
                connectedUser,
                setconnectedUser,
                connectedUserDetails,
                setconnectedUserDetails,
                connectedUserHasAccount,
                setconnectedUserHasAccount,
                readPlayerDataMap,
                connectedAccount,
                contractObj
            }}
        >
            {children}
        </GametContext.Provider>
    );
};

export const useGametContext = () => useContext(GametContext);

export default GametProvider;
