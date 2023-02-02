import { StatusBar } from "expo-status-bar";
import { Center, NativeBaseProvider, Text } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { THEME } from "./src/styles/theme";
import { Loading } from "./src/components/Loading";
import { SignIn } from "./src/screens/SignIn";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <AuthProvider>
        {fontsLoaded ? (
          <SignIn />
        ) : (
          <Loading />
        )}
        <StatusBar
          style="light"
          backgroundColor="transparent"
          translucent />
      </AuthProvider>
    </NativeBaseProvider>
  );
}
