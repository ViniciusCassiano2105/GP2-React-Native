import React from "react";
import { View, SafeAreaView, Text,} from "react-native";
import { Video } from "expo-av";
import { styles } from "./styles";

export const Placar = () => {
  return (
    <View style={styles.container}>
      <Video
        style={styles.video} 
        source={require("./background.mp4")} 
        resizeMode="cover" 
        isLooping
        shouldPlay
      />
      <SafeAreaView style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.player}>PLAYER</Text>
          <Text style={styles.score}>SCORE</Text>
        </View>

       
      </SafeAreaView>
    </View>
  );
};
