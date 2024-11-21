import { useFocusEffect } from "@react-navigation/native";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback, useState } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { useMyContext } from "../../context/General/MyContext";
import ship from "./../../assets/spaceship.png";
import { ControleDeVolume } from "./../../components/ControleDeVolume";
import { styles } from "./styles";

export const Game = () => {
  const { size, setSize, isPlaying, setIsPlaying } = useMyContext();
  const { width, height } = Dimensions.get("window");

  const [iPosition] = useState({
    x: (width - size) / 2,
    y: (height - size) / 2,
  });

  const [position, setPosition] = useState({ x: iPosition.x, y: iPosition.y });
  const [clickCount, setClickCount] = useState(0); // Número de cliques
  const [score, setScore] = useState(0); // Pontuação do jogador
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const gerarNovaPosicao = () => {
    const x = Math.random() * (width - size);
    const y = Math.random() * (height - 100 - size);
    setPosition({ x, y });
  };

  const handlePress = () => {
    setClickCount(clickCount + 1); // Incrementa o número de cliques
    setScore(score + 10); // Incrementa a pontuação
    gerarNovaPosicao();
  };

  const playMusic = async (volume: number): Promise<Audio.Sound | null> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./StarFoxOST09BGM.mp3"),
        {
          shouldPlay: true,
          isLooping: true,
          volume,
        }
      );
      setSound(sound);
      return sound;
    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
      return null;
    }
  };

  useFocusEffect(
    useCallback(() => {
      let currentSound: Audio.Sound | null = null;

      const startMusic = async () => {
        const sound = await playMusic(0.5);
        if (sound) {
          currentSound = sound;
        }
      };

      startMusic();

      return () => {
        if (currentSound) {
          currentSound.unloadAsync();
        }
      };
    }, [])
  );

  const handleStartTouch = () => {
    //começa o contador

    //esconde a barra de navegação
    setIsPlaying(true);
    
    //desbloqueia a nave
  }

  return (
    <View style={styles.container}>
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
        disabled={!isPlaying}
      >
        <Image source={ship} style={[styles.spaceShip, { width: size }]} />
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botaoStart, isPlaying ? {display: 'none'} : {display: 'flex'}]} onPress={handleStartTouch}>
        <Text style={{textAlign: 'center'}}>START</Text>
        </TouchableOpacity>

    </View>
  );
};
