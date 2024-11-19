import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  video: {
    ...StyleSheet.absoluteFillObject, 
    zIndex: -1, 
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 100,
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    paddingHorizontal: 20, 
  },
  player: {
    paddingTop:20,
    fontSize: 30,
    color: "#FF0000",
  },
  score: {
    paddingTop:20,
    fontSize: 30,
    color: "#FFFF00",
  },
});
