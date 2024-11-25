import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
<<<<<<< Updated upstream
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject, 
    zIndex: -2, 
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  spaceShip: {
    resizeMode: "center",
  },
  botao: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    zIndex: 0,
  },
  botaoStart: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  timer:{
    color:"red",
    fontWeight:"bold",
    fontSize:150,
    
  }
});
=======
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
        resizeMode: "contain"
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
        justifyContent: 'center',
        alignItems:'center',
    }
})
>>>>>>> Stashed changes
