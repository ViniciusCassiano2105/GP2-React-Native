import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    video: {
        ...StyleSheet.absoluteFillObject, 
        zIndex: -1, 
      },
      
    container: {
        flex: 1,
        margin: 0,
        padding: 0,

    },

    spaceShip: {
        resizeMode: "center"
    },

    botao: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    background:{
        flex:1,
    }
})