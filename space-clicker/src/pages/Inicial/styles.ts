import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    video: {
        ...StyleSheet.absoluteFillObject,
        zIndex: -1,
    },
    container: {
        flex: 1,
    },

    inicial: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
    botoes: {
        gap: 20,
        alignItems: 'center',
        marginVertical: 650
    },

    buttonStart: {
        backgroundColor: '#56A2F1',
        height: 50,
        width: 200,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonConfiguracao: {
        backgroundColor: '#13b71f',
        height: 50,
        width: 200,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: "white",
        fontWeight: 'bold',
        fontSize: 21
    }
})