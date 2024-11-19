import React from "react";
import { Dimensions, Image, ImageBackground, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";
import ship from './../../assets/spaceship.png'
import { useMyContext } from "../../context/General/MyContext";
import spaceBg from './../../assets/spaceBackground.jpg'
<<<<<<< HEAD
import Timer from "../../components/Timer"
=======
import { Video } from "expo-av";

>>>>>>> e63e26b9687b394812f3c03671aec5d4219ff8bf
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
<<<<<<< HEAD
            <ImageBackground source={spaceBg} resizeMode="cover" style={styles.background}>
            <Timer/>
=======
        <Video
        style={styles.video}
        source={require("./../../assets/backgroundplay2.mp4")}
        resizeMode="cover"
        isLooping
        shouldPlay/>
>>>>>>> e63e26b9687b394812f3c03671aec5d4219ff8bf
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