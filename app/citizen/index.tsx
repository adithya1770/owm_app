import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
  return (
    <View>
      <View className="w-full bg-lime-400" style={{height: 450}}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 60, marginLeft: 26, marginTop: 150 }} >
          Update Credentials
        </Text>
      </View>
      <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-24 ml-14"
      
    >
      <InputField placeholder="Email" style={{ fontFamily: 'Satoshi', fontSize: 17 }} />
    </Input>
          <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-6 ml-14"
      
    >
      <InputField placeholder="Password" style={{ fontFamily: 'Satoshi', fontSize: 17 }} />
    </Input>
    <Pressable
      className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-6"
      style={{backgroundColor: 'black'}}
    >
      <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 32, marginTop:3, color: 'white' }}>Sign Up</Text>
    </Pressable>
    </View>
  )
}

export default index