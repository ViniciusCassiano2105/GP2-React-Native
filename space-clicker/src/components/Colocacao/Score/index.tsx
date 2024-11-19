import React from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";

type ScoreProps = {
  points: number;
};

export const Score = ({ points }: ScoreProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{points}</Text>
    </View>
  );
};
