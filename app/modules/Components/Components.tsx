import { POCButton as Button } from "@/app/components//POCButton/POCButton";
import { Divider } from "@/app/components/Divider";
import { Layout } from "@/app/components/Layout";
import { VStack } from "@/app/components/Stacks/VStack";
import { Text } from "@/app/components/Text";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function Components() {
	const { styles } = useStyles(stylesheet);

	return (
		<Layout>
			<VStack spacing="5" gap="5">
				<Text size="4xl" weight="bold">
					Components
				</Text>
				<Text size="2xl" weight="bold">
					Button
				</Text>
				<Text weight="bold">Variant</Text>

				<VStack gap="3">
					<Button variant="primary">Primary</Button>
					<Button variant="secondary">Secondary</Button>
					<Button variant="tertiary">Tertiary</Button>
					<Button variant="ghost" color="blue700">
						Ghost
					</Button>
				</VStack>

				<Divider size="1" />
				<Text weight="bold">Size</Text>
				<VStack gap="3">
					<Button size="full">Full</Button>
					<Button size="compact" alignment="left">
						Compact
					</Button>
				</VStack>

				<Divider size="1" />
				<Text weight="bold">Loading</Text>
				<VStack gap="3">
					<Button isLoading={true}>Loading</Button>
				</VStack>

				<Divider size="1" />
				<Text weight="bold">Disabled</Text>
				<VStack gap="3">
					<Button isDisabled>Disabled</Button>
				</VStack>
			</VStack>
		</Layout>
	);
}

const stylesheet = createStyleSheet(({ colors, spacing }) => ({
	container: {
		backgroundColor: colors.blue700,
		padding: spacing[10],
	},
}));
