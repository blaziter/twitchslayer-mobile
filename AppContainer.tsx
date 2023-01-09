import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home';
import Champions from './screens/Champions';
import Items from './screens/Items';
import SkinsStats from './screens/SkinsStats';
import Achievements from './screens/Achievements';
//@ts-ignore
import * as skins from './assets/skins/';
import { useAppSelector } from './redux/hooks';

const Tab = createBottomTabNavigator();

const AppContainer = () => {
    const skin = useAppSelector(state => state.golds.skin);
    return (
        <>
            <NavigationContainer>
                <Tab.Navigator initialRouteName='Twitchslayer' screenOptions={{ headerShown: false }}>
                    <Tab.Screen name='Items' component={Items} />
                    <Tab.Screen name='Champions' component={Champions} options={{ tabBarIcon: () => { return (<Image source={require('./assets/champions-light.png')} style={{ height: 32, width: 32 }} />) } }} />
                    <Tab.Screen name='Twitchslayer' component={Home} options={{ tabBarIcon: () => { return (<Image source={skins[skin]} style={{ height: 32, width: 32 }} />) } }} />
                    <Tab.Screen name='Skins & Stats' component={SkinsStats} />
                    <Tab.Screen name='Achievements' component={Achievements} options={{ tabBarIcon: () => { return (<Image source={require('./assets/achievements-light.png')} style={{ height: 32, width: 32 }} />) } }} />
                </Tab.Navigator>
            </NavigationContainer>
        </>
    );
}

export default AppContainer;