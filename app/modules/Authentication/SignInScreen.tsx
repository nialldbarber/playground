import { Layout } from "@/app/components/Layout";
import { POCButton } from "@/app/components/POCButton/POCButton";
import { VStack } from "@/app/components/Stacks/VStack";
import { colors } from "@/app/design-system/colors";
import type { OnboardingSignUpScreenProps } from "@/app/navigation";
import { useNavigation } from "@react-navigation/native";

export function SignInScreen() {
	const { navigate } = useNavigation<OnboardingSignUpScreenProps>();

	return (
		<Layout>
			<VStack spacing="3" gap="4">
				<POCButton onPress={() => navigate("OnboardingScreen")}>
					Sign in
				</POCButton>
				<POCButton>Primary</POCButton>
				<POCButton variant="secondary">Secondary</POCButton>
				<POCButton variant="tertiary">Tertiary</POCButton>
				<POCButton icon="chevron">Hello</POCButton>
				<POCButton size="compact">Compact</POCButton>
				<POCButton style={{ backgroundColor: colors.blue600 }} icon="chevron">
					Yo!
				</POCButton>
			</VStack>
		</Layout>
	);
}
