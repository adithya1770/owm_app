import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const Index = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [displayName, setDisplayName] = React.useState('')
  const [houseId, setHouseId] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [responseString, setResponseString] = React.useState('')
  const [clicked, setClicked] = React.useState(false)

  const handleSignUp = async () => {
      const payload = {
      "email": email,
      "password": password,
      "phone": phoneNumber,
      "display_name": displayName,
      "house_id": houseId,
      "address": address,
      };
      setClicked(true)
      const response = await fetch('https://owm.onrender.com/auth/customer_signup_phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      if (response.ok) {
        setResponseString("User signed up successfully")
        setClicked(false)
      } else {
        setResponseString(data?.failed || "Sign up failed")
        setClicked(false)
      }
      setClicked(false);
  }

  return (
    <ScrollView>
      <View className="w-full bg-lime-400" style={{ height: 170 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 60, marginLeft: 72, marginTop: 35 }}>
          Sign Up
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 15, marginLeft: 72, marginTop: 2 }}>
          using your phone number
        </Text>
      </View>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-24 ml-14">
        <InputField
          placeholder="Email"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={(text) => setEmail(text)}
        />
      </Input>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14">
        <InputField
          placeholder="Password"
          type="password"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={(text) => setPassword(text)}
        />
      </Input>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14">
        <InputField
          placeholder="Phone Number"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </Input>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14">
        <InputField
          placeholder="Display Name"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={(text) => setDisplayName(text)}
        />
      </Input>

      <Input className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14">
        <InputField
          placeholder="House ID"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={(text) => setHouseId(text)}
        />
      </Input>

      <Input className="w-80 h-24 bg-white border border-gray-300 rounded-3xl mt-4 ml-14">
        <InputField
          placeholder="Address"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={(text) => setAddress(text)}
        />
      </Input>

      <Pressable
        className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-10"
        style={{ backgroundColor: 'black' }}
        onPress={handleSignUp}
        disabled={clicked}
      >
        <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 32, marginTop: 3, color: 'white' }}>
          Sign Up
        </Text>
      </Pressable>

      {responseString ? (
        <Text
          style={{
            fontFamily: 'SatoshiItalic',
            fontSize: 18,
            marginLeft: 120,
            marginTop: 10,
            marginBottom: 6,
            color: (responseString.includes('Error') || responseString.includes('failed')) ? 'red' : 'green'
          }}
        >
          {responseString}
        </Text>
      ) : null}
    </ScrollView>
  )
}

export default Index
