import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

import { AuthContext } from "@/app/state/auth";

export function SignOutScreen() {
	const { setIsSignedIn } = useContext(AuthContext);

	return (
		<View>
			<Pressable onPress={() => setIsSignedIn?.(false)}>
				<Text>Sign out!</Text>
			</Pressable>
		</View>
	);
}
