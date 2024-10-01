import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, useWindowDimensions } from "react-native";

import { Button } from "@/app/components/Button/Button";
import { Layout } from "@/app/components/Layout";
import { ServiceBanners } from "@/app/components/ServiceBanner";
import { Skeleton } from "@/app/components/Skeleton";
import { Text } from "@/app/components/Text";
import { Item } from "@/app/modules/Home/Item";

export function HomeScreen() {
	const { navigate, setOptions } = useNavigation();
	const { width } = useWindowDimensions();

	const [isLoading, setIsLoading] = useState(true);

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

	const itemWidth = width / 2 - 20;
	const itemHeight = 200;

	return (
		<Layout>
			<View className="flex-row justify-between items-center py-3 px-5">
				<Text className="text-4xl font-bold">Home</Text>
				<Button
					variant="tertiary"
					size="small"
					onPress={() => navigate("Settings")}
				>
					Settings
				</Button>
			</View>
			<ServiceBanners />
			<View className="flex-row flex-wrap items-center justify-around mt-5">
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
	);
}
