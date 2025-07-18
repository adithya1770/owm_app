import { Input, InputField } from "@/components/ui/input"
import { Pressable } from "@/components/ui/pressable"
import React from 'react'
import { ScrollView, Text, View } from 'react-native'


const index = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [phoneNumber, setPhoneNumber] = React.useState('')  
  const [displayName, setDisplayName] = React.useState('')
  const [houseId, setHouseId] = React.useState('')
  const [address, setAddress] = React.useState('')
  const [otp, setOtp] = React.useState('')
  let responseString = "";

  const payload = {
    "email": email,
    "password": password, 
    "phoneNumber": phoneNumber,
    "displayName": displayName,
    "houseId": houseId,
    "address": address
  }

  const handleSignUp = async () => {
    try{
          const response = await fetch('https://owm.onrender.com/auth/customer_signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      );
      responseString="User signed up successfully";
    }
    catch (error: string | any) {
      responseString="Error signing up user";
      return {"message": "Error creating user", "error": error.message}
    }
  }

    const handleVerify = async () => {
    try{
          const response = await fetch('https://owm.onrender.com/auth/customer_verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(otp),
        }
      );
      return {"message": "User verified successfully"}
    }
    catch (error: string | any) {
      return {"message": "Error verifying user", "error": error.message}
    }
  }
  return (
    <ScrollView>
      <View className="w-full bg-lime-400" style={{height: 170}}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 60, marginLeft: 72, marginTop: 35}} >
          Sign Up
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 15, marginLeft: 72, marginTop: 2}}>
          using your phone number
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
      className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14"
      
    >
      <InputField placeholder="Password" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setPassword(password)}/>
    </Input>
    <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14"
      
    >
      <InputField placeholder="Phone Number" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setPhoneNumber(phoneNumber)}/>
    </Input>
    <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14"
      
    >
      <InputField placeholder="Display Name" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setDisplayName(displayName)}/>
    </Input>
    <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-4 ml-14"
      
    >
      <InputField placeholder="House ID" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setHouseId(houseId)}/>
    </Input>
    <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-24 bg-white border border-gray-300 rounded-3xl mt-4 ml-14"
      
    >
      <InputField placeholder="Address" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setAddress(address)}/>
    </Input>
    <Pressable
      className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-10"
      style={{backgroundColor: 'black'}}
      onPress={handleSignUp}
    >
      <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 32, marginTop:3, color: 'white' }}>Sign Up</Text>
    </Pressable>
      <Input
      variant="outline"
      size="lg"
      isDisabled={false}
      isInvalid={false}
      isReadOnly={false}
      className="w-80 h-10 bg-white border border-gray-300 rounded-3xl mt-4 ml-14"
      
    >
      <InputField placeholder="OTP" style={{ fontFamily: 'Satoshi', fontSize: 17 }} onChangeText={() => setOtp(otp)}/>
    </Input>
    <Pressable
      className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-6 mb-4"
      style={{backgroundColor: 'black'}}
      onPress={handleVerify}
    >
      <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 32, marginTop:3, color: 'white' }}>Verify</Text>
    </Pressable>
    <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 15, marginLeft: 72, marginTop: 2, marginBottom:6}}>
      {responseString ? responseString : ""}
    </Text>
    </ScrollView>
  )
}

export default index