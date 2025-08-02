import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const AdminList = () => {
  const [adminId, setAdminId] = useState('');
  const [adminData, setAdminData] = useState<any[]>([]);
  const [responseMessage, setResponseMessage] = useState('');

  const fetchAdminList = async () => {
    if (!adminId.trim()) {
      alert('Please enter your Admin ID');
      return;
    }

    try {
      const response = await fetch('https://owm.onrender.com/admin/admin_get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth: adminId }),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setAdminData(data);
        setResponseMessage('');
      } else {
        setAdminData([]);
        setResponseMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching admin list:', error);
      setResponseMessage('Failed to fetch admin information');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 48, marginLeft: 10 }}>
          Admin List
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 10 }}>
          Enter your Admin ID to view the admin list.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-4 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Your Admin ID"
              onChangeText={setAdminId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Pressable onPress={fetchAdminList}>
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
              Get Admins
            </Text>
          </Pressable>

          {responseMessage ? (
            <Text style={{ fontFamily: 'Satoshi', fontSize: 16, marginTop: 12, color: 'black' }}>
              {responseMessage}
            </Text>
          ) : null}
        </View>
      </View>

      {adminData.map((admin, index) => (
        <View
          key={index}
          className="bg-white p-4 w-96 rounded-lg shadow-md ml-6 mt-4 mb-4"
        >
          <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16 }}>
            Admin Info
          </Text>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 22 }}>
            {admin.admin_name || 'N/A'}
          </Text>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
            ID: {admin.admin_id || 'N/A'}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default AdminList;
