import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ResizeMode, Video } from "expo-av";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type RootStackParamList = {
    StartScreen: undefined;
    HomeTabs: { screen: keyof BottomTabsParamList } // Nome da rota para Configurações
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
        navigation.navigate('HomeTabs', { screen: 'Jogar' });
    }

    const handleNavigateToConfig = () => {
        navigation.navigate('HomeTabs', { screen: 'Configurações' });
    }


    return (
        <View style={styles.container}>
            <Video
                style={styles.video}
                source={require("./../../assets/backgroundinicial2.mp4")}
                resizeMode={"cover" as ResizeMode}
                isLooping
                shouldPlay
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