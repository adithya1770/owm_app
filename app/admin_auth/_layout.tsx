import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="log-in-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="admin_info" options={{ title: 'Admin', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="shield-checkmark-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="house_info" options={{ title: 'Admin', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="home-outline"  size={size} color={color}/>) }} />
    </Tabs>
  )
}

export default _layout