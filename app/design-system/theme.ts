import { UnistylesRegistry } from "react-native-unistyles";

import { colors } from "@/app/design-system/colors";
import {
	fontSize,
	fontWeight,
	lineHeight,
	radii,
	spacing,
} from "@/app/design-system/tokens";

export const theme = {
	colors,
	spacing,
	fontSize,
	fontWeight,
	lineHeight,
	radii,
} as const;

type AppThemes = {
	light: typeof theme;
};

declare module "react-native-unistyles" {
	export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
	light: theme,
});
