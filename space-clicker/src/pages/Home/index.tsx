import React from "react"
import { styles } from "./styles"
import { Text, TouchableOpacity, View } from "react-native"
import { Game } from "../../components/Game"
import Header from "../../components/Banner"
import Timer from "../../components/Timer"
export const Home = () => {
  return (
    <View style={styles.container}>
      <Header
        leftElement={
          <Text style={styles.headerText}>Cliques: </Text>
        }
        title={<Timer />} // Timer no centro
        rightElement={<Text style={styles.headerText}>Pontuação: </Text>}
      />
      <Game />
    </View>
  )
}

// {clickCount}
// {score}