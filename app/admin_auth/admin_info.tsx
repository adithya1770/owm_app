import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const AdminInfo = () => {
  const [adminId, setAdminId] = useState('');
  const [userData, setUserData] = useState<object | any>([]);

  const getAdminInfo = async () => {
    if (!adminId.trim()) {
      alert('Please enter a valid Admin ID');
      return;
    }

    try {
      const response = await fetch(`https://owm.onrender.com/admin/user_info`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "auth":adminId.toString() }),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setUserData(data);
      } else {
        console.error('Expected an array but got:', data);
        setUserData([]);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData([]);
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ height: 450 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10, marginTop: 64 }}>
          User {'\n'}Information
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 16 }}>
          View the names and number of users in the system.
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 2 }}>
          Enter your admin ID to see the list.
        </Text>

        <Input
          variant="outline"
          size="lg"
          className="w-80 h-14 bg-white border border-gray-300 rounded-2xl mt-16 ml-4"
        >
          <InputField
            placeholder="Admin ID"
            onChangeText={setAdminId}
            style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          />
        </Input>

        <Pressable onPress={getAdminInfo}>
          <Text
            style={{
              fontFamily: 'Satoshi',
              fontSize: 20,
              marginLeft: 20,
              marginTop: 2,
            }}
            className="h-10 w-32 bg-black rounded-b-3xl text-yellow-400 pl-4 pt-1"
          >
            Get Info
          </Text>
        </Pressable>
      </View>

      {Array.isArray(userData) && userData.length > 0 ? (
        userData.map((item: any, index: number) => (
          <View
            key={index}
            className="bg-white p-4 w-96 rounded-lg shadow-md ml-7 mt-4 mb-4"
          >
            <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16 }}>
              User Information
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 24 }}>
              {item.display_name || 'N/A'}
            </Text>
            <Text
              style={{
                fontFamily: 'Satoshi',
                fontSize: 14,
                marginTop: 4
              }}
            >
              HOUSE ID : {item.house_id || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              PHONE : {item.phone_no || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              EMAIL : {item.email || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              ADDRESS :{item.address || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              BALANCE :{item.balance != null ? item.balance : 'N/A'}/-
            </Text>
          </View>
        ))
      ) : (
        <Text className="ml-6 mt-6 text-gray-600 font-semibold text-base">
          No user data found.
        </Text>
      )}
    </ScrollView>
  );
};

export default AdminInfo;
