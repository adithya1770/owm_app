import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
 
export default function App() {
  const router = useRouter();
  return (
    <View className="flex-1 items-center justify-center bg-lime-300">
      <Text style={{ fontFamily: 'Satoshi', fontSize: 130 }}>
        owm.
      </Text>
      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 20}}>
        managing waste made smarter!
      </Text>
      <TouchableOpacity className="h-10 w-40 bg-black mt-64 rounded-2xl" onPress={() => router.push('/(tabs)/')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'white', paddingLeft:10 }}>
          manage now
        </Text>
      </TouchableOpacity>
    </View>
  );
}