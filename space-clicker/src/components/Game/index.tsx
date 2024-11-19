import { ResizeMode, Video } from "expo-av";
import React, { useState } from "react";
import { Dimensions, Image, TouchableOpacity, View, Text } from "react-native";
import Timer from "../../components/Timer";
import { useMyContext } from "../../context/General/MyContext";
import Header from "../../components/Banner/index";
import ship from './../../assets/spaceship.png';
import { styles } from "./styles";

export const Game = () => {
    const { size, setSize } = useMyContext();
    const { width, height } = Dimensions.get('window');

    const [iPosition] = useState({ x: (width - size) / 2, y: (height - size) / 2 });
    const [position, setPosition] = useState({ x: iPosition.x, y: iPosition.y });
    const [clickCount, setClickCount] = useState(0); // Número de cliques
    const [score, setScore] = useState(0);           // Pontuação do jogador

    const gerarNovaPosicao = () => {
        const x = Math.random() * (width - size);
        const y = Math.random() * (height - size);
        setPosition({ x, y });
    };

    const handlePress = () => {
        setClickCount(clickCount + 1); // Incrementa o número de cliques
        setScore(score + 10);         // Incrementa a pontuação
        gerarNovaPosicao();
    };

    return (
        <View style={styles.container}>
            
            <Header
                leftElement={
                    <Text style={styles.headerText}>Cliques: {clickCount}</Text>
                }
                title={<Timer />} // Timer no centro
                rightElement={
                    <Text style={styles.headerText}>Pontuação: {score}</Text>
                }
            />

            
            <Video
                style={styles.video}
                source={require("./../../assets/backgroundplay2.mp4")}
                resizeMode={"cover" as ResizeMode}
                isLooping
                shouldPlay
            />

            <TouchableOpacity
                style={[
                    styles.botao,
                    { top: position.y, left: position.x, height: size, width: size },
                ]}
                onPress={handlePress}
            >
                <Image source={ship} style={[styles.spaceShip, { width: size }]} />
            </TouchableOpacity>
        </View>
    );
};
