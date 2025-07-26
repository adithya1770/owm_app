import { Input, InputField } from "@/components/ui/input";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const complaint = () => {

    const [ username, setUsername ] = React.useState('');
    const [ complaint, setComplaint ] = React.useState('');
    const [responseString, setResponseString] = React.useState('');
    const [clicked, setClicked] = React.useState(false);
    const [ data, setData ] = React.useState<object | any>([]);

    const putComplaint = async () => {
        setClicked(true);
        const house_id = await AsyncStorage.getItem('house_id');
        const payload = {
            house_id,
            username,
            complaint,
        };
        const response = await fetch('https://owm.onrender.com/user/greviance/complaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data && data.success) {
            setResponseString("Complaint submitted successfully");
        } else {
            setResponseString("Error submitting complaint");
        }
        setClicked(false);
    }

    useEffect(() => {
    const checkStatus = async () => {
        const house_id = await AsyncStorage.getItem('house_id');
        const response = await fetch('https://owm.onrender.com/complaint/status', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ house_id }),
        });
        const data = await response.json();
        if (Array.isArray(data)) {
        setData(data);
        } else {
        setData([]);
        }
    };
    checkStatus();
    }, []);

  return (
    <ScrollView>
      <View className="w-full bg-lime-400" style={{ height: 450 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 90, marginLeft: 44, marginTop: 170 }}>
          Greviance Portal
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 52, marginTop: 16 }}>
          enter your complaint below 
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 52, marginTop: 2 }}>
            use the check status button to check the status of your complaint
        </Text>
      </View>

      <Input
        variant="outline"
        size="lg"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-24 ml-14"
      >
        <InputField
          placeholder="UserName"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={setUsername}
        />
      </Input>

      <Input
        variant="outline"
        size="lg"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
        className="w-80 h-14 bg-white border border-gray-300 rounded-full mt-6 ml-14"
      >
        <InputField
          placeholder="Complaint"
          type="text"
          style={{ fontFamily: 'Satoshi', fontSize: 17 }}
          onChangeText={setComplaint}
        />
      </Input>

      <Pressable
        className="ml-36 bg-primary-500 h-10 w-36 rounded-full mt-6"
        style={{ backgroundColor: 'black' }}
        onPress={putComplaint}
        disabled={clicked}
      >
        <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 36, marginTop: 3, color: 'white' }}>
          File Complaint
        </Text>
      </Pressable>

      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 18, marginLeft: 86, marginTop: 10 }}>
        {responseString}
      </Text>

    {Array.isArray(data) && data.length > 0 ? (
    data.map((item: any, index: number) => (
        <View key={index} className="bg-white p-4 rounded-lg shadow-md m-4">
        <Text style={{ fontFamily: 'Satoshi', fontSize: 16 }}>
            Complaint: {item.complaint}
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginTop: 4 }}>
            Status: {item.status}
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginTop: 4 }}>
            Filed by {item.name}
        </Text>
        </View>
    ))
    ) : (
    <Text style={{ textAlign: 'center', marginTop: 20, fontFamily: 'SatoshiItalic' }}>
        No complaints found.
    </Text>
    )}

    </ScrollView>
  )
}

export default complaint