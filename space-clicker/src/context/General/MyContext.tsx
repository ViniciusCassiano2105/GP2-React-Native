import { Audio } from "expo-av";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface MyContextProps {
    size: number;
    setSize: (value: number) => void;
    sound: Audio.Sound | undefined;
    setSound: (value: Audio.Sound | undefined) => void;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MyProviderProps {
    children: ReactNode;
}

const MyContext = createContext<MyContextProps>({
    size: 0,
    setSize: () => {
        throw new Error('setSize foi chamado fora do MyProvider')
    },
    sound: undefined,
    setSound: () => {
        throw new Error('setSound foi chamado fora do MyProvider')
    },
    isPlaying: false,
    setIsPlaying: () => {
        throw new Error('setSound foi chamado fora do MyProvider')
    }
})

export const MyProvider = ({ children }: MyProviderProps) => {
    const [size, setSize] = React.useState(100)
    const [sound, setSound] = useState<Audio.Sound | undefined>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    return (

        <MyContext.Provider
            value={{
                size,
                setSize,
                sound,
                setSound,
                isPlaying,
                setIsPlaying
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
