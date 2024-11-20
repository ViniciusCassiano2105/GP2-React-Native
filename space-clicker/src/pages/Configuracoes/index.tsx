import React, { useCallback, useEffect, useState } from "react";
import { Audio, ResizeMode, Video } from "expo-av";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useFocusEffect } from "@react-navigation/native";

export const Configuracoes = () => {
  const [difficulty, setDifficulty] = useState("normal"); 
  const [volume, setVolume] = useState(50);
  const [nick, setNick] = useState("Player1");
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(1000);

  useEffect(() => {
       if (difficulty === "Fácil") setSpeed(1500);
    else if (difficulty === "Difícil") setSpeed(500);
    else setSpeed(1000);
  }, [difficulty]);

  const handleClick = () => {
    setScore(score + 1);
  };

  const changeVolume = (delta) => {
    setVolume(Math.min(100, Math.max(0, volume + delta))); 
  };

  const playMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./StardustSpeedwayZoneAct2.mp3"),
        {
          shouldPlay: true,
          isLooping: true,
        }
      );
      return sound;
    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      let sound: Audio.Sound | null | undefined = null;

      const startMusic = async () => {
        sound = await playMusic();
      };

      startMusic();

      return () => {
        if (sound) {
          sound.unloadAsync();
        }
      };
    }, [])
  );



  return (
   
    <View style={styles.container}>
       {/*Fundo Video*/}
      <Video
        style={styles.video}
        source={require("./../../assets/conf.mp4")}
        resizeMode={"cover" as ResizeMode}
        isLooping
        shouldPlay
      />
    

      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>SpaceClick</Text>
        <Text style={styles.subTitle}>Dificuldade: {difficulty}</Text>
        <Text style={styles.subTitle}>Volume: {volume}</Text>
        <Text style={styles.subTitle}>Nick: {nick}</Text>
        <Text style={styles.subTitle}>Pontuação: {score}</Text>
      </View>

      {/* Botão Principal */}
      <TouchableOpacity onPress={handleClick} style={styles.shipButton}>
        <Image
          source={require("../../assets/logo.png")}
          style={styles.shipImage}
        />
      </TouchableOpacity>

      {/* Configurações */}
      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>Configurações</Text>

        {/* Alterar dificuldade */}
        <TouchableOpacity
          onPress={() => setDifficulty("Fácil")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Fácil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDifficulty("Normal")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDifficulty("Difícil")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Difícil</Text>
        </TouchableOpacity>

        {/* Alterar Volume */}
        <View style={styles.volumeControl}>
          <TouchableOpacity
            onPress={() => changeVolume(-10)}
            style={styles.settingButton}
          >
            <Text style={styles.settingText}>- Volume</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeVolume(10)}
            style={styles.settingButton}
          >
            <Text style={styles.settingText}>+ Volume</Text>
          </TouchableOpacity>
        </View>

        {/* Alterar Nick */}
        <TextInput
          style={styles.input}
          placeholder="Alterar Nick"
          value={nick}
          onChangeText={setNick}
        />
      </View>
    </View>
  );
};

export default Configuracoes;
