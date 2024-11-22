import { MyProvider } from './src/context/General/MyContext';
import { NavigationContainer } from '@react-navigation/native';
import { Creditos } from './src/pages/Creditos';


export default function App() {
  return (
    <NavigationContainer>
      <MyProvider>
        <Creditos />
      </MyProvider>
    </NavigationContainer>
  );
}
