import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "@/app/components/Button/Button";
import { Text } from "@/app/components/Text";

type Props = {
	handleReferral: (url: string) => void;
};

export function ReferralLink({ handleReferral }: Props) {
	const { styles } = useStyles(stylesheet);

	return (
		<View>
			<Text size="lg" weight="bold">
				Share your link
			</Text>
			<View style={styles.container}>
				<View style={styles.copyContainer}>
					<Text numberOfLines={1} ellipsizeMode="tail">
						https://myrac.com/referral/1234567890423423424
					</Text>
				</View>
				<Button
					onPress={() =>
						handleReferral("https://myrac.com/referral/1234567890423423424")
					}
				>
					<Text color="white" weight="bold">
						Copy
					</Text>
				</Button>
			</View>
		</View>
	);
}

const stylesheet = createStyleSheet(({ colors, spacing, radii }) => ({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: colors.grey200,
		padding: spacing[3],
		borderRadius: radii.md,
	},
	copyContainer: {
		flex: 1,
		marginRight: spacing[2],
	},
}));
