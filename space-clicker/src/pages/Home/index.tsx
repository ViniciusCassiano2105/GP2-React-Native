import React from "react"
import { styles } from "./styles"
import { ImageBackground, View } from "react-native"
import { Game } from "../../components/Game"
import spaceBg from "./../../assets/spaceBackground.png"

export const Home = () => {
    return (
        <View style={styles.container}>
            <ImageBackground source={spaceBg}>
                <Game />
            </ImageBackground>
        </View>
    )
}