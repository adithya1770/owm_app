import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
  return (
    <View className='w-full bg-yellow-400' style={{height: 630}}>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 120, marginLeft: 12, marginTop: 44 }}>hello there!</Text>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 52, marginLeft: 12, marginTop: 44 }}>NEED TO CHANGE {'\n'}SOMETHING?</Text>
      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 20, marginLeft: 12, marginTop: 52 }}>use the admins portal to edit or add your details and commit to living sustainably!</Text>
    </View>
  )
}

export default index