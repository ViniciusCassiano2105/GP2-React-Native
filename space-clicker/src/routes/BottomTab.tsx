import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Placar } from '../pages/Placar';
import { Home } from '../pages/Home';
import { Configuracoes } from '../pages/Configuracoes';
import { styles } from './styles';
import { Image } from 'react-native';
import logo from './../assets/logo.png'
import config from './../assets/settings.png'
import rank from './../assets/ranking.png'

type BottomTabsParamList = {
  Ranking: undefined;
  Jogar: undefined;
  Configurações: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();


export function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveBackgroundColor: "#32173e",
        tabBarActiveTintColor: 'white'
      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              resizeMode='contain'
              source={rank}
              style={{ height: 35, marginBottom: 5, tintColor: "#fff" }}
            />)
        }}
        name="Ranking"
        component={Placar} />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              resizeMode='contain'
              source={logo}
              style={{ width: 80, marginBottom: 40 }}
            />)
        }}
        name="Jogar"
        component={Home} />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <Image
              resizeMode='contain'
              source={config}
              style={{ height: 30, marginBottom: 5, tintColor: "#fff" }}
            />)
        }}
        name="Configurações"
        component={Configuracoes} />
    </Tab.Navigator>
  );
}

