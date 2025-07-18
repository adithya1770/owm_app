import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import "@/global.css";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Text, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    Asans: require('../assets/fonts/ASansrounded.ttf'),
    Satoshi: require('../assets/fonts/Satoshi-Variable.ttf'),
    SatoshiLight: require('../assets/fonts/Satoshi-Light.otf'),
    SatoshiRegular: require('../assets/fonts/Satoshi-Regular.otf'),
    SatoshiMedium: require('../assets/fonts/Satoshi-Medium.otf'),
    SatoshiItalic: require('../assets/fonts/Satoshi-Italic.otf'),
  });

  if (!loaded) {
    return <GluestackUIProvider mode="light"><View><Text>Loading fonts...</Text></View></GluestackUIProvider>;
  }

  return (
    <GluestackUIProvider mode="light"><Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="citizen_auth" options={{ headerShown: false }} />
        <Stack.Screen name="admin_auth" options={{ headerShown: false }} />
      </Stack></GluestackUIProvider>
  );
}
