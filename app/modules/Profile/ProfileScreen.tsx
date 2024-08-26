import { Layout } from "@/app/components/Layout";
import { Text, View } from "react-native";

export function ProfileScreen() {
	return (
		<Layout>
			<View className="flex-row justify-between items-center py-3 px-5">
				<Text className="text-4xl font-bold">Profile</Text>
			</View>
		</Layout>
	)
}
