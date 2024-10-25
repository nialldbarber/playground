import {
	AutoEnvAttributes,
	LDProvider,
	ReactNativeLDClient,
} from "@launchdarkly/react-native-client-sdk";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { getUniqueId } from "react-native-device-info";

const client = new ReactNativeLDClient(
	"mob-8272ec9c-2403-4713-94e3-f57716c06c36",
	AutoEnvAttributes.Enabled,
	{
		debug: true,
	},
);

export function LaunchDarkly({ children }: PropsWithChildren) {
	const [context, setContext] = useState<{ kind: string; key: string } | null>(
		null,
	);

	useEffect(() => {
		async function initializeContext() {
			try {
				const deviceId = await getUniqueId();
				const newContext = {
					kind: "user",
					key: deviceId,
				};
				setContext(newContext);
				await client.identify(newContext);
				console.log("Identified user", newContext);
			} catch (error) {
				console.error("Error initializing LaunchDarkly context:", error);
			}
		}

		initializeContext();
	}, []);

	if (!context) return null;

	return <LDProvider client={client}>{children}</LDProvider>;
}
