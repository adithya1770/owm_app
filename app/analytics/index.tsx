import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('https://owm.onrender.com/admin/analytics');
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const Item = ({ label, value }: { label: string; value: number }) => (
    <View className="bg-white w-80 rounded-xl shadow-md p-4 mb-4">
      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 16 }}>{label}</Text>
      <Text style={{ fontFamily: 'Satoshi', fontSize: 24 }}>{value}</Text>
    </View>
  );

  return (
    <ScrollView>
      <View className="w-full bg-lime-400 min-h-screen p-6 items-center">
        <Text style={{ fontFamily: 'Satoshi', fontSize: 72, marginBottom: 60 }}>
          Analytics
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#000" />
        ) : analytics?.error ? (
          <Text style={{ fontFamily: 'Satoshi', fontSize: 18, color: 'red' }}>
            {analytics.error}
          </Text>
        ) : (
          <>
            <Item label="Total Bills" value={analytics.total_bills} />
            <Item label="Total Paid" value={analytics.total_paid} />
            <Item label="Total Unpaid" value={analytics.total_unpaid} />
            <Item label="Total Collection (₹)" value={analytics.total_collection} />
            <Item label="Complaints Solved" value={analytics.complaints_solved} />
            <Item label="Pending Complaints" value={analytics.total_complaints} />
            <Item label="Houses Count" value={analytics.houses_count} />
            <Item label="Pickups Count" value={analytics.pickups_count} />
            <Item label="Workers Count" value={analytics.workers_count} />
            <Item label="Trucks Count" value={analytics.trucks_count} />
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default AdminAnalytics;
