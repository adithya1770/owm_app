import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';


const _layout = () => {
  return (
    <Tabs>
      
        <Tabs.Screen name="index" options={{ title: 'Admin', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="people-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="remove_house" options={{ title: 'House', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="home-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="remove_bin" options={{ title: 'Bin', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="trash-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="remove_worker" options={{ title: 'Workers', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="people-circle-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="remove_truck" options={{ title: 'Truck', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="bus-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="remove_bill" options={{ title: 'Billing', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="card-outline"  size={size} color={color}/>) }} />
    </Tabs>
  )
}

export default _layout