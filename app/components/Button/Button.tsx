import type { PropsWithChildren } from "react";
import { forwardRef, useCallback } from "react";
import type {
	GestureResponderEvent,
	PressableProps,
	ViewStyle,
} from "react-native";
import { Pressable, Text } from "react-native";
import Animated from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useButtonAnimations } from "@/app/components/Button/animations";
import type {
	ButtonAnimation,
	ButtonSize,
	ButtonVariant,
} from "@/app/components/Button/types";

interface Props extends PressableProps {
	style?: ViewStyle;
	className?: string;
	variant?: ButtonVariant;
	size?: ButtonSize;
	isDisabled?: boolean;
	isLoading?: boolean;
	animation?: ButtonAnimation;
	accessibilityLabel?: string;
}

export const Button = forwardRef<Animated.View, PropsWithChildren<Props>>(
	(
		{
			variant = "primary",
			size = "medium",
			isDisabled = false,
			isLoading = false,
			animation = "scale",
			onPress,
			className,
			role = "button",
			style,
			children,
			accessibilityLabel,
			...rest
		},
		ref,
	) => {
		const { styles } = useStyles(stylesheet, { variant, size, isDisabled });
		const { handlePressIn, handlePressOut, animatedStyles } =
			useButtonAnimations(isDisabled, animation);

		const handlePress = useCallback(
			(event: GestureResponderEvent) => {
				if (isDisabled || isLoading) return;
				onPress?.(event);
			},
			[isDisabled, isLoading, onPress],
		);
		const a11yLabel = accessibilityLabel ?? `${children} button`;

		return (
			<Animated.View
				ref={ref}
				style={[animatedStyles, styles.container, style]}
				className={className}
				accessible
				accessibilityLabel={a11yLabel}
				accessibilityState={{ disabled: isDisabled, busy: isLoading }}
			>
				<Pressable
					role={role}
					onPress={handlePress}
					onPressIn={handlePressIn}
					onPressOut={handlePressOut}
					style={styles.button}
					{...rest}
				>
					<Text style={styles.text}>{children}</Text>
				</Pressable>
			</Animated.View>
		);
	},
);

const stylesheet = createStyleSheet(({ colors, units, fontSize, radii }) => ({
	container: {
		position: "relative",
		flex: 1,
		backgroundColor: colors.blue400,
		borderRadius: radii.md,
		variants: {
			variant: {
				primary: {
					backgroundColor: colors.blue400,
				},
				secondary: {
					backgroundColor: colors.green400,
				},
				tertiary: {
					backgroundColor: colors.red400,
				},
			},
			isDisabled: {
				true: {
					backgroundColor: colors.grey300,
				},
			},
		},
	},
	button: {
		justifyContent: "center",
		alignItems: "center",
		padding: units[4],
		variants: {
			size: {
				small: {
					padding: units[2],
				},
				medium: {
					padding: units[4],
				},
				large: {
					padding: units[8],
				},
			},
		},
	},
	text: {
		color: colors.white,
		fontSize: fontSize.base,
		fontWeight: "bold",
		variants: {
			isDisabled: {
				true: {
					color: colors.grey600,
				},
			},
		},
	},
}));
