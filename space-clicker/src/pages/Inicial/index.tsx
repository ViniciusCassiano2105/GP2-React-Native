import React from "react";
import { Image, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export const Inicial = () => {
    return(
        <View style={styles.inicial}>
            {/* <ImageBackground source={}> */}
                <View style={styles.titulo}>
                    <Text style={styles.textTitulo}>SPACE-CLICKER</Text>
                </View>

                {/* <Image>
                    LOGO
                </Image> */}

                <View style={styles.botoes}>
                <TouchableOpacity style={styles.buttonStart}>
                    <Text style={styles.textButton}>START</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonConfiguracao}>
                    <Text style={styles.textButton}>CONFIGURAÇÔES</Text>
                </TouchableOpacity>
                </View>
            {/* </ImageBackground> */}
        </View>
    )
}