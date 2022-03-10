import React, { useState, useEffect } from 'react';
import { Image } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Maps from './screens/Maps';
import Journal from './screens/Journal';
import Photo from './screens/Photo';
import Cameras from './screens/Cameras';
import Files from './screens/Files';

import iconMaps from './assets/navigation_icons/icon_maps.png';
import iconJournal from './assets/navigation_icons/icon_journal.png';
import iconPhoto from './assets/navigation_icons/icon_photo.png';
import iconFiles from './assets/navigation_icons/icon_files.png';

export default function App() {

  const [messages, setMessages] = useState([{ body: "Cet endroit est magnifique, j'en prends plein les yeux !", author: "Vivien Riehl", date: "20/12/2021", time: "18h55", catStep: 1, step: { name: "Cathédrale de Strasbourg", cat: "Monument historique", description: "Le musée Lalique est un musée français situé à Wingen-sur-Moder, en Alsace, et consacré au maître verrier et bijoutier René Lalique et à ses successeurs.La cathédrale Notre-Dame de Strasbourg est une cathédrale gothique située à Strasbourg, dans la circonscription administrative du Bas-Rhin, sur le territoire de la collectivité européenne d’Alsace.", long: 7.751035121539488, lat: 48.581878956275794 } }, { body: "Cet hôtel est très sympathique", author: "Marc Keller", date: "19/12/2021", time: "21h00", catStep: 2, step: { name: "Chez GrandPa", cat: "Chambres d'Hôtes", description: "Cadre charmant", long: 7.730613259942172, lat: 48.56599996601616, day: 3 } }, { body: "La plus belle cathédrale de France !", author: "Philippe Grandpre", date: "20/12/2021", time: "19h00", catStep: 0, step: null }])
  const [startCamera, setStartCamera] = useState(false);
  const [photo, setPhoto] = useState(null)

  return (
    startCamera ? (<Cameras setStartCamera={setStartCamera} setPhoto={setPhoto} />) : (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Atlas') {
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
            },
            tabBarActiveTintColor: '#3498DB',
            tabBarInactiveTintColor: 'black',
            tabBarShowLabel: false
          })}
        >
          <Tab.Screen name="Atlas" children={() => <Maps messages={messages} setMessages={setMessages} setStartCamera={setStartCamera} />} />
          <Tab.Screen name="Journal" children={() => <Journal messages={messages} setMessages={setMessages} />} />
          <Tab.Screen name="Photo" children={() => <Photo setStartCamera={setStartCamera} photo={photo} />} />
          <Tab.Screen name='Documents' children={() => <Files />} />
        </Tab.Navigator>
      </NavigationContainer>)
  );
}