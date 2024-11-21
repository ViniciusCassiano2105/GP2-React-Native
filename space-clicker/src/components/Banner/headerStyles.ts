import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    height: 90,
    paddingVertical: 5,
    paddingHorizontal: 25,

  },
  leftElement: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    flex: 1,
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
