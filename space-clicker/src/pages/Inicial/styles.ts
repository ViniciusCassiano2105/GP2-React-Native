import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inicial: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    titulo:{    

    },
    textTitulo:{
        fontSize: 40,
        fontWeight: '900'
    },

    botoes: {
        gap: 15,
        alignItems: 'center'
    },

    buttonStart: {
        backgroundColor: '#56A2F1',
        height: 40,
        width: 120,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonConfiguracao:{
        backgroundColor: '#13b71f',
        height: 40,
        width: 190,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton:{
        color: "white",
        fontWeight: 'bold',
        fontSize: 19
    }
})