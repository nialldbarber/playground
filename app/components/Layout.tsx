import { useNavigation } from "@react-navigation/native";
import { ArrowLeft2 } from "iconsax-react-native";
import type { PropsWithChildren } from "react";
import { forwardRef } from "react";
import type { ScrollViewProps } from "react-native";
import { Pressable } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Spinner } from "@/app/components/Spinner";
import { spacing } from "@/app/design-system/tokens";

interface Props extends ScrollViewProps {
	isLoading?: boolean;
	goBack?: boolean;
}

export const Layout = forwardRef<Animated.ScrollView, PropsWithChildren<Props>>(
	(
		{
			children,
			goBack = false,
			isLoading = false,
			...rest
		}: PropsWithChildren<Props>,
		ref,
	) => {
		const { styles } = useStyles(stylesheet);
		const { goBack: back } = useNavigation();
		const insets = useSafeAreaInsets();

		if (isLoading) {
			return (
				<Animated.View
					style={styles.container}
					entering={FadeIn.duration(200)}
					exiting={FadeOut.duration(200)}
				>
					<Spinner />
				</Animated.View>
			);
		}

		return (
			<Animated.ScrollView
				ref={ref}
				contentContainerStyle={{
					position: "relative",
					paddingTop: insets.top,
					paddingBottom: insets.bottom,
				}}
				showsVerticalScrollIndicator={false}
				entering={FadeIn.duration(200)}
				exiting={FadeOut.duration(200)}
				{...rest}
			>
				{goBack && (
					<Pressable onPress={back} style={styles.button}>
						<ArrowLeft2 size={30} color="black" />
					</Pressable>
				)}
				{children}
			</Animated.ScrollView>
		);
	},
);

const stylesheet = createStyleSheet(() => ({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	button: {
		padding: spacing[12],
	},
}));
