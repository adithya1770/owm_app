import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const AddHouseInfo = () => {
  const [adminId, setAdminId] = useState('');
  const [houseDetails, setHouseDetails] = useState({
    house_id: '',
    address: '',
    rfid_tag: '',
    zone: '',
    gps_location: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setHouseDetails(prev => ({ ...prev, [field]: value }));
  };

  const submitHouseInfo = async () => {
    if (!adminId.trim()) {
      alert('Please enter a valid Admin ID');
      return;
    }

    const payload = {
      info: houseDetails,
      data: { auth: adminId }
    };

    try {
      const response = await fetch('https://owm.onrender.com/admin/add_house', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResponseMessage(data.message || 'Unknown response');
    } catch (error) {
      console.error('Error submitting house info:', error);
      setResponseMessage('An error occurred while submitting');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40, height: 800 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10, marginTop: 8 }}>
          Add House Info
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 10 }}>
          Enter the house details and your admin ID to record information.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="House ID"
              onChangeText={text => handleChange('house_id', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Address"
              onChangeText={text => handleChange('address', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="RFID Tag"
              onChangeText={text => handleChange('rfid_tag', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Zone"
              onChangeText={text => handleChange('zone', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>
          <Input variant="outline" className="mb-6 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="GPS Location"
              onChangeText={text => handleChange('gps_location', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Input variant="outline" className="mb-6 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Admin ID"
              onChangeText={setAdminId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Pressable onPress={submitHouseInfo}>
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
              Submit
            </Text>
          </Pressable>

          {responseMessage ? (
            <Text style={{ fontFamily: 'Satoshi', fontSize: 20, marginTop: 12, marginLeft: 6,  color: 'black' }}>
              {responseMessage}
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddHouseInfo;
