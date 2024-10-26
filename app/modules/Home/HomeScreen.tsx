import {
	BottomSheetBackdrop,
	BottomSheetModal,
	BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useNavigation } from "@react-navigation/native";
import { useCallback, useEffect, useRef, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "@/app/components/Button/Button";
import { Layout } from "@/app/components/Layout";
import { ServiceBanners } from "@/app/components/ServiceBanner";
import { Skeleton } from "@/app/components/Skeleton";
import { Text } from "@/app/components/Text";
import { Item } from "@/app/modules/Home/Item";

import { useIsCompatibleAppVersion } from "@/app/api/compatibleAppVersion/useGetCompatibleAppVersion";
import { Divider } from "@/app/components/Divider";

export function HomeScreen() {
	const { navigate, setOptions } = useNavigation();
	const { width } = useWindowDimensions();
	const [isLoading, setIsLoading] = useState(true);
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);
	const { styles } = useStyles(stylesheet);

	const isAppVersionCompatible = useIsCompatibleAppVersion();

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
	const handleSheetChanges = useCallback((index: number) => {
		console.log("handleSheetChanges", index);
	}, []);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 2000);
		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		setOptions({
			tabBarBadge: 2,
		});
	}, [setOptions]);

	useEffect(() => {
		if (!isAppVersionCompatible) {
			handlePresentModalPress();
		}
	}, [isAppVersionCompatible]);

	const itemWidth = width / 2 - 20;
	const itemHeight = 200;

	return (
		<>
			<BottomSheetModal
				index={1}
				ref={bottomSheetModalRef}
				snapPoints={["50%"]}
				backdropComponent={BottomSheetBackdrop}
			>
				<BottomSheetView style={styles.bottomSheet}>
					<Text size="3xl" weight="bold">
						Uh oh!
					</Text>
					<Divider size="2" color="transparent" />
					<Text weight="bold">
						The app version you're on is not compatible with this version of the
						app.
					</Text>
				</BottomSheetView>
			</BottomSheetModal>
			<Layout>
				<View style={styles.container}>
					<Text size="4xl" weight="bold">
						Home
					</Text>
					<Button
						variant="tertiary"
						size="small"
						onPress={() => navigate("Settings")}
					>
						Settings
					</Button>
				</View>
				<Button onPress={handlePresentModalPress}>PRESS ME</Button>
				<ServiceBanners />
				<View style={styles.list}>
					{Array.from({ length: 10 }).map((_, index) => {
						const id = index + 100;
						return (
							<Skeleton
								key={id}
								isLoading={isLoading}
								width={itemWidth}
								height={itemHeight}
								style={{ borderRadius: 8, marginVertical: 12 }}
							>
								<Item id={id} index={index} />
							</Skeleton>
						);
					})}
				</View>
			</Layout>
		</>
	);
}

const stylesheet = createStyleSheet(({ spacing }) => ({
	container: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: spacing[10],
		paddingVertical: spacing[5],
	},
	list: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "center",
		justifyContent: "center",
		marginTop: spacing[5],
	},
	bottomSheet: {
		padding: spacing[10],
	},
}));
