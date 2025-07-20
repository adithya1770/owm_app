import { Input, InputField } from "@/components/ui/input";
import { Pressable } from "@/components/ui/pressable";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from "expo-router";
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { AuthContext } from '../AuthContext';

const Index = () => {
  const [password, setPassword] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [clicked, setClicked] = React.useState(false);
  const [responseString, setResponseString] = React.useState('');
  const { uid, setUid } = React.useContext(AuthContext);  

  const handleLogin = async () => {
    setClicked(true);
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

      if (data && data.token) {
        await AsyncStorage.setItem('userId', data.token);
        setUid(data.token);
        setResponseString("User logged in successfully");
        router.push('/citizen_home');
      } else {
        setResponseString("Error logging in user");
        throw new Error("User ID not found in response");
      }
    }
      
  return (
    <ScrollView>
      <View className="w-full bg-lime-400" style={{ height: 450 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 90, marginLeft: 44, marginTop: 170 }}>
          Log In
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 52, marginTop: 16 }}>
          only users who have signed up can log in
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 52, marginTop: 2 }}>
            use your email and password to log in
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
        disabled={clicked}
      >
        <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 36, marginTop: 3, color: 'white' }}>
          Log In
        </Text>
      </Pressable>

      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 18, marginLeft: 86, marginTop: 10 }}>
        {responseString}
      </Text>
    </ScrollView>
  );
};

export default Index;
