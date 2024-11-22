import React, { useCallback, useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, Text, View, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import logo from "./../../assets/logo.png";
import { useFocusEffect } from "@react-navigation/native";
import { Audio, ResizeMode, Video } from "expo-av";
import { ControleDeVolume } from "./../../components/ControleDeVolume";
import { useNavigation } from "@react-navigation/native";

const creditosData = [
  { role: "Engenheiro de Gameplay", name: "Arthur Carreiro" },
  { role: "Artista de Interface", name: "Gabriel Toledo" },
  { role: "Engenheiro de Som", name: "Lucas Schumacker" },
  { role: "Especialista em Testes", name: "Luiz Vinicius" },
  { role: "Animador de Cenários", name: "Matheus Lopes" },
  { role: "Estratégia de Mercado", name: "Savio Castro" },
  { role: "Escultor 3D", name: "Weliton Schitini" },
];

export const Creditos = () => {
  const scrollY = useRef(new Animated.Value(500)).current;
  const finalMessageY = useRef(new Animated.Value(300)).current;
  const finalMessageOpacity = useRef(new Animated.Value(0)).current;
  const [showMessage, setShowMessage] = useState(false);
  const [showMenuButton, setShowMenuButton] = useState(false);
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const navigation = useNavigation();

  const playMusic = async (volume: number): Promise<Audio.Sound | null> => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("./starwars.mp3"),
        {
          shouldPlay: true,
          isLooping: false,
          volume,
        }
      );

      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
          setSound(null);
        }
      });

      setSound(sound);
      return sound;
    } catch (error) {
      console.error("Erro ao carregar o áudio:", error);
      return null;
    }
  };

  useEffect(() => {
    Animated.timing(scrollY, {
      toValue: -600,
      duration: 15000,
      useNativeDriver: true,
    }).start(() => {
      setShowMessage(true);
      Animated.parallel([
        Animated.timing(finalMessageY, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(finalMessageOpacity, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setShowMenuButton(true);
      });
    });
  }, [scrollY]);

  useFocusEffect(
    useCallback(() => {
      let currentSound: Audio.Sound | null = null;

      const startMusic = async () => {
        const sound = await playMusic(0.5);
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

  const handleNavigateToMenu = () => {
    navigation.navigate("StartScreen");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fundo preto */}
      <View style={styles.backgroundLayer} />

      {/* Vídeo acima do fundo preto */}
      <Video
        style={styles.video}
        source={require("./../../assets/backgroundfogos.mp4")}
        resizeMode={"cover" as ResizeMode}
        shouldPlay
        isLooping
      />

      {!showMessage ? (
        <Animated.View
          style={[
            styles.starWarsContainer,
            {
              transform: [
                { translateY: scrollY },
                {
                  scale: scrollY.interpolate({
                    inputRange: [-600, 500],
                    outputRange: [0.8, 1.2],
                    extrapolate: "clamp",
                  }),
                },
                { rotateX: "40deg" },
              ],
            },
          ]}
        >
          <Text style={styles.title}>CRÉDITOS</Text>
          {creditosData.map((item, index) => (
            <View key={index} style={styles.creditItem}>
              <Text style={styles.role}>{item.role}</Text>
              <Text style={styles.name}>{item.name}</Text>
            </View>
          ))}
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            styles.finalMessageContainer,
            {
              transform: [{ translateY: finalMessageY }],
              opacity: finalMessageOpacity,
            },
          ]}
        >
          <Text style={styles.finalMessage}>O universo agradece!</Text>
          <Text style={styles.finalMessage}>Você fez história no Space Clicker!</Text>
          <Text style={styles.finalMessage}>Obrigado por sua jornada!</Text>
          <Text style={styles.finalMessage}>Nos vemos no próximo jogo!</Text>
          <Image source={logo} style={styles.logo} />
        </Animated.View>
      )}

      {showMenuButton && (
        <TouchableOpacity onPress={handleNavigateToMenu} style={styles.menuButton}>
          <Text style={styles.textButton}>MENU</Text>
        </TouchableOpacity>
      )}

      {sound && <ControleDeVolume sound={sound} />}
    </SafeAreaView>
  );
};
