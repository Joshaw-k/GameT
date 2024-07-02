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
    connectedAccount: any;
    smartAccount: any;
    contractObj: any;
    smartAccountFunc: any;
}

const GametContext = createContext<IGametContext>({
    connectedUser: null,
    setconnectedUser: null,
    connectedUserDetails: null,
    setconnectedUserDetails: null,
    connectedUserHasAccount: false,
    setconnectedUserHasAccount: null,
    connectedAccount: null,
    smartAccount: null,
    contractObj: null,
    smartAccountFunc: null,
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
    const [smartAccount, setSmartAccount] = useState<any>()
    const [connectedUserHasAccount, setconnectedUserHasAccount] = useState<boolean>(false)
    const contractObj = getContract({
        client,
        chain: baseSepolia,
        address: ContractAddress,
        abi
    })

    const smartAccountFunc = async () => {
        const t = await wallet.connect({
            client,
            personalAccount: connectedAccount!,
        })
        return t
    };

    return (
        <GametContext.Provider
            value={{
                connectedUser,
                setconnectedUser,
                connectedUserDetails,
                setconnectedUserDetails,
                connectedUserHasAccount,
                setconnectedUserHasAccount,
                connectedAccount,
                smartAccount,
                contractObj,
                smartAccountFunc
            }}
        >
            {children}
        </GametContext.Provider>
    );
};

export const useGametContext = () => useContext(GametContext);

export default GametProvider;
