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
import { Spinner } from "@/app/components/Spinner";
import { Text } from "@/app/components/Text";
import type { ColorKeys } from "@/app/design-system/colors";
import { useA11y } from "@/app/design-system/hooks/useA11y";

type Variant = "primary" | "secondary" | "tertiary" | "ghost";
type Size = "compact" | "full";
type Alignment = "left" | "center" | "right";

interface Props extends Omit<PressableProps, "role" | "style"> {
	variant?: Variant;
	size?: Size;
	color?: ColorKeys;
	backgroundColor?: ColorKeys;
	alignment?: Alignment;
	isLoading?: boolean;
	isDisabled?: boolean;
	accessibilityLabel?: string;
	role?: AccessibilityRole;
	icon?: "chevron" | React.ReactNode;
	iconPosition?: "left" | "right";
	underline?: boolean;
	style?: ViewStyle;
}

export function POCButton({
	variant = "primary",
	size = "full",
	color,
	alignment = "center",
	isLoading = false,
	isDisabled = false,
	accessibilityLabel,
	role,
	icon,
	iconPosition = "right",
	underline = false,
	style,
	children,
	...rest
}: PropsWithChildren<Props>) {
	const { styles } = useStyles(stylesheet, { variant });
	const {
		animatedStyles,
		animatedLoadingStyles,
		handlePressIn,
		handlePressOut,
	} = useButtonAnimations(false, "scale", isLoading);

	const a11yProps = useA11y({
		label: accessibilityLabel ?? `${children} button`,
		role: role as AccessibilityRole,
		state: { disabled: isDisabled, busy: isLoading },
	});

	return (
		<Animated.View
			style={[
				styles.container(size, alignment, isDisabled),
				animatedStyles,
				style,
			]}
			{...a11yProps}
		>
			<Pressable
				style={styles.button(iconPosition)}
				onPressIn={handlePressIn}
				onPressOut={handlePressOut}
				disabled={isDisabled || isLoading}
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
					style={styles.text(color as ColorKeys, isDisabled, underline)}
				>
					{children}
				</Text>
				<Animated.View
					style={[{ position: "absolute" }, animatedLoadingStyles]}
				>
					<Spinner
						color="white"
						blur={false}
						size={60}
						circleSize={30}
						strokeWidth={4}
					/>
				</Animated.View>
			</Pressable>
		</Animated.View>
	);
}

const stylesheet = createStyleSheet(({ colors, radii, spacing }) => ({
	container: (size: Size, alignment: Alignment, isDisabled: boolean) => ({
		alignSelf:
			size === "full"
				? "stretch"
				: alignment === "center"
					? "center"
					: alignment === "right"
						? "flex-end"
						: "flex-start",
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
				ghost: {
					backgroundColor: isDisabled ? colors.grey400 : colors.white,
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
	text: (color: ColorKeys, isDisabled: boolean, underline: boolean) => ({
		textDecorationLine: underline ? "underline" : "none",
		variants: {
			variant: {
				primary: {
					color: isDisabled
						? colors.grey500
						: color
							? colors[color]
							: colors.white,
				},
				secondary: {
					color: isDisabled
						? colors.grey500
						: color
							? colors[color]
							: colors.white,
				},
				tertiary: {
					color: isDisabled
						? colors.grey500
						: color
							? colors[color]
							: colors.secondary,
				},
				ghost: {
					color: isDisabled
						? colors.grey400
						: color
							? colors[color]
							: colors.transparent,
				},
			},
		},
	}),
	icon: (iconPosition) => ({
		position: "absolute",
		...(iconPosition === "left" ? { left: spacing[4] } : { right: spacing[4] }),
	}),
}));
