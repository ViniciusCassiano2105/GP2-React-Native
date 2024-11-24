import { useFocusEffect } from "@react-navigation/native";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback, useEffect, useState } from "react";
import { Dimensions, Image, TouchableOpacity, View, ImageBackground, Text } from "react-native";
import { useMyContext } from "../../context/General/MyContext";
import startBtn from './../../assets/botao-start.png';
import ship from "./../../assets/spaceship.png";
import { styles } from "./styles";
import { ModalDetails } from "../Modals/ScoreModal";

export const Game = () => {
  const { size, setSize, isPlaying, setIsPlaying, dificuldade } = useMyContext();
  const { width, height } = Dimensions.get("window");

  const [iPosition] = useState({
    x: (width - size) / 2,
    y: (height - size) / 2,
  });

  const [position, setPosition] = useState({ x: iPosition.x, y: iPosition.y });
  const { clickCount, setClickCount, score, setScore, volume } = useMyContext();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const gerarNovaPosicao = () => {
    const x = Math.random() * (width - size);
    const y = Math.random() * (height - 100 - size);
    setPosition({ x, y });
  };

  const handleShipPress = () => {
    setClickCount(clickCount + 1);
    setScore(score + 10);
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

  useEffect(() => {
    if (dificuldade == "Fácil") {
      setSize(100);
    } else if (dificuldade == "Normal") {
      setSize(75);
    } else if (dificuldade == "Difícil") {
      setSize(38);
    }
  }, [dificuldade]);

  useFocusEffect(
    useCallback(() => {
      let currentSound: Audio.Sound | null = null;

      const startMusic = async () => {
        const sound = await playMusic(volume);
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

  const [time, setTime] = useState(3); // Contador de 3 segundos
  const [isGameStarted, setIsGameStarted] = useState(false); // Flag para saber se o jogo começou
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null); // ID do intervalo
  const [isCounting, setIsCounting] = useState(false); // Flag para saber se está contando
  const [isStartButtonVisible, setIsStartButtonVisible] = useState(true); // Flag para controle da visibilidade do botão "Iniciar"
  const [isShipVisible, setIsShipVisible] = useState(false); // Flag para controle da visibilidade da nave
  const [isGameActive, setIsGameActive] = useState(false); // Flag para saber se o jogo está ativo (após os 3 segundos)

  // Função que inicia o contador de 3 segundos ao pressionar o botão
  const handleStartTouch = () => {
    setClickCount(0);
    setScore(0);
    setIsPlaying(false); // Jogo ainda não está ativo
    setIsGameActive(false); // Jogo não está ativo ainda
    setIsGameStarted(false); // Garante que o jogo ainda não começou
    setTime(3); // Começa o contador de 3 segundos
    setIsCounting(true); // Inicia a contagem
    setIsStartButtonVisible(false); // Esconde o botão "Iniciar"
    setIsShipVisible(false); // Esconde a nave enquanto conta os 3 segundos

    if (intervalId) {
      clearInterval(intervalId); // Limpa qualquer intervalo anterior
    }

    // Inicia o contador de 3 segundos
    const countdownInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(countdownInterval); // Para o contador ao chegar em 0
          startGame(); // Chama a função para iniciar o jogo
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(countdownInterval); // Guarda o ID do intervalo para limpeza
  };

  // Função para iniciar o cronômetro de 30 segundos e o jogo
  const startGame = () => {
    setIsGameStarted(true); // O jogo agora começou
    setIsCounting(false); // Para de contar o tempo de 3 segundos
    setIsShipVisible(true); // Faz a nave aparecer depois de 3 segundos
    setIsGameActive(true); // Jogo agora está ativo
    setTime(30); // Define o cronômetro de 30 segundos

    // Garante que o intervalo de 30 segundos só seja configurado uma vez
    if (intervalId) {
      clearInterval(intervalId);
    }

    // Inicia o cronômetro de 30 segundos e a contagem de cliques
    const gameInterval = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(gameInterval); // Para o cronômetro ao chegar em 0
          setIsPlaying(false); // Finaliza o jogo ao chegar em 0
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    setIntervalId(gameInterval); // Guarda o ID do intervalo para limpeza

    // Inicia a contagem de cliques e pontos imediatamente após o jogo começar
    setIsPlaying(true);
  };

  return (
    <View style={styles.container}>
      {/* Exibe o contador de tempo apenas enquanto o jogo não começou e ainda está contando */}
      {isCounting && <Text style={styles.timer}>{time}</Text>}

      <ImageBackground
        source={require("./../../assets/backgroundigameplay.png")}
        style={styles.backgroundImage}
      />

      <Video
        style={styles.video}
        source={require("./../../assets/backgroundplay2.mp4")}
        resizeMode={"cover" as ResizeMode}
        isLooping
        shouldPlay
      />

      {/* A nave só aparece quando o jogo começar */}
      {isShipVisible && isGameActive && (
        <TouchableOpacity
          style={[styles.botao, { top: position.y, left: position.x, height: size, width: size }]}
          
          // Só permite clicar na nave quando o jogo começou
          onPress={handleShipPress}
          disabled={!isGameStarted} // Desabilita o botão até que o jogo comece
          activeOpacity={0.95}
        >
          <Image source={ship} style={[styles.spaceShip, { width: size }]} />
        </TouchableOpacity>
      )}

      {/* Botão de iniciar só aparece se o jogo não tiver começado */}
      {isStartButtonVisible && (
        <TouchableOpacity
          style={[styles.botaoStart, { display: "flex" }]}
          onPress={handleStartTouch}
        >
          <Image
            source={startBtn}
            style={{ height: 180, resizeMode: "contain" }}
          />
        </TouchableOpacity>
      )}

      <ModalDetails />
    </View>
  );
};
