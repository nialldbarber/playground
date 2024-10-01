import { useNavigation, useRoute } from "@react-navigation/native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
	ScrollView,
	Share,
	StyleSheet,
	View,
	useWindowDimensions,
} from "react-native";
import Animated from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "@/app/components/Button/Button";
import { ReferralLink } from "@/app/components/ReferralLink";
import { Text } from "@/app/components/Text";
import type { HomeStackParamList } from "@/app/navigation";
export type HomeItemNavProps = NativeStackScreenProps<
	HomeStackParamList,
	"HomeItem"
>;

export function HomeItemScreen() {
	const { goBack } = useNavigation<HomeItemNavProps["navigation"]>();
	const { params } = useRoute<HomeItemNavProps["route"]>();
	const { styles, theme } = useStyles(stylesheet);
	const { width } = useWindowDimensions();

	const handleShare = async (url: string) => {
		Share.share({
			message: "yo this is a message",
			url,
		});
	};

	return (
		<ScrollView>
			<Animated.Image
				source={{ uri: `https://picsum.photos/id/${params?.id}/500` }}
				style={styles.coverImage}
				sharedTransitionTag={`tag-${params?.id}`}
			/>
			{/* <Canvas style={styles.canvas}>
				<Rect x={0} y={0} width={width} height={theme.spacing[80]}>
					<LinearGradient
						colors={["transparent", "transparent", theme.colors.white]}
						start={vec(0, 0)}
						end={vec(0, theme.spacing[80])}
					/>
				</Rect>
			</Canvas> */}
			<View style={styles.container}>
				<Text style={styles.title}>Home Item</Text>
				<View style={styles.goBackButton}>
					<Button onPress={goBack}>Go back</Button>
				</View>
				<View style={styles.referralLink}>
					<ReferralLink handleReferral={handleShare} />
				</View>
			</View>
		</ScrollView>
	);
}

const stylesheet = createStyleSheet(({ spacing, fontSize, fontWeight }) => ({
	coverImage: {
		width: spacing.full,
		height: spacing[80],
	},
	canvas: {
		height: spacing[80],
		...StyleSheet.absoluteFillObject,
	},
	container: {
		padding: spacing[5],
	},
	title: {
		fontSize: fontSize["4xl"],
		fontFamily: fontWeight.bold,
	},
	goBackButton: {
		marginTop: spacing[5],
	},
	referralLink: {
		marginTop: spacing[5],
	},
}));
