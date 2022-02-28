import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Maps from './screens/Maps';

import iconMaps from './assets/navigation_icons/icon_maps.png'

export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            if (route.name === 'Maps') {
              return <Image source={iconMaps} style={{ width: 30, height: 30, tintColor: color }} />;
            }
          },
          tabBarActiveTintColor: '#3498DB',
          tabBarInactiveTintColor: 'black',
          tabBarShowLabel: false
        })}
      >
        <Tab.Screen name="Maps" component={Maps} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}