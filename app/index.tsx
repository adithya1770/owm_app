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
      <TouchableOpacity className="h-10 w-44 bg-black mt-64 rounded-2xl" onPress={() => router.push('/citizen/')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'white', paddingLeft:13, paddingTop: 2 }}>
          citizen's portal
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="h-10 w-44 bg-black mt-10 rounded-2xl" onPress={() => router.push('/admin/')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'white', paddingLeft:13, paddingTop: 2 }}>
          admin's portal
        </Text>
      </TouchableOpacity>
    </View>
  );
}