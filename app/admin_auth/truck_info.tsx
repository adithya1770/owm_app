import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const TruckInfoScreen = () => {
  const [adminId, setAdminId] = useState('');
  const [scheduleData, setScheduleData] = useState<any>([]);
  const [responseMessage, setResponseMessage] = useState('');

  const fetchTruckInfo = async () => {
    if (!adminId.trim()) {
      alert('Please enter a valid Admin ID');
      return;
    }

    try {
      const response = await fetch('https://owm.onrender.com/admin/truck_info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ auth: adminId }),
      });

      const data = await response.json();

      if (Array.isArray(data)) {
        setScheduleData(data);
        setResponseMessage('');
      } else {
        setScheduleData([]);
        setResponseMessage(data.message || 'Unknown response');
      }
    } catch (error) {
      console.error('Error fetching truck info:', error);
      setResponseMessage('An error occurred while fetching truck info.');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 48, marginLeft: 10 }}>
          Truck Schedules
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 8 }}>
          View trucks, workers, and pickup info from the schedule.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-4 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Admin ID"
              onChangeText={setAdminId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Pressable onPress={fetchTruckInfo}>
            <Text
              className="w-48"
              style={{
                fontFamily: 'Satoshi',
                fontSize: 20,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: 'black',
                color: 'yellow',
                borderRadius: 18,
                textAlign: 'center',
              }}
            >
              Get Info
            </Text>
          </Pressable>

          {responseMessage ? (
            <Text style={{ fontFamily: 'Satoshi', fontSize: 16, marginTop: 12, color: 'red' }}>
              {responseMessage}
            </Text>
          ) : null}
        </View>

        {scheduleData.map((item: any, index: number) => (
          <View key={index} className="bg-white p-4 w-96 rounded-lg shadow-md ml-7 mt-4 mb-4">
            <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16 }}>Schedule ID: {item.schedule_id}</Text>

            <Text style={{ fontFamily: 'Satoshi', fontSize: 16, marginTop: 4 }}>
              Truck ID: {item.trucks?.truck_id || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 16 }}>
              Truck GPS: {item.trucks?.gps_location || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 16 }}>
            Worker: {item.workers?.name || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 16 }}>
              Pickups Count: {item.pickups?.length || 0}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TruckInfoScreen;
