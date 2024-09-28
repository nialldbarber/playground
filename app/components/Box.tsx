import type { PropsWithChildren } from "react";
import type { ViewProps } from "react-native";
import { View } from "react-native";

import type { SizingProps } from "@/app/components/types";
import type { Spacing } from "@/app/design-system/tokens";
import { createStyleSheet, useStyles } from "react-native-unistyles";

interface Props
	extends PropsWithChildren<
			Pick<
				SizingProps,
				| "spacing"
				| "spacingTop"
				| "spacingBottom"
				| "spacingLeft"
				| "spacingRight"
			>
		>,
		ViewProps {}

export function Box({
	spacing,
	spacingTop,
	spacingBottom,
	spacingLeft,
	spacingRight,
	children,
	...rest
}: Props) {
	const { styles } = useStyles(stylesheet);
	return (
		<View
			style={styles.container(
				spacing,
				spacingTop,
				spacingBottom,
				spacingLeft,
				spacingRight,
			)}
			{...rest}
		>
			{children}
		</View>
	);
}

const stylesheet = createStyleSheet(({ spacing }) => ({
	container: (
		spacing,
		spacingTop,
		spacingBottom,
		spacingLeft,
		spacingRight,
	) => ({
		margin: spacing[spacing as Spacing] ?? spacing,
		marginTop: spacing[spacingTop as Spacing] ?? spacingTop,
		marginBottom: spacing[spacingBottom as Spacing] ?? spacingBottom,
		marginLeft: spacing[spacingLeft as Spacing] ?? spacingLeft,
		marginRight: spacing[spacingRight as Spacing] ?? spacingRight,
	}),
}));
