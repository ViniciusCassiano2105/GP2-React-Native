import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 
import { styles } from "./styles";

export const Placar = () => {
  const playMusic = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./MarioKartDoubleDashMusic.mp3"),
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
        source={require("./../../assets/backgroundscore1.mp4")}
        resizeMode={"cover" as ResizeMode}
        isLooping
        shouldPlay
      />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.player}>PLAYER</Text>
          <Text style={styles.score}>SCORE</Text>
        </View>
      </SafeAreaView>
    </View>
  );
};
