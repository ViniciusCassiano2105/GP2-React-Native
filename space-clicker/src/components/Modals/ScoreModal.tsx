import React, { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import { useMyContext } from "../../context/General/MyContext";
import { styles } from "./styles";
import { registraPontos } from "../../api/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ModalDetailsProps {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  index: string;
  nome: string;
  pontuacao: number;
}

type RootStackParamList = {
  StartScreen: undefined;
  HomeTabs: { screen: keyof BottomTabsParamList };
};

type BottomTabsParamList = {
  Ranking: undefined;
  Jogar: undefined;
  Configurações: undefined;
};

export const ModalDetails = () => {
  const { score, player, isModalVisible, setIsModalVisible } = useMyContext();
  const [newPlayer, setNewPlayer] = useState("");
  const navigation = useNavigation<ModalScreenNavigationProp>();

  type ModalScreenNavigationProp = NativeStackNavigationProp<
    RootStackParamList,
    "HomeTabs"
  >;

  const handlePlayerChange = (player: string) => {
    setNewPlayer(player);
  };

  const handlePostPlayer = () => {
    registraPontos(player, score);
    setIsModalVisible(false);
    navigation.navigate("HomeTabs", { screen: "Ranking" });
  };

  const handlePostNewPlayer = () => {
    registraPontos(newPlayer, score);
    setIsModalVisible(false);
    navigation.navigate("HomeTabs", { screen: "Ranking" });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isModalVisible}
      onRequestClose={() => {
        setIsModalVisible(false);
      }}
    >
      <KeyboardAvoidingView
        style={styles.modal}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Pontuação total</Text>
            <Text style={styles.score}>{score}</Text>
            <Text style={styles.spacecoins}>SpaceCoins</Text>
            <TouchableOpacity
              style={styles.button}
              disabled={false}
              onPress={handlePostPlayer}
            >
              <Text style={styles.buttonText}>
                Registrar minha pontuação como {player}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder={"Novo nick"}
              onChangeText={handlePlayerChange}
              value={newPlayer}
              maxLength={3}
              placeholderTextColor="#999"
            />
            <TouchableOpacity
              style={styles.button}
              onPress={handlePostNewPlayer}
              disabled={newPlayer.length !== 3}
            >
              <Text style={styles.buttonText}>Registrar com novo nick</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};
