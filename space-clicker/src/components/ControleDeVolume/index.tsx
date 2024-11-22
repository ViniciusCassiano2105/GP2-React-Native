import { Ionicons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { Audio } from "expo-av";
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import { useMyContext } from "../../context/General/MyContext";

interface ControleDeVolumeProps {
  sound: Audio.Sound;
}

export const ControleDeVolume: React.FC<ControleDeVolumeProps> = ({
  sound,
}) => {
  const { volume, setVolume } = useMyContext();
  const [showVolumeControl, setShowVolumeControl] = useState(false);

  // Função para alterar o volume
  const handleVolumeChange = async (value: number) => {
    setVolume(value);
    try {
      const status = await sound.getStatusAsync();
      if (status.isLoaded) {
        await sound.setVolumeAsync(value);
      }
    } catch (error) {
      console.error("Erro ao ajustar o volume:", error);
    }
  };

  // Função para alternar visibilidade do controle de volume
  const toggleVolumeControl = () => {
    setShowVolumeControl(!showVolumeControl);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleVolumeControl}>
        <Ionicons name="volume-high" size={32} color="#FFF" />
      </TouchableOpacity>

      {showVolumeControl && (
        <View>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={1}
            step={0.01}
            value={volume}
            onValueChange={handleVolumeChange}
            minimumTrackTintColor="#1DB954"
            maximumTrackTintColor="#cccccc"
            thumbTintColor="#1DB954"
          />
          <Text style={styles.volumePercentage}>
            {`${Math.round(volume * 100)}%`}
          </Text>
        </View>
      )}
    </View>
  );
};
