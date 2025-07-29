import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, Pressable, ScrollView, Text } from 'react-native';
import supabase from '../../client';
import { AuthContext } from '../AuthContext';

const Index = () => {
  const { uid } = React.useContext(AuthContext);

  const [house_id, setHouseId] = React.useState<string | null>(null);
  const [phone_no, setPhoneNo] = React.useState<string | null>(null);
  const [display_name, setDisplayName] = React.useState<string | null>(null);
  const [email, setEmail] = React.useState<string | null>(null);
  const [address, setAddress] = React.useState<string | null>(null);
  const [balance, setBalance] = React.useState<number | null>(null);
  const [image, setImage] = React.useState<string>('');

  useEffect(() => {
    const getInfo = async () => {
      const user_details = await fetch('https://owm.onrender.com/user/me', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: uid }),
      });
      const data = await user_details.json();
      console.log(data);
      setHouseId(data[0].house_id);
      setPhoneNo(data[0].phone_no);
      setDisplayName(data[0].display_name);
      setEmail(data[0].email);
      setAddress(data[0].address);
      setBalance(data[0].balance);
    };

    if (uid) getInfo();
  }, [uid]);

  useEffect(() => {
    if (house_id) {
      AsyncStorage.setItem('house_id', String(house_id));
    }
  }, [house_id]);

  useEffect(() => {
    const getImage = async () => {
      const imgUri = await AsyncStorage.getItem('image');
      if (imgUri) setImage(imgUri);
    };
    getImage();
  }, []);

  const pickImage = async () => {
  const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!granted) return;

  const result = await ImagePicker.launchImageLibraryAsync();
  if (result.canceled) return;

  const uri = result.assets[0].uri;
  setImage(uri);
  await AsyncStorage.setItem('image', uri);

  const { data: existingUser, error: fetchError } = await supabase
    .from('user_overview')
    .select('img_uri')
    .eq('user_id', uid)
    .single();

    setImage(existingUser?.img_uri || uri);

  if (fetchError) {
    console.error("Fetch error:", fetchError.message);
    return;
  }

  if (existingUser) {
    const { error } = await supabase
      .from('user_overview')
      .update({ img_uri: uri })
      .eq('user_id', uid);
    if (error) console.error("Update failed:", error.message);
  } else {
    const { error } = await supabase
      .from('user_overview')
      .insert({ uid, img_uri: uri });
    if (error) console.error("Insert failed:", error.message);
  }
};


  const logOut = async () => {
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.removeItem('house_id');
    await supabase.auth.signOut();
    await AsyncStorage.clear();
    router.push('/citizen_auth/login');
  };

  return (
    <ScrollView className="ml-2 mt-144 bg-lime-300" style={{ height: 250, width: 370 }}>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 44, color: 'black' }} className="ml-20 mt-10">
        {display_name}
      </Text>

      <Pressable onPress={pickImage}>
        <Image
          source={
            image
              ? { uri: image }
              : {
                  uri: 'https://i.pinimg.com/736x/c4/b7/5f/c4b75fb439096e44deb4d1e98480fa31.jpg',
                }
          }
          height={180}
          width={180}
          className="rounded-full ml-28 mt-10"
        />
      </Pressable>

      <ScrollView className="w-96 border-black border-l-4 ml-4 mt-6" style={{ height: 430 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-4">
          House ID
        </Text>
        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          {house_id}
        </Text>

        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          Phone No
        </Text>
        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          +{phone_no}
        </Text>

        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          Email
        </Text>
        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          {email}
        </Text>

        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          Address
        </Text>
        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          {address}
        </Text>

        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          Balance
        </Text>
        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          {balance}/-
        </Text>

        <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          UID
        </Text>
        <Text style={{ fontFamily: 'SatoshiLight', fontSize: 18, color: 'black' }} className="ml-4 mt-2">
          {uid}
        </Text>
      </ScrollView>

      <Pressable onPress={logOut}>
        <Text
          style={{ fontFamily: 'Satoshi', fontSize: 20, color: 'red' }}
          className="ml-40 mb-8 mt-8 h-14 w-28 pl-3 pt-2 rounded-3xl bg-white"
        >
          Log Out
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default Index;
