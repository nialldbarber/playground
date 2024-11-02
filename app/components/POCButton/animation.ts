import {
	useAnimatedStyle,
	useSharedValue,
	withSpring,
	withTiming,
} from "react-native-reanimated";

import type { ButtonAnimation } from "@/app/components/Button/types";
import { useEffect } from "react";

export function useButtonAnimations(
	isDisabled: boolean,
	animation: ButtonAnimation = "scale",
	isLoading = false,
) {
	const scale = useSharedValue(1);
	const fade = useSharedValue(1);

	const loadingOpacity = useSharedValue(0);
	const loadingPosition = useSharedValue(50);

	useEffect(() => {
		if (isLoading) {
			loadingOpacity.value = withTiming(1);
			loadingPosition.value = withSpring(10);
		} else {
			loadingOpacity.value = withTiming(0);
			loadingPosition.value = withTiming(50);
		}
	}, [isLoading]);

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

	const animatedStyles = useAnimatedStyle(() => ({
		opacity: fade.value,
		transform: [{ scale: scale.value }],
	}));
	const animatedLoadingStyles = useAnimatedStyle(() => ({
		opacity: loadingOpacity.value,
		right: loadingPosition.value,
	}));

	return {
		handlePressIn,
		handlePressOut,
		animatedStyles,
		animatedLoadingStyles,
	};
}
