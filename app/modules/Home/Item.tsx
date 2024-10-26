import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useNavigation } from "@react-navigation/native";
import { Pressable, useWindowDimensions } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

import type { HomeItemNavigation } from "@/app/navigation";

type Props = {
	id: number;
	index: number;
} & Partial<HomeItemNavigation>;

export function Item({ id, index }: Props) {
	const { navigate } = useNavigation<HomeItemNavigation>();
	const { width } = useWindowDimensions();
	const itemScale = useSharedValue(1);
	const { styles } = useStyles(stylesheet);

	const itemScaleStyles = useAnimatedStyle(() => ({
		transform: [{ scale: itemScale.value }],
	}));

	const itemWidth = width / 2 - 20;

	return (
		<Animated.View style={[styles.container(itemWidth), itemScaleStyles]}>
			<Pressable
				onPress={() => navigate("HomeItem", { id })}
				onPressIn={() => {
					itemScale.value = withSpring(0.97);
				}}
				onPressOut={() => {
					itemScale.value = withSpring(1);
				}}
			>
				<Animated.Image
					source={{ uri: `https://picsum.photos/id/${index + 100}/200` }}
					style={styles.image}
					sharedTransitionTag={`tag-${id}`}
				/>
			</Pressable>
		</Animated.View>
	);
}

const stylesheet = createStyleSheet(({ colors, radii }) => ({
	container: (width: number) => ({
		height: 200,
		width,
	}),
	image: {
		borderRadius: radii.lg,
		backgroundColor: colors.red400,
		width: "100%",
		height: 200,
		overflow: "hidden",
	},
}));
