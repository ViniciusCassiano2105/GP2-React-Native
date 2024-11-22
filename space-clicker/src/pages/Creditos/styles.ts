import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "#000",
    zIndex: -2, 
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: -1, 
  },
  starWarsContainer: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 60,
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  creditItem: {
    marginVertical: 10,
    alignItems: "center",
  },
  role: {
    fontSize: 22,
    color: "#FFF",
    textAlign: "center",
  },
  name: {
    fontSize: 20,
    color: "#AAA",
    textAlign: "center",
  },
  finalMessageContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  finalMessage: {
    fontSize: 30,
    color: "#FFD700",
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
  logo: {
    width: 300,
    height: 300,
    marginTop: 20,
    resizeMode: "contain",
  },
  menuButton: {
    backgroundColor: "#FF8C00",
    height: 50,
    width: 150,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 650,
  },
  textButton: {
    color: "white",
    fontWeight: "bold",
    fontSize: 21,
  },
});
