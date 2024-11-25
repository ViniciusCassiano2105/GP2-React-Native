import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    height: 110,
    paddingVertical: 5,
    paddingHorizontal: 25,
    

  },
  leftElement: {
    flex: 1,
    alignItems: 'flex-start',
    top:20
  },
  title: {
    flex: 1,
    alignItems: 'center',
    justifyContent: "center",
    top:20

  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    flexShrink: 1,
    top:10


  },
  rightElement: {
    flex: 1,
    alignItems: 'flex-end',
    top:20

  },
});

export default styles;
