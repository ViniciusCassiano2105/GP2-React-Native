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
        justifyContent: 'center',
        alignItems: 'center',
    },

    spaceShip: {
        resizeMode: "center"
    },

    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute'
    },

    background: {
        flex: 1,
    },

    botaoStart: {
        backgroundColor: "red",
        height: 180,
        width: 180,
        borderRadius: 90,
        bottom: 100, 
        justifyContent: 'center', 
        alignItems:'center',
    }
})