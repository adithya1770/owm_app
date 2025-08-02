import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const TotalInfoScreen = () => {
  const [adminId, setAdminId] = useState('');
  const [scheduleData, setScheduleData] = useState<any>([]);
  const [responseMessage, setResponseMessage] = useState('');

  const fetchTotalInfo = async () => {
    if (!adminId.trim()) {
      alert('Please enter a valid Admin ID');
      return;
    }

    try {
      const response = await fetch('https://owm.onrender.com/admin/total_info', {
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
      console.error('Error fetching total info:', error);
      setResponseMessage('An error occurred while fetching data.');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 48, marginLeft: 10 }}>
          Total Info
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 8 }}>
          data on trucks, workers, pickups, houses, bins, and billing.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-4 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Admin ID"
              onChangeText={setAdminId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Pressable onPress={fetchTotalInfo}>
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
              Truck ID: {item.trucks?.truck_id || 'N/A'} | GPS: {item.trucks?.gps_location || 'N/A'}
            </Text>


            <Text style={{ fontFamily: 'Satoshi', fontSize: 16 }}>
              Worker: {item.workers?.name || 'N/A'}
            </Text>

            {(item.pickups || []).map((pickup: any, i: number) => (
              <View key={i} className="mt-3">
                <Text style={{ fontFamily: 'SatoshiBold', fontSize: 16 }}>📦 Pickup ID: {pickup.pickup_id}</Text>

                <Text style={{ fontFamily: 'Satoshi', fontSize: 15 }}>
                  House ID: {pickup.houses?.house_id} | Address: {pickup.houses?.address}
                </Text>

                <Text style={{ fontFamily: 'Satoshi', fontSize: 15 }}>
                  Zone: {pickup.houses?.zone} | GPS: {pickup.houses?.gps_location}
                </Text>

                {/* Bin Info */}
                {(pickup.houses?.bins || []).map((bin: any, j: number) => (
                  <Text key={j} style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 12 }}>
                    Bin ID: {bin.bin_id} | Status: {bin.status}
                  </Text>
                ))}

                {(pickup.houses?.billing || []).map((bill: any, k: number) => (
                  <Text key={k} style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 12 }}>
                    Bill ID: {bill.bill_id} | ₹{bill.amount} - {bill.status}
                  </Text>
                ))}
              </View>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default TotalInfoScreen;
