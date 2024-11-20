import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 190,
    right: 5,
    width: 50,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  slider: {
    width: 150,
    height: 150,
    transform: [{ rotate: "-90deg" }], 
  },
  volumePercentage: {
    fontSize: 14,
    color: "#fff",
    textAlign: "center", 
  },
});
