import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMyContext } from "../../context/General/MyContext";
import { RootStackParamList } from "../../routes/StackNavigator";
import { styles } from "./styles";

export const Configuracoes = () => {
  const {
    setDificuldade,
    player,
    setPlayer,
    sound,
    setSound,
  } = useMyContext();
  const navigation = useNavigation<ConfigNavigationProp>();

  const [nickInput, setNickInput] = useState(
    player ? player.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() : ""
  );

  type ConfigNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Creditos"
  >;

  const playMusic = async (): Promise<Audio.Sound | null> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./StardustSpeedwayZoneAct2.mp3"),
        {
          shouldPlay: true,
          isLooping: true,
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
        const sound = await playMusic();
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

  const handleSaveNick = () => {
    setPlayer(nickInput);
    Alert.alert("Nick atualizado!", `Seu nick agora é: ${nickInput}`);
  };

  const handleCredits = () => {
    navigation.navigate("Creditos");
  };

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
          onPress={() => setDificuldade("Fácil")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Fácil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDificuldade("Normal")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setDificuldade("Difícil")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Difícil</Text>
        </TouchableOpacity>

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
