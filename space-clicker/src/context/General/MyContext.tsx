import { Audio } from "expo-av";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface MyContextProps {
    size: number;
    setSize: (value: number) => void;
    sound: Audio.Sound | undefined;
    setSound: (value: Audio.Sound | undefined) => void;
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    clickCount: number;
    setClickCount: React.Dispatch<React.SetStateAction<number>>;
    score: number;
    setScore: React.Dispatch<React.SetStateAction<number>>;
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
        throw new Error('setIsPlaying foi chamado fora do MyProvider')
    },
    clickCount: 0,
    setClickCount: () => {
        throw new Error('setClickCount foi chamado fora do MyProvider')
    },
    score: 0,
    setScore: () => {
        throw new Error('setScore foi chamado fora do MyProvider')
    },
})

export const MyProvider = ({ children }: MyProviderProps) => {
    const [size, setSize] = React.useState(100)
    const [sound, setSound] = useState<Audio.Sound | undefined>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [clickCount, setClickCount] = useState(0); // Número de cliques
    const [score, setScore] = useState(0); // Pontuação do jogador

    return (

        <MyContext.Provider
            value={{
                size,
                setSize,
                sound,
                setSound,
                isPlaying,
                setIsPlaying,
                clickCount,
                setClickCount,
                score,
                setScore,
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
