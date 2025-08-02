import { Input, InputField } from '@/components/ui/input';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const RemoveWorkerInfo = () => {
  const [workerId, setWorkerId] = useState('');
  const [adminId, setAdminId] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleRemoveWorker = async () => {
    if (!workerId.trim() || !adminId.trim()) {
      alert('Please fill in both Worker ID and Admin ID');
      return;
    }

    const payload = {
      worker_id: parseInt(workerId),
      data: { auth: adminId }
    };

    try {
      const response = await fetch('https://owm.onrender.com/admin/remove_worker', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setResponseMessage(data.message || 'Unknown response');
    } catch (error) {
      console.error('Error removing worker:', error);
      setResponseMessage('An error occurred while removing');
    }
  };

  return (
    <ScrollView>
      <View className="w-full bg-yellow-400" style={{ paddingVertical: 40, height: 800 }}>
        <Text style={{ fontFamily: 'Satoshi', fontSize: 64, marginLeft: 10, marginTop: 8 }}>
          Remove Worker
        </Text>
        <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16, marginLeft: 10, marginTop: 10 }}>
          Enter the worker ID and your admin ID to remove a worker entry from the system.
        </Text>

        <View className="mt-8 ml-4">
          <Input variant="outline" className="mb-3 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Worker ID"
              keyboardType="numeric"
              onChangeText={setWorkerId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Input variant="outline" className="mb-6 w-80 h-14 bg-white border rounded-2xl">
            <InputField
              placeholder="Your Admin ID"
              onChangeText={setAdminId}
              style={{ fontFamily: 'Satoshi', fontSize: 17 }}
            />
          </Input>

          <Pressable onPress={handleRemoveWorker}>
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
              Remove
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

export default RemoveWorkerInfo;
