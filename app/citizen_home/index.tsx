import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { AuthContext } from '../AuthContext';

const index = () => {
  const { uid } = React.useContext(AuthContext);
  const [house_id, setHouseId] = React.useState<string | null>(null);
  const [phone_no, setPhoneNo] = React.useState<string | null>(null);
  const [display_name, setDisplayName] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [address, setAddress] = React.useState<string | null>(null);
  const [balance , setBalance] = React.useState<number | null>(null);
  const [image, setImage] = React.useState<string>('');
  useEffect(() => {
    const getInfo = async () => {
      const user_details = await fetch('https://owm.onrender.com/user/me', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "user_id" : uid })
    })
      const data = await user_details.json();
      console.log(data);
      setHouseId(data[0].house_id);
      setPhoneNo(data[0].phone_no);
      setDisplayName(data[0].display_name);
      setEmail(data[0].email);
      setAddress(data[0].address);
      setBalance(data[0].balance);
    }
    getInfo();
  }, [])
  useEffect(() => {
    const getImage = async () => {    
      const imgUri = await AsyncStorage.getItem('image');
      if (imgUri) {
        setImage(imgUri);
      }
    }
    getImage();
  }, []);
  const pickImage = async () => {
    const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!granted) return;

    const result = await ImagePicker.launchImageLibraryAsync();
    const imgUri = await AsyncStorage.getItem('image');
    if(imgUri){
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }
    else{
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            await AsyncStorage.setItem('image', result.assets[0].uri);
        } 
    }
  }
  return (
    <View>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 40, color: 'black' }}>{display_name}</Text>
        <Pressable onPress={pickImage}>
          <Text style={{ fontFamily: 'Satoshi', fontSize: 20, color: 'blue' }}>
            Upload Image
          </Text>
        </Pressable>
        <Image source={image ? { uri: image } : undefined} height={10} width={10} className='rounded-3xl' />
      <Pressable>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 20, color: 'blue' }} onPress={pickImage}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </Text>
      </Pressable>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 20, color: 'black' }}>House ID: {house_id}</Text>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 20, color: 'black' }}>Phone No: {phone_no}</Text>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 20, color: 'black' }}>Email: {email}</Text>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 20, color: 'black' }}>Address: {address}</Text>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 20, color : 'black' }}>Balance: {balance}</Text>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 20, color: 'black' }}>UID: {uid}</Text>
    </View>
  )
}

export default index