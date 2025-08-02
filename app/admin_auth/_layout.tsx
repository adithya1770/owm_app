import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{ title: 'Home', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="log-in-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="admin_info" options={{ title: 'Admin', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="shield-checkmark-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="house_info" options={{ title: 'House', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="home-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="free_bins" options={{ title: 'Free Bins', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="trash-bin-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="truck_info" options={{ title: 'Truck', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="bus-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="wallet_info" options={{ title: 'Wallet Topup', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="wallet-outline"  size={size} color={color}/>) }} />
        <Tabs.Screen name="total_info" options={{ title: 'Public', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="pie-chart-outline"  size={size} color={color}/>) }} />
    </Tabs>
  )
}

export default _layout