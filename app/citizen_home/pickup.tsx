import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

const Pickup = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const getPickupInfo = async () => {
            try {
                setLoading(true);
                const house_id = await AsyncStorage.getItem('house_id');
                if (!house_id) {
                    console.warn('No house_id found in AsyncStorage');
                    return;
                }

                const response = await fetch('https://owm.onrender.com/user/pickup_info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ house_id })
                });

                const result = await response.json();
                if (Array.isArray(result)) {
                    setData(result);
                } else {
                    console.warn('API response is not an array:', result);
                    setData([]);
                }
            } catch (error) {
                console.error('Error fetching pickup info:', error);
            }
        };

        getPickupInfo();
        setLoading(false);
    }, []);

    if(loading) {
        return <Text>Loading...</Text>;     
    }

    return (
        <ScrollView>
                  <View className="w-full bg-lime-400" style={{ height: 450 }}>
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 26, marginTop: 120 }}>
                      PICKUPs
                    </Text>
                    <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 24, marginTop: 16 }}>
                      complete details about your garbage pickups
                    </Text>
                    <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 24, marginTop: 2 }}>
                        scroll down to view entire list of pickups
                    </Text>
                  </View>
                  <View>
                {loading ? (
                    <View className="mt-10 items-center justify-center">
                    <ActivityIndicator size="large" color="black" />
                    <Text style={{ fontFamily: 'Satoshi', marginTop: 10 }}>Loading pickups...</Text>
                    </View>
                ) : (
                    data.map((item, index) => (
                    <View key={index} className='w-96 border-black border-l-4 border-r-4 rounded-3xl ml-6 mt-10 bg-lime-300 p-4'>
                        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-3">Pickup ID</Text>
                        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.pickup_id}</Text>

                        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">Pickup Time</Text>
                        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">
                        Picked on {item.timestamp.slice(0, 10)} at {item.timestamp.slice(11, 16)}
                        </Text>

                        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">Bin ID</Text>
                        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.bin_id}</Text>

                        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">Truck ID</Text>
                        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2 mb-4">{item.truck_id}</Text>
                    </View>
                    ))
                )}
                </View>

        </ScrollView>
    );
};

export default Pickup;
