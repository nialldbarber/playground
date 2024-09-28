import {
	BlurMask,
	Canvas,
	Path,
	Skia,
	SweepGradient,
	vec,
} from "@shopify/react-native-skia";
import { useEffect, useMemo } from "react";
import { View } from "react-native";
import Animated, {
	Easing,
	FadeIn,
	FadeOut,
	interpolate,
	useAnimatedStyle,
	useDerivedValue,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

const CANVAS_SIZE = 100;
const CIRCLE_SIZE = 60;
const STROKE_WIDTH = 8;
const CANVAS_RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCLR_X_Y = CANVAS_SIZE / 2;

export function Spinner() {
	const { styles, theme } = useStyles(stylesheet);
	const loading = useSharedValue(0);

	const loadingPath = useMemo(() => {
		const path = Skia.Path.Make();
		path.addCircle(CIRCLR_X_Y, CIRCLR_X_Y, CANVAS_RADIUS);
		return path;
	}, []);

	useEffect(() => {
		loading.value = withRepeat(
			withTiming(1, { duration: 1000, easing: Easing.linear }),
			-1,
			false,
		);
	}, [loading]);

	const loadingStyle = useAnimatedStyle(
		() => ({
			transform: [{ rotate: `${loading.value * 2 * Math.PI}rad` }],
		}),
		[],
	);

	const loadingStartValue = useDerivedValue(() => {
		return interpolate(loading.value, [0, 0.5, 1], [0.3, 0.6, 0.3]);
	}, []);

	return (
		<View style={styles.container}>
			<Animated.View
				style={loadingStyle}
				entering={FadeIn.duration(300)}
				exiting={FadeOut.duration(300)}
			>
				<Canvas
					style={{
						width: CANVAS_SIZE,
						height: CANVAS_SIZE,
					}}
				>
					<Path
						path={loadingPath}
						style="stroke"
						strokeWidth={STROKE_WIDTH}
						strokeCap="round"
						color={theme.colors.blue200}
						start={loadingStartValue}
						end={1}
					>
						<SweepGradient
							c={vec(CIRCLR_X_Y, CIRCLR_X_Y)}
							colors={[theme.colors.primary]}
						/>
						<BlurMask blur={4} style="solid" />
					</Path>
				</Canvas>
			</Animated.View>
		</View>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
}));
