import { useLDClient } from "@launchdarkly/react-native-client-sdk";

import { Button } from "@/app/components/Button/Button";
import { Text } from "@/app/components/Text";
import { View } from "react-native";

export function NewSignInButton() {
	const ldc = useLDClient();

	return (
		<View>
			<Text>New Sign In Screen</Text>
			<Button
				variant="tertiary"
				onPress={() => ldc.track("new-login-button-press")}
			>
				New Press me!
			</Button>
		</View>
	);
}

export function OldNewSignInButton() {
	const ldc = useLDClient();

	return (
		<View>
			<Text>Old Sign In Screen</Text>
			<Button
				variant="secondary"
				onPress={() => ldc.track("new-login-button-press")}
			>
				Old Press me!
			</Button>
		</View>
	);
}
