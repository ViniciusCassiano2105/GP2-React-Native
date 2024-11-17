import React from "react";
import { Dimensions, Image, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import ship from './../../assets/spaceship.png'
import { useMyContext } from "../../context/General/MyContext";

export const Game = () => {
    const {size, setSize} = useMyContext()
    const { width, height } = Dimensions.get('window')
    const [iPosition, setIPosition] = React.useState({x: (width - size)/2, y: (height-size)/2})
    const [position, setPosition] = React.useState({ x: iPosition.x, y: iPosition.y})

    const gerarNovaPosicao = () => {
        const x = Math.random() * (width - size);
        const y = Math.random() * (height - size);
        setPosition({x, y});
    }

    const handlePress = () => {
        gerarNovaPosicao();
    }

    return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.botao, {top: position.y, left: position.x, height: size, width: size}]}
            onPress={handlePress}>
                <Image
                source={ship}
                style={[styles.spaceShip, {width: size}]}
                />
            </TouchableOpacity>
        </View>
    )
}