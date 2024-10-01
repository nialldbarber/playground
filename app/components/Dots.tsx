import { Pressable, View } from "react-native";
import type { SharedValue } from "react-native-reanimated";
import Animated, {
	useAnimatedStyle,
	withSpring,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const DOTS_SIZE = 15;
const DOTS_GAP = 30;

type DotProps = {
	index: number;
	activeIndex: SharedValue<number>;
	size: number;
	goToScreen: (index: number) => void;
};
function Dot({ index, activeIndex, size, goToScreen }: DotProps) {
	const dotStyle = useAnimatedStyle(() => {
		const isDotActive = index <= activeIndex.value;
		return {
			opacity: withTiming(isDotActive ? 1 : 0.5, {
				duration: 150,
			}),
		};
	}, []);

	return (
		<Animated.View
			style={[
				{
					backgroundColor: "white",
					width: size,
					height: size,
					borderRadius: size / 2,
				},
				dotStyle,
			]}
		>
			<Pressable
				onPress={() => goToScreen(index)}
				style={{
					position: "absolute",
					borderRadius: 12,
					top: -20,
					left: -15,
					right: -15,
					bottom: -20,
				}}
			/>
		</Animated.View>
	);
}

type DotsProps = {
	count: number;
	activeIndex: SharedValue<number>;
	goToScreen: (index: number) => void;
};
export function Dots({ count, activeIndex, goToScreen }: DotsProps) {
	const { styles } = useStyles(stylesheet);
	const containerStyle = useAnimatedStyle(() => {
		const width =
			DOTS_SIZE * (activeIndex.value + 1) + DOTS_GAP * (activeIndex.value + 1);

		return {
			width: withSpring(width, { mass: 0.6 }),
		};
	}, []);

	return (
		<View style={styles.container}>
			{new Array(count).fill(0).map((_, index) => (
				<Dot
					key={`${index}-dot`}
					index={index}
					activeIndex={activeIndex}
					size={DOTS_SIZE}
					goToScreen={goToScreen}
				/>
			))}
			<Animated.View style={[styles.dot, containerStyle]} />
		</View>
	);
}

const stylesheet = createStyleSheet(({ spacing }) => ({
	container: {
		flexDirection: "row",
		gap: DOTS_GAP,
	},
	dot: {
		position: "absolute",
		left: -DOTS_GAP / 2,
		top: -DOTS_SIZE,
		height: DOTS_SIZE * 3,
		borderRadius: DOTS_SIZE * 2,
		borderCurve: "continuous",
		backgroundColor: "#66e070",
		zIndex: -1,
	},
}));
