import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{ title: 'Analytics', headerShown: false, tabBarStyle: {display: 'none'}, tabBarIcon: ({color, size}) => (<Ionicons name="analytics-outline"  size={size} color={color}/>) }} />
    </Tabs>
  )
}

export default _layout