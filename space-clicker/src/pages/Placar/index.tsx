import { useFocusEffect } from "@react-navigation/native";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView, View } from "react-native";
import { Colocacao } from "./../../components/Colocacao";
import { useMyContext } from "../../context/General/MyContext";
import { styles } from "./styles";

export const Placar = () => {
  const { volume } = useMyContext();
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playMusic = async (): Promise<Audio.Sound | null> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./MarioKartDoubleDashMusic.mp3"),
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

 
  useEffect(() => {
    if (sound) {
      sound.setVolumeAsync(volume);
    }
  }, [volume, sound]); 

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
        <Colocacao />
      </SafeAreaView>
    </View>
  );
};
