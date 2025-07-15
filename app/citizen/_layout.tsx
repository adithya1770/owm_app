import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="signup" options={{ title: 'Sign Up', headerShown: false }} />
        <Tabs.Screen name="login" options={{ title: 'Log In', headerShown: false }} />
        <Tabs.Screen name="index" options={{ title: 'Update', headerShown: false }} />
    </Tabs>
  )
}

export default _layout