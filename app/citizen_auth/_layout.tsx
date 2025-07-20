import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="signup" options={{ title: 'Sign Up(E)', headerShown: false, tabBarIcon: ({color, size}) =>  (<Ionicons name="mail-outline" size={size} color={color}/>) }} />
        <Tabs.Screen name="login" options={{ title: 'Log In(E)', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="mail-outline"  size={size} color={color}/>) }}/>
        <Tabs.Screen name="index" options={{ title: 'Sign Up(P)', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="call-outline"  size={size} color={color}/>)  }} />
        <Tabs.Screen name="login_phone" options={{ title: 'Log In(P)', headerShown: false, tabBarIcon: ({color, size}) =>  (<Ionicons name="call-outline" size={size} color={color}/>) }} />
        <Tabs.Screen name="verify" options={{ title: 'Verification', headerShown: false, tabBarIcon: ({color, size}) =>  (<Ionicons name="shield-checkmark-outline" size={size} color={color}/>) }} />
    </Tabs>
  )
}

export default _layout