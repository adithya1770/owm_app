import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import React from 'react'
import { ScrollView, Text, View } from 'react-native'

const Index = () => {
  const [token, setToken] = React.useState('')
  const [phone, setPhone] = React.useState('')
  const [responseString, setResponseString] = React.useState('')
  const [clicked, setClicked] = React.useState(false)

  const handleVerify = async () => {
    try {
      setClicked(true)
      const response = await fetch('https://owm.onrender.com/auth/customer_verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone, token }),
      })
      const data = await response.json()
      if (response.ok) {
        setResponseString("User verified successfully")
      } else {
        setResponseString(data?.failed || "Verification failed")
      }
    } catch (error: any) {
      setResponseString("Error verifying user: " + error.message)
    }
  }

  return (
    <ScrollView>
    <View className="w-full bg-lime-400" style={{ height: 170 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 50, marginLeft: 52, marginTop: 35 }}>
            Verification
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 15, marginLeft: 52, marginTop: 2 }}>
            verify your phone number using OTP
        </Text>
    </View>
    <Input className="w-80 h-10 bg-white border border-gray-300 rounded-3xl mt-10 ml-14">
        <InputField
          placeholder="Phone"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={(text) => setPhone(text)}
        />
      </Input>
      <Input className="w-80 h-10 bg-white border border-gray-300 rounded-3xl mt-6 ml-14">
        <InputField
          placeholder="OTP"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={(text) => setToken(text)}
        />
      </Input>

      <Pressable
        className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-6 mb-4"
        style={{ backgroundColor: 'black' }}
        onPress={handleVerify}
        disabled={clicked}
      >
        <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 32, marginTop: 3, color: 'white' }}>
          Verify
        </Text>
      </Pressable>

      {responseString ? (
        <Text
          style={{
            fontFamily: 'SatoshiItalic',
            fontSize: 18,
            marginLeft: 90,
            marginTop: 2,
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
