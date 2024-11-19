import { MyProvider } from './src/context/General/MyContext';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/routes/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <MyProvider>
        <StackNavigator />
      </MyProvider>
    </NavigationContainer>
  );
}
