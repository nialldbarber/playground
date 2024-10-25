import { TagRight } from "iconsax-react-native";
import type { PropsWithChildren } from "react";
import type {
	AccessibilityRole,
	PressableProps,
	ViewStyle,
} from "react-native";
import { Pressable, View } from "react-native";
import Animated from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { useButtonAnimations } from "@/app/components/POCButton/animation";
import { Text } from "@/app/components/Text";
import type { ColorKeys } from "@/app/design-system/colors";
import { useA11y } from "@/app/design-system/hooks/useA11y";

type Variant = "primary" | "secondary" | "tertiary";
type Size = "compact" | "full";
interface Props extends Omit<PressableProps, "role" | "style"> {
	variant?: Variant;
	size?: Size;
	color?: ColorKeys;
	isLoading?: boolean;
	isDisabled?: boolean;
	accessibilityLabel?: string;
	role?: AccessibilityRole;
	icon?: "chevron" | React.ReactNode;
	iconPosition?: "left" | "right";
	style?: ViewStyle;
}

export function POCButton({
	variant = "primary",
	size = "full",
	color,
	isLoading = false,
	isDisabled = false,
	accessibilityLabel,
	role,
	icon,
	iconPosition = "right",
	style,
	children,
	...rest
}: PropsWithChildren<Props>) {
	const { styles } = useStyles(stylesheet, { variant });
	const { animatedStyles, handlePressIn, handlePressOut } =
		useButtonAnimations(false);
	const a11yProps = useA11y({
		label: accessibilityLabel ?? `${children} button`,
		role: role as AccessibilityRole,
		state: { disabled: isDisabled, busy: isLoading },
	});

	return (
		<Animated.View
			style={[styles.container(size, isDisabled), animatedStyles, style]}
			{...a11yProps}
		>
			<Pressable
				style={styles.button(iconPosition)}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={isDisabled}
				{...rest}
			>
				<View style={styles.icon(iconPosition)}>
					{icon === "chevron" ? (
						<TagRight
							size="28"
							color={variant === "tertiary" ? "secondary" : "white"}
							variant="Bold"
						/>
					) : (
						icon
					)}
				</View>
				<Text
					size="xl"
					weight="bold"
					style={styles.text(color as ColorKeys, isDisabled)}
				>
					{children}
				</Text>
			</Pressable>
		</Animated.View>
	);
}

const stylesheet = createStyleSheet(({ colors, radii, spacing }) => ({
	container: (size: Size, isDisabled: boolean) => ({
		alignSelf: size === "full" ? "stretch" : "flex-start",
		position: "relative",
		borderRadius: radii.md,
		variants: {
			variant: {
				primary: {
					backgroundColor: isDisabled ? colors.grey400 : colors.primary,
				},
				secondary: {
					backgroundColor: isDisabled ? colors.grey400 : colors.secondary,
				},
				tertiary: {
					backgroundColor: isDisabled ? colors.grey400 : colors.transparent,
				},
			},
		},
	}),
	button: (iconPosition) => ({
		justifyContent: "center",
		alignItems: "center",
		padding: spacing[6],
		flexDirection: iconPosition === "left" ? "row" : "row-reverse",
	}),
	text: (color: ColorKeys, isDisabled: boolean) => ({
		variants: {
			variant: {
				primary: {
					color: isDisabled ? colors.grey500 : colors.white,
				},
				secondary: {
					color: isDisabled ? colors.grey500 : colors.white,
				},
				tertiary: {
					color: color ? colors[color] : colors.secondary,
				},
			},
		},
	}),
	icon: (iconPosition) => ({
		position: "absolute",
		...(iconPosition === "left" ? { left: spacing[4] } : { right: spacing[4] }),
	}),
}));
