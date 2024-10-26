import { getVersion } from "react-native-device-info";

export const appVersion = __DEV__ ? "8.25.1" : getVersion();

export function isAppVersionCompatible(stableAppVersion: string) {
	return Number(appVersion) >= Number(stableAppVersion);
}
