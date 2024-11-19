import React from "react";
import { View, Text } from "react-native";
import { styles } from "./style";

type PlayerProps = {
  name: string;
};

export const Player = ({ name }: PlayerProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
    </View>
  );
};
