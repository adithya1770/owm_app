import { Input, InputField } from '@/components/ui/input';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const admin_info = () => {
    const [adminId, setAdminId] = React.useState('');
    const [userData, setUserData] = React.useState([]);

    const getAdminInfo = async () => {
        const response = await fetch(`https://owm.onrender.com/admin/user_info`, 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ adminId }),
            }
        );
        const data = await response.json();
        if (data) {
            setUserData(data);
        }
        else
        {
            console.error('Error fetching user data:');
        }
    }
            
  return (
           <ScrollView>
                      <View className="w-full bg-yellow-400" style={{ height: 450 }}>
                        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10, marginTop: 64 }}>
                          User {'\n'}Information
                        </Text>
                        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 16 }}>
                            view the names and number of users in the system.
                        </Text>
                        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 2 }}>
                            enter your admin id to see the list 
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
                            <Pressable>
                                <Text
                                    onPress={getAdminInfo}
                                    style={{
                                        fontFamily: 'Satoshi',
                                        fontSize: 20,
                                        marginLeft: 20,
                                        marginTop: 2,
                                    }}
                                    className='h-10 w-32 bg-black rounded-b-3xl text-yellow-400 pl-4' 
                                >
                                    Get Info
                                </Text>
                            </Pressable>
                      </View>
            </ScrollView>
  )
}

export default admin_info