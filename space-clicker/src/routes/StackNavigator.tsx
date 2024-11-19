
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './BottomTab';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
    return (
        <Stack.Navigator
        screenOptions={{headerShown: false}}>
            {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
            <Stack.Screen name="HomeTabs" component={BottomTabs} />
        </Stack.Navigator>
    );
}