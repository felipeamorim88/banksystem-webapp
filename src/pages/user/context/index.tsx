import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
const UserContext = createContext({} as UserContextState);
export interface UserContextState {
    nome: any;
    setNome: React.Dispatch<any>;
    email: any;
    setEmail: React.Dispatch<any>;
    password: any;
    setPassword: React.Dispatch<any>;
}


export const UserContextProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <UserContext.Provider
            value={{
                nome, setNome,
                email, setEmail,
                password, setPassword
            }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = () => {
    return useContext(UserContext);
};
