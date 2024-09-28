import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Box } from "@/app/components/Box";
import { Button } from "@/app/components/Button/Button";
import { Divider } from "@/app/components/Divider";
import { Layout } from "@/app/components/Layout";
import { Progress } from "@/app/components/Progress/Progress";
import { Spinner } from "@/app/components/Spinner";
import { HStack } from "@/app/components/Stacks/HStack";
import { VStack } from "@/app/components/Stacks/VStack";
import { Text } from "@/app/components/Text";
import type { OnboardingSignUpScreenProps } from "@/app/navigation";

export function SignInScreen() {
	const { navigate } = useNavigation<OnboardingSignUpScreenProps>();
	const { styles } = useStyles(stylesheet);

	const [percent, setPercent] = useState(0);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const interval = setInterval(() => {
			setPercent(Math.random() * 100);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setLoading(true);
		}, 3000);
	}, []);

	return (
		<Layout>
			<VStack debug spacing="3" gap="4">
				<Button onPress={() => navigate("OnboardingScreen")}>Sign in</Button>
				<Button size="medium" variant="secondary">
					Add stuff
				</Button>
				<View style={styles.dividerContainer}>
					<Divider size="2" />
				</View>
				<View style={styles.dividerVertical}>
					<Divider orientation="vertical" size="2" />
				</View>
			</VStack>
			<HStack spacing="3" gap="4" debug>
				<Button>Sign in</Button>
				<Button size="medium" variant="secondary">
					Add stuff
				</Button>
			</HStack>
			<Progress value={percent} />
			{loading && (
				<Box spacing="10">
					<Spinner />
				</Box>
			)}
			<VStack spacing="3" gap="5">
				<View>
					<Text size="xl" weight="medium" color="grey800" withEmoji>
						lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
						🤪 quos. lorem ipsum dolor sit amet consectetur adipisicing elit..
						lorem ipsum dolor sit amet consectetur
					</Text>
				</View>
				<View>
					<Text size="xl" weight="bold" color="grey800">
						lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
						🤪 quos. lorem ipsum dolor sit amet consectetur adipisicing elit..
						lorem ipsum dolor sit amet consectetur
					</Text>
				</View>
			</VStack>
		</Layout>
	);
}

const stylesheet = createStyleSheet(({ spacing }) => ({
	dividerContainer: {
		paddingHorizontal: spacing[4],
	},
	dividerVertical: {
		alignItems: "center",
		paddingVertical: spacing[2],
		height: spacing[20],
	},
}));
