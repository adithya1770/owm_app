import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const AddBillingInfo = () => {
  const [adminId, setAdminId] = useState('');
  const [billingDetails, setBillingDetails] = useState({
    bill_id: '',
    amount: '',
    status: '',
    house_id: '',
    month: ''
  });

  const [responseMessage, setResponseMessage] = useState('');

  const handleChange = (field: string, value: string) => {
    setBillingDetails(prev => ({ ...prev, [field]: value }));
  };

  const submitBillingInfo = async () => {
    if (!adminId.trim()) {
      alert('Please enter a valid Admin ID');
      return;
    }

    const payload = {
      info: {
        ...billingDetails,
        amount: parseFloat(billingDetails.amount) || 0  // Ensure it's a number
      },
      data: { auth: adminId }
    };

    try {
      const response = await fetch('https://owm.onrender.com/admin/add_billing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResponseMessage(data.message || 'Unknown response');
    } catch (error) {
      console.error('Error submitting billing info:', error);
      setResponseMessage('An error occurred while submitting');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40, height: 800 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10 }}>
          Add Billing Info
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 10 }}>
          Enter the billing details and your admin ID to record information.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Bill ID"
              onChangeText={text => handleChange('bill_id', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Amount"
              keyboardType="numeric"
              onChangeText={text => handleChange('amount', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Status (paid / unpaid)"
              onChangeText={text => handleChange('status', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="House ID"
              onChangeText={text => handleChange('house_id', text)}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>
          <Input variant="outline" className="mb-6 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Month (e.g., 2025-08)"
              onChangeText={text => handleChange('month', text)}
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

          <Pressable onPress={submitBillingInfo}>
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
              Submit
            </Text>
          </Pressable>

          {responseMessage ? (
            <Text style={{ fontFamily: 'Satoshi', fontSize: 16, marginTop: 12, color: 'green' }}>
              {responseMessage}
            </Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
};

export default AddBillingInfo;
