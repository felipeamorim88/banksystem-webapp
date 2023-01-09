import React, { createContext, Dispatch, PropsWithChildren, useContext, useState } from 'react';
const AccountContext = createContext({} as AccountContextState);
export interface AccountContextState {
    id: string;
    setId: Dispatch<any>;
    userName: string;
    setUserName: Dispatch<any>;
    password: any;
    setPassword: Dispatch<any>;
    depositValue: number;
    setDepositValue: Dispatch<any>;
    purchaseValue: number;
    serPurchaseValue: Dispatch<any>;
    purchaseDescription: string;
    setPurchaseDescription: Dispatch<any>
    balance: number;
    setBalance: Dispatch<any>
}


export const AccountContextProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {

    const [id, setId] = useState('')
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [purchaseDescription, setPurchaseDescription] = useState('')

    const [depositValue, setDepositValue] = useState(0)
    const [purchaseValue, serPurchaseValue] = useState(0)
    const [balance, setBalance] = useState(0)

    return (
        <AccountContext.Provider
            value={{
                id, setId,
                userName, setUserName,
                password, setPassword,
                depositValue, setDepositValue,
                purchaseValue, serPurchaseValue,
                purchaseDescription, setPurchaseDescription,
                balance, setBalance
            }}>
            {children}
        </AccountContext.Provider>
    );
};

export const useAccountContext = () => {
    return useContext(AccountContext);
};
