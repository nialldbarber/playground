import { useContext } from "react";
import { View } from "react-native";

import { Button } from "@/app/components/Button";
import { AuthContext } from "@/app/state/auth";

export function SignInScreen() {
  const { setIsSignedIn } = useContext(AuthContext);

  return (
    <View>
      <Button onPress={() => setIsSignedIn?.(true)}>Sign in</Button>
    </View>
  );
}
