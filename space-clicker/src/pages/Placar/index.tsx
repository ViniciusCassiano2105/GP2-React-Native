import React, { useEffect, useState } from "react";
import { View, SafeAreaView, Text } from "react-native";
import { Video, Audio } from "expo-av";
import { styles } from "./styles";

export const Placar = () => {
  const [sound, setSound] = useState<Audio.Sound | undefined>();

  // Função para carregar e tocar a música
  async function playMusic() {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./MarioKartDoubleDashMusic.mp3"),
        {
          shouldPlay: true, // Inicia automaticamente
          isLooping: true, // Reproduz em loop
        }
      );
      setSound(sound); // Define o objeto `sound` no estado
    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
    }
  }

  // Tocar música quando o componente for montado
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
      {/* Vídeo como fundo */}
      <Video
        style={styles.video}
        source={require("./background.mp4")} 
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
