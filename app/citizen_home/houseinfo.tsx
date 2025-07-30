import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { ScrollView, Text } from 'react-native';

const houseinfo = () => {
    const [house_id, setHouseId] = React.useState<string | null>(null);
    const [rfid_tag, setRfidTag] = React.useState<string | null>(null);
    const [zone, setZone] = React.useState<string | null>(null);
    const [gps_location, setGpsLocation] = React.useState<string | null>(null);
    const [remarks, setRemarks] = React.useState<string | null>(null);
    const [collected, setCollected] = React.useState<string>('');

    useEffect(() => {
        const getHouseInfo = async () => {
            const house = await AsyncStorage.getItem('house_id');
            const response = await fetch('https://owm.onrender.com/user/house_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "house_id": house })
            });
            const data = await response.json();
            console.log(data)
            setHouseId(house);
            setRfidTag(data[0].rfid_tag);
            setZone(data[0].zone);
            setGpsLocation(data[0].gps_location);
            setRemarks(data[0].remarks);
            if(data.remarks){
                setCollected("Garbage has been collected for your house in this Trip!");
            }
            else{
                setCollected("Garbage has not been collected for your house in this Trip!");
            }
        }
        getHouseInfo();
    }, []);
  return (
        <ScrollView className='w-96 border-black border-r-4 border-l-4 ml-6 mt-144 bg-lime-300' style={{ height: 250, width: 345}}>
            <Text style={{ fontFamily: 'Satoshi', fontSize: 64, color: 'black' }} className="ml-4 mt-20">House ID</Text>
            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 32, color: 'black' }} className="ml-4 mt-2">{house_id}</Text>
    
            <Text style={{ fontFamily: 'Satoshi', fontSize: 64, color: 'black' }} className="ml-4 mt-2">RFID Tag</Text>
            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 32, color: 'black' }} className="ml-4 mt-2">{rfid_tag}</Text>
    
            <Text style={{ fontFamily: 'Satoshi', fontSize: 64, color: 'black' }} className="ml-4 mt-2">Zone</Text>
            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 32, color: 'black' }} className="ml-4 mt-2">{zone}</Text>
    
            <Text style={{ fontFamily: 'Satoshi', fontSize: 64, color: 'black' }} className="ml-4 mt-2">GPS Location</Text>
            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 32, color: 'black' }} className="ml-4 mt-2">{gps_location}</Text>
    
            <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">STATUS</Text>
            <Text style={{ fontFamily: 'SatoshiLight', fontSize: 18, color: remarks ? "red" : "green" }} className="ml-4 mt-2 mb-10">{collected}</Text>
        </ScrollView>
  )
}

export default houseinfo