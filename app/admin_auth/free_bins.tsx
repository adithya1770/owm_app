import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const FreeBins = () => {
  const [adminId, setAdminId] = useState('');
  const [freeBins, setFreeBins] = useState<any[]>([]);
  const [responseMessage, setResponseMessage] = useState('');

  const fetchFreeBins = async () => {
    if (!adminId.trim()) {
      alert('Please enter your Admin ID');
      return;
    }

    try {
      const response = await fetch('https://owm.onrender.com/admin/free_bins', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth: adminId }),
      });

      const data = await response.json();

      if (Array.isArray(data.message)) {
        setFreeBins(data.message);
        setResponseMessage('');
      } else {
        setFreeBins([]);
        setResponseMessage(data.message || 'Something went wrong');
      }
    } catch (error) {
      console.error('Error fetching free bins:', error);
      setResponseMessage('An error occurred while fetching data');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 48, marginLeft: 10 }}>
          Free Bins
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 10 }}>
          Enter your Admin ID to view bins that are not filled.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-4 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Your Admin ID"
              onChangeText={setAdminId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Pressable onPress={fetchFreeBins}>
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
              Get Bins
            </Text>
          </Pressable>

          {responseMessage ? (
            <Text style={{ fontFamily: 'Satoshi', fontSize: 16, marginTop: 12, color: 'black' }}>
              {responseMessage}
            </Text>
          ) : null}
        </View>
      </View>

      {freeBins.map((bin, index) => (
        <View
          key={index}
          className="bg-white p-4 w-96 rounded-lg shadow-md ml-6 mt-4 mb-4"
        >
          <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16 }}>
            Free Bin
          </Text>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 22 }}>
            Bin ID: {bin.bin_id || 'N/A'}
          </Text>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
            Zone: {bin.zone || 'N/A'}
          </Text>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 2 }}>
            Status: {bin.status || 'N/A'}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default FreeBins;
