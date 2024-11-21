import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { useMyContext } from "../../context/General/MyContext";

export default () => {
  const [time, setTime] = useState(30.00);
  const [isRunning, setIsRunning] = useState(false);
  const { isPlaying, setIsPlaying } = useMyContext();

  useEffect(() => {
    isPlaying ? setIsRunning(true) : null
  }, [isPlaying])

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;


    if (isRunning && time > 0) {

      timer = setTimeout(() => {
        setTime(prevTime => (Math.max(prevTime - 0.1, 0)));
      }, 100);
    } else if (time <= 0) {
      setIsRunning(false);
      setTime(30.00)
      setIsPlaying(false);
    }


    return () => clearTimeout(timer);

  }, [isRunning, time]);

  return (
    <View style={styles.container}>
      <Text style={styles.textTimer}>{time.toFixed(2)}</Text>
    </View>
  );
};
