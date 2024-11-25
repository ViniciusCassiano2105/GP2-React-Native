import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import { useMyContext } from "../../context/General/MyContext";
import { RootStackParamList } from "../../routes/StackNavigator";
import { styles } from "./styles";

export const Configuracoes = () => {
  const { setDificuldade, player, setPlayer, sound, setSound } = useMyContext();
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
    if (nickInput.trim() === "") {
      Alert.alert("Nick inválido!", "Por favor, insira um nick válido. 😅");
    } else {
      setPlayer(nickInput);
      Alert.alert("Nick atualizado!", `Seu nick agora é: ${nickInput} 🏆`);
    }
  };

  const handleSelectDificuldade = (dificuldade: string) => {
    let mensagem = "";

    if (dificuldade === "Fácil") {
      mensagem = "Tá Fácil Demais 😄";
    } else if (dificuldade === "Normal") {
      mensagem = "Mais ou Menos 😐";
    } else if (dificuldade === "Difícil") {
      mensagem = "Tá Enrolado(a) 😵";
    }

    setDificuldade(dificuldade);
    Alert.alert("Dificuldade selecionada!", mensagem);
  };

  const handleCredits = () => {
    navigation.navigate("Creditos");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./../../assets/backgroundconf.png")}
        style={styles.backgroundImage}
      />

      <Video
        style={styles.video}
        source={require("./../../assets/conf.mp4")}
        resizeMode={"cover" as ResizeMode}
        isLooping
        shouldPlay
      />

      <View style={styles.settings}>
        <Text style={styles.settingsTitle}>Configurações</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dificuldade</Text>
          <View style={styles.settingOption}>
        <TouchableOpacity
              onPress={() => handleSelectDificuldade("Fácil")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Fácil</Text>
        </TouchableOpacity>
            <Image
              source={require("./../../assets/easy.png")}
              style={styles.largeIcon}
            />
          </View>
          <View style={styles.settingOption}>
        <TouchableOpacity
              onPress={() => handleSelectDificuldade("Normal")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Normal</Text>
        </TouchableOpacity>
            <Image
              source={require("./../../assets/medio.png")}
              style={styles.largeIcon}
            />
          </View>
          <View style={styles.settingOption}>
        <TouchableOpacity
              onPress={() => handleSelectDificuldade("Difícil")}
          style={styles.settingButton}
        >
          <Text style={styles.settingText}>Difícil</Text>
        </TouchableOpacity>
            <Image
              source={require("./../../assets/hard.png")}
              style={styles.largeIcon}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Novo Apelido</Text>
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
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sobre o Jogo</Text>
          <TouchableOpacity
            onPress={handleCredits}
            style={styles.creditosButton}
          >
          <Text style={styles.settingText}>Créditos</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Configuracoes;
