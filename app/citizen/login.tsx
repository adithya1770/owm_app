import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  const payload = {
    "email": email,
    "password": password
  }

  const handleLogin = async () => {
    try {
      const response = await fetch('https://owm.onrender.com/auth/customer_signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      return {"message": "User logged in successfully"}
    } catch (error: string | any) {
      return {"message": "Error logging in", "error": error.message}
    }
  }
  return (
    <View>
      <View className="w-full bg-lime-400" style={{height: 450}}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 60, marginLeft: 44, marginTop: 170 }} >
          Log In
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
      <InputField placeholder="Email" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setEmail(email)}/>
    </Input>
          <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-6 ml-14"
      
    >
      <InputField placeholder="Password" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setPassword(password)}/>
    </Input>
    <Pressable
      className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-6"
      style={{backgroundColor: 'black'}}
      onPress={handleLogin}
    >
      <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 36, marginTop:3, color: 'white' }}>Log In</Text>
    </Pressable>
    </View>
  )
}

export default index