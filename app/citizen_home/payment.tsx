import { Input, InputField } from '@/components/ui/input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const Payment = () => {
  const [bill_id, setBillId] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [clicked, setClicked] = React.useState(false);
  const [responseString, setResponseString] = React.useState('');

  const completePayment = async () => {
    try {
      setClicked(true);
      setResponseString('');

      const house_id = await AsyncStorage.getItem('house_id');
      if (!house_id) {
        console.warn('No house_id found in AsyncStorage');
        setClicked(false);
        return;
      }

      const response = await fetch('https://owm.onrender.com/user/billing_info/complete_payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ house_id, bill_id, phone }),
      });

      const result = await response.json();

      if (result?.success) {
        setResponseString('Payment completed successfully');
      } else {
        setResponseString(`Payment failed: ${result?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error completing payment:', error);
      setResponseString(' Error completing payment');
    } finally {
      setClicked(false);
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-lime-400" style={{ height: 450 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 90, marginLeft: 44, marginTop: 170 }}>
          Payment Gateway
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 52, marginTop: 16 }}>
          Pay your existing bills here
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 52 }}>
          Use your OWM Wallet to complete the payment
        </Text>
      </View>

      <Input
        variant="outline"
        size="lg"
        className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-24 ml-14"
      >
        <InputField
          placeholder="Bill ID"
          onChangeText={setBillId}
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
        />
      </Input>

      <Input
        variant="outline"
        size="lg"
        className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-6 ml-14"
      >
        <InputField
          placeholder="Phone Number"
          secureTextEntry={true}
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={setPhone}
        />
      </Input>

      <Pressable
        className="ml-36 h-10 w-36 rounded-full mt-6"
        style={{ backgroundColor: clicked ? 'gray' : 'black', opacity: clicked ? 0.6 : 1 }}
        onPress={completePayment}
        disabled={clicked}
      >
        <Text style={{ fontFamily: 'Satoshi', fontSize: 17, color: 'white', textAlign: 'center', marginTop: 6 }}>
          Pay Now
        </Text>
      </Pressable>

      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 18, textAlign: 'center', marginTop: 20 }}>
        {responseString}
      </Text>
    </ScrollView>
  );
};

export default Payment;
