import { Button } from "@/app/components/Button";
import { Layout } from "@/app/components/Layout";
import { OnboardingStackParamList } from "@/app/navigation";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

type IndividualPokemonScreenNavigationProp = NativeStackNavigationProp<
  OnboardingStackParamList,
  "OnboardingScreen"
>;

export function SignInScreen() {
  const { navigate } = useNavigation<IndividualPokemonScreenNavigationProp>();

  return (
    <Layout>
      <Button onPress={() => navigate("OnboardingScreen")}>Sign in</Button>
    </Layout>
  );
}
