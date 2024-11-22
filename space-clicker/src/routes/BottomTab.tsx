import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Placar } from '../pages/Placar';
import { Home } from '../pages/Home';
import { Configuracoes } from '../pages/Configuracoes';
import { styles } from './styles';
import { Image, View } from 'react-native';
import logo from './../assets/logo.png'
import config from './../assets/settings.png'
import rank from './../assets/ranking.png'
import { useMyContext } from '../context/General/MyContext';

type BottomTabsParamList = {
  Ranking: undefined;
  Jogar: undefined;
  Configurações: undefined;
};

const Tab = createBottomTabNavigator<BottomTabsParamList>();


export function BottomTabs() {
  const {isPlaying} = useMyContext();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: [styles.tabBar, isPlaying ? {display: 'none'} : {display: 'flex'}],
        tabBarActiveBackgroundColor: "#32173e",
        tabBarActiveTintColor: 'white'

      }}>
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style={styles.tabLink}>
              <Image
                resizeMode='contain'
                source={rank}
                style={{ height: 35, marginBottom: 5, tintColor: "#fff" }}
              />
            </View>)
        }}
        name="Ranking"
        component={Placar} />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style= {styles.tabLink}>
              <Image
                resizeMode='contain'
                source={logo}
                style={{ width: 80, marginBottom: 40}}
              />
            </View>)
        }}
        name="Jogar"
        component={Home} />
      <Tab.Screen
        options={{
          tabBarIcon: () => (
            <View style= {styles.tabLink}>
              <Image
                resizeMode='contain'
                source={config}
                style={{ height: 30, marginBottom: 5, tintColor: "#fff" }}
              />
            </View>)
        }}
        name="Configurações"
        component={Configuracoes} />
    </Tab.Navigator>
  );
}

