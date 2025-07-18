import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import AsyncStorage from '@react-native-async-storage/async-storage'
import React from 'react'
import { Text, View } from 'react-native'

const index = () => {
  const [user_id, setUserId] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [email, setEmail] = React.useState('')
  let responseString = "";

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
      responseString = "User logged in successfully";
      const userId = await response.json();
      console.log(userId);
      if (userId && userId._id) {
        await AsyncStorage.setItem('userId', userId._id);
      } else {
        throw new Error("User ID not found in response");
      }
      return {"message": "User logged in successfully"}
    } catch (error: string | any) {
      responseString = "Error logging in user";
      return {"message": "Error logging in", "error": error.message}
    }
  }
  return (
    <View>
      <View className="w-full bg-lime-400" style={{height: 450}}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 90, marginLeft: 44, marginTop: 170 }} >
          Log In
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 52, marginTop: 16 }}>
          only user's who have signed up can log in
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
      <InputField placeholder="User Id" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setUserId(user_id)}/>
    </Input>
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
      <InputField placeholder="Password" type="password" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setPassword(password)}/>
    </Input>
    <Pressable
      className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-6"
      style={{backgroundColor: 'black'}}
      onPress={handleLogin}
    >
      <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 36, marginTop:3, color: 'white' }}>Log In</Text>
    </Pressable>
    <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 15, marginLeft: 72, marginTop: 2}}>
      {responseString ? responseString : ""}
    </Text>
    </View>
  )
}

export default index