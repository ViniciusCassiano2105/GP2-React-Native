import React, { useState } from "react";
import { Modal, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useMyContext } from "../../context/General/MyContext";
import { styles } from './styles';
import { registraPontos } from "../../api/api";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface ModalDetailsProps {
    isModalVisible: boolean,
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>,
    index: string,
    nome: string,
    pontuacao: number,
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
    const { score, player, isModalVisible, setIsModalVisible } = useMyContext()
    const [newPlayer, setNewPlayer] = useState('');
    const navigation = useNavigation<ModalScreenNavigationProp>();

    type ModalScreenNavigationProp = NativeStackNavigationProp<
        RootStackParamList,
        "HomeTabs"
    >;

    const handlePlayerChange = (player: string) => {
        setNewPlayer(player)
    }

    const handlePostPlayer = () => {
        registraPontos(player, score);
        setIsModalVisible(false)
        navigation.navigate("HomeTabs", { screen: "Ranking" })
    }

    const handlePostNewPlayer = () => {
        registraPontos(newPlayer, score)
        setIsModalVisible(false)
        navigation.navigate("HomeTabs", { screen: "Ranking" })
    }


    return <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
            setIsModalVisible(false);
        }}
    >
        <View style={styles.modal}>
            <View style={styles.modalContainer}>
                <Text style={styles.title}>Pontuação total:</Text>
                <Text style={styles.score}>{score}</Text>
                <TouchableOpacity
                    style={styles.button}
                    disabled={false}
                    onPress={handlePostPlayer}
                ><Text style={styles.buttonText}>Registrar minha pontuação como ART{player}</Text></TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder={'Novo nick'}
                    onChangeText={handlePlayerChange}
                    value={newPlayer}
                    maxLength={3}
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={handlePostNewPlayer}
                    disabled={newPlayer.length == 3 ? false : true}
                ><Text style={styles.buttonText}>Registrar com novo nick</Text></TouchableOpacity>
            </View>
        </View>
    </Modal>
}