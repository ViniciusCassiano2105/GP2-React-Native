import { Audio, Video } from "expo-av";
import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { styles } from "./styles";

export const Placar = () => {
  const [sound, setSound] = useState<Audio.Sound | undefined>();

  async function playMusic() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./MarioKartDoubleDashMusic.mp3"),
        {
          shouldPlay: true,
          isLooping: true,
        }
      );
      setSound(sound);
    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
    }
  }

  useEffect(() => {
    playMusic();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      <Video
        style={styles.video}
        source={require("./../../assets/backgroundscore1.mp4")}
        resizeMode="cover"
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
