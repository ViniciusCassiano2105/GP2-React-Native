import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    inicial: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30
    },
    titulo:{    

    },
    textTitulo:{
        fontSize: 40,
        fontWeight: '900',
    },

    imagem:{
        height: 330,
        width: 330,
        borderRadius: 200
    },

    botoes: {
        gap: 15,
        alignItems: 'center'
    },

    buttonStart: {
        backgroundColor: '#56A2F1',
        height: 50,
        width: 180,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonConfiguracao:{
        backgroundColor: '#13b71f',
        height: 50,
        width: 260,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton:{
        color: "white",
        fontWeight: 'bold',
        fontSize: 24
    }
})