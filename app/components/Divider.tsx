import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import type { ColorKeys } from "@/app/design-system/colors";
import type { Spacing } from "@/app/design-system/tokens";
import { radii, spacing } from "@/app/design-system/tokens";

type Props = {
	color?: ColorKeys;
	size?: Spacing;
	orientation?: "horizontal" | "vertical";
};

export function Divider({
	color = "grey500",
	size = "px",
	orientation = "horizontal",
}: Props) {
	const { styles } = useStyles(stylesheet, { orientation });

	return <View style={styles.container(color, size)} />;
}

const stylesheet = createStyleSheet(({ colors }) => ({
	container: (_color: ColorKeys, size: Spacing) => ({
		borderRadius: radii.full,
		variants: {
			orientation: {
				horizontal: {
					width: "100%",
					height: spacing[size],
					backgroundColor: colors[_color],
				},
				vertical: {
					width: spacing[size],
					height: "100%",
					backgroundColor: colors[_color],
				},
			},
		},
	}),
}));
