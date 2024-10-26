import React, { useState } from "react";
import { View, useWindowDimensions } from "react-native";

import { Button } from "@/app/components/Button/Button";
import { Layout } from "@/app/components/Layout";
import { Skeleton } from "@/app/components/Skeleton";
import { Text } from "@/app/components/Text";
import { useGetWords } from "@/app/modules/Words/words.queries";
import { FadeIn } from "@/app/utils/animations";
import { createStyleSheet, useStyles } from "react-native-unistyles";

export function WordScreen() {
	const { width } = useWindowDimensions();
	const words = useGetWords();
	const { styles } = useStyles(stylesheet);
	const [revealedIndices, setRevealedIndices] = useState<number[]>([]);

	const handleRevealNext = () => {
		if (words?.data?.at(0)?.basics) {
			const nextIndex = revealedIndices.length;
			if (nextIndex < words.data[0].basics.length) {
				setRevealedIndices([...revealedIndices, nextIndex]);
			}
		}
	};

	return (
		<>
			<Layout>
				<View style={styles.container}>
					<Text size="4xl" weight="bold">
						Words
					</Text>
				</View>
				<View>
					{words.isLoading && (
						<View style={styles.skeletonContainer}>
							<Skeleton.Group count={20}>
								<Skeleton
									isLoading={words.isLoading}
									width={width - 20}
									height={40}
									style={{
										marginBottom: 15,
										alignSelf: "center",
										borderRadius: 8,
									}}
								/>
							</Skeleton.Group>
						</View>
					)}
					<FadeIn isReady={words.isSuccess}>
						{words?.data?.at(0)?.basics.map((flashcard, index) => (
							<View key={index} style={styles.words}>
								<Text size="lg" weight="bold">
									{flashcard.english}
								</Text>
								<Text size="lg" weight="bold">
									{revealedIndices.includes(index) ? flashcard.latvian : "???"}
								</Text>
							</View>
						))}
					</FadeIn>
				</View>
			</Layout>
			<Button onPress={handleRevealNext}>Reveal next</Button>
		</>
	);
}

const stylesheet = createStyleSheet(({ spacing }) => ({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 3,
		paddingHorizontal: 5,
	},
	skeletonContainer: {
		marginTop: spacing[5],
	},
	words: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing[5],
		paddingVertical: spacing[6],
	},
}));
