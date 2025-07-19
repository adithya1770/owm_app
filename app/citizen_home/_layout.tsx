import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="login" options={{ title: 'Log In', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="log-in-outline"  size={size} color={color}/>) }}/>
        <Tabs.Screen name="index" options={{ title: 'Sign Up (P)', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="call-outline"  size={size} color={color}/>)  }} />
        <Tabs.Screen name="signup" options={{ title: 'Sign Up (E)', headerShown: false, tabBarIcon: ({color, size}) =>  (<Ionicons name="person-add-outline" size={size} color={color}/>) }} />
    </Tabs>
  )
}

export default _layout