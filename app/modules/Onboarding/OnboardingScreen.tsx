import { useSetAtom } from "jotai";
import { type PropsWithChildren, useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withTiming,
} from "react-native-reanimated";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "@/app/components/Button/Button";
import { Dots } from "@/app/components/Dots";
import { Layout } from "@/app/components/Layout";
import { Text } from "@/app/components/Text";
import { isSignedInAtom } from "@/app/state/auth";

const ORANGE = "rgba(249, 81, 8, 1)";
const ORANGE_ONE = "rgba(249, 81, 8, 0.9)";
const ORANGE_TWO = "rgba(249, 81, 8, 0.8)";

function SectionWrapper({
	isActive,
	backgroundColor,
	children,
}: PropsWithChildren<{
	isActive: boolean;
	backgroundColor: string;
}>) {
	const { width, height } = useWindowDimensions();
	const { styles } = useStyles(stylesheet);

	const opacity = useSharedValue(0);
	const transformY = useSharedValue(30);

	const animatedStyles = useAnimatedStyle(
		() => ({
			opacity: opacity.value,
			transform: [
				{
					translateY: transformY.value,
				},
			],
		}),
		[],
	);

	useEffect(() => {
		if (isActive) {
			opacity.value = withDelay(180, withTiming(1));
			transformY.value = withDelay(180, withTiming(0));
		} else {
			opacity.value = withDelay(180, withTiming(0));
			transformY.value = withDelay(180, withTiming(30));
		}
	}, [isActive, opacity, transformY]);

	return (
		<View style={[{ backgroundColor }]}>
			<Animated.View
				style={[{ width, height }, styles.section, animatedStyles]}
			>
				{children}
			</Animated.View>
		</View>
	);
}

export function OnboardingScreen() {
	const setIsSignedIn = useSetAtom(isSignedInAtom);

	const { width } = useWindowDimensions();
	const translateX = useSharedValue(0);
	const currentIndex = useSharedValue(0);

	const { styles } = useStyles(stylesheet);

	const [currentIndexText, setCurrentIndexText] = useState(0);
	const updateCurrentIndexState = (value: number) => {
		setCurrentIndexText(value);
	};

	const panGesture = Gesture.Pan()
		.onUpdate((event) => {
			translateX.value = -currentIndex.value * width + event.translationX;
		})
		.onEnd((event) => {
			const direction = event.translationX > 0 ? -1 : 1;
			const nextIndex = currentIndex.value + direction;

			if (Math.abs(event.translationX) > width / 2) {
				if (nextIndex >= 0 && nextIndex <= 2) {
					currentIndex.value = nextIndex;
					runOnJS(updateCurrentIndexState)(nextIndex);
				}
			}

			translateX.value = withTiming(-currentIndex.value * width);
		});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: translateX.value }],
		};
	});

	const goToScreen = (index: number) => {
		currentIndex.value = index;
		translateX.value = withTiming(-index * width);
		updateCurrentIndexState(index);
	};

	return (
		<>
			<Layout>
				<GestureDetector gesture={panGesture}>
					<Animated.View style={[{ flexDirection: "row" }, animatedStyle]}>
						<SectionWrapper
							isActive={currentIndexText === 0}
							backgroundColor={ORANGE}
						>
							<Text color="white" size="4xl" weight="bold">
								Name
							</Text>
						</SectionWrapper>
						<SectionWrapper
							isActive={currentIndexText === 1}
							backgroundColor={ORANGE_ONE}
						>
							<Text color="white" size="4xl" weight="bold">
								Password
							</Text>
						</SectionWrapper>
						<SectionWrapper
							isActive={currentIndexText === 2}
							backgroundColor={ORANGE_TWO}
						>
							<Text color="white" size="4xl" weight="bold">
								DOB
							</Text>
							<Button onPress={() => setIsSignedIn?.(true)}>Log in</Button>
						</SectionWrapper>
					</Animated.View>
				</GestureDetector>
			</Layout>
			<View style={styles.dotsContainer}>
				<View style={styles.dots}>
					<Dots count={3} activeIndex={currentIndex} goToScreen={goToScreen} />
				</View>
			</View>
		</>
	);
}

const stylesheet = createStyleSheet(({ spacing }) => ({
	dotsContainer: {
		position: "absolute",
		bottom: spacing[5],
		width: spacing.full,
		height: spacing[10],
		zIndex: 10,
	},
	dots: {
		alignItems: "center",
		justifyContent: "center",
	},
	section: {
		alignItems: "center",
		justifyContent: "center",
	},
}));
