import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native"; 
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { styles } from "./styles";

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

  const playMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./CrashBandicoot3WarpedTheme.mp3"),
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
