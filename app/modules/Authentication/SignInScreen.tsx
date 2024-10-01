import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "@/app/components/Button/Button";
import { Divider } from "@/app/components/Divider";
import { Layout } from "@/app/components/Layout";
import { VStack } from "@/app/components/Stacks/VStack";
import { Text } from "@/app/components/Text";
import type { OnboardingSignUpScreenProps } from "@/app/navigation";

export function SignInScreen() {
	const { navigate } = useNavigation<OnboardingSignUpScreenProps>();
	const { styles } = useStyles(stylesheet);
	const [loading, setLoading] = useState(true);

	const [intervalLoading, setIntervalLoading] = useState(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setIntervalLoading((prev) => !prev);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 3000);
	}, []);

	return (
		<Layout isLoading={loading}>
			<VStack debug spacing="3" gap="4">
				<View style={styles.buttonContainer}>
					<Button
						variant="primary"
						onPress={() => navigate("OnboardingScreen")}
					>
						Sign in
					</Button>
				</View>
			</VStack>
			<VStack spacing="3" gap="5">
				<View>
					<Text size="xs" weight="medium" color="grey800" withEmoji>
						lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
						🤪 quos. lorem ipsum dolor sit amet consectetur adipisicing elit..
						lorem ipsum dolor sit amet consectetur
					</Text>
					<Divider size="5" visible={false} />
					<Text size="sm" weight="medium" color="grey800" withEmoji>
						lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
						🤪 quos. lorem ipsum dolor sit amet consectetur adipisicing elit..
						lorem ipsum dolor sit amet consectetur
					</Text>
					<Divider size="5" visible={false} />
					<Text weight="medium" color="grey800" withEmoji>
						lorem ipsum dolor sit amet consectetur{" "}
						<Text weight="bold" color="primary">
							YOOYOYOYO{" "}
						</Text>
						elit. Quisquam, 🤪 quos. lorem ipsum dolor sit amet consectetur
						adipisicing elit.. lorem ipsum dolor sit amet consectetur
					</Text>
					<Divider size="5" visible={false} />
					<Text size="xl" weight="medium" color="grey800" withEmoji>
						lorem ipsum dolor sit amet consectetur <Text>YOOYOYOYO </Text>
						elit. Quisquam, 🤪 quos. lorem ipsum dolor sit amet consectetur
						adipisicing elit.. lorem ipsum dolor sit amet consectetur
					</Text>
					<Divider size="5" visible={false} />
					<VStack gap="4">
						<Button size="small" isLoading={intervalLoading}>
							small
						</Button>
						<Button size="small">small</Button>
						<Button size="medium" variant="secondary">
							medium
						</Button>
						<Button size="large" variant="tertiary">
							large
						</Button>
						{/* <Button>With icon</Button> */}
					</VStack>
				</View>
			</VStack>
		</Layout>
	);
}

const stylesheet = createStyleSheet(({ spacing }) => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	dividerContainer: {
		paddingHorizontal: spacing[4],
	},
	dividerVertical: {
		alignItems: "center",
		paddingVertical: spacing[2],
		height: spacing[20],
	},
	buttonContainer: {
		padding: spacing[4],
	},
}));
