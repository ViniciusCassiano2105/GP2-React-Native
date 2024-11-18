import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Placar } from '../pages/Placar';
import { Home } from '../pages/Home';
import { Configuracoes } from '../pages/Configuracoes';

const Tab = createBottomTabNavigator();

export function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen options={{headerShown: false}} name="Placar" component={Placar} />
      <Tab.Screen options={{headerShown: false}} name="HomeGame" component={Home} />
      <Tab.Screen options={{headerShown: false}} name="Configs" component={Configuracoes} />
    </Tab.Navigator>
  );
}

