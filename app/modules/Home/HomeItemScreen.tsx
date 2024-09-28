import { Button } from "@/app/components/Button/Button";
import { Share, Text, View } from "react-native";
import Animated from "react-native-reanimated";

import { ReferralLink } from "@/app/components/ReferralLink";
import type { HomeStackParamList } from "@/app/navigation";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export type HomeItemNavProps = NativeStackScreenProps<
	HomeStackParamList,
	"HomeItem"
>;

export function HomeItemScreen() {
	const { goBack } = useNavigation<HomeItemNavProps["navigation"]>();
	const { params } = useRoute<HomeItemNavProps["route"]>();
	const { styles } = useStyles(stylesheet);

	const handleShare = async (url: string) => {
		Share.share({
			message: "yo this is a message",
			url,
		});
	};

	return (
		<>
			<Animated.Image
				source={{ uri: `https://picsum.photos/id/${params?.id}/1000` }}
				style={styles.coverImage}
				sharedTransitionTag={`tag-${params?.id}`}
			/>
			<View style={styles.container}>
				<Text style={styles.title}>Home Item</Text>
				<Button
					onPress={goBack}
					className="bg-red-400 p-3 rounded-md my-3 w-full"
				>
					<Text className="text-white text-center font-bold">Go back</Text>
				</Button>
				<View className="mt-5">
					<ReferralLink handleReferral={handleShare} />
				</View>
			</View>
		</>
	);
}

const stylesheet = createStyleSheet(({ spacing, fontSize, fontWeight }) => ({
	coverImage: {
		width: spacing.full,
		height: spacing[80],
	},
	container: {
		padding: spacing[5],
	},
	title: {
		fontSize: fontSize["4xl"],
		fontWeight: fontWeight.bold,
	},
}));
