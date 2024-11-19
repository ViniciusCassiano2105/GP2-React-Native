import React from "react"
import { styles } from "./styles"
import { View } from "react-native"
import { Game } from "../../components/Game"
export const Home = () => {
    return (
        <View style={styles.container}>
                <Game />
        </View>
    )
}