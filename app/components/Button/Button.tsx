import type { PropsWithChildren } from "react";
import { forwardRef, useCallback } from "react";
import type {
	AccessibilityRole,
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
import { useA11y } from "@/app/design-system/hooks/useA11y";

interface Props extends PressableProps {
	style?: ViewStyle;
	width?: "compact" | "full";
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
			width = "compact",
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

		const a11yProps = useA11y({
			label: accessibilityLabel ?? `${children} button`,
			role: role as AccessibilityRole,
			state: { disabled: isDisabled, busy: isLoading },
		});

		const handlePress = useCallback(
			(event: GestureResponderEvent) => {
				if (isDisabled || isLoading) return;
				onPress?.(event);
			},
			[isDisabled, isLoading, onPress],
		);

		return (
			<Animated.View
				ref={ref}
				style={[animatedStyles, styles.container(width), style]}
				className={className}
				{...a11yProps}
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

const stylesheet = createStyleSheet(({ colors, spacing, fontSize, radii }) => ({
	container: (width: "compact" | "full") => ({
		position: "relative",
		flex: width === "full" ? 1 : undefined,
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
	}),
	button: {
		justifyContent: "center",
		alignItems: "center",
		padding: spacing[4],
		variants: {
			size: {
				small: {
					padding: spacing[2],
				},
				medium: {
					padding: spacing[4],
				},
				large: {
					padding: spacing[8],
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
