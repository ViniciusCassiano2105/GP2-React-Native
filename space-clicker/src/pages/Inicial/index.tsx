import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import logo from "./../../../src/assets/logo.jpeg";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = {
    StartScreen: undefined;
    HomeTabs: {screen: keyof BottomTabsParamList} // Nome da rota para Configurações
};

type BottomTabsParamList = {
    Ranking: undefined;
    Jogar: undefined;
    Configurações: undefined;
};

export const Inicial = () => {
    const navigation = useNavigation<InicialScreenNavigationProp>();

type InicialScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeTabs'>;

const handleNavigateToHome = () => {
    navigation.navigate('HomeTabs', {screen: 'Jogar'});
}

const handleNavigateToConfig = () => {
    navigation.navigate('HomeTabs', {screen: 'Configurações'});
}


    return (
        <View style={styles.inicial}>
            {/* <ImageBackground source={}> */}
            <View style={styles.titulo}>
                <Text style={styles.textTitulo}>SPACE-CLICKER</Text>
            </View>

            <Image
                source={logo}
                style={styles.imagem}
            />

            <View style={styles.botoes}>
                <TouchableOpacity style={styles.buttonStart} onPress={handleNavigateToHome}>
                    <Text style={styles.textButton}>INICIAR</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buttonConfiguracao} onPress={handleNavigateToConfig}>
                    <Text style={styles.textButton}>CONFIGURAÇÕES</Text>
                </TouchableOpacity>
            </View>
            {/* </ImageBackground> */}
        </View>
    )
}