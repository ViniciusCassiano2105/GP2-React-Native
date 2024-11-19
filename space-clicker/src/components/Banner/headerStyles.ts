import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1C00E0',
    height: width * 0.2,
    paddingVertical: 5,
    paddingHorizontal: 25,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  leftElement: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    flex: 2,
    alignItems: 'center',
    justifyContent: "center",
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    flexShrink: 1,
  },
  rightElement: {
    flex: 1,
    alignItems: 'flex-end',
  },
});

export default styles;
