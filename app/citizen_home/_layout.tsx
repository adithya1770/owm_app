import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="index" options={{ title: 'Profile', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="person-outline"  size={size} color={color}/>)  }} />
        <Tabs.Screen name="houseinfo" options={{ title: 'House', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="home-outline"  size={size} color={color}/>)  }} />
        <Tabs.Screen name="pickup" options={{ title: 'Pickup', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="trash-outline"  size={size} color={color}/>)  }} />
        <Tabs.Screen name="billing" options={{ title: 'Billing Status', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="cash-outline"  size={size} color={color}/>)  }} />
        <Tabs.Screen name="payment" options={{ title: 'Payment', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="card-outline"  size={size} color={color}/>)  }} />
        <Tabs.Screen name="complaint" options={{ title: 'Complaint', headerShown: false, tabBarIcon: ({color, size}) => (<Ionicons name="alert-outline"  size={size} color={color}/>)  }} />
    </Tabs>
  )
}

export default _layout