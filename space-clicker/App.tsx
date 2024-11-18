import { MyProvider } from './src/context/General/MyContext';
import { Home } from './src/pages/Home';
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
