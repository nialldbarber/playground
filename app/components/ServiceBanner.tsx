import {
  addDays,
  differenceInDays,
  isAfter,
  isBefore,
  parseISO,
} from "date-fns";
import { useMemo } from "react";
import { Text, View } from "react-native";

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
  const serviceDatePercentage = useMemo(() => {
    const today = new Date();
    const serviceDate = parseISO(service.serviceDate);
    const threeMonthsBeforeService = addDays(serviceDate, -90);

    if (isBefore(today, threeMonthsBeforeService)) {
      return 0;
    } else if (isAfter(today, serviceDate)) {
      return 100;
    } else {
      const totalDays = 90;
      const daysElapsed = differenceInDays(today, threeMonthsBeforeService);
      return Math.min(100, Math.max(0, (daysElapsed / totalDays) * 100));
    }
  }, [service.serviceDate]);

  return (
    <View className="bg-slate-200 items-center justify-center p-5 m-4 rounded-md min-h-[100]">
      <Text>{service.name}</Text>
      <View className="bg-slate-300 p-2 rounded-md w-full">
        <Text>{service.serviceDate}</Text>
        <View
          className="bg-blue-500 h-2 mt-2 rounded-full"
          style={{ width: `${serviceDatePercentage}%` }}
        />
      </View>
    </View>
  );
}
