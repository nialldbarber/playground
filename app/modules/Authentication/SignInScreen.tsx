import { Button } from "@/app/components/Button/Button";
import { Layout } from "@/app/components/Layout";
import { OnboardingStackParamList } from "@/app/navigation";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRef } from "react";

type IndividualPokemonScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  "OnboardingScreen"
>;

export function SignInScreen() {
  const { navigate } = useNavigation<IndividualPokemonScreenNavigationProp>();
  const ref = useRef(null);

  return (
    <Layout>
      <Button onPress={() => navigate("OnboardingScreen")}>Sign in</Button>
      <Button size="medium" variant="secondary">
        Add stuff
      </Button>
      <Button size="large" variant="tertiary">
        Add stuff
      </Button>
      <Button isDisabled>Disabled</Button>
      <Button ref={ref}>Ref</Button>
    </Layout>
  );
}
