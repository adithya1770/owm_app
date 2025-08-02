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
        living sustainably by managing waste!
      </Text>
      <TouchableOpacity className="h-10 w-44 bg-black mt-64 rounded-2xl" onPress={() => router.push('/citizen_auth')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'white', paddingLeft:13, paddingTop: 2 }}>
          citizen's portal
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="h-10 w-44 bg-black mt-3 rounded-2xl" onPress={() => router.push('/admin_auth')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'white', paddingLeft:13, paddingTop: 2 }}>
          admin's portal
        </Text>
      </TouchableOpacity>
       <TouchableOpacity className="h-10 w-44 bg-black mt-3 rounded-2xl" onPress={() => router.push('/addition')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'white', paddingLeft:32, paddingTop: 2 }}>
          additions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity className="h-10 w-44 bg-black mt-3 rounded-2xl" onPress={() => router.push('/removals')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'white', paddingLeft:34, paddingTop: 2 }}>
          removals
        </Text>
      </TouchableOpacity>
          <TouchableOpacity className="h-10 w-44 bg-lime-400 mt-3 rounded-2xl" onPress={() => router.push('/analytics')}>
        <Text style={{ fontFamily: 'SatoshiMedium', fontSize: 20, color: 'black', paddingLeft:34, paddingTop: 2 }}>
          analytics
        </Text>
      </TouchableOpacity>
    </View>
  );
}