import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
} from "react-native-reanimated";

import { createStyleSheet, useStyles } from "react-native-unistyles";

type Props = {
	/** should be between 0 and 100 */
	value: number;
};

export function Progress({ value }: Props) {
	const { styles } = useStyles(stylesheet);

	const _value = useSharedValue(value);

	const _valueStyles = useAnimatedStyle(() => ({
		width: `${_value.value}%`,
	}));

	useEffect(() => {
		_value.value = withSpring(value, {
			stiffness: 50,
			damping: 10,
		});
	}, [value, _value]);

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.progress(value), _valueStyles]} />
		</View>
	);
}

const stylesheet = createStyleSheet(({ spacing, colors, radii }) => ({
	container: {
		height: spacing[5],
		backgroundColor: colors.grey400,
		borderRadius: radii.full,
		marginHorizontal: spacing[2],
		overflow: "hidden",
	},
	progress: (value: number) => ({
		height: spacing.full,
		backgroundColor: colors.red700,
	}),
}));
