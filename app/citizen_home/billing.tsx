import { Input, InputField } from '@/components/ui/input';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const Billing = () => {
    const [data, setData] = useState<any[]>([]);
    const [bill_id, setBillId] = useState('');
    const [status, setStatus] = useState('');
    const [showItems, setShowItems] = useState(false);
    const [closeItems, setCloseItems] = useState(true);

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
                  <View className="w-full bg-lime-400" style={{ height: 450 }}>
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 26, marginTop: 120 }}>
                      Billings {'\n'}& Invoices
                    </Text>
                    <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 24, marginTop: 16 }}>
                        Here you can view your bills and invoices.
                    </Text>
                    <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 24, marginTop: 2 }}>
                        click on show invoices button to view your bills. 
                    </Text>
                  </View>
            {!showItems && <Pressable onPress={() => {setShowItems(true); setCloseItems(false);}}><Text style={{ fontFamily: 'SatoshiItalic', fontSize: 32, color: 'black', marginTop: -10, marginLeft: 80 }} className='h-20 w-64 pl-4 pt-4 rounded-b-3xl bg-lime-400'>Show Invoices</Text></Pressable>}
            {!closeItems && <Pressable onPress={() => {setCloseItems(true);  setShowItems(false);}}><Text style={{ fontFamily: 'SatoshiItalic', fontSize: 32, color: 'black', marginTop: -10, marginLeft: 80 }} className='h-20 w-64 pl-4 pt-4 rounded-b-3xl bg-lime-400'>Hide Invoices</Text></Pressable>}
            {showItems&&!closeItems&&
            <View>
                {
                    data.map((item, index) => (
                        <View key={index} className='w-96 border-black rounded-3xl border-r-4 border-l-4 ml-6 mt-4 bg-lime-300 p-4'>
                            <Text style={{ fontFamily: 'Satoshi', fontSize: 44, color: 'black' }} className="ml-4 mt-3">BILL ID</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 40, color: 'black' }} className="ml-4 mt-2">{item.bill_id}</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">For the Month</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.month}</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">Amount</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: 'black' }} className="ml-4 mt-2">{item.amount}/-</Text>

                            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">STATUS</Text>
                            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 16, color: item.status=="paid"?'green':'red'}} className="ml-4 mt-2">{item.status}</Text>
                        </View>
                    ))
                }
            </View>}
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
                    placeholder="BILL ID"
                    style={{ fontFamily: 'Satoshi', fontSize: 17 }}
                    onChangeText={setBillId}
                    />
                </Input>
                <Pressable>
                    <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'white', textAlign: 'center', marginTop: 20 }} onPress={viewStatus} className='h-14 pt-3 w-36 bg-black ml-36 rounded-xl'>
                        View Status
                    </Text>
                </Pressable>
                <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black', textAlign: 'center', marginTop: 20 }} className='mb-4'>
                    {status ? `Status: ${status}` : 'Enter BILL ID to view status'}
                </Text>
            </View>
        </ScrollView>
    );
};

export default Billing;
