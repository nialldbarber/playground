import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

import { Layout } from "@/app/components/Layout";
import { isSignedInAtom } from "@/app/state/auth";
import { BlurView } from "expo-blur";
import { useSetAtom } from "jotai";

export function SettingsScreen() {
  const { goBack } = useNavigation();
  const setIsSignedIn = useSetAtom(isSignedInAtom);

  return (
    <View style={{ flex: 1 }}>
      <BlurView
        intensity={50}
        tint="dark"
        className="absolute top-0 left-0 right-0 bottom-0"
      />
      <Layout>
        <View className="flex-1 justify-center items-center">
          <Pressable onPress={goBack} className="bg-blue-400 p-3 rounded-md">
            <Text className="text-white font-bold">Go to Home</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsSignedIn?.(false)}
            className="bg-red-400 p-3 rounded-md mt-4"
          >
            <Text className="text-white font-bold">Log out</Text>
          </Pressable>
        </View>
      </Layout>
    </View>
  );
}
