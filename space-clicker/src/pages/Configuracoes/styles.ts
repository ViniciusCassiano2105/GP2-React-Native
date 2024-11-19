import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  header: {
    marginTop: 250,
    alignItems: "center",
  },
  title: {
    color: "aqua",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  subTitle: {
    color: "aqua",
    fontSize: 16,
    marginTop: 5,
    textAlign: "center",
  },
  shipButton: {
    marginTop: 20,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  shipImage: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  settings: {
    width: "80%",
    position: "absolute",
    bottom: 50,
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  settingsTitle: {
    color: "aqua",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  settingsButton: {
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: "90%",
    alignItems: "center",
  },
  settingText: {
    color: "aqua",
    fontSize: 16,
  },
  volumeControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    width: "50%",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: "30%",
    fontSize: 16,
  },
});
