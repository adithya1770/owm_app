import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const AddTruckInfo = () => {
  const [adminId, setAdminId] = useState('');
  const [truckDetails, setTruckDetails] = useState({
    truck_id: '',
    capacity: '',
    gps_location: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setTruckDetails(prev => ({ ...prev, [field]: value }));
  };

  const submitTruckInfo = async () => {
    if (!adminId.trim()) {
      alert('Please enter a valid Admin ID');
      return;
    }

    const payload = {
      info: {
        ...truckDetails,
        capacity: parseFloat(truckDetails.capacity) || 0
      },
      data: { auth: adminId }
    };

    try {
      const response = await fetch('https://owm.onrender.com/admin/add_truck', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResponseMessage(data.message || 'Unknown response');
    } catch (error) {
      console.error('Error submitting truck info:', error);
      setResponseMessage('An error occurred while submitting');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40, height: 800 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10 }}>
          Add Truck Info
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 10 }}>
          Enter truck details and admin ID to record information.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Truck ID"
              onChangeText={text => handleChange('truck_id', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Capacity"
              keyboardType="numeric"
              onChangeText={text => handleChange('capacity', text)}
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

          <Pressable onPress={submitTruckInfo}>
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
            <Text style={{ fontFamily: 'Satoshi', fontSize: 16, marginTop: 12, color: 'green' }}>
              {responseMessage}
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddTruckInfo;
