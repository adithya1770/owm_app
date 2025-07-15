import { Tabs } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
    <Tabs>
        <Tabs.Screen name="signup" options={{ title: 'Sign Up' }} />
        <Tabs.Screen name="login" options={{ title: 'Log In' }} />
        <Tabs.Screen name="index" options={{ title: 'Update' }} />
    </Tabs>
  )
}

export default _layout