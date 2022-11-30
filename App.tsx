import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Champions from './screens/Champions';
import Items from './screens/Items';
import SkinsStats from './screens/SkinsStats';
import Achievements from './screens/Achievements';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName='Twitchslayer' screenOptions={{ headerShown: false }}>
        <Tab.Screen name='Items' component={Items} />
        <Tab.Screen name='Champions' component={Champions} options={{tabBarIcon: () => {return(<Image source={require('./assets/champions.jpg')} style={{height: 32, width: 32}} />)}}} />
        <Tab.Screen name='Twitchslayer' component={Home} options={{tabBarIcon: () => {return(<Image source={require('./assets/twitch.png')} style={{height: 32, width: 32}} />)}}} />
        <Tab.Screen name='Skins & Stats' component={SkinsStats} />
        <Tab.Screen name='Achievements' component={Achievements} options={{tabBarIcon: () => {return(<Image source={require('./assets/achievements.png')} style={{height: 32, width: 32}} />)}}} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;