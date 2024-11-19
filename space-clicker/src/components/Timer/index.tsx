import React, { useState } from "react";
import { View,Text } from "react-native";
import { styles } from "./styles";

export default () => {
    const [time,setTime] = useState(0)

    return(
        <View style={styles.container}>
            <Text style={styles.textTimer}>{time.toFixed(2)}</Text>
        </View>
    )
}