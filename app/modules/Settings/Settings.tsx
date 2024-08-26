import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { Pressable, Text, View } from "react-native";

import { Layout } from "@/app/components/Layout";
import { AuthContext } from "@/app/state/auth";

export function SettingsScreen() {
	const { goBack } = useNavigation();
	const { setIsSignedIn } = useContext(AuthContext);

	return (
		<Layout>
			<View className="flex-1 justify-center items-center">
				<Pressable onPress={goBack} className="bg-blue-400 p-3 rounded-md">
					<Text className="text-white font-bold">Go to Home</Text>
				</Pressable>
				<Pressable onPress={() => setIsSignedIn?.(false)} className="bg-red-400 p-3 rounded-md">
					<Text className="text-white font-bold">Log out</Text>
				</Pressable>
			</View>
		</Layout>
	);
}
