import { MyProvider } from './src/context/General/MyContext';
import { NavigationContainer } from '@react-navigation/native';
import { Inicial } from './src/pages/Inicial';
import Configuracoes from './src/pages/Configuracoes';


export default function App() {
  return (
    <NavigationContainer>
      <MyProvider>
        
        <Configuracoes/>
        
      </MyProvider>
    </NavigationContainer>
  );
}
