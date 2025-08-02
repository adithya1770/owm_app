import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs>
         <Tabs.Screen name="view_admin" options={{ title: 'Admin Info', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="shield-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="home-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="add_bin" options={{ title: 'Bin', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="trash-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="add_worker" options={{ title: 'Workers', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="people-circle-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="add_truck" options={{ title: 'Truck', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="bus-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="add_bill" options={{ title: 'Manual Billing', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="card-outline"  size={size} color={color}/>) }} />
    </Tabs>
  )
}

export default _layout