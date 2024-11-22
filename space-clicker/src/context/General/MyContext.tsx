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
    player: string;
    setPlayer: React.Dispatch<React.SetStateAction<string>>;
    isModalVisible: boolean;
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    volume: number;
    setVolume: React.Dispatch<React.SetStateAction<number>>;

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
    player: '',
    setPlayer: () => {
        throw new Error('setScore foi chamado fora do MyProvider')
    },
    isModalVisible: false,
    setIsModalVisible: () => {
        throw new Error('setIsModalVisible foi chamado fora do MyProvider')
    },
    volume: 0.8,
    setVolume: () => {
        throw new Error('setVolume foi chamado fora do MyProvider')
    },
})

export const MyProvider = ({ children }: MyProviderProps) => {
    const [size, setSize] = React.useState(100)
    const [sound, setSound] = useState<Audio.Sound | undefined>();
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [clickCount, setClickCount] = useState(0); // Número de cliques
    const [score, setScore] = useState(0); // Pontuação do jogador
    const [player, setPlayer] = useState('');
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [volume, setVolume] = useState(0.8);

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
                player,
                setPlayer,
                isModalVisible,
                setIsModalVisible,
                volume,
                setVolume,
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
