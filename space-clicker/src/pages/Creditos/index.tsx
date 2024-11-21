import React, { useEffect, useRef, useState } from "react";
import { Animated, SafeAreaView, Text, View, Image } from "react-native";
import { styles } from "./styles";
import logo from "./../../assets/logo.png";

const creditosData = [
  { role: "Engenheiro de Gameplay", name: "Arthur Carreiro" },
  { role: "Artista de Interface", name: "Gabriel Toledo" },
  { role: "Engenheiro de Som", name: "Lucas Schumacker" },
  { role: "Especialista em Testes", name: "Luiz Vinicius" },
  { role: "Animador de Cenários", name: "Matheus Lopes" },
  { role: "Estratégia de Mercado", name: "Savio Castro" },
  { role: "Escultor 3D", name: "Weliton Schitini" },
];

export const Creditos: React.FC = () => {
  const scrollY = useRef(new Animated.Value(500)).current;
  const finalMessageY = useRef(new Animated.Value(300)).current;
  const finalMessageOpacity = useRef(new Animated.Value(0)).current;
  const [showMessage, setShowMessage] = useState(false);

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
      ]).start();
    });
  }, [scrollY]);

  return (
    <SafeAreaView style={styles.container}>
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
          <Text style={styles.finalMessage}>Obrigado por jogar</Text>
          <Text style={styles.finalMessage}>Space Clicker!!!</Text>
          <Image source={logo} style={styles.logo} />
        </Animated.View>
      )}
    </SafeAreaView>
  );
};
