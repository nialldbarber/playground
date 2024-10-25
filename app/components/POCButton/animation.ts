import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

import type { ButtonAnimation } from "@/app/components/Button/types";

export function useButtonAnimations(
	isDisabled: boolean,
	animation: ButtonAnimation = "scale",
) {
	const scale = useSharedValue(1);
	const fade = useSharedValue(1);

	const handlePressIn = () => {
		if (isDisabled) return;
		if (animation === "scale") {
			scale.value = withTiming(0.97);
		} else if (animation === "fade") {
			fade.value = withTiming(0.7);
		}
	};

	const handlePressOut = () => {
		if (isDisabled) return;
		if (animation === "scale") {
			scale.value = withSpring(1);
		} else if (animation === "fade") {
			fade.value = withSpring(1);
		}
	};

	const animatedStyles = useAnimatedStyle(() => {
		return {
			opacity: fade.value,
			transform: [{ scale: scale.value }],
		};
	});

	return {
		handlePressIn,
		handlePressOut,
		animatedStyles,
	};
}
