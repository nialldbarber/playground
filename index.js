import { AppRegistry } from "react-native";
import App from "./App";
import { name as appName } from "./app.json";

import "./app/design-system/theme";

AppRegistry.registerComponent(appName, () => App);
