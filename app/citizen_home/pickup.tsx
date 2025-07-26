import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';

const Pickup = () => {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const getPickupInfo = async () => {
            try {
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
    }, []);

    return (
        <ScrollView>
            <View>
                {
                    data.map((item, index) => (
                        <View key={index} className='w-96 border-black border-r-4 border-l-4 ml-6 mt-4 bg-lime-300 p-4'>
                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-20">Pickup ID</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.pickup_id}</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">Pickup Time</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.timestamp}</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">Bin ID</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.bin_id}</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">Truck ID</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.truck_id}</Text>
                        </View>
                    ))
                }
            </View>
        </ScrollView>
    );
};

export default Pickup;
