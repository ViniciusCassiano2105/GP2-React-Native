
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './BottomTab';
import { Inicial } from '../pages/Inicial';
import { Creditos } from "../pages/Creditos"; 

type RootStackParamList = {
    StartScreen: undefined;
    HomeTabs: undefined;
    Creditos: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function StackNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}>
            <Stack.Screen name="StartScreen" component={Inicial} />
            <Stack.Screen name="HomeTabs" component={BottomTabs} />
            <Stack.Screen name="Creditos" component={Creditos} />
        </Stack.Navigator>
    );
}