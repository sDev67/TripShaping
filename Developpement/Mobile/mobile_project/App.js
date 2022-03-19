import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();

import Maps from './screens/Maps';
import Journal from './screens/Journal';
import Photo from './screens/Photo';
import Cameras from './screens/Cameras';
import Files from './screens/Files';
import StepsList from './screens/StepsList';

import ItinaryDetails from './screens/ItinaryDetails';
import StepDetails from './screens/StepDetails';
import PointDetails from './screens/PointDetails';

import iconMaps from './assets/navigation_icons/icon_maps.png';
import iconJournal from './assets/navigation_icons/icon_journal.png';
import iconPhoto from './assets/navigation_icons/icon_photo.png';
import iconFiles from './assets/navigation_icons/icon_files.png';
import iconStepsList from './assets/navigation_icons/icon_stepsList.png';

import TravelRequests from "./requests/TravelRequests";

import { useQuery, useQueryClient } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';


const queryClient = new QueryClient();

const TabScreen = () => {

  const idTravel = 1;

  const [messages, setMessages] = useState([{ body: "Cet endroit est magnifique, j'en prends plein les yeux !", author: "Vivien Riehl", date: "20/12/2021", time: "18h55", catStep: 1, step: { name: "Cathédrale de Strasbourg", cat: "Monument historique", description: "Le musée Lalique est un musée français situé à Wingen-sur-Moder, en Alsace, et consacré au maître verrier et bijoutier René Lalique et à ses successeurs.La cathédrale Notre-Dame de Strasbourg est une cathédrale gothique située à Strasbourg, dans la circonscription administrative du Bas-Rhin, sur le territoire de la collectivité européenne d’Alsace.", long: 7.751035121539488, lat: 48.581878956275794 } }, { body: "Cet hôtel est très sympathique", author: "Marc Keller", date: "19/12/2021", time: "21h00", catStep: 2, step: { name: "Chez GrandPa", cat: "Chambres d'Hôtes", description: "Cadre charmant", long: 7.730613259942172, lat: 48.56599996601616, day: 3 } }, { body: "La plus belle cathédrale de France !", author: "Philippe Grandpre", date: "20/12/2021", time: "19h00", catStep: 0, step: null }])

  const { isLoading: isLoadingS, isError: isErrorS, error: errorS, data: steps } = useQuery(
    ['getSteps', idTravel], () => TravelRequests.getStepsOfTravel(idTravel)
  );

  return (

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Altas') {
            return <Image source={iconMaps} style={{ width: 30, height: 30, tintColor: color }} />;
          }
          else if (route.name === "Journal") {
            return <Image source={iconJournal} style={{ width: 30, height: 30, tintColor: color }} />;
          }
          else if (route.name === "Photo") {
            return <Image source={iconPhoto} style={{ width: 30, height: 30, tintColor: color }} />;
          }
          else if (route.name === "Documents") {
            return <Image source={iconFiles} style={{ width: 30, height: 30, tintColor: color }} />
          }
          else if (route.name === "Etapes") {
            return <Image source={iconStepsList} style={{ width: 30, height: 30, tintColor: color }} />
          }
        },
        tabBarActiveTintColor: '#3498DB',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Altas" component={Maps} />
      <Tab.Screen name="Etapes" children={() => <StepsList steps={steps} />} />
      <Tab.Screen name="Journal" children={() => <Journal messages={messages} setMessages={setMessages} />} />
      <Tab.Screen name="Photo" component={Photo} />
      <Tab.Screen name='Documents' children={() => <Files />} />
    </Tab.Navigator>

  );
}

const Stack = createNativeStackNavigator();

function MapStackScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={TabScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Itinéraire" component={ItinaryDetails} />
        <Stack.Screen name="StepDetails" component={StepDetails} />
        <Stack.Screen name="PointDetails" component={PointDetails} />
        <Stack.Screen name="Cameras" component={Cameras} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MapStackScreen />
    </QueryClientProvider>
  );
}
