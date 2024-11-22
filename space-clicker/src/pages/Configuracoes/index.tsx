import React, { useCallback, useEffect, useState } from "react";
import { Audio, ResizeMode, Video } from "expo-av";
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useMyContext } from "../../context/General/MyContext";
import { useNavigation } from "@react-navigation/native"; // Importando o hook de navegação

export const Configuracoes = () => {
  const { player, setPlayer } = useMyContext();
  const navigation = useNavigation(); // Criando o objeto de navegação

  const [difficulty, setDifficulty] = useState("normal");
  const [volume, setVolume] = useState(50);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [nickInput, setNickInput] = useState(player || ""); 

  useEffect(() => {
    if (difficulty === "Fácil") setSpeed(1500);
    else if (difficulty === "Difícil") setSpeed(500);
    else setSpeed(1000);
  }, [difficulty]);

  const handleClick = () => {
    setScore(score + 1);
  };

  const changeVolume = (delta: number) => {
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

  const handleSaveNick = () => {
    setPlayer(nickInput); // Atualiza o contexto com o nick digitado
    Alert.alert("Nick atualizado!", `Seu nick agora é: ${nickInput}`);
  };

  const handleCredits = () => {
    navigation.navigate("Creditos"); 
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
      {/* Fundo Video */}
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
          placeholder="Digite seu nick"
          value={nickInput}
          onChangeText={setNickInput}
        />
        <TouchableOpacity onPress={handleSaveNick} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Salvar Nick</Text>
        </TouchableOpacity>

      <TouchableOpacity onPress={handleCredits} style={styles.settingButton}>
          <Text style={styles.settingText}>Créditos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Configuracoes;
