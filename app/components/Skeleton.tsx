import { Canvas, LinearGradient, Rect, vec } from "@shopify/react-native-skia";
import React, { type PropsWithChildren, useEffect } from "react";
import type { ViewStyle } from "react-native";
import { StyleSheet, View } from "react-native";
import Animated, {
	Easing,
	useAnimatedStyle,
	useSharedValue,
	withRepeat,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { spacing } from "@/app/design-system/tokens";

type SkeletonProps = {
	isLoading: boolean;
	width: number;
	height: number;
	style?: ViewStyle;
};

export const Skeleton = ({
	isLoading,
	width,
	height,
	style,
	children,
}: PropsWithChildren<SkeletonProps>) => {
	const { styles } = useStyles(stylesheet);
	const animatedValue = useSharedValue(-1);
	const skeletonOpacity = useSharedValue(1);
	const contentOpacity = useSharedValue(0);

	useEffect(() => {
		animatedValue.value = withRepeat(
			withTiming(1, { duration: 1000, easing: Easing.linear }),
			-1,
			false,
		);
	}, []);

	useEffect(() => {
		if (!isLoading) {
			skeletonOpacity.value = withTiming(0, {
				duration: 250,
				easing: Easing.linear,
			});
			contentOpacity.value = withTiming(1, {
				duration: 250,
				easing: Easing.linear,
			});
		} else {
			skeletonOpacity.value = withTiming(1, { duration: 0 });
			contentOpacity.value = withTiming(0, { duration: 0 });
		}
	}, [isLoading]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: animatedValue.value * width }],
	}));

	const skeletonStyle = useAnimatedStyle(() => ({
		opacity: skeletonOpacity.value,
		zIndex: skeletonOpacity.value === 0 ? -1 : 1,
	}));

	const contentStyle = useAnimatedStyle(() => ({
		opacity: contentOpacity.value,
	}));

	return (
		<Animated.View style={[{ width, height, ...styles.skeleton }, style]}>
			<Animated.View style={[StyleSheet.absoluteFill, contentStyle]}>
				{children}
			</Animated.View>
			<Animated.View
				style={[StyleSheet.absoluteFill, skeletonStyle]}
				pointerEvents={isLoading ? "auto" : "none"}
			>
				<Canvas style={StyleSheet.absoluteFill}>
					<Rect x={0} y={0} width={width} height={height} color="#E0E0E0" />
				</Canvas>
				<Animated.View style={[StyleSheet.absoluteFill, animatedStyle]}>
					<Canvas style={StyleSheet.absoluteFill}>
						<Rect x={0} y={0} width={width * 0.5} height={height}>
							<LinearGradient
								start={vec(0, 0)}
								end={vec(width * 0.5, 0)}
								colors={[
									"rgba(255, 255, 255, 0)",
									"rgba(255, 255, 255, 0.5)",
									"rgba(255, 255, 255, 0)",
								]}
								positions={[0, 0.5, 1]}
							/>
						</Rect>
					</Canvas>
				</Animated.View>
			</Animated.View>
		</Animated.View>
	);
};

type GroupProps = {
	count: number;
	style?: ViewStyle;
};

Skeleton.Group = function SkeletonGroup({
	count,
	style,
	children,
}: PropsWithChildren<GroupProps>) {
	return (
		<View style={style}>
			{Array.from({ length: count }).map((_, index) => (
				<View
					key={`skeleton-${index + 1}`}
					style={{ marginBottom: spacing[2] }}
				>
					{React.Children.only(children)}
				</View>
			))}
		</View>
	);
};

const stylesheet = createStyleSheet(() => ({
	skeleton: {
		overflow: "hidden",
	},
}));
