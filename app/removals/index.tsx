import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const RemoveAdminInfo = () => {
  const [adminNo, setAdminNo] = useState('');
  const [adminId, setAdminId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleRemoveAdmin = async () => {
    if (!adminNo.trim() || !adminId.trim()) {
      alert('Please fill in both Admin No and Admin ID');
      return;
    }

    const payload = {
      admin_no: parseInt(adminNo),
      data: { auth: adminId }
    };

    try {
      const response = await fetch('https://owm.onrender.com/admin/remove_admin', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResponseMessage(data.message || 'Unknown response');
    } catch (error) {
      console.error('Error removing admin:', error);
      setResponseMessage('An error occurred while removing');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40, height: 800 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10, marginTop: 8 }}>
          Remove Admin
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 10 }}>
          Enter the admin number and your admin ID to remove an admin from the system.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Admin No"
              keyboardType="numeric"
              onChangeText={setAdminNo}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Input variant="outline" className="mb-6 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Your Admin ID"
              onChangeText={setAdminId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Pressable onPress={handleRemoveAdmin}>
            <Text
              style={{
                fontFamily: 'Satoshi',
                fontSize: 20,
                marginLeft: 4,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: 'black',
                color: 'yellow',
                borderRadius: 18,
                textAlign: 'center',
              }}
              className="w-48"
            >
              Remove
            </Text>
          </Pressable>

          {responseMessage ? (
            <Text style={{ fontFamily: 'Satoshi', fontSize: 20, marginTop: 12, marginLeft: 6, color: 'black' }}>
              {responseMessage}
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default RemoveAdminInfo;
