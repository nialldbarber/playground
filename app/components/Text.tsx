import React, { useCallback } from "react";
import type { TextProps } from "react-native";
import { Text as NativeText } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { ColorKeys } from "@/app/design-system/colors";
import type { FontSize, FontWeight } from "@/app/design-system/tokens";
import { renderStringWithEmoji } from "@/app/design-system/utils/renderWithEmoji";

interface Props extends TextProps {
	size?: FontSize;
	weight?: FontWeight;
	color?: ColorKeys;
	withEmoji?: boolean;
}

export function Text({
	size = "base",
	weight = "normal",
	color = "black",
	withEmoji = false,
	children,
	...props
}: Props) {
	const { styles } = useStyles(stylesheet, { size, weight });

	const renderChildren = useCallback(() => {
		return React.Children.map(children, (child) => {
			if (typeof child === "string") {
				return withEmoji ? renderStringWithEmoji(child) : child;
			}
			if (React.isValidElement(child)) {
				return React.cloneElement(child, {
					// @ts-expect-error
					style: {
						...child.props.style,
						alignSelf: "baseline",
					},
				});
			}
			return child;
		});
	}, [children, withEmoji]);

	return (
		<NativeText
			style={styles.container(color)}
			maxFontSizeMultiplier={1.5}
			{...props}
		>
			{renderChildren()}
		</NativeText>
	);
}

const stylesheet = createStyleSheet(({ fontSize, fontWeight, colors }) => ({
	container: (color: ColorKeys) => ({
		color: colors[color],
		variants: {
			size: {
				xs: {
					fontSize: fontSize.xs,
				},
				sm: {
					fontSize: fontSize.sm,
				},
				base: {
					fontSize: fontSize.base,
				},
				lg: {
					fontSize: fontSize.lg,
				},
				xl: {
					fontSize: fontSize.xl,
				},
				"2xl": {
					fontSize: fontSize["2xl"],
				},
				"3xl": {
					fontSize: fontSize["3xl"],
				},
				"4xl": {
					fontSize: fontSize["4xl"],
				},
				"5xl": {
					fontSize: fontSize["5xl"],
				},
				"6xl": {
					fontSize: fontSize["6xl"],
				},
				"7xl": {
					fontSize: fontSize["7xl"],
				},
			},
			weight: {
				normal: {
					fontFamily: fontWeight.normal,
				},
				bold: {
					fontFamily: fontWeight.bold,
				},
				semibold: {
					fontFamily: fontWeight.semibold,
				},
				medium: {
					fontFamily: fontWeight.medium,
				},
				light: {
					fontFamily: fontWeight.light,
				},
			},
		},
	}),
}));
