import type { PropsWithChildren, ReactNode } from "react";
import { forwardRef, useCallback } from "react";
import type {
	AccessibilityRole,
	GestureResponderEvent,
	PressableProps,
	ViewStyle,
} from "react-native";
import { Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useButtonAnimations } from "@/app/components/Button/animations";
import type {
	ButtonAnimation,
	ButtonSize,
	ButtonVariant,
} from "@/app/components/Button/types";
import { Spinner } from "@/app/components/Spinner";
import { Text } from "@/app/components/Text";
import { useA11y } from "@/app/design-system/hooks/useA11y";
import { trackEvent } from "@/app/utils/tracking";

interface Props extends PressableProps {
	style?: ViewStyle;
	width?: "compact" | "full";
	variant?: ButtonVariant;
	size?: ButtonSize;
	type?: "full" | "icon";
	isDisabled?: boolean;
	isLoading?: boolean;
	animation?: ButtonAnimation;
	icon?: ReactNode;
	iconPosition?: "left" | "right" | "center";
	accessibilityLabel?: string;
	tracking?: {
		eventName: string;
		data: Record<string, string>;
	};
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
			role = "button",
			style,
			children,
			accessibilityLabel,
			tracking,
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
				tracking?.eventName &&
					tracking.data &&
					trackEvent(tracking.eventName, tracking.data);
			},
			[isDisabled, isLoading, onPress, tracking],
		);

		return (
			<Animated.View
				ref={ref}
				style={[animatedStyles, styles.container(width), style]}
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
					{isLoading && (
						<Animated.View entering={FadeIn} exiting={FadeOut}>
							<Spinner
								color="white"
								size={33.33}
								circleSize={20}
								strokeWidth={3}
								blur={false}
							/>
						</Animated.View>
					)}
					{!isLoading && (
						<Animated.View entering={FadeIn} exiting={FadeOut}>
							<Text style={styles.text}>{children}</Text>
						</Animated.View>
					)}
				</Pressable>
			</Animated.View>
		);
	},
);

const stylesheet = createStyleSheet(
	({ colors, spacing, fontSize, fontWeight, radii }) => ({
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
			paddingHorizontal: spacing[4],
			variants: {
				size: {
					small: {
						height: spacing[12],
					},
					medium: {
						height: spacing[16],
					},
					large: {
						height: spacing[20],
					},
				},
			},
		},
		text: {
			color: colors.white,
			fontFamily: fontWeight.bold,
			variants: {
				size: {
					small: {
						fontSize: fontSize.sm,
					},
					medium: {
						fontSize: fontSize.lg,
					},
					large: {
						fontSize: fontSize["2xl"],
					},
				},
				isDisabled: {
					true: {
						color: colors.grey600,
					},
				},
			},
		},
	}),
);
