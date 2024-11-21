import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '', 
    height: width * 0.2, 
    paddingVertical: 5, 
    paddingHorizontal: 25,
    
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
