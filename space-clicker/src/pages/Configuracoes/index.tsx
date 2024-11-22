import React, { useCallback, useEffect, useState } from "react";
import { Audio, ResizeMode, Video } from "expo-av";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { useFocusEffect } from "@react-navigation/native";
import { useMyContext } from "../../context/General/MyContext";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/StackNavigator";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export const Configuracoes = () => {
  const { player, setPlayer, volume, setVolume } = useMyContext();
  const navigation = useNavigation<ConfigNavigationProp>();
  const [difficulty, setDifficulty] = useState("normal");
  const [nickInput, setNickInput] = useState(player || "");
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  type ConfigNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Creditos"
  >;

  useEffect(() => {
    if (difficulty === "Fácil") setDifficulty("Fácil");
    else if (difficulty === "Difícil") setDifficulty("Difícil");
    else setDifficulty("Normal");
  }, [difficulty]);

  const changeVolume = async (delta: number) => {
    const newVolume = Math.min(1, Math.max(0, volume + delta));
    setVolume(newVolume);
    if (sound) {
      await sound.setVolumeAsync(newVolume);
    }
  };

  const handleSaveNick = () => {
    setPlayer(nickInput);
    Alert.alert("Nick atualizado!", `Seu nick agora é: ${nickInput}`);
  };

  const handleCredits = () => {
    navigation.navigate("Creditos");
  };

  useFocusEffect(
    useCallback(() => {
      const playMusic = async () => {
        if (!sound) {
          try {
            const { sound: newSound } = await Audio.Sound.createAsync(
              require("./StardustSpeedwayZoneAct2.mp3"),
              {
                shouldPlay: true,
                isLooping: true,
                volume,
              }
            );
            setSound(newSound);
          } catch (error) {
            console.error("Erro ao carregar o áudio:", error);
          }
        } else {
          const status = await sound.getStatusAsync();
          if (status.isLoaded && !status.isPlaying) {
            await sound.playAsync();
          }
        }
      };

      playMusic();

      return () => {
        if (sound) {
          sound.pauseAsync();
        }
      };
    }, [sound, volume])
  );

  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        source={require("./../../assets/conf.mp4")}
        resizeMode={"cover" as ResizeMode}
        isLooping
        shouldPlay
      />

      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>Configurações</Text>

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
        <Text style={styles.settingText}>Volume: {`${Math.round(volume * 100)}%`}</Text>

        <TextInput
          style={styles.input}
          placeholder="Digite seu nick"
          value={nickInput}
          onChangeText={setNickInput}
          maxLength={3}
          autoCapitalize="characters"
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
