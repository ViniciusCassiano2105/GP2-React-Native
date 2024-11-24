import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -2, 
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  botoes: {
    gap: 20,
    alignItems: "center",
    marginVertical: 575,
    zIndex: 0,
  },
  buttonStart: {
    backgroundColor: "#56A2F1",
    height: 50,
    width: 200,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonConfiguracao: {
    backgroundColor: "#13b71f",
    height: 50,
    width: 200,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 21,
  },
});
