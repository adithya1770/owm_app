import { ResizeMode, Video } from "expo-av";
import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
 
export default function App() {
  const router = useRouter();
    return (
    <View className="flex-1 items-center justify-center bg-lime-300">
    <Video
        source={require('../assets/bg.mp4')}
        style={StyleSheet.absoluteFill}
        isMuted
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
      />
      <Text style={{ fontFamily: 'Satoshi', fontSize: 130, color: 'white' }}>
        owm.
      </Text>
      <Text style={{ fontFamily: 'SatoshiItalic', fontSize: 20, color: 'white' }}>
        managing waste made smarter!
      </Text>
      <TouchableOpacity className="h-10 w-44 bg-white mt-64 rounded-2xl" onPress={() => router.push('/citizen/')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'black', paddingLeft:13, paddingTop: 2 }}>
          citizen's portal
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="h-10 w-44 bg-white mt-10 rounded-2xl" onPress={() => router.push('/admin/')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'black', paddingLeft:13, paddingTop: 2 }}>
          admin's portal
        </Text>
      </TouchableOpacity>
    </View>
  );
}