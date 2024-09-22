import { theme } from "@/app/design-system/theme";
import { UnistylesRegistry } from "react-native-unistyles";

type AppThemes = {
  light: typeof theme;
};

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends AppThemes {}
}

UnistylesRegistry.addThemes({
  light: theme,
});
