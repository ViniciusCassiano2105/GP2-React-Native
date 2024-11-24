import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View, ImageBackground } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";
import { useMyContext } from "../../context/General/MyContext";

type RootStackParamList = {
  StartScreen: undefined;
  HomeTabs: { screen: keyof BottomTabsParamList };
};

type BottomTabsParamList = {
  Ranking: undefined;
  Jogar: undefined;
  Configurações: undefined;
};

export const Inicial = () => {
  const navigation = useNavigation<InicialScreenNavigationProp>();
  const { sound, setSound } = useMyContext();
  const { volume } = useMyContext();

  type InicialScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "HomeTabs"
  >;

  const handleNavigateToHome = () => {
    navigation.navigate("HomeTabs", { screen: "Jogar" });
  };

  const handleNavigateToConfig = () => {
    navigation.navigate("HomeTabs", { screen: "Configurações" });
  };

  const playMusic = async (volume: number): Promise<Audio.Sound | null> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./CrashBandicoot3WarpedTheme.mp3"),
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

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./../../assets/backgroundinicial.png")} 
        style={styles.backgroundImage}
      />
      
      <Video
        style={styles.video}
        source={require("./../../assets/backgroundinicial2.mp4")}
        resizeMode={"cover" as ResizeMode}
        isLooping
        shouldPlay
      />
      <View style={styles.botoes}>
        <TouchableOpacity style={styles.buttonStart} onPress={handleNavigateToHome}>
          <Text style={styles.textButton}>INICIAR</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonConfiguracao} onPress={handleNavigateToConfig}>
          <Text style={styles.textButton}>CONFIGURAÇÕES</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
