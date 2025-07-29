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
            "house_id": house_id,
            "user_name":username,
            "complaint": complaint,
        };
        console.log(house_id, complaint, username);
        const response = await fetch('https://owm.onrender.com/user/greviance/complaint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });
        const data = await response.json();
        if (data) {
            setResponseString("Complaint submitted successfully");
        } else {
            setResponseString("Error submitting complaint");
        }
        setClicked(false);
    }

    useEffect(() => {
      const checkStatus = async () => {
        try {
          const house_id = await AsyncStorage.getItem('house_id');
          const response = await fetch('https://owm.onrender.com/user/greviance/complaint_status', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ house_id }),
          });

          const result = await response.json();
          console.log("Complaint Status Response:", result);

          if (Array.isArray(result.response)) {
            setData(result.response);
          } else {
            setData([]);
          }
        } catch (error) {
          console.error("Error fetching complaint status:", error);
          setData([]);
        }
      };

      checkStatus();
    }, []);


  return (
    <ScrollView>
      <View className="w-full bg-lime-400" style={{ height: 450 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 26, marginTop: 120 }}>
          Greviance Portal
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 24, marginTop: 16 }}>
          enter your complaint below 
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginLeft: 24, marginTop: 2 }}>
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
          placeholder="Username"
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
        className="ml-36 bg-primary-500 h-10 w-40 rounded-full mt-6"
        style={{ backgroundColor: 'black' }}
        onPress={putComplaint}
        disabled={clicked}
      >
        <Text style={{ fontFamily: 'Satoshi', fontSize: 17, marginLeft: 10, marginTop: 3, color: 'white' }}>
          File Complaint
        </Text>
      </Pressable>

      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 18, marginLeft: 72, marginTop: 10 }}>
        {responseString}
      </Text>

    {Array.isArray(data) && data.length > 0 ? (
    data.map((item: any, index: number) => (
        <View key={index} className="bg-white p-4 w-64 rounded-lg shadow-md ml-24 mt-4 mb-4">
        <Text style={{ fontFamily: 'Satoshi', fontSize: 16 }}>
            Complaint
        </Text>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 16 }}>
            {item.complaint}
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 14, marginTop: 4, color:item.remarks==='unresolved'? 'red' : 'green' }}>
            Status: {item.remarks}
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