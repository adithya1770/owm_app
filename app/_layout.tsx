import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFonts } from "expo-font";
import { Stack, useRouter } from "expo-router";
import { useEffect } from "react";
import { Text, View } from "react-native";
import "../global.css";
import AuthProvider from "./AuthContext";

export default function RootLayout() {
  const router = useRouter();

  const [loaded] = useFonts({
    Asans: require('../assets/fonts/ASansrounded.ttf'),
    Satoshi: require('../assets/fonts/Satoshi-Variable.ttf'),
    SatoshiLight: require('../assets/fonts/Satoshi-Light.otf'),
    SatoshiRegular: require('../assets/fonts/Satoshi-Regular.otf'),
    SatoshiMedium: require('../assets/fonts/Satoshi-Medium.otf'),
    SatoshiItalic: require('../assets/fonts/Satoshi-Italic.otf'),
  });

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem('userId');
      if (token) {
        router.replace('/citizen_home');
      }
    };
    checkLogin();
  }, []);

  if (!loaded) {
    return (
      <GluestackUIProvider mode="light">
        <View>
          <Text>Loading fonts...</Text>
        </View>
      </GluestackUIProvider>
    );
  }

  return (
    <AuthProvider value={{ uid: "", setUid: () => {} }}>
      <GluestackUIProvider mode="light">
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="citizen_auth" options={{ headerShown: false }} />
          <Stack.Screen name="admin_auth" options={{ headerShown: false }} />
          <Stack.Screen name="citizen_home" options={{ headerShown: false }} />
        </Stack>
      </GluestackUIProvider>
    </AuthProvider>
  );
}
