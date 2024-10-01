import { BlurView } from "expo-blur";
import { useSetAtom } from "jotai";
import { Pressable } from "react-native";

import { Layout } from "@/app/components/Layout";
import { Text } from "@/app/components/Text";
import { isSignedInAtom } from "@/app/state/auth";

export function SignOutScreen() {
	const setIsSignedIn = useSetAtom(isSignedInAtom);

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
