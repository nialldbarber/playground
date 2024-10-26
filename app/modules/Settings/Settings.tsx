import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useSetAtom } from "jotai";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "@/app/components/Button/Button";
import { Divider } from "@/app/components/Divider";
import { Layout } from "@/app/components/Layout";
import { isSignedInAtom } from "@/app/state/auth";

export function SettingsScreen() {
	const { goBack } = useNavigation();
	const setIsSignedIn = useSetAtom(isSignedInAtom);
	const { styles } = useStyles(stylesheet);

	return (
		<View style={styles.container}>
			<BlurView intensity={30} tint="dark" style={styles.blurView} />
			<Layout>
				<View style={styles.modal}>
					<Button onPress={goBack}>Go to Home</Button>
					<Divider size="5" visible={false} />
					<Button variant="secondary" onPress={() => setIsSignedIn?.(false)}>
						Log out
					</Button>
				</View>
			</Layout>
		</View>
	);
}

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
	},
	modal: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	blurView: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
}));
