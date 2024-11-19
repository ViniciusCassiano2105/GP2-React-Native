import React from "react"
import { styles } from "./styles"
import { View } from "react-native"
import { Game } from "../../components/Game"
import Timer from "../../components/Timer"
export const Home = () => {
    return (
        <View style={styles.container}>
                <Timer/>
                <Game />
        </View>
    )
}