import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#12100055'
    },
	modalContainer: {
        backgroundColor: '#121000',
        borderRadius: 20,
        padding: "5%",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: "80%",
        maxHeight: "80%",
    },
	titleContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
	title: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },

    score:{
        color: '#02f702',
        fontSize: 60,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },

    button: {
        width: '95%',
        backgroundColor: 'blue',
        height: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonText: {
        fontSize: 16,
        color: "#fff",
        textAlign: 'center'
    },

	closeIcon: {
        tintColor: '#fff',
        height: 25,
        width: 25
    },

    input: {
        height: 40,
        width: '50%',
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 3,
        fontSize: 16,
        backgroundColor: '#fff',
        textAlign: 'center',
    },
})