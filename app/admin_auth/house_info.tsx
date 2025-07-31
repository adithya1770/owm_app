import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const AdminInfo = () => {
  const [adminId, setAdminId] = useState('');
  const [userData, setUserData] = useState<any>([]);
  const [expandedBilling, setExpandedBilling] = useState<{ [key: number]: boolean }>({});
  const [expandedPickup, setExpandedPickup] = useState<{ [key: number]: boolean }>({});

  const getAdminInfo = async () => {
    if (!adminId.trim()) {
      alert('Please enter a valid Admin ID');
      return;
    }

    const response = await fetch(`https://owm.onrender.com/admin/house_info`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ auth: adminId.toString() }),
    });

    const data = await response.json();
    console.log(data);
    if (Array.isArray(data)) {
      setUserData(data);
    } else {
      console.error('Expected an array but got:', data);
      setUserData([]);
    }
  };

  const toggleBilling = (index: number) => {
    setExpandedBilling((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const togglePickup = (index: number) => {
    setExpandedPickup((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ height: 450 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10, marginTop: 64 }}>
          House {'\n'}Information
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 16 }}>
          View the details of houses in the system.
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
              House Information
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              House ID: {item.house_id || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              Address: {item.address || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              RFID Tag: {item.rfid_tag || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              Zone: {item.zone || 'N/A'}
            </Text>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 14, marginTop: 4 }}>
              GPS: {item.gps_location?.trim() || 'N/A'}
            </Text>
            <Text
              style={{
                fontFamily: 'Satoshi',
                fontSize: 14,
                marginTop: 4,
                color: item.remarks ? 'red' : 'green',
              }}
            >
              Remarks: {item.remarks ? 'Issue' : 'OK'}
            </Text>


            <Pressable onPress={() => toggleBilling(index)}>
              <Text
                style={{
                  fontFamily: 'SatoshiItalic',
                  fontSize: 16,
                  marginTop: 12,
                  marginBottom: 4,
                  color: 'blue',
                }}
              >
                {expandedBilling[index] ? 'Hide' : 'Show'} Billing Information
              </Text>
            </Pressable>

            {expandedBilling[index] && (
              Array.isArray(item.billing) && item.billing.length > 0 ? (
                item.billing.map((bill: any, i: number) => (
                  <View
                    key={`bill-${bill.bill_id}-${i}`}
                    className="bg-gray-100 p-3 mb-2 rounded-md"
                  >
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 14 }}>
                      Month: {bill.month}
                    </Text>
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 14 }}>
                      Amount: ₹{bill.amount}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Satoshi',
                        fontSize: 14,
                        color: bill.status === 'unpaid' ? 'red' : 'green',
                      }}
                    >
                      Status: {bill.status}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14 }}>
                  No billing records.
                </Text>
              )
            )}

            <Pressable onPress={() => togglePickup(index)}>
              <Text
                style={{
                  fontFamily: 'SatoshiItalic',
                  fontSize: 16,
                  marginTop: 12,
                  marginBottom: 4,
                  color: 'blue',
                }}
              >
                {expandedPickup[index] ? 'Hide' : 'Show'} Pickup Records
              </Text>
            </Pressable>

            {expandedPickup[index] && (
              Array.isArray(item.pickups) && item.pickups.length > 0 ? (
                item.pickups.map((pickup: any, i: number) => (
                  <View
                    key={`pickup-${pickup.pickup_id}-${i}`}
                    className="bg-gray-100 p-3 mb-2 rounded-md"
                  >
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 14 }}>
                      Bin ID: {pickup.bin_id}
                    </Text>
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 14 }}>
                      Truck ID: {pickup.truck_id}
                    </Text>
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 14 }}>
                      Time: {new Date(pickup.timestamp).toLocaleString()}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14 }}>
                  No pickup records.
                </Text>
              )
            )}
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
