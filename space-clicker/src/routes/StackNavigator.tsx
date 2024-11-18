
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomTabs } from './BottomTab';

const Stack = createNativeStackNavigator();

export function StackNavigator() {
    return (
        <Stack.Navigator>
            {/* <Stack.Screen name="StartScreen" component={StartScreen} /> */}
            <Stack.Screen options={{headerShown: false}} name="HomeTabs" component={BottomTabs} />
        </Stack.Navigator>
    );
}