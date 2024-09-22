import { BlurView } from "expo-blur";
import { useContext } from "react";
import { Pressable, Text } from "react-native";

import { Layout } from "@/app/components/Layout";
import { AuthContext } from "@/app/state/auth";

export function SignOutScreen() {
  const { setIsSignedIn } = useContext(AuthContext);

  return (
    <BlurView style={{ flex: 1 }} intensity={100} tint="dark">
      <Layout>
        <Pressable onPress={() => setIsSignedIn?.(false)}>
          <Text>Sign out!</Text>
        </Pressable>
      </Layout>
    </BlurView>
  );
}
