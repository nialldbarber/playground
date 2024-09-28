import type { PropsWithChildren } from "react";
import { Children } from "react";
import flattenChildren from "react-keyed-flatten-children";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { SizingProps, StackOrientation } from "@/app/components/types";
import type { Spacing } from "@/app/design-system/tokens";

interface Props extends SizingProps, StackOrientation {}

export function Stack({
	orientation = "horizontal",
	spacing = "0",
	gap = "0",
	reverse = false,
	debug = false,
	children: childProp,
}: PropsWithChildren<Props>) {
	const children = flattenChildren(childProp);
	const { styles } = useStyles(stylesheet);

	const formattedChildren = reverse ? children.reverse() : children;

	return (
		<View style={styles.container(spacing, gap, debug, orientation)}>
			{Children.map(formattedChildren, (child, index) => {
				const first = index === 0;
				const last = index === children.length - 1;
				return (
					<View style={styles.item(gap, first, last, orientation)}>
						{child}
					</View>
				);
			})}
		</View>
	);
}

const stylesheet = createStyleSheet(({ spacing: _spacing }) => ({
	container: (spacing, gap, debug, orientation) => ({
		flexDirection: orientation === "horizontal" ? "row" : "column",
		gap: _spacing[gap as Spacing] ?? gap,
		margin: _spacing[spacing as Spacing] ?? spacing,
		backgroundColor: debug ? "rgba(255, 0, 0, 0.1)" : "transparent",
		borderWidth: debug ? 1 : 0,
		borderColor: debug ? "red" : "transparent",
		borderStyle: debug ? "dashed" : "solid",
	}),
	item: (gap, first, last, orientation) => ({
		...(orientation === "horizontal"
			? {
					paddingTop: first ? 0 : gap,
					paddingBottom: last ? 0 : gap,
				}
			: {
					paddingLeft: first ? 0 : gap,
					paddingRight: last ? 0 : gap,
				}),
	}),
}));
