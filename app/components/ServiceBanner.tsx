import {
	addDays,
	differenceInDays,
	isAfter,
	isBefore,
	parseISO,
} from "date-fns";
import { useMemo } from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Text } from "@/app/components/Text";

const SERVICES = [
	{
		id: 1,
		name: "Service 1",
		serviceDate: "2024-09-25",
	},
	{
		id: 2,
		name: "Service 2",
		serviceDate: "2024-10-05",
	},
	{
		id: 3,
		name: "Service 3",
		serviceDate: "2024-10-15",
	},
] as const;

export function ServiceBanners() {
	return (
		<View>
			{SERVICES.map((service) => (
				<ServiceBanner key={service.id} service={service} />
			))}
		</View>
	);
}

type Service = {
	id: number;
	name: string;
	serviceDate: string;
};

export function ServiceBanner({ service }: { service: Service }) {
	const { styles } = useStyles(stylesheet);

	const serviceDatePercentage = useMemo(() => {
		const today = new Date();
		const serviceDate = parseISO(service.serviceDate);
		const threeMonthsBeforeService = addDays(serviceDate, -90);

		if (isBefore(today, threeMonthsBeforeService)) {
			return 0;
		}
		if (isAfter(today, serviceDate)) {
			return 100;
		}
		const totalDays = 90;
		const daysElapsed = differenceInDays(today, threeMonthsBeforeService);
		return Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));
	}, [service.serviceDate]);

	return (
		<View style={styles.container}>
			<Text>{service.name}</Text>
			<View style={styles.progressContainer}>
				<Text>{service.serviceDate}</Text>
				<View
					style={[{ width: `${serviceDatePercentage}%` }, styles.progress]}
				/>
			</View>
		</View>
	);
}

const stylesheet = createStyleSheet(({ colors, spacing, radii }) => ({
	container: {
		backgroundColor: colors.grey200,
		alignItems: "center",
		justifyContent: "center",
		padding: spacing[5],
		marginTop: spacing[4],
		borderRadius: radii.md,
		minHeight: 100,
	},
	progressContainer: {
		backgroundColor: colors.grey300,
		borderRadius: radii.md,
		padding: spacing[2],
		width: spacing.full,
	},
	progress: {
		backgroundColor: colors.blue500,
		height: spacing[2],
		marginTop: spacing[2],
		borderRadius: radii.full,
	},
}));
