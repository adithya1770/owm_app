import { Input, InputField } from '@/components/ui/input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const Billing = () => {
    const [data, setData] = useState<any[]>([]);
    const [bill_id, setBillId] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        const getPickupInfo = async () => {
            try {
                const house_id = await AsyncStorage.getItem('house_id');
                if (!house_id) {
                    console.warn('No house_id found in AsyncStorage');
                    return;
                }

                const response = await fetch('https://owm.onrender.com/user/billing_info', {
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

    const viewStatus = async () => {
        try {
            const house_id = await AsyncStorage.getItem('house_id');
            if (!house_id) {
                console.warn('No house_id found in AsyncStorage');
                return;
            }

            const response = await fetch('https://owm.onrender.com/user/billing_info/payment_status', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ house_id, bill_id })
            });

            const result = await response.json();
            if (typeof result === 'object' && 'status' in result) {
                setStatus(result.status);
            } else {
                console.warn('Unexpected response:', result);
                setStatus('');
            }
        } catch (error) {
            console.error('Error fetching bill status:', error);
        }
    };

    return (
        <ScrollView>
            <View>
                {
                    data.map((item, index) => (
                        <View key={index} className='w-96 border-black border-r-4 border-l-4 ml-6 mt-4 bg-lime-300 p-4'>
                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-20">Bill ID</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.bill_id}</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">For the Month</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.month}</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">Amount</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.amount}</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">STATUS</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: item.status=="paid"?'green':'red'}} className="ml-4 mt-2">{item.status}</Text>
                        </View>
                    ))
                }
            </View>
            <View>
                <Input
                    variant="outline"
                    size="lg"
                    isDisabled={false}
                    isInvalid={false}
                    isReadOnly={false}
                    className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-24 ml-14"
                >
                    <InputField
                    placeholder="Bill Id"
                    style={{ fontFamily: 'Satoshi', fontSize: 17 }}
                    onChangeText={setBillId}
                    />
                </Input>
                <Pressable>
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'blue', textAlign: 'center', marginTop: 20 }} onPress={viewStatus}>
                        View Status
                    </Text>
                </Pressable>
                <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'blue', textAlign: 'center', marginTop: 20 }}>
                    {status ? `Status: ${status}` : 'No status available'}
                </Text>
            </View>
        </ScrollView>
    );
};

export default Billing;
