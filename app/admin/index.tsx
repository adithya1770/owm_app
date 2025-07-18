import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
  const [admin_id, setAdminId] = React.useState('')
  const [admin_name, setAdminName] = React.useState('')
  let responseString = ""

  const payload = {
    "admin_id": admin_id,
    "admin_name": admin_name
  }

  const handleSignup = async () => {
    try {
      const response = await fetch('https://owm.onrender.com/auth/admin_signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      responseString = "Admin Signed up successfully"
      return {"message": "Admin Signed up successfully"}
    } catch (error: string | any) {
      responseString = "Error Signing up"
      return {"message": "Error Signing up", "error": error.message}
    }
  }
  return (
    <View>
      <View className="w-full bg-lime-400" style={{height: 450}}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 30, marginLeft: 26, marginTop: 170 }} >
          Sign Up - Admin Portal
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 26, marginTop: 16 }}>
          Sign up to manage your admin account
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
      <InputField placeholder="Admin Id" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setAdminId(admin_id)}/>
    </Input>
          <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-6 ml-14"
      
    >
      <InputField placeholder="Admin Name" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setAdminName(admin_name)}/>
    </Input>
    <Pressable
      className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-6"
      style={{backgroundColor: 'black'}}
      onPress={handleSignup}
    >
      <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 32, marginTop:3, color: 'white' }}>Sign Up</Text>
    </Pressable>
    <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 15, marginLeft: 72, marginTop: 2}}>
      {responseString}
    </Text>
    </View>
  )
}

export default index