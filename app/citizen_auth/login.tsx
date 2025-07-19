import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import React from 'react';
import { Text, View } from 'react-native';

const Index = () => {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [responseString, setResponseString] = React.useState('');

  const handleLogin = async () => {
    const payload = {
      email,
      password,
    };
      const response = await fetch('https://owm.onrender.com/auth/customer_signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data && data._id) {
        await AsyncStorage.setItem('userId', data._id);
        setResponseString("User logged in successfully");
        router.push('/citizen_home');
      } else {
        setResponseString("Error logging in user");
        throw new Error("User ID not found in response");
      }
    }
      
  return (
    <View>
      <View className="w-full bg-lime-400" style={{ height: 450 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 90, marginLeft: 44, marginTop: 170 }}>
          Log In
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 52, marginTop: 16 }}>
          only users who have signed up can log in
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
        <InputField
          placeholder="Email"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={setEmail}
        />
      </Input>

      <Input
        variant="outline"
        size="lg"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-6 ml-14"
      >
        <InputField
          placeholder="Password"
          type="password"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={setPassword}
        />
      </Input>

      <Pressable
        className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-6"
        style={{ backgroundColor: 'black' }}
        onPress={handleLogin}
      >
        <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 36, marginTop: 3, color: 'white' }}>
          Log In
        </Text>
      </Pressable>

      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 15, marginLeft: 72, marginTop: 2 }}>
        {responseString}
      </Text>
    </View>
  );
};

export default Index;
