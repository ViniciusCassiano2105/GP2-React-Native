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

export const ModalDetails = ({ nome: string }: ModalDetailsProps) => {
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const { score, player } = useMyContext()
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
        navigation.navigate("HomeTabs", { screen: "Ranking" })
    }

    const handlePostNewPlayer = () => {
        registraPontos(newPlayer, score)
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
            <Text>Pontuação total:</Text>
            <Text>{score}</Text>
            <TouchableOpacity
                disabled={false}
                onPress={handlePostPlayer}
            >Registrar minha pontuação como {player}</TouchableOpacity>
            <TextInput
                placeholder={'Digite um novo nick'}
                onChangeText={handlePlayerChange}
                value={newPlayer}
                maxLength={3}
            />
            <TouchableOpacity
                onPress={handlePostNewPlayer}
                disabled={newPlayer.length == 3 ? false : true}
            >Registrar com novo nick</TouchableOpacity>
        </View>
    </Modal>
}