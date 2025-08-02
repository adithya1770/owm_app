import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const DepositMoney = () => {
  const [adminId, setAdminId] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [houseId, setHouseId] = useState('');
  const [balance, setBalance] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleDeposit = async () => {
    if (!adminId.trim() || !displayName.trim() || !houseId.trim() || !balance.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const payload = {
      creds: {
        display_name: displayName,
        house_id: parseInt(houseId),
        balance: parseFloat(balance)
      },
      data: { auth: adminId }
    };

    try {
      const response = await fetch('https://owm.onrender.com/admin/deposit_money', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResponseMessage(data.message || 'Unknown response');
    } catch (error) {
      console.error('Error depositing money:', error);
      setResponseMessage('An error occurred while depositing money');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40, height: 800 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10 }}>
          Deposit Balance
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 10 }}>
          Enter user details and balance to deposit.{'\n'}Only admins can update balances.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Display Name"
              onChangeText={setDisplayName}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="House ID"
              keyboardType="numeric"
              onChangeText={setHouseId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Balance to Set"
              keyboardType="numeric"
              onChangeText={setBalance}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Input variant="outline" className="mb-6 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Admin ID"
              onChangeText={setAdminId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Pressable onPress={handleDeposit}>
            <Text
              style={{
                fontFamily: 'Satoshi',
                fontSize: 20,
                marginLeft: 4,
                paddingVertical: 8,
                paddingHorizontal: 12,
                backgroundColor: 'black',
                color: 'yellow',
                borderRadius: 18,
                textAlign: 'center',
              }}
              className="w-48"
            >
              Deposit
            </Text>
          </Pressable>

          {responseMessage ? (
            <Text style={{ fontFamily: 'Satoshi', fontSize: 20, marginTop: 12, marginLeft: 6, color: 'black' }}>
              {responseMessage}
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default DepositMoney;
