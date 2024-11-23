import React, { useCallback, useEffect, useState } from "react";
import { Audio, ResizeMode, Video } from "expo-av";
import { Image, Text, TextInput, TouchableOpacity, View, Alert } from "react-native";
import { styles } from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useMyContext } from "../../context/General/MyContext";
import { useNavigation } from "@react-navigation/native"; // Importando o hook de navegação
import { RootStackParamList } from "../../routes/StackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Configuracoes = () => {
  const { volume, setVolume, dificuldade, setDificuldade, player, setPlayer } = useMyContext();
  const navigation = useNavigation<ConfigNavigationProp>(); // Criando o objeto de navegação

  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(1000);
  const [nickInput, setNickInput] = useState(player || "");

  type ConfigNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Creditos"
>;

  useEffect(() => {
    if (dificuldade === "Fácil") setSpeed(1500);
    else if (dificuldade === "Difícil") setSpeed(500);
    else setSpeed(1000);
  }, [dificuldade]);

  const handleClick = () => {
    setScore(score + 1);
  };

  const changeVolume = (delta: number) => {
    const newVolume = Math.min(1, Math.max(0, volume + delta))
    setVolume(newVolume)
    storeData(newVolume, 'volume')
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

  const storeData = async (value: any, key: string) => {
    try {
      await AsyncStorage.setItem(key, `${value}`);
    } catch (e) {
      console.error("Não foi possível registrar as informações.")
    }
  };

  const handleSaveNick = () => {
    setPlayer(nickInput); // Atualiza o contexto com o nick digitado
    storeData(nickInput, 'nickname')
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

      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>Configurações</Text>

        {/* Alterar dificuldade */}
        <TouchableOpacity
          onPress={() => {
            setDificuldade("Fácil")
          storeData("Fácil", "dificuldade")}}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Fácil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDificuldade("Normal")
            storeData("Normal", "dificuldade")}}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDificuldade("Difícil")
            storeData("Difícil", "dificuldade")}}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Difícil</Text>
        </TouchableOpacity>

        {/* Alterar Volume */}
        <View style={styles.volumeControl}>
          <TouchableOpacity
            onPress={() => changeVolume(-0.1)}
            style={styles.settingButton}
          >
            <Text style={styles.settingText}>- Volume</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => changeVolume(0.1)}
            style={styles.settingButton}
          >
            <Text style={styles.settingText}>+ Volume</Text>
          </TouchableOpacity>
        </View>

        {/* Alterar Nick */}
        <TextInput
          style={styles.input}
          placeholder="Digite seu nick"
          autoCapitalize="characters"
          value={nickInput}
          onChangeText={setNickInput}
          maxLength={3}
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
