import React, { createContext, useState, ReactNode, useContext } from "react";
import { Dimensions } from "react-native";

interface MyContextProps {
    size: number;
    setSize: (value: number) => void;
}

const MyContext = createContext<MyContextProps>({
    size: 0,
    setSize: () => {
        throw new Error('setSize foi chamado fora do MyProvider')
    }
})

interface MyProviderProps {
    children: ReactNode;
}

export const MyProvider = ({ children }: MyProviderProps) => {
    const [size, setSize] = React.useState(100)

    return (

        <MyContext.Provider
            value={{
                size,
                setSize,
            }}
        >
            {children}
        </MyContext.Provider>
    )
}

export const useMyContext = () => {
    const context = useContext(MyContext);
    if (!context) {
        throw new Error("useMyContext deve ser usado dentro de um MyProvider");
    }
    return context;
};
