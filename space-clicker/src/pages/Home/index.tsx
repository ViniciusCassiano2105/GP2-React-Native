import React from "react"
import { styles } from "./styles"
import { Text, TouchableOpacity, View } from "react-native"
import { Game } from "../../components/Game"
import Header from "../../components/Banner"
import Timer from "../../components/Timer"
import { useMyContext } from "../../context/General/MyContext"
export const Home = () => {
  const { clickCount, score } = useMyContext();

  return (
    <View style={styles.container}>
      <Header
        leftElement={
          <Text style={styles.headerText}>Cliques: {clickCount}</Text>
        }
        title={<Timer />} // Timer no centro
        rightElement={<Text style={styles.headerText}>Pontuação: {score}</Text>}
      />
      <Game />
    </View>
  )
}