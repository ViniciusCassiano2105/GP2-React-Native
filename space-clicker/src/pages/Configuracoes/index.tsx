import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMyContext } from "../../context/General/MyContext";
import { RootStackParamList } from "../../routes/StackNavigator";
import { styles } from "./styles";

export const Configuracoes = () => {
  const { volume, setVolume, setDificuldade, player, setPlayer, sound, setSound } = useMyContext();
  const navigation = useNavigation<ConfigNavigationProp>(); // Criando o objeto de navegação

  const [nickInput, setNickInput] = useState(player || "");

  type ConfigNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "Creditos"
  >;


  const changeVolume = async (delta: number) => {
    const newVolume = Math.min(1, Math.max(0, volume + delta))
    setVolume(newVolume)
    storeData(newVolume, 'volume')
    if (sound) {
      await sound.setVolumeAsync(newVolume)
    }
  };

  const handleSaveNick = () => {
    setPlayer(nickInput);
    storeData(nickInput, 'nickname')
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
            console.error("Erro ao carregar o Áudio:", error);
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

  const storeData = async (value: any, key: string) => {
    try {
      await AsyncStorage.setItem(key, `${value}`);
    } catch (e) {
      console.error("Não foi possível registrar as informações.")
    }
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
          onPress={() => {
            setDificuldade("Fácil")
            storeData("Fácil", "dificuldade")
          }}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Fácil</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDificuldade("Normal")
            storeData("Normal", "dificuldade")
          }}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Normal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setDificuldade("Difícil")
            storeData("Difícil", "dificuldade")
          }}
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
